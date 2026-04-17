import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    return NextResponse.json(
      {
        success: true,
        message: "Upload received"
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