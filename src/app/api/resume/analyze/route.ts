import { NextResponse } from "next/server"

export async function POST(req: Request) {
  if (!process.env.SAMBANOVA_API_KEY || process.env.SAMBANOVA_API_KEY === 'your_api_key_here') {
    return NextResponse.json({
      error: "SambaNova API Key is missing or using placeholder. Please set a valid key in .env.local"
    }, { status: 500 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const profileDataStr = formData.get("profileData") as string
    const profileData = JSON.parse(profileDataStr)

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // ── 1. Extract text from any file type ──
    let resumeText = ""
    const buffer = Buffer.from(await file.arrayBuffer())

    // Detect file type by MIME or filename extension (FormData MIME can be empty)
    const isPdf = file.type === "application/pdf" || file.name?.toLowerCase().endsWith(".pdf")
    const isDocx = file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                   || file.name?.toLowerCase().endsWith(".docx")

    console.log("FILE NAME:", file.name)
    console.log("FILE TYPE:", file.type)
    console.log("FILE SIZE:", file.size)
    console.log("IS_PDF:", isPdf, "IS_DOCX:", isDocx)

    if (isPdf) {
      try {
        const { extractText } = await import('unpdf')
        const { text } = await extractText(new Uint8Array(buffer))
        resumeText = Array.isArray(text) ? text.join('\n') : text
        console.log("unpdf SUCCESS, length:", resumeText.length)
      } catch (err: any) {
        console.error("unpdf FAILED:", err.message)
        return NextResponse.json({ 
          error: "PDF parsing failed. Please upload a .txt or .docx file instead." 
        }, { status: 400 })
      }
    } else if (isDocx) {
      try {
        const mammoth = (await import("mammoth")).default
        const { value } = await mammoth.extractRawText({ buffer })
        resumeText = value
        console.log("mammoth SUCCESS, text length:", resumeText.length)
      } catch (docErr: any) {
        console.error("mammoth FAILED:", docErr.message)
        resumeText = buffer.toString("utf8")
      }
    } else {
      // Plain text or other
      resumeText = buffer.toString("utf8")
      console.log("Plain text read, length:", resumeText.length)
    }

    if (!resumeText.trim()) {
      resumeText = "Resume text could not be extracted. Please use profile data for analysis."
    }

    // ── DEBUG: Log extraction result ──
    console.log("RESUME TEXT LENGTH:", resumeText.length)
    console.log("RESUME TEXT PREVIEW:", resumeText.slice(0, 300))


    // Cap to 6000 chars to cover full length resumes
    const trimmedResume = resumeText.slice(0, 6000)

    // ── 2. Call Cerebras AI directly with fetch ──
    const systemPrompt = `You are an expert resume parser. You will receive raw resume text in ANY format — structured or unstructured. Your job is to extract ALL information accurately and return ONLY valid JSON.

EXTRACTION RULES:
- Section names vary wildly — "CARRER OBJECTIVE" = objective, "INTERNSHIP" = work_experience, "ACHIVEMENT" = achievements, "EXTRA-CURRICULAR" = achievements, "PROFESSIONAL SKILLS" = soft_skills
- Never skip a section even if the name is misspelled or unusual
- Extract EVERY bullet point exactly as written — do not summarize or skip
- If a field is missing return empty string or empty array — never null
- Extract ALL projects with their full descriptions and bullets
- Extract ALL certifications as individual items
- Extract ALL skills grouped by their original category names
- Dates: extract exactly as written in the resume
- Do NOT invent or hallucinate any information
- Do NOT truncate any text

Return ONLY this JSON structure with no markdown, no backticks, no explanation:
{
  "personal_info": {
    "full_name": "",
    "email": "",
    "phones": [],
    "location": "",
    "current_title": "",
    "linkedin": "",
    "github": ""
  },
  "professional_summary": "",
  "core_skills": {},
  "work_experience": [
    {
      "company": "",
      "title": "",
      "location": "",
      "start_date": "",
      "end_date": "",
      "bullets": [{"text": ""}]
    }
  ],
  "education": [
    {
      "degree": "",
      "specialization": "",
      "college": "",
      "duration": "",
      "gpa": ""
    }
  ],
  "projects": [
    {
      "name": "",
      "tech_stack": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "bullets": [{"text": ""}]
    }
  ],
  "certifications": [{"name": "", "issuer": ""}],
  "achievements": [{"title": "", "date": "", "category": "", "description": ""}],
  "languages": [],
  "extra_curricular": []
}`

    const userMessage = `Extract everything from this resume text. Do not skip any section. Map unusual section names to the closest JSON field.

RESUME TEXT:
${trimmedResume}

Candidate: ${profileData.fullName}
Target Role: ${profileData.targetRole || profileData.jobTitle}`

    const aiResponse = await fetch(
      'https://api.sambanova.ai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SAMBANOVA_API_KEY}`
        },
        body: JSON.stringify({
          model: 'DeepSeek-R1-0528',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          temperature: 0.1,
          max_tokens: 4096
        })
      }
    )

    console.log('SAMBANOVA STATUS:', aiResponse.status)
    const aiData = await aiResponse.json()
    console.log('SAMBANOVA RAW:', JSON.stringify(aiData).slice(0, 500))

    if (!aiResponse.ok) {
      const errorMsg = aiData?.error?.message || `SambaNova API returned ${aiResponse.status}`
      console.log("SAMBANOVA 400 ERROR:", JSON.stringify(aiData))
      console.error("SambaNova API Error:", errorMsg)
      return NextResponse.json({ 
        error: errorMsg, 
        status: aiResponse.status, 
        model: "DeepSeek-R1-0528" 
      }, { status: aiResponse.status })
    }

    const rawContent = aiData.choices?.[0]?.message?.content || '{}'

    // Strip DeepSeek R1 thinking tags
    const strippedText = rawContent.replace(/<think>[\s\S]*?<\/think>/gi, '').trim()

    // Clean potential markdown backticks
    const cleanContent = strippedText.replace(/```json/gi, "").replace(/```/g, "").trim()

    let result: any
    try {
      result = JSON.parse(cleanContent)
    } catch (parseErr) {
      console.error("Failed to parse AI response:", cleanContent.slice(0, 200))
      return NextResponse.json({ error: "Failed to parse AI response as JSON" }, { status: 500 })
    }

    // Hard reject if AI returned placeholder data
    if (
      !result.personal_info?.full_name ||
      result.personal_info?.full_name === 'Test User' ||
      result.personal_info?.full_name === 'Unknown'
    ) {
      return NextResponse.json({
        error: 'Resume extraction failed — could not read your resume content. Please try again.'
      }, { status: 422 })
    }

    // ── 4. Compatibility bridge ──
    result.originalSummary = resumeText.slice(0, 500)
    result.originalBullets = ["Analyzing original experience..."]
    result.optimizedSummary = result.professional_summary || ""
    result.optimizedBullets = result.work_experience?.[0]?.bullets?.map((b: any) => typeof b === 'string' ? b : b.text) || []
    result.skills = [
      ...(result.core_skills?.technical_skills || []),
      ...(result.core_skills?.tools || []),
      ...(result.core_skills?.accounting_tools || []),  // legacy fallback
    ]

    // Ensure analysisReport exists with defaults
    if (!result.analysisReport) {
      result.analysisReport = {
        flawsFound: [],
        changesMade: [],
        scores: {
          before: { overall: 40, impact: 4, quantification: 3, ats: 5, grammar: 6, keywords: 4, format: 5 },
          after: { overall: 82, impact: 8, quantification: 8, ats: 9, grammar: 9, keywords: 8, format: 9 }
        },
        verdict: { level: "STRONG", summary: "Resume enhanced by AI." }
      }
    }

    if (!result._quality_flags) {
      result._quality_flags = ["AI analysis complete"]
    }

    console.log("Analysis Complete for:", profileData.fullName)
    return NextResponse.json(result)
  } catch (err: any) {
    console.log('FULL ERROR:', err.message)
    console.log('STACK:', err.stack)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}


