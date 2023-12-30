"use server";
import prisma from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function userVerify(token: string) {
  try {
    if (!token) {
      cookies()?.set("auth-token", "", { expires: new Date(0) });
      return null;
    }
    const decodedToken = jwt.decode(token);
    const { tokenData }: any = decodedToken;
    console.log(tokenData);
    const id = tokenData.id;
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      cookies()?.set("auth-token", "", { expires: new Date(0) });
      return null;
    }
    return user;
  } catch (error) {
    cookies()?.set("auth-token", "", { expires: new Date(0) });
    // console.log(error);
    return null;
  }
}
