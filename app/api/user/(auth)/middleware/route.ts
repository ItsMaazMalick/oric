import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/db";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get("Authorization");
    if (!authorizationHeader) {
      cookies()?.set("auth-token", "", { expires: new Date(0) });
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Unauthorized",
      });
    }
    const token = authorizationHeader.replace("Bearer ", "");
    const decodedToken = jwt.decode(token);
    const { tokenData }: any = decodedToken;
    const id = tokenData.id;
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      cookies()?.set("auth-token", "", { expires: new Date(0) });
      return NextResponse.json({
        status: 401,
        success: false,
        message: "unauthorized",
      });
    }
    return NextResponse.json({
      status: 200,
      success: true,
      id: user.id,
    });
  } catch (error) {
    cookies()?.set("auth-token", "", { expires: new Date(0) });
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}
