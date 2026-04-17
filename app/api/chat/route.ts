import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "qwen/qwen-2.5-7b-instruct",
          messages: [
            { role: "user", content: prompt }
          ]
        })
      }
    );

    const data = await response.json();

    return NextResponse.json({
      success: true,
      reply: data.choices?.[0]?.message?.content || "No reply"
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "AI request failed" },
      { status: 500 }
    );
  }
}