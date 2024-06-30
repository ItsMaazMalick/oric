"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  bookAuthoredSchema,
  researchProjectSchema,
  thesisSchema,
} from "@/lib/validations/formValidations";

export async function saveThesis(
  values: z.infer<typeof thesisSchema>,
  id: string
) {
  const validData = thesisSchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  await prisma.thesis.create({
    data: {
      role: validData.data.role,
      nameOfSupervisor: validData.data.nameOfSupervisor,
      year: validData.data.year,
      degreeLevel: validData.data.degreeLevel,
      degreeProgram: validData.data.degreeProgram,
      department: validData.data.department,
      university: validData.data.university,
      studentName: validData.data.studentName,
      degreeStage: validData.data.degreeStage,
      user: {
        connect: {
          id,
        },
      },
    },
  });
  return { success: "Data saved Successfully" };
  revalidatePath("/user/dashboard/add-record");
}

export async function saveThesisNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
  }

  await prisma.thesis.create({
    data: {
      role: "NILL",
      nameOfSupervisor: "NILL",
      year: "NILL",
      degreeLevel: "NILL",
      degreeProgram: "NILL",
      department: "NILL",
      university: "NILL",
      studentName: "NILL",
      degreeStage: "NILL",
      user: {
        connect: {
          id,
        },
      },
    },
  });
  return { success: "Data saved successfully" };
  revalidatePath("/user/dashboard-add-record");
}
