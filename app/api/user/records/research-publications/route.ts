import { getUser } from "@/app/actions/user/auth";
import prisma from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

// POST - /api/user/books/published-books
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const {
      date,
      journal_name,
      title,
      authors,
      category,
      status,
      issn,
      volume,
      page_no,
      affiliation,
      link,
      country,
      other_countries,
      addressing,
      user_id,
    } = reqBody;
    if (
      !date ||
      !journal_name ||
      !title ||
      !authors ||
      !category ||
      !status ||
      !issn ||
      !volume ||
      !page_no ||
      !affiliation ||
      !link ||
      !country ||
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
    const isBook = await prisma.researchPublication.findUnique({
      where: {
        issn,
      },
    });
    if (isBook) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Already exists",
      });
    }
    const book = await prisma.researchPublication.create({
      data: {
        date,
        journal_name,
        title,
        authors,
        category,
        status,
        issn,
        volume,
        page_no,
        affiliation,
        link,
        country,
        other_countries,
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
    const verifyToken = await getUser(token);
    if (!verifyToken) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Unauthorized",
      });
    }
    const books = await prisma.researchPublication.findMany();
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
