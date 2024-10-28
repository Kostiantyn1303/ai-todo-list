import { NextResponse, NextRequest } from "next/server";
import mockSuggestions from "@/app/utils/mock";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const taskDescription = searchParams.get("task");

    if (taskDescription === null || taskDescription.trim() === "") {
      return NextResponse.json(
        { error: "Task description cannot be empty." },
        { status: 400 }
      );
    }

    const matchingSuggestions = Object.keys(mockSuggestions).filter((key) =>
      key.toLowerCase().includes(taskDescription.toLowerCase())
    );

    const suggestions = matchingSuggestions.flatMap(
      (key) => mockSuggestions[key]
    );

    if (suggestions.length === 0) {
      return NextResponse.json(
        { suggestions: [], message: "No suggestions available." },
        { status: 200 }
      );
    }

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
