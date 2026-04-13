import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_STUDENTS_API_URL || "http://localhost:8000/api/v1/students";

export async function GET() {
  try {
    const response = await fetch(BACKEND_URL, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("GET Students proxy error:", error);
    return NextResponse.json({ message: "Failed to fetch students from backend" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("POST Student proxy error:", error);
    return NextResponse.json({ message: "Failed to create student in backend" }, { status: 500 });
  }
}
