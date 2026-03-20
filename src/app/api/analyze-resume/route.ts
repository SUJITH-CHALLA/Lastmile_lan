import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are an expert resume analyst and career coach.
Analyze the resume and return ONLY a valid JSON object.
No markdown, no explanation, just the JSON.

Return this exact JSON schema:
{
  "overall_score": 85,
  "is_strong_enough": true,
  "grade": "B",
  "summary": "2-3 sentences overall assessment",
  "sections": {
    "contact": { "score": 90, "issues": ["string array of issues or empty"] },
    "summary": { "score": 80, "issues": ["string array"] },
    "experience": { "score": 85, "issues": ["string array"] },
    "education": { "score": 95, "issues": ["string array"] },
    "skills": { "score": 75, "issues": ["string array"] }
  },
  "flaws": [
    {
      "section": "experience",
      "issue": "Missing metrics",
      "severity": "high",
      "suggestion": "Add quantitative results to bullet points."
    }
  ],
  "keywords_found": ["React", "TypeScript"],
  "keywords_missing": ["Docker", "AWS"],
  "ats_score": 88,
  "ats_issues": ["Format uses unconventional section headers"],
  "improved_resume": {
    "name": "Full Name",
    "email": "email@example.com",
    "phone": "555-1234",
    "location": "City, State",
    "linkedin": "linkedin.com/in/profile",
    "summary": "New optimized summary",
    "experience": [
      {
        "company": "Company Name",
        "role": "Job Title",
        "duration": "Jan 2020 - Present",
        "location": "City, State",
        "bullets": ["Optimized bullet point with metrics", "Another bullet"]
      }
    ],
    "education": [
      {
        "institution": "University Name",
        "degree": "BS Computer Science",
        "field": "Computer Science",
        "year": "2020",
        "gpa": "3.8"
      }
    ],
    "skills": ["JavaScript", "Python"],
    "certifications": ["AWS Certified Developer"],
    "projects": [
      {
        "name": "Project Name",
        "description": "Project description",
        "tech": ["React", "Node.js"],
        "link": "github.com/project"
      }
    ]
  }
}

Do not include any code block tags like \`\`\`json. Return ONLY the raw JSON string.`;

async function callCerebrasAPI(model: string, resumeText: string, apiKey: string) {
    const response = await fetch("https://api.cerebras.ai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: model,
            max_tokens: 32000,
            temperature: 0.1,
            stream: false,
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                {
                    role: "user",
                    content: `Analyze this resume and return structured feedback:\n\n${resumeText}`,
                },
            ],
        }),
    });

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(\`Cerebras API error with model \${model}: \${errorData}\`);
  }

  const data = await response.json();
  const raw = data.choices?.[0]?.message?.content?.trim() || "{}";
  const clean = raw.replace(/\`\`\`json/gi, "").replace(/\`\`\`/g, "").trim();

  return clean;
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.CEREBRAS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Cerebras API Key is missing. Please set CEREBRAS_API_KEY." },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    let resumeText = "";

    if (file) {
      // It's a file upload
      const buffer = Buffer.from(await file.arrayBuffer());
      const isPdf = file.type === "application/pdf" || file.name?.toLowerCase().endsWith(".pdf");
      const isDocx = file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.name?.toLowerCase().endsWith(".docx");

      if (isPdf) {
        try {
          const { extractText } = await import('unpdf');
          const { text } = await extractText(new Uint8Array(buffer));
          resumeText = Array.isArray(text) ? text.join('\\n') : text;
        } catch (err: unknown) {
          console.error("PDF parse failed:", (err as Error).message);
          return NextResponse.json({ error: "PDF parsing failed. Try a different format." }, { status: 400 });
        }
      } else if (isDocx) {
        try {
          const mammoth = (await import("mammoth")).default;
          const { value } = await mammoth.extractRawText({ buffer });
          resumeText = value;
        } catch (err: unknown) {
          console.error("DOCX parse failed:", (err as Error).message);
          return NextResponse.json({ error: "DOCX parsing failed." }, { status: 400 });
        }
      } else {
        resumeText = buffer.toString("utf8");
      }
    } else {
      // Fallback for raw text if provided
      const rawText = formData.get("resumeText") as string;
      if (rawText) {
        resumeText = rawText;
      } else {
        return NextResponse.json({ error: "No file or resumeText provided" }, { status: 400 });
      }
    }

    if (!resumeText.trim()) {
      return NextResponse.json({ error: "Extracted resume text is empty" }, { status: 400 });
    }

    const trimmedResume = resumeText.slice(0, 15000);

    let jsonString;
    try {
      jsonString = await callCerebrasAPI("llama3.1-70b", trimmedResume, apiKey);
    } catch (error: unknown) {
      console.warn("Failed primary model llama3.1-70b:", (error as Error).message);
      try {
        jsonString = await callCerebrasAPI("llama3.1-8b", trimmedResume, apiKey);
      } catch (fallbackError: unknown) {
        throw new Error("AI engine failed on both models.");
      }
    }

    try {
      const parsed = JSON.parse(jsonString);
      return NextResponse.json(parsed, { status: 200 });
    } catch (parseError) {
      console.error("Failed to parse JSON:", jsonString.slice(0, 200));
      return NextResponse.json({ error: "Failed to parse AI response as JSON" }, { status: 500 });
    }
  } catch (error: unknown) {
    console.error("Unhandled resume analysis error:", (error as Error).message);
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
