import prisma from "@/lib/db";
import { saveFile } from "@/lib/saveFile";
import { userVerify } from "@/lib/verify";
import { NextRequest, NextResponse } from "next/server";

// POST - /api/user/books/book-authored-edited
export async function POST(req: NextRequest) {
  try {
    const form: FormData = await req.formData();
    const date = form.get("date") as string;
    const funding_agency = form.get("funding_agency") as string;
    const name_of_research = form.get("name_of_research") as string;
    const status = form.get("status") as string;
    const type = form.get("type") as string;
    const role = form.get("role") as string;
    const grant_amount = parseInt(form.get("grant_amount") as string);
    const title = form.get("title") as string;
    const start_date = form.get("start_date") as string;
    const end_date = form.get("end_date") as string;
    const total_funding = parseInt(form.get("total_funding") as string);
    const collaborating_partner = form.get("collaborating_partner") as string;
    const co_funding_partner = form.get("co_funding_partner") as string;
    const completion = form.get("completion") as string;
    const remarks = form.get("remarks") as string;
    const file: File | null = form.get("file") as unknown as File;
    const user_id = form.get("user_id") as string;

    if (
      !date ||
      !funding_agency ||
      !name_of_research ||
      !status ||
      !type ||
      !role ||
      !grant_amount ||
      !title ||
      !start_date ||
      !end_date ||
      !total_funding ||
      !collaborating_partner ||
      !co_funding_partner ||
      !completion ||
      // !remarks ||
      !file ||
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

    const path = await saveFile(file);
    const annex_file = path.split("/")[2];

    const book = await prisma.researchProject.create({
      data: {
        date,
        funding_agency,
        name_of_research,
        status,
        type,
        role,
        grant_amount,
        title,
        start_date,
        end_date,
        total_funding,
        collaborating_partner,
        co_funding_partner,
        completion,
        remarks: "Nill",
        annex_file,
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
    const books = await prisma.researchProject.findMany();
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
