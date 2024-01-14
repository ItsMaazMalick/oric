import { getUser } from "@/app/actions/user/auth";
import prisma from "@/lib/db";
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
    const verifyToken = await getUser(token);
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
    const books = await prisma.bookAuthoredEdited.findMany({
      where: { user_id: id },
      orderBy: { date: "desc" },
    });
    if (!books) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "No book found",
      });
    }
    return NextResponse.json({ status: 200, success: true, books });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
}

// UPDATE
// PATCH - /api/user/books/book-authored-edited/Id
export async function PATCH(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const {
      date,
      title_of_book,
      title_of_research,
      publisher,
      country,
      role,
      isbn,
      link,
      pages,
      affiliation,
      addressing,
      user_id,
    } = reqBody;
    if (
      !date ||
      !title_of_book ||
      !title_of_research ||
      !publisher ||
      !country ||
      !role ||
      !isbn ||
      !link ||
      !pages ||
      !affiliation ||
      !addressing ||
      !user_id
    ) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "All fields are required",
      });
    }
    const isUser = await prisma.user.findUnique({
      where: { id: user_id },
    });
    if (!isUser) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Invalid credentials",
      });
    }
    const isBook = await prisma.bookAuthoredEdited.findUnique({
      where: {
        isbn,
      },
    });
    if (!isBook) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "No record found",
      });
    }

    const book = await prisma.bookAuthoredEdited.update({
      where: { id: isBook.id },
      data: {
        date,
        title_of_book,
        title_of_research,
        publisher,
        country,
        role,
        //   isbn,
        link,
        pages,
        affiliation,
        addressing,
        user_id,
      },
    });
    return NextResponse.json({
      status: 201,
      success: true,
      message: "Record updated",
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

export async function DELETE(
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
    const verifyToken = await getUser(token);
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
    const book = await prisma.bookAuthoredEdited.delete({
      where: { id: id },
    });
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Record deleted",
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
