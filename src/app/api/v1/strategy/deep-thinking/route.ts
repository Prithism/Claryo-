import { NextResponse } from "next/server";

const THINKING_PROMPT = `You are a senior product thinker.

Before generating a PRD, analyze:
1. Why this problem matters
2. What happens if we DON'T solve it
3. Trade-offs involved
4. Alternative solutions

Output:
{
  "why_this_matters": "",
  "risk_of_inaction": "",
  "tradeoffs": [],
  "alternatives": []
}`;

export async function POST(req: Request) {
  try {
    const { strategy, insights } = await req.json();

    if (!strategy || !strategy.top_problem) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Strategy output is required to proceed with deep thinking" } },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Mock for local dev
      console.log("[MOCK] Simulating Deep Thinking with prompt:", THINKING_PROMPT);
      await new Promise((resolve) => setTimeout(resolve, 2500));
      
      return NextResponse.json({
        data: {
          why_this_matters: `Solving "${strategy.top_problem}" directly impacts core user activation. If users cannot cross this threshold, our acquisition spend is essentially wasted, as they drop off before discovering the product's aha moment.`,
          risk_of_inaction: "Continued high churn during the onboarding phase, leading to degraded LTV and compounding negative sentiment in public communities.",
          tradeoffs: [
            "Diverting engineering resources from the planned Q3 shiny feature",
            "Simplifying the flow might obscure advanced options for power users"
          ],
          alternatives: [
            "Implement a manual concierge onboarding for now",
            "Add a temporary tooltip tour overlay instead of fundamentally fixing the UI flow"
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
          { role: "system", content: THINKING_PROMPT },
          { role: "user", content: `Context Strategy:\n${JSON.stringify(strategy, null, 2)}\n\nOriginal Insights:\n${JSON.stringify(insights, null, 2)}` }
        ],
        temperature: 0.4,
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
    const message = error instanceof Error ? error.message : "Failed to generate deep product thinking";
    console.error("Deep Thinking Error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message } },
      { status: 500 }
    );
  }
}
