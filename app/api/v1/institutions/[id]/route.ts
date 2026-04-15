import { NextRequest, NextResponse } from "next/server";

const API_HOST = process.env.NEXT_PUBLIC_API_URL || "https://lms-backend-n83k.onrender.com";
const BACKEND_URL = process.env.BACKEND_API_URL || `${API_HOST}/api/v1/institutions`;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authHeader = request.headers.get("Authorization");
    const response = await fetch(`${BACKEND_URL}/${id}`, {
      headers: { 
        "Content-Type": "application/json",
        ...(authHeader ? { "Authorization": authHeader } : {})
      },
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(`GET Institution ${request.url} proxy error:`, error);
    return NextResponse.json({ message: "Failed to fetch institution from backend" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const authHeader = request.headers.get("Authorization");
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
  } catch (error) {
    console.error(`PUT Institution ${request.url} proxy error:`, error);
    return NextResponse.json({ message: "Failed to update institution in backend" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authHeader = request.headers.get("Authorization");
    const response = await fetch(`${BACKEND_URL}/${id}`, {
      method: "DELETE",
      headers: {
        ...(authHeader ? { "Authorization": authHeader } : {})
      }
    });
    
    // Some APIs return 204 No Content
    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(`DELETE Institution ${request.url} proxy error:`, error);
    return NextResponse.json({ message: "Failed to delete institution in backend" }, { status: 500 });
  }
}
