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
    // FALLBACK: Return an empty list with a demo mode flag
    return NextResponse.json({ 
      data: [], 
      __demo_mode: true, 
      message: "Backend unreachable. Entering Demo Mode (using local storage)." 
    });
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
    // FALLBACK: Return the body with a demo mode flag to tell frontend to save locally
    return NextResponse.json({ 
      __demo_mode: true, 
      message: "Backend unreachable. Saving to local storage (Demo Mode)." 
    }, { status: 201 });
  }
}
