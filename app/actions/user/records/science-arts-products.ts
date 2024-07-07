"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  patentsTradeSchema,
  formStatusSchema,
  researchProductsSchema,
  researchProjectSchema,
  scienceArtsProductsSchema,
} from "@/lib/validations/formValidations";

export async function saveScienceArtsProducts(
  values: z.infer<typeof scienceArtsProductsSchema>,
  file: string,
  id: string
) {
  const validData = scienceArtsProductsSchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  await prisma.scienceArtsProduct.create({
    data: {
      category: validData.data.category,
      date: validData.data.date,
      scope: validData.data.scope,
      title: validData.data.title,
      departmentName: validData.data.departmentName,
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

export async function updateScienceArtsProducts(
  values: z.infer<typeof scienceArtsProductsSchema>,
  file: string,
  id: string
) {
  const validData = scienceArtsProductsSchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  const existingRecord = await prisma.scienceArtsProduct.findUnique({
    where: { id },
  });
  if (!existingRecord) {
    return { error: "No record found" };
  }

  await prisma.scienceArtsProduct.update({
    where: { id },
    data: {
      category: validData.data.category,
      date: validData.data.date,
      scope: validData.data.scope,
      title: validData.data.title,
      departmentName: validData.data.departmentName,
      evidence: file,
    },
  });
  return { success: "Data saved Successfully" };
  revalidatePath("/user/dashboard/add-record");
}

export async function saveScienceArtsProductsNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
  }

  const currentYear = new Date().getFullYear();

  const existingNillRecord = await prisma.scienceArtsProduct.findFirst({
    where: {
      userId: id,
      category: "NILL",
      createdAt: {
        gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
        lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
      },
    },
  });

  if (existingNillRecord) {
    return { error: "NILL record for the current year already exists" };
  }

  await prisma.scienceArtsProduct.create({
    data: {
      category: "NILL",
      date: "NILL",
      scope: "NILL",
      title: "NILL",
      departmentName: "NILL",
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

export async function deleteScienceArtsProducts(id: string) {
  try {
    if (!id) {
      return { error: "Id is required" };
    }
    const existingRecord = await prisma.scienceArtsProduct.findUnique({
      where: { id },
    });
    if (!existingRecord) {
      return { error: "No record found" };
    }
    await prisma.scienceArtsProduct.delete({
      where: { id },
    });
    return { success: "Record successfully deleted" };
  } catch (error) {
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/user/dashboard/add-record");
  }
}

export async function getScienceArtsProducts(userId: string, id: string) {
  try {
    const data = await prisma.scienceArtsProduct.findUnique({
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

export async function updateScienceArtsProductsStatus(
  values: z.infer<typeof formStatusSchema>,
  id: string
) {
  try {
    const validData = formStatusSchema.safeParse(values);
    if (!validData?.success) {
      return { error: "Invalid data provided" };
    }

    const { status } = validData.data;

    const res = await prisma.scienceArtsProduct.update({
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
