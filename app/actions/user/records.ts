"use server";

import prisma from "@/lib/db";
import { getUser } from "./auth";

// ALL RECORDS
// TODO
export async function allRecords(id: string, userCookie: string) {
  if (!id || !userCookie) {
    return { status: 401, success: false, message: "Unauthorized" };
  }
  const user = await getUser(userCookie);
  if (!user) {
    return { status: 404, success: false, message: "User not found" };
  }
  const researchPublication = await prisma.researchPublication.findMany({
    where: { user_id: id },
    orderBy: { date: "desc" },
  });
  const bookAuthoredEdited = await prisma.bookAuthoredEdited.findMany({
    where: { user_id: id },
    orderBy: { date: "desc" },
  });
  const researchProject = await prisma.researchProject.findMany({
    where: { user_id: id },
    orderBy: { date: "desc" },
  });
  const departmentTraining = await prisma.departmentTraining.findMany({
    where: { user_id: id },
    orderBy: { date: "desc" },
  });
  if (bookAuthoredEdited) {
    const books = [
      researchPublication,
      bookAuthoredEdited,
      researchProject,
      departmentTraining,
    ];
    return { status: 200, success: true, books };
  }
}
