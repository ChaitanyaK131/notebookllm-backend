import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "quillbot/quillbot-paraphraser",
          messages: [
            {
              role: "user",
              content:
                "Generate one short motivational quote for students. Keep it under 12 words."
            }
          ]
        })
      }
    );

    const data = await response.json();

    return NextResponse.json(
      {
        success: true,
        quote:
          data.choices?.[0]?.message?.content ||
          "Stay focused and keep learning."
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }
    );

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        quote: "Discipline today creates success tomorrow."
      },
      {
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
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      }
    }
  );
}