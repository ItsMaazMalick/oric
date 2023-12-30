import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

// LOGIN
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    if (!email || !password) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "All fields are required",
      });
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Invalid credentials",
      });
    }

    const response = NextResponse.json({
      status: 200,
      success: true,
      message: "Successfully logged in",
    });

    //TOKEN DATA
    const tokenData = {
      id: user.id,
      role: user.role,
      email: user.email,
    };

    //ASSIGN TOKEN
    const token = jwt.sign(
      {
        tokenData,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    response.cookies.set("auth-token", token);
    return response;
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
}
