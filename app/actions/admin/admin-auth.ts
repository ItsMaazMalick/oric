"use server";

import prisma from "@/lib/db";
import {
  userLoginSchema,
  userRegisterSchema,
  userVerifyEmailSchema,
} from "@/lib/validations/userValidations";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { deleteCookie } from "../deleteCookie";
import { z } from "zod";
import {
  adminLoginSchema,
  adminSignupSchema,
} from "@/lib/validations/formValidations";

// * OK:  FIXED:  -> LOGIN USER
export async function loginAdmin(values: z.infer<typeof adminLoginSchema>) {
  try {
    const validatedFields = adminLoginSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "All fields are required" };
    }
    const { email, password } = validatedFields.data;

    if (!email || !password) {
      revalidatePath("/user/login");
      return { error: "All fields are required" };
    }
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      revalidatePath("/admin/login");
      return { error: "Invalid credentials" };
    }
    const isPassword = await bcrypt.compare(password, admin.password);
    if (!isPassword) {
      revalidatePath("/admin/login");
      return { error: "Invalid credentials" };
    }
    //TOKEN DATA
    const tokenData = {
      name: admin.name,
      id: admin.id,
      email: admin.email,
    };

    //ASSIGN TOKEN
    const token = jwt.sign(
      {
        tokenData,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );
    cookies().set("admin-auth-token", token);
    return { success: "Successfully logged in" };
    // redirect("/user/dashboard");
  } catch (error) {
    return { error: "Something went wrong" };
  }
}

// * OK:  FIXED:  -> REGISTER USER
export async function registerAdmin(values: z.infer<typeof adminSignupSchema>) {
  try {
    const validatedFields = adminSignupSchema.safeParse(values);

    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors);
      return { error: "All fields are required" };
    }
    const { name, email, password } = validatedFields.data;

    const isAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (isAdmin) {
      revalidatePath("/admin/signup");
      return { error: "User Already exists" };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.admin.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    return { success: "Account Registered Successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

// * OK:  FIXED:  -> GET SINGLE USER
export async function getAdmin(token: string) {
  try {
    if (!token) {
      return null;
    }
    const decodedToken = jwt.decode(token);
    if (!decodedToken) {
      return null;
    }
    const { tokenData }: any = decodedToken;
    if (!tokenData) {
      return null;
    }
    const id = tokenData.id;
    if (!id) {
      return null;
    }
    const admin = await prisma.admin.findUnique({
      where: { id },
    });
    if (!admin) {
      return null;
    }
    return admin;
  } catch (error) {
    return null;
  }
}
