import prisma from "@/lib/db";
import { userVerify } from "@/lib/verify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const authorizationHeader = req.headers.get("Authorization");
    if (!authorizationHeader || !id) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Unauthorized",
      });
    }
    const token = authorizationHeader.replace("Bearer ", "");
    const verifyToken = await userVerify(token);
    if (!verifyToken) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Unauthorized",
      });
    }
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Invalid user",
      });
    }
    return NextResponse.json({ status: 200, success: true, user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
}
