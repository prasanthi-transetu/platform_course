import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_STUDENTS_API_URL || "http://localhost:5000/students";

export async function GET() {
  try {
    const response = await fetch(BACKEND_URL, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error(`GET Students proxy connection error [${BACKEND_URL}]:`, error.message);
    return NextResponse.json(
      { message: "Unable to connect to your backend. Ensure the backend is running at " + BACKEND_URL },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("--- DEBUG: PROXYING STUDENT POST ---");
    console.log("Target URL:", BACKEND_URL);
    console.log("Payload:", JSON.stringify(body, null, 2));
    
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    
    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text };
    }

    console.log("Backend Response Status:", response.status);
    console.log("Backend Response Body:", JSON.stringify(data, null, 2));
    
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error(`--- DEBUG: PROXY POST ERROR [${BACKEND_URL}] ---`);
    console.error("Error Message:", error.message);
    return NextResponse.json(
      { message: "Unable to connect to your backend. Ensure the backend is running at " + BACKEND_URL },
      { status: 503 }
    );
  }
}
