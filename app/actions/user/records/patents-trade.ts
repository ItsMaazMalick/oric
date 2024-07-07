"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  patentsTradeSchema,
  formStatusSchema,
  researchProjectSchema,
} from "@/lib/validations/formValidations";

export async function savePatentsTrade(
  values: z.infer<typeof patentsTradeSchema>,
  file: string,
  id: string
) {
  const validData = patentsTradeSchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  await prisma.patentsTrademark.create({
    data: {
      typeOfIP: validData.data.typeOfIP,
      scope: validData.data.scope,
      date: validData.data.date,
      namesOfInventors: validData.data.namesOfInventors,
      inventionTitle: validData.data.inventionTitle,
      IPStatus: validData.data.IPStatus,
      royaltyRevenue: validData.data.royaltyRevenue,
      keyScientificAspects: validData.data.keyScientificAspects,
      commertialPartners: validData.data.commertialPartners,
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

export async function updatePatentsTrade(
  values: z.infer<typeof patentsTradeSchema>,
  file: string,
  id: string
) {
  const validData = patentsTradeSchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  const existingRecord = await prisma.patentsTrademark.findUnique({
    where: { id },
  });
  if (!existingRecord) {
    return { error: "No record found" };
  }

  await prisma.patentsTrademark.update({
    where: { id },
    data: {
      typeOfIP: validData.data.typeOfIP,
      scope: validData.data.scope,
      date: validData.data.date,
      namesOfInventors: validData.data.namesOfInventors,
      inventionTitle: validData.data.inventionTitle,
      IPStatus: validData.data.IPStatus,
      royaltyRevenue: validData.data.royaltyRevenue,
      keyScientificAspects: validData.data.keyScientificAspects,
      commertialPartners: validData.data.commertialPartners,
      evidence: file,
    },
  });
  return { success: "Data saved Successfully" };
  revalidatePath("/user/dashboard/add-record");
}

export async function savePatentsTradeNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
  }

  const currentYear = new Date().getFullYear();

  const existingNillRecord = await prisma.patentsTrademark.findFirst({
    where: {
      userId: id,
      typeOfIP: "NILL",
      createdAt: {
        gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
        lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
      },
    },
  });

  if (existingNillRecord) {
    return { error: "NILL record for the current year already exists" };
  }

  await prisma.patentsTrademark.create({
    data: {
      typeOfIP: "NILL",
      scope: "NILL",
      date: "NILL",
      namesOfInventors: "NILL",
      inventionTitle: "NILL",
      IPStatus: "NILL",
      royaltyRevenue: 0,
      keyScientificAspects: "NILL",
      commertialPartners: "NILL",
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

export async function deletePatentsTrade(id: string) {
  try {
    if (!id) {
      return { error: "Id is required" };
    }
    const existingRecord = await prisma.patentsTrademark.findUnique({
      where: { id },
    });
    if (!existingRecord) {
      return { error: "No record found" };
    }
    await prisma.patentsTrademark.delete({
      where: { id },
    });
    return { success: "Record successfully deleted" };
  } catch (error) {
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/user/dashboard/add-record");
  }
}

export async function getPatentsTrade(userId: string, id: string) {
  try {
    const data = await prisma.patentsTrademark.findUnique({
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

export async function updatePatentsTradeStatus(
  values: z.infer<typeof formStatusSchema>,
  id: string
) {
  try {
    const validData = formStatusSchema.safeParse(values);
    if (!validData?.success) {
      return { error: "Invalid data provided" };
    }

    const { status } = validData.data;

    const res = await prisma.patentsTrademark.update({
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
