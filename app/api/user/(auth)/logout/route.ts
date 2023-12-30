import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // Set the user-token cookie to null and provide options to expire it
  cookies().set("auth-token", "", { expires: new Date(0) });

  return NextResponse.json({ status: 200, success: true });
}
