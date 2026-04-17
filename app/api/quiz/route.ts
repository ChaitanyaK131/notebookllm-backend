import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: "Text required" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "qwen/qwen-2.5-7b-instruct",
          messages: [
            {
              role: "user",
              content: `Create 5 quiz questions from:\n${text}`
            }
          ]
        })
      }
    );

    const data = await response.json();

    return NextResponse.json(
      {
        success: true,
        quiz: data.choices?.[0]?.message?.content || "No quiz generated"
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Failed" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      }
    }
  );
}