import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_STUDENTS_API_URL || "http://localhost:8000/api/v1/students";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetch(`${BACKEND_URL}/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error(`GET Student proxy error [${BACKEND_URL}/${id}]:`, error.message);
    return NextResponse.json(
      { message: `Failed to connect to backend at ${BACKEND_URL}/${id}. Ensure the backend is running and publicly accessible.` },
      { status: 502 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const response = await fetch(`${BACKEND_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error(`PUT Student proxy error [${BACKEND_URL}/${id}]:`, error.message);
    return NextResponse.json(
      { message: `Failed to connect to backend at ${BACKEND_URL}/${id}. Ensure the backend is running and publicly accessible.` },
      { status: 502 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetch(`${BACKEND_URL}/${id}`, {
      method: "DELETE",
    });
    
    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error(`DELETE Student proxy error [${BACKEND_URL}/${id}]:`, error.message);
    return NextResponse.json(
      { message: `Failed to connect to backend at ${BACKEND_URL}/${id}. Ensure the backend is running and publicly accessible.` },
      { status: 502 }
    );
  }
}
