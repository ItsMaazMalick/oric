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

// * OK:  FIXED:  -> LOGIN USER
export async function loginUser(formData: FormData) {
  try {
    const validatedFields = userLoginSchema.safeParse({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (!validatedFields.success) {
      return { error: "All fields are required" };
    }
    const { email, password } = validatedFields.data;

    if (!email || !password) {
      revalidatePath("/user/login");
      return { error: "All fields are required" };
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      revalidatePath("/user/login");
      return { error: "Invalid credentials" };
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      revalidatePath("/user/login");
      return { error: "Invalid credentials" };
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
    return { success: "Successfully logged in" };
    // redirect("/user/dashboard");
  } catch (error) {
    return { error: "Something went wrong" };
  }
}

// * OK:  FIXED:  -> REGISTER USER
export async function registerUser(formData: FormData) {
  try {
    const validatedFields = userRegisterSchema.safeParse({
      title: formData.get("title") as string,
      name: formData.get("name") as string,
      dob: formData.get("dob") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      gender: formData.get("gender") as string,
      phoneNo: formData.get("phoneNo") as string,
      cellNo: formData.get("cellNo") as string,
      researchDomain: formData.get("researchDomain") as string,
      highestDegree: formData.get("highestDegree") as string,
    });

    const email = formData.get("email") as string;
    const cnic = formData.get("cnic") as string;
    const department = formData.get("department") as string;
    const faculty = formData.get("faculty") as string;

    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors);
      return { error: "All fields are required" };
    }
    if (!email || !cnic || !department || !faculty) {
      return { error: "All fields are required" };
    }
    const {
      title,
      name,
      dob,
      password,
      gender,
      phoneNo,
      cellNo,
      researchDomain,
      highestDegree,
    } = validatedFields.data;

    const isUser = await prisma.user.findUnique({
      where: { email },
    });

    if (isUser) {
      revalidatePath("/user/register");
      return { error: "User Already exists" };
    }
    const isUserCnic = await prisma.user.findUnique({
      where: {
        cnic,
      },
    });
    if (isUserCnic) {
      return { error: "User Already exists" };
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
        phoneNo,
        cellNo,
        researchDomain,
        highestDegree,
      },
    });
    return { success: "Account Registered Successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

// * OK:  FIXED:  -> GET SINGLE USER
export async function getUser(token: string) {
  if (!token) {
    return deleteCookie();
  }
  const decodedToken = jwt.decode(token);
  if (!decodedToken) {
    return deleteCookie();
  }
  const { tokenData }: any = decodedToken;
  if (!tokenData) {
    return deleteCookie();
  }
  const id = tokenData.id;
  if (!id) {
    return deleteCookie();
  }
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    return deleteCookie();
  }
  return user;
}

// * OK:  -> VERIFY EMAIL
export async function verityEmail(formData: FormData) {
  const validatedFields = userVerifyEmailSchema.safeParse({
    email: formData.get("email"),
    cnic: formData.get("cnic"),
  });

  if (!validatedFields.success) {
    return {
      status: 401,
      success: false,
      message: "All fields are required",
    };
  }
  const { email, cnic } = validatedFields.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return {
      status: 401,
      success: false,
      message: "Invalid credentials",
    };
  }
  const isValidUser: boolean = user.cnic === cnic;
  if (!isValidUser) {
    return {
      status: 401,
      success: false,
      message: "Invalid credentials",
    };
  }
  return {
    status: 200,
    success: true,
    id: user.id,
  };
}

// * OK:  -> UPDATE USER PASSWORD
export async function updatePassword(formData: FormData) {
  const password = formData.get("password") as string;
  const id = formData.get("id") as string;

  if (!password || !id) {
    return {
      status: 401,
      success: false,
      message: "All fields are required",
    };
  }
  const hashPassword = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { id },
    data: {
      password: hashPassword,
    },
  });
  redirect("/user/login");
}
