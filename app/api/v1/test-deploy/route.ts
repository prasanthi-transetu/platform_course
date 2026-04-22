import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  return NextResponse.json({ 
    deployed: true, 
    version: "1.1-final", 
    time: new Date().toISOString() 
  }, {
    headers: { "Cache-Control": "no-store" }
  });
}
