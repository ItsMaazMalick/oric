import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// READ
export async function GET(
  req: NextRequest,
  { params }: { params: { faculty: string; department: string } }
) {
  try {
    const faculty = params.faculty;
    //   const department = params.department;
    const researchPublications = await prisma.researchPublication.findMany({
      where: {
        user: {
          faculty,
          // department,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            department: true,
          },
        },
      },
    });
    const bookAuthoredEdited = await prisma.bookAuthoredEdited.findMany({
      where: {
        user: {
          faculty,
          // department,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            department: true,
          },
        },
      },
    });
    const researchProjects = await prisma.researchProject.findMany({
      where: {
        user: {
          faculty,
          // department,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            department: true,
          },
        },
      },
    });
    if (researchPublications || bookAuthoredEdited || researchProjects) {
      const books = [
        researchPublications,
        bookAuthoredEdited,
        researchProjects,
      ];
      console.log(books);
      return NextResponse.json({ status: 200, success: true, books });
    }

    return NextResponse.json({
      status: 400,
      success: false,
      message: "An error occured",
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
