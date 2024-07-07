"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  agreementSignedSchema,
  communitySchema,
  hecSchema,
  formStatusSchema,
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

export async function updateMentorshipProgram(
  values: z.infer<typeof mentorshipSchema>,
  file: string,
  id: string
) {
  const validData = mentorshipSchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  const existingRecord = await prisma.mentorship.findUnique({
    where: { id },
  });
  if (!existingRecord) {
    return { error: "No record found" };
  }

  await prisma.mentorship.update({
    where: { id },
    data: {
      programName: validData.data.programName,
      noOfStudents: validData.data.noOfStudents,
      role: validData.data.role,
      details: validData.data.details,
      evidence: file,
    },
  });
  return { success: "Data saved Successfully" };
  revalidatePath("/user/dashboard/add-record");
}

export async function saveMentorshipProgramNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
  }

  const currentYear = new Date().getFullYear();

  const existingNillRecord = await prisma.mentorship.findFirst({
    where: {
      userId: id,
      programName: "NILL",
      createdAt: {
        gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
        lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
      },
    },
  });

  if (existingNillRecord) {
    return { error: "NILL record for the current year already exists" };
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

export async function deleteMentorshipProgram(id: string) {
  try {
    if (!id) {
      return { error: "Id is required" };
    }
    const existingRecord = await prisma.mentorship.findUnique({
      where: { id },
    });
    if (!existingRecord) {
      return { error: "No record found" };
    }
    await prisma.mentorship.delete({
      where: { id },
    });
    return { success: "Record successfully deleted" };
  } catch (error) {
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/user/dashboard/add-record");
  }
}

export async function getMentorshipProgram(userId: string, id: string) {
  try {
    const data = await prisma.mentorship.findUnique({
      where: {
        id,
        userId,
      },
    });
    return data;
  } catch (error) {
    return null;
  }
}

export async function updateMentorshipProgramStatus(
  values: z.infer<typeof formStatusSchema>,
  id: string
) {
  try {
    const validData = formStatusSchema.safeParse(values);
    if (!validData?.success) {
      return { error: "Invalid data provided" };
    }

    const { status } = validData.data;

    const res = await prisma.mentorship.update({
      where: { id },
      data: {
        approvedStatus:
          status === "pending"
            ? "pending"
            : status === "accepted"
            ? "accepted"
            : "rejected",
      },
    });
    return { success: "Status updated" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
