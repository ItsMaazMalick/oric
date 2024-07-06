"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  agreementSignedSchema,
  nationalInternationalAwardsSchema,
  formStatusSchema,
  patentsTradeSchema,
  researchProductsSchema,
  researchProjectSchema,
  scienceArtsProductsSchema,
} from "@/lib/validations/formValidations";

export async function saveNationalInternationalHonors(
  values: z.infer<typeof nationalInternationalAwardsSchema>,
  file: string,
  id: string
) {
  const validData = nationalInternationalAwardsSchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  await prisma.nationalInternationalAwards.create({
    data: {
      date: validData.data.date,
      titleOfAward: validData.data.titleOfAward,
      awardingAgency: validData.data.awardingAgency,
      amountOfPrize: validData.data.amountOfPrize,
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

export async function saveNationalInternationalHonorsNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
  }

  const currentYear = new Date().getFullYear();

  const existingNillRecord = await prisma.nationalInternationalAwards.findFirst(
    {
      where: {
        userId: id,
        titleOfAward: "NILL",
        createdAt: {
          gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
          lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
        },
      },
    }
  );

  if (existingNillRecord) {
    return { error: "NILL record for the current year already exists" };
  }

  await prisma.nationalInternationalAwards.create({
    data: {
      date: "NILL",
      titleOfAward: "NILL",
      awardingAgency: "NILL",
      amountOfPrize: 0,
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

export async function deleteNationalInternationalHonors(id: string) {
  try {
    if (!id) {
      return { error: "Id is required" };
    }
    const existingRecord = await prisma.nationalInternationalAwards.findUnique({
      where: { id },
    });
    if (!existingRecord) {
      return { error: "No record found" };
    }
    await prisma.nationalInternationalAwards.delete({
      where: { id },
    });
    return { success: "Record successfully deleted" };
  } catch (error) {
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/user/dashboard/add-record");
  }
}

export async function getNationalInternationalHonors(
  userId: string,
  id: string
) {
  try {
    const data = await prisma.nationalInternationalAwards.findUnique({
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

export async function updateNationalInternationalHonorsStatus(
  values: z.infer<typeof formStatusSchema>,
  id: string
) {
  try {
    const validData = formStatusSchema.safeParse(values);
    if (!validData?.success) {
      return { error: "Invalid data provided" };
    }

    const { status } = validData.data;

    const res = await prisma.nationalInternationalAwards.update({
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
