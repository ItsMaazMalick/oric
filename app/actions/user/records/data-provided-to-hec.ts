"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  agreementSignedSchema,
  hecSchema,
  nationalInternationalAwardsSchema,
  patentsTradeSchema,
  researchProductsSchema,
  researchProjectSchema,
  scienceArtsProductsSchema,
} from "@/lib/validations/formValidations";

export async function saveDataProvidedToHec(
  values: z.infer<typeof hecSchema>,
  file: string,
  id: string
) {
  const validData = hecSchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  await prisma.hec.create({
    data: {
      date: validData.data.date,
      dataProvidedTo: validData.data.dataProvidedTo,
      programOfOrganization: validData.data.programOfOrganization,
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

export async function saveDataProvidedToHecNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
  }

  await prisma.hec.create({
    data: {
      date: "NILL",
      dataProvidedTo: "NILL",
      programOfOrganization: "NILL",
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
