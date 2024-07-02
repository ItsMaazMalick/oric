"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { researchProjectSchema } from "@/lib/validations/formValidations";

export async function saveResearchProjects(
  values: z.infer<typeof researchProjectSchema>,
  file: string,
  id: string
) {
  const validData = researchProjectSchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  await prisma.researchProject.create({
    data: {
      date: validData.data.date,
      agency: validData.data.fundingAgency,
      name: validData.data.nameOfResearch,
      status: validData.data.status,
      type: validData.data.type,
      role: validData.data.role,
      grantAmount: validData.data.grantAmount,
      title: validData.data.title,
      startDate: validData.data.startDate,
      endDate: validData.data.endDate,
      totalFunding: validData.data.totalFunding,
      collaboratingPartner: validData.data.collaboratingPartner,
      coFundingPartner: validData.data.coFundingPartner,
      completion: validData.data.completion,
      remarks: validData.data.remarks,
      file,
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

export async function saveResearchProjectsNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
  }

  const currentYear = new Date().getFullYear();

  const existingNillRecord = await prisma.researchProject.findFirst({
    where: {
      userId: id,
      type: "NILL",
      createdAt: {
        gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
        lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
      },
    },
  });

  if (existingNillRecord) {
    return { error: "NILL record for the current year already exists" };
  }

  await prisma.researchProject.create({
    data: {
      date: "NILL",
      agency: "NILL",
      name: "NILL",
      status: "NILL",
      type: "NILL",
      role: "NILL",
      grantAmount: 0,
      title: "NILL",
      startDate: "NILL",
      endDate: "NILL",
      totalFunding: 0,
      collaboratingPartner: "NILL",
      coFundingPartner: "NILL",
      completion: "NILL",
      remarks: "NILL",
      file: "NILL",
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
