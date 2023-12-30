import prisma from "@/lib/db";
import { userVerify } from "@/lib/verify";
import { NextRequest, NextResponse } from "next/server";

// POST - /api/user/books/book-authored-edited
export async function POST(req: NextRequest) {
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
    if (isBook) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Already exists",
      });
    }
    const book = await prisma.bookAuthoredEdited.create({
      data: {
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
      },
    });
    return NextResponse.json({
      status: 201,
      success: true,
      message: "Record added",
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

export async function GET(req: NextRequest) {
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
    const books = await prisma.bookAuthoredEdited.findMany();
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
