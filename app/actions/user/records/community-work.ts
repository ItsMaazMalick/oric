"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  agreementSignedSchema,
  communitySchema,
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

export async function saveCommunityWorkNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
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
