import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_STUDENTS_API_URL || "http://localhost:8000/api/v1/students";

export async function GET() {
  try {
    const response = await fetch(BACKEND_URL, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error(`GET Students proxy error [${BACKEND_URL}]:`, error.message);
    return NextResponse.json(
      { message: `Failed to connect to backend at ${BACKEND_URL}. Ensure the backend is running and publicly accessible.` },
      { status: 502 }
    );
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
  } catch (error: any) {
    console.error(`POST Student proxy error [${BACKEND_URL}]:`, error.message);
    return NextResponse.json(
      { message: `Failed to connect to backend at ${BACKEND_URL}. Ensure the backend is running and publicly accessible.` },
      { status: 502 }
    );
  }
}
