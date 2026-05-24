import { NextResponse } from "next/server";

const STRATEGY_PROMPT = `You are a product strategist.

Based on extracted insights:
1. Identify most important problem
2. Rank problems by impact
3. Assign priority (Low, Medium, High)
4. Explain reasoning

Output format:
{
  "top_problem": "",
  "priority": "",
  "reasoning": "",
  "ranked_problems": []
}`;

export async function POST(req: Request) {
  try {
    const { insights } = await req.json();

    if (!insights || !insights.problems) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Extracted insights are required" } },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Mock for local dev
      console.log("[MOCK] Simulating Strategy Analysis with prompt:", STRATEGY_PROMPT);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const rankedProblems = insights.problems || [];
      const topProblem = rankedProblems[0] || "No distinct problem identified";
      
      return NextResponse.json({
        data: {
          top_problem: topProblem,
          priority: "High",
          reasoning: "Based on the frequency of feedback and the severity of the friction caused, addressing this issue will unlock the most immediate value for the user base and improve initial retention.",
          ranked_problems: rankedProblems,
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
          { role: "system", content: STRATEGY_PROMPT },
          { role: "user", content: `Insights:\n${JSON.stringify(insights, null, 2)}` }
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
    const message = error instanceof Error ? error.message : "Failed to generate strategy";
    console.error("Strategy Error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message } },
      { status: 500 }
    );
  }
}
