import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// CREATE USER
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const {
      title,
      name,
      email,
      cnic,
      dob,
      password,
      gender,
      department,
      faculty,
      phone_no,
      cell_no,
      research_domain,
      highest_degree,
    } = reqBody;
    if (
      !title ||
      !name ||
      !email ||
      !cnic ||
      !dob ||
      !password ||
      !gender ||
      !department ||
      !faculty ||
      !phone_no ||
      !cell_no ||
      !research_domain ||
      !highest_degree
    ) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "All fields are required",
      });
    }
    const isUser = await prisma.user.findUnique({
      where: { email },
    });

    if (isUser) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "User already exists",
      });
    }
    const isUserCnic = await prisma.user.findUnique({
      where: {
        cnic,
      },
    });
    if (isUserCnic) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "User already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        title,
        name,
        email,
        cnic,
        dob,
        password: hashPassword,
        gender,
        department,
        faculty,
        phone_no,
        cell_no,
        research_domain,
        highest_degree,
      },
    });

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Account created",
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
