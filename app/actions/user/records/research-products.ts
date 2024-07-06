"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  patentsTradeSchema,
  researchProductsSchema,
  formStatusSchema,
  researchProjectSchema,
} from "@/lib/validations/formValidations";

export async function saveResearchProducts(
  values: z.infer<typeof researchProductsSchema>,
  file: string,
  id: string
) {
  const validData = researchProductsSchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  await prisma.researchProductsProcess.create({
    data: {
      type: validData.data.type,
      category: validData.data.category,
      developmentStatus: validData.data.developmentStatus,
      date: validData.data.date,
      nameOfInventors: validData.data.nameOfInventors,
      title: validData.data.title,
      keyScientificAspects: validData.data.keyScientificAspects,
      fieldOfUse: validData.data.fieldOfUse,
      collaboratingPartnerName: validData.data.collaboratingPartnerName,
      financialSupport: validData.data.financialSupport,
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

export async function saveResearchProductsNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
  }

  const currentYear = new Date().getFullYear();

  const existingNillRecord = await prisma.researchProductsProcess.findFirst({
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

  await prisma.researchProductsProcess.create({
    data: {
      type: "NILL",
      category: "NILL",
      developmentStatus: "NILL",
      date: "NILL",
      nameOfInventors: "NILL",
      title: "NILL",
      keyScientificAspects: "NILL",
      fieldOfUse: "NILL",
      collaboratingPartnerName: "NILL",
      financialSupport: 0,
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

export async function deleteResearchProducts(id: string) {
  try {
    if (!id) {
      return { error: "Id is required" };
    }
    const existingRecord = await prisma.researchProductsProcess.findUnique({
      where: { id },
    });
    if (!existingRecord) {
      return { error: "No record found" };
    }
    await prisma.researchProductsProcess.delete({
      where: { id },
    });
    return { success: "Record successfully deleted" };
  } catch (error) {
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/user/dashboard/add-record");
  }
}

export async function getResearchProducts(userId: string, id: string) {
  try {
    const data = await prisma.researchProductsProcess.findUnique({
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

export async function updateResearchProductsStatus(
  values: z.infer<typeof formStatusSchema>,
  id: string
) {
  try {
    const validData = formStatusSchema.safeParse(values);
    if (!validData?.success) {
      return { error: "Invalid data provided" };
    }

    const { status } = validData.data;

    const res = await prisma.researchProductsProcess.update({
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
