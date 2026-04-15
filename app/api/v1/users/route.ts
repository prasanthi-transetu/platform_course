import { NextRequest, NextResponse } from "next/server";

const API_HOST = process.env.NEXT_PUBLIC_API_URL || "https://lms-backend-n83k.onrender.com";
const BACKEND_URL = `${API_HOST}/api/v1/users`;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  
  try {
    const response = await fetch(BACKEND_URL, {
      headers: { 
        "Content-Type": "application/json",
        ...(authHeader ? { "Authorization": authHeader } : {})
      },
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error(`GET Users proxy error [${BACKEND_URL}]:`, error.message);
    return NextResponse.json(
      { message: "Unable to connect to your backend. Ensure the backend is running at " + BACKEND_URL },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  
  try {
    const body = await request.json();
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        ...(authHeader ? { "Authorization": authHeader } : {})
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error(`POST Users proxy error [${BACKEND_URL}]:`, error.message);
    return NextResponse.json(
      { message: "Unable to connect to your backend. Ensure the backend is running at " + BACKEND_URL },
      { status: 503 }
    );
  }
}
