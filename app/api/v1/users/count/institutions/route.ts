import { NextRequest, NextResponse } from "next/server";


export const dynamic = "force-dynamic";
const API_HOST = process.env.NEXT_PUBLIC_API_URL || "https://lms-backend-n83k.onrender.com";
const BACKEND_URL = `${API_HOST}/api/v1/users/count/institutions`;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  
  try {
    const response = await fetch(BACKEND_URL, {
      headers: { 
        "Content-Type": "application/json",
        ...(authHeader ? { "Authorization": authHeader } : {})
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`GET Institutions Count proxy error [${BACKEND_URL}] status ${response.status}:`, errorText);
      return NextResponse.json(
        { message: `Backend error: ${errorText || response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`GET Institutions Count proxy error [${BACKEND_URL}]:`, message);
    return NextResponse.json(
      { message: "Unable to connect to backend at " + BACKEND_URL },
      { status: 503 }
    );
  }
}
