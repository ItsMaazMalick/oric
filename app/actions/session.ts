"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "../../lib/db";

// OK:
// USER SESSION
export const getUserSession = async () => {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("auth-token")?.value || "";
  if (!userCookie) {
    return { status: 401, success: false, message: "Unauthorized" };
  }
  const decodedToken = jwt.decode(userCookie);
  if (!decodedToken) {
    return { status: 401, success: false, message: "Unauthorized" };
  }
  const { tokenData }: any = decodedToken;
  if (!tokenData) {
    return { status: 401, success: false, message: "Unauthorized" };
  }
  const id = tokenData.id;
  if (!id) {
    return { status: 401, success: false, message: "Unauthorized" };
  }
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    cookies()?.set("auth-token", "", { expires: new Date(0) });
    return { status: 401, success: false, message: "Unauthorized" };
  }
  return {
    status: 200,
    success: true,
    id: user.id,
    name: user.name,
    email: user.email,
  };
};
