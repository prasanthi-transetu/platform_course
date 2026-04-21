import { NextRequest, NextResponse } from "next/server";


export const dynamic = "force-dynamic";
const API_HOST = process.env.NEXT_PUBLIC_API_URL || "https://lms-backend-n83k.onrender.com";
const BACKEND_URL = `${API_HOST}/api/v1/users`;

const getAuth = (req: NextRequest) => req.headers.get("Authorization");


export async function GET(request: NextRequest) {
  const auth = getAuth(request);
  
  try {
    const response = await fetch(BACKEND_URL, {
      headers: { 
        "Content-Type": "application/json",
        ...(auth ? { "Authorization": auth } : {})
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`GET Users proxy error [${BACKEND_URL}]:`, message);
    return NextResponse.json(
      { message: "Unable to connect to your backend. Ensure the backend is running at " + BACKEND_URL },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = getAuth(request);
  
  try {
    const body = await request.json();
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        ...(auth ? { "Authorization": auth } : {})
      },
      body: JSON.stringify(body),
    });

    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`POST Users proxy error [${BACKEND_URL}]:`, message);
    return NextResponse.json(
      { message: "Unable to connect to your backend. Ensure the backend is running at " + BACKEND_URL },
      { status: 503 }
    );
  }
}
