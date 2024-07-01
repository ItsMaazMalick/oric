"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  patentsTradeSchema,
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

export async function savePatentsTradeNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
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
