"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "../../lib/db";
import { deleteCookie } from "./deleteCookie";

// * OK:  FIXED:  -> USER SESSION
export const getUserSession = async () => {
  try {
    const cookieStore = cookies();
    const userCookie =
      cookieStore.get("auth-token")?.value || null || undefined;
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
      // cookies()?.set("auth-token", "", { expires: new Date(0) });
      return { status: 401, success: false, message: "Unauthorized" };
    }
    return {
      status: 200,
      success: true,
      id: user.id,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    return { status: 500, success: false, message: "Something went wrong" };
  }
};

// OK:

export const getAdminSession = async () => {
  try {
    const cookieStore = cookies();
    const adminCookie =
      cookieStore.get("admin-auth-token")?.value || null || undefined;
    if (!adminCookie) {
      return { status: 401, success: false, message: "Unauthorized" };
    }
    const decodedToken = jwt.decode(adminCookie);
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
    const admin = await prisma.admin.findUnique({
      where: { id },
    });
    if (!admin) {
      // cookies()?.set("auth-token", "", { expires: new Date(0) });
      return { status: 401, success: false, message: "Unauthorized" };
    }
    return {
      status: 200,
      success: true,
      id: admin.id,
      name: admin.name,
      email: admin.email,
    };
  } catch (error) {
    return { status: 500, success: false, message: "Something went wrong" };
  }
};
