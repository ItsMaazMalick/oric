"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  agreementSignedSchema,
  communitySchema,
  formStatusSchema,
  hecSchema,
  nationalInternationalAwardsSchema,
  patentsTradeSchema,
  researchProductsSchema,
  researchProjectSchema,
  scienceArtsProductsSchema,
} from "@/lib/validations/formValidations";

export async function saveCommunityWork(
  values: z.infer<typeof communitySchema>,
  file: string,
  id: string
) {
  const validData = communitySchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  await prisma.community.create({
    data: {
      date: validData.data.date,
      role: validData.data.role,
      type: validData.data.type,
      title: validData.data.title,
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

export async function updateCommunityWork(
  values: z.infer<typeof communitySchema>,
  file: string,
  id: string
) {
  const validData = communitySchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  const existingRecord = await prisma.community.findUnique({
    where: { id },
  });
  if (!existingRecord) {
    return { error: "No record found" };
  }

  await prisma.community.update({
    where: { id },
    data: {
      date: validData.data.date,
      role: validData.data.role,
      type: validData.data.type,
      title: validData.data.title,
      evidence: file,
    },
  });
  return { success: "Data saved Successfully" };
  revalidatePath("/user/dashboard/add-record");
}

export async function saveCommunityWorkNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
  }

  const currentYear = new Date().getFullYear();

  const existingNillRecord = await prisma.community.findFirst({
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

  await prisma.community.create({
    data: {
      date: "NILL",
      role: "NILL",
      type: "NILL",
      title: "NILL",
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

export async function deleteCommunityWork(id: string) {
  try {
    if (!id) {
      return { error: "Id is required" };
    }
    const existingRecord = await prisma.community.findUnique({
      where: { id },
    });
    if (!existingRecord) {
      return { error: "No record found" };
    }
    await prisma.community.delete({
      where: { id },
    });
    return { success: "Record successfully deleted" };
  } catch (error) {
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/user/dashboard/add-record");
  }
}

export async function getCommunityWork(userId: string, id: string) {
  try {
    const data = await prisma.community.findUnique({
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

export async function updateCommunityWorkStatus(
  values: z.infer<typeof formStatusSchema>,
  id: string
) {
  try {
    const validData = formStatusSchema.safeParse(values);
    if (!validData?.success) {
      return { error: "Invalid data provided" };
    }

    const { status } = validData.data;

    const res = await prisma.community.update({
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
