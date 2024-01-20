"use server";

import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// OK:
// LOGIN USER
export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!email || !password) {
    revalidatePath("/user/login");
    return {
      status: 400,
      success: false,
      message: "All fields are required",
    };
  }
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    revalidatePath("/user/login");
    return {
      status: 400,
      success: false,
      message: "Invalid credentials",
    };
  }
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    revalidatePath("/user/login");
    return {
      status: 400,
      success: false,
      message: "Invalid credentials",
    };
  }
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
  cookies().set("auth-token", token);
  redirect("/user/dashboard");
}

// OK:
// REGISTER USER
export async function registerUser(formData: FormData) {
  const title = formData.get("title") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const cnic = formData.get("cnic") as string;
  const dob = formData.get("dob") as string;
  const password = formData.get("password") as string;
  const gender = formData.get("gender") as string;
  const department = formData.get("department") as string;
  const faculty = formData.get("faculty") as string;
  const phone_no = formData.get("phone_no") as string;
  const cell_no = formData.get("cell_no") as string;
  const research_domain = formData.get("research_domain") as string;
  const highest_degree = formData.get("highest_degree") as string;

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
    revalidatePath("user/register");
    return {
      status: 400,
      success: false,
      message: "All fields are required",
    };
  }

  const isUser = await prisma.user.findUnique({
    where: { email },
  });

  if (isUser) {
    revalidatePath("/user/register");
    return {
      status: 400,
      success: false,
      message: "User already exists",
    };
  }
  const isUserCnic = await prisma.user.findUnique({
    where: {
      cnic,
    },
  });
  if (isUserCnic) {
    revalidatePath("/user/register");
    return {
      status: 400,
      success: false,
      message: "User already exists",
    };
  }
  const hashPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
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
  redirect("/user/login?register=true");
}

// OK:
// GET SINGLE USER
export async function getUser(token: string) {
  if (!token) {
    cookies()?.set("auth-token", "", { expires: new Date(0) });
    return null;
  }
  const decodedToken = jwt.decode(token);
  if (!decodedToken) {
    cookies()?.set("auth-token", "", { expires: new Date(0) });
    return null;
  }
  const { tokenData }: any = decodedToken;
  if (!tokenData) {
    cookies()?.set("auth-token", "", { expires: new Date(0) });
    return null;
  }
  const id = tokenData.id;
  if (!id) {
    cookies()?.set("auth-token", "", { expires: new Date(0) });
    return null;
  }
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    cookies()?.set("auth-token", "", { expires: new Date(0) });
    return null;
  }
  return user;
}
