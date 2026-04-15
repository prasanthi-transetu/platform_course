import { NextRequest, NextResponse } from "next/server";

const API_HOST = process.env.NEXT_PUBLIC_API_URL || "https://lms-backend-n83k.onrender.com";
const BACKEND_URL = `${API_HOST}/api/v1/users`;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const authHeader = request.headers.get("Authorization");
  
  try {
    const response = await fetch(`${BACKEND_URL}/${id}`, {
      headers: { 
        "Content-Type": "application/json",
        ...(authHeader ? { "Authorization": authHeader } : {})
      },
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error(`GET User proxy error [${BACKEND_URL}/${id}]:`, error.message);
    return NextResponse.json(
      { message: `Failed to connect to backend at ${BACKEND_URL}/${id}.` },
      { status: 502 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const authHeader = request.headers.get("Authorization");
  
  try {
    const body = await request.json();
    const response = await fetch(`${BACKEND_URL}/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        ...(authHeader ? { "Authorization": authHeader } : {})
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error(`PUT User proxy error [${BACKEND_URL}/${id}]:`, error.message);
    return NextResponse.json(
      { message: `Failed to connect to backend at ${BACKEND_URL}/${id}.` },
      { status: 502 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const authHeader = request.headers.get("Authorization");
  
  try {
    const response = await fetch(`${BACKEND_URL}/${id}`, {
      method: "DELETE",
      headers: authHeader ? { "Authorization": authHeader } : {},
    });
    
    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error(`DELETE User proxy error [${BACKEND_URL}/${id}]:`, error.message);
    return NextResponse.json(
      { message: `Failed to connect to backend at ${BACKEND_URL}/${id}.` },
      { status: 502 }
    );
  }
}
