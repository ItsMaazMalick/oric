"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  agreementSignedSchema,
  communitySchema,
  hecSchema,
  mentorshipSchema,
  nationalInternationalAwardsSchema,
  patentsTradeSchema,
  researchProductsSchema,
  researchProjectSchema,
  scienceArtsProductsSchema,
} from "@/lib/validations/formValidations";

export async function saveMentorshipProgram(
  values: z.infer<typeof mentorshipSchema>,
  file: string,
  id: string
) {
  const validData = mentorshipSchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  await prisma.mentorship.create({
    data: {
      programName: validData.data.programName,
      noOfStudents: validData.data.noOfStudents,
      role: validData.data.role,
      details: validData.data.details,
      evidence: file,
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

export async function saveMentorshipProgramNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
  }

  await prisma.mentorship.create({
    data: {
      programName: "NILL",
      noOfStudents: 0,
      role: "NILL",
      details: "NILL",
      evidence: "NILL",
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
