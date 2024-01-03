import prisma from "@/lib/db";
import { userVerify } from "@/lib/verify";
import { NextRequest, NextResponse } from "next/server";

// READ
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authorizationHeader = req.headers.get("Authorization");
    if (!authorizationHeader) {
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
    const { id } = params;
    if (!id) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Id is required",
      });
    }
    const researchPublication = await prisma.researchPublication.findMany({
      where: { user_id: id },
      orderBy: { date: "desc" },
    });
    const bookAuthoredEdited = await prisma.bookAuthoredEdited.findMany({
      where: { user_id: id },
      orderBy: { date: "desc" },
    });
    const researchProject = await prisma.researchProject.findMany({
      where: { user_id: id },
      orderBy: { date: "desc" },
    });
    const departmentTraining = await prisma.departmentTraining.findMany({
      where: { user_id: id },
      orderBy: { date: "desc" },
    });
    if (bookAuthoredEdited) {
      const lengths = [
        researchPublication.length,
        bookAuthoredEdited.length,
        researchProject.length,
        departmentTraining.length,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ];
      return NextResponse.json({ status: 200, success: true, lengths });
    }
    return NextResponse.json({
      status: 400,
      success: false,
      message: "No book found",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
}
