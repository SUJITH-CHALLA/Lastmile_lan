import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are LASTMILE AI — an expert resume analyst and professional resume writer. Your task is to meticulously analyze the provided resume text and return a single, valid JSON object. Do not include any markdown, backticks, or conversational preamble. The JSON structure must be exactly as follows:

{
  "meta": {
    "name": "full name",
    "title": "job title",
    "email": "email or null",
    "phone": "phone or null",
    "location": "location or null",
    "linkedin": "linkedin or null",
    "original_score": <integer 0-100 honest score>,
    "optimized_score": <integer 0-100 post-fix score>
  },
  "logs": [
    { "id": 1, "type": "info|ok|warn|err", "msg": "specific log message", "section": "section_key or null" }
  ],
  "sections": [
    {
      "key": "summary|skills|exp_0|exp_1|education|certifications|additional",
      "label": "SECTION DISPLAY NAME",
      "status": "optimized|valid|flagged",
      "original_lines": ["original text lines exactly as in resume"],
      "removed_lines": ["bad lines that should be removed"],
      "added_lines": ["new improved lines to add"],
      "fixed_lines": ["final optimized lines for this section"],
      "issues": [
        { "severity": "critical|high|medium|low", "problem": "exact problem found", "fix": "what was done to fix it" }
      ]
    }
  ],
  "final_resume": {
    "header": { "name": "", "title": "", "contact": "" },
    "sections": [
      { "label": "SECTION NAME", "content_lines": ["line1", "line2"] }
    ]
  }
}

**CRITICAL ANALYSIS & EXTRACTION RULES:**

1.  **FULL EXTRACTION:** You MUST process the entire resume text provided. Do not truncate or ignore any part of the document. Every section, from the header to the final line, must be accounted for.
2.  **LOG GENERATION:** Generate a minimum of 30-50 detailed log entries. These logs must provide a step-by-step narrative of your analysis, covering every section and decision made.
3.  **ISSUE FLAGGING:** Be hyper-critical. Identify and flag ALL issues, including but not limited to:
    *   Grammatical errors, spelling mistakes, and awkward phrasing.
    *   Weak, passive verbs (e.g., "responsible for," "worked on").
    *   Bullet points lacking quantifiable metrics (e.g., %, $, numbers).
    *   Inconsistencies in job roles vs. descriptions.
    *   Duplicate skills or content.
    *   Generic, uninspired summary statements.
4.  **WORK EXPERIENCE OPTIMIZATION:**
    *   Every bullet point under work experience MUST start with a strong, dynamic action verb.
    *   Rewrite bullets to include specific, quantifiable achievements. If a bullet lacks a metric, add a realistic one based on the context.
    *   Ensure each role has at least 3-4 impactful bullet points. If fewer exist, generate new ones that are relevant to the job title.
    *   Remove or rewrite any bullets that do not align with the stated job title.
5.  **SKILLS SECTION:**
    *   Deduplicate all skills.
    *   Group skills into logical categories: "Technical Skills," "Software & Tools," and "Soft Skills."
6.  **SUMMARY REWRITING:** Rewrite the professional summary to be 3-4 lines long. It must be punchy, role-aligned, and highlight the candidate's key qualifications.
7.  **SCORING:** The \`original_score\` must be an honest, critical reflection of the resume's initial quality based on the issues you found.
8.  **SECTION KEYS:** Use sequential keys for work experience: \`exp_0\`, \`exp_1\`, \`exp_2\`, and so on.
9.  **JSON ONLY:** Your final output must be ONLY the JSON object. Nothing else.`;

export const runtime = "edge";

async function callCerebrasAPI(model, resumeText, apiKey) {
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
      stream: false, // Keep stream false for the fallback logic
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Analyze this resume and return the JSON:\n\n${resumeText}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.text(); // Use .text() for more robust error logging
    console.error(
      `Cerebras API Error (model: ${model}, status: ${response.status}):`,
      errorData,
    );
    throw new Error(`Cerebras API error with model ${model}`);
  }

  const data = await response.json();
  const raw = data.choices?.[0]?.message?.content?.trim() || "";
  const clean = raw
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  // Basic validation to see if it looks like a JSON object
  if (!clean.startsWith("{") || !clean.endsWith("}")) {
    console.warn(`Received non-JSON-object response from ${model}:`, clean);
    throw new Error("Response was not a JSON object.");
  }

  return clean;
}

export async function POST(req) {
  try {
    const { resumeText } = await req.json();
    const apiKey = process.env.CEREBRAS_API_KEY;

    if (!resumeText?.trim()) {
      return new Response(
        JSON.stringify({ error: "No resume text provided" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    let jsonString;
    try {
      // Try the powerful model first
      console.log("Attempting analysis with llama3.1-70b...");
      jsonString = await callCerebrasAPI("llama3.1-70b", resumeText, apiKey);
    } catch (error) {
      console.warn("Failed to get response from llama3.1-70b:", error.message);
      console.log("Falling back to llama3.1-8b...");
      try {
        // Fallback to the faster model
        jsonString = await callCerebrasAPI("llama3.1-8b", resumeText, apiKey);
      } catch (fallbackError) {
        console.error(
          "Fallback model llama3.1-8b also failed:",
          fallbackError.message,
        );
        return new Response(
          JSON.stringify({
            error: "AI engine failed on both primary and fallback models.",
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
    }

    try {
      const parsed = JSON.parse(jsonString);
      return new Response(JSON.stringify(parsed), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (parseError) {
      console.error("Failed to parse final JSON from AI response:", jsonString);
      return new Response(
        JSON.stringify({ error: "Failed to parse AI response as JSON" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } catch (error) {
    console.error("Unhandled resume analysis error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
