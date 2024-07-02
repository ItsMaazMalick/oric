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
  studentOrganizationSchema,
} from "@/lib/validations/formValidations";

export async function saveStudentOrganization(
  values: z.infer<typeof studentOrganizationSchema>,
  file: string,
  id: string
) {
  const validData = studentOrganizationSchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  await prisma.studentOrganization.create({
    data: {
      organizationName: validData.data.organizationName,
      noOfMenbers: validData.data.noOfMenbers,
      membersName: validData.data.membersName,
      role: validData.data.role,
      objectives: validData.data.objectives,
      link: validData.data.link,
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

export async function saveStudentOrganizationNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
  }

  const currentYear = new Date().getFullYear();

  const existingNillRecord = await prisma.studentOrganization.findFirst({
    where: {
      userId: id,
      organizationName: "NILL",
      createdAt: {
        gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
        lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
      },
    },
  });

  if (existingNillRecord) {
    return { error: "NILL record for the current year already exists" };
  }

  await prisma.studentOrganization.create({
    data: {
      organizationName: "NILL",
      noOfMenbers: 0,
      membersName: "NILL",
      role: "NILL",
      objectives: "NILL",
      link: "NILL",
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
