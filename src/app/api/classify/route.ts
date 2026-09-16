import { NextRequest, NextResponse } from "next/server";
import { classifyWithGemini } from "@/lib/gemini";
import { getFallbackClassification } from "@/lib/fallbackClassifier";
import { ClassifyResponse } from "@/types/waste";

export async function POST(request: NextRequest): Promise<NextResponse<ClassifyResponse>> {
  try {
    // 1. Parse and validate JSON request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request payload. Expected a JSON body with an 'item' field.",
        },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object" || !("item" in body)) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required 'item' field in JSON request.",
        },
        { status: 400 }
      );
    }

    const rawItem = (body as { item: unknown }).item;
    if (typeof rawItem !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "The 'item' field must be a text string.",
        },
        { status: 400 }
      );
    }

    const trimmedItem = rawItem.trim();

    // 2. Validate input length and emptiness
    if (trimmedItem.length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Item description is too short. Please provide at least 2 characters.",
        },
        { status: 400 }
      );
    }

    if (trimmedItem.length > 150) {
      return NextResponse.json(
        {
          success: false,
          error: "Item description exceeds the maximum length of 150 characters.",
        },
        { status: 400 }
      );
    }

    // 3. Attempt classification via Google Gemini
    const geminiResult = await classifyWithGemini(trimmedItem);

    if (geminiResult) {
      return NextResponse.json({
        success: true,
        data: geminiResult,
      });
    }

    // 4. If Gemini is unconfigured or failed, use deterministic fallback engine
    const fallbackResult = getFallbackClassification(trimmedItem);

    return NextResponse.json({
      success: true,
      data: fallbackResult,
    });
  } catch {
    // Return friendly generic 500 error without exposing stack traces or internals
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing the waste classification. Please try again.",
      },
      { status: 500 }
    );
  }
}
