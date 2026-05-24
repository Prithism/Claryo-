import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a senior product analyst.

From the given input, extract:
1. Key Problems
2. Repeated Themes
3. User Pain Points
4. Notable Quotes

Rules:
* Group similar ideas together
* Avoid redundancy
* Keep outputs concise

Return structured JSON:
{
  "problems": [],
  "themes": [],
  "pain_points": [],
  "quotes": []
}`;

export async function POST(req: Request) {
  try {
    const { input, tags } = await req.json();

    if (!input || typeof input !== "string") {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Input text is required" } },
        { status: 400 }
      );
    }

    // Determine if we have an OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Fallback: Simulate the AI processing for local development
      console.log("[MOCK] Simulating AI analysis with prompt:", SYSTEM_PROMPT);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      return NextResponse.json({
        data: {
          problems: ["Lack of clear documentation", "Onboarding is confusing for new users"],
          themes: ["Usability", "First-time experience"],
          pain_points: ["Users get stuck on step 3", "Error messages are not actionable"],
          quotes: ["I couldn't figure out how to invite my team.", "Why does it keep crashing when I click save?"],
        }
      });
    }

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo-preview", // or any preferred model
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Tags: ${tags?.join(", ")}\n\nInput:\n${input}` }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const result = await response.json();
    const content = result.choices[0]?.message?.content;
    let parsedData: Record<string, unknown> = {};
    try {
      parsedData = JSON.parse(content || "{}");
    } catch {
      return NextResponse.json(
        { error: { code: "PARSE_ERROR", message: "AI returned malformed JSON" } },
        { status: 502 }
      );
    }

    return NextResponse.json({ data: parsedData });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to analyze feedback";
    console.error("Analysis Error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message } },
      { status: 500 }
    );
  }
}
