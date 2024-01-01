import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  // const admins = await prisma.admin.findMany();
  return NextResponse.json({ message: "HELLO" });
}
