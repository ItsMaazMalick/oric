"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  agreementSignedSchema,
  nationalInternationalAwardsSchema,
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
