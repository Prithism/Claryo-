import { NextResponse } from "next/server";

const EVALUATE_PROMPT = `You are evaluating product clarity.

Score the problem definition on:
* Clarity (1-10)
* User understanding (1-10)
* Business impact clarity (1-10)

Also suggest improvements.

Output:
{
  "clarity_score": 0,
  "issues": [],
  "suggestions": []
}`;

export async function POST(req: Request) {
  try {
    const { strategy, thinking } = await req.json();

    if (!strategy || !thinking) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Strategy and deep thinking data are required for evaluation" } },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Mock for local dev
      console.log("[MOCK] Simulating Evaluate Clarity with prompt:", EVALUATE_PROMPT);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      return NextResponse.json({
        data: {
          clarity_score: 7,
          issues: [
            "The problem statement focuses heavily on the UI friction but lacks quantitative success metrics.",
            "Business impact 'activation' is mentioned but not tied to a specific cohort or persona."
          ],
          suggestions: [
            "Define exactly what 'activation' means (e.g., inviting 1 user within 24h).",
            "Clarify if this friction applies to all segments or just self-serve users.",
            "Include a specific metric for the 'high churn' mentioned in the risk of inaction."
          ]
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
        model: "gpt-4-turbo-preview",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: EVALUATE_PROMPT },
          { role: "user", content: `Strategy:\n${JSON.stringify(strategy, null, 2)}\n\nDeep Thinking:\n${JSON.stringify(thinking, null, 2)}` }
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
    const message = error instanceof Error ? error.message : "Failed to evaluate product clarity";
    console.error("Evaluate Clarity Error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message } },
      { status: 500 }
    );
  }
}
