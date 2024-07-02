"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  contractResearchSchema,
  researchProjectSchema,
} from "@/lib/validations/formValidations";

export async function saveContractResearch(
  values: z.infer<typeof contractResearchSchema>,
  file: string,
  id: string
) {
  const validData = contractResearchSchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  await prisma.contractResearchAward.create({
    data: {
      scope: validData.data.scope,
      sponsoringAgencyCountry: validData.data.sponsoringAgencyCountry,
      contractAwardingAgency: validData.data.contractAwardingAgency,
      title: validData.data.title,
      amountOfContract: validData.data.amountOfContract,
      role: validData.data.role,
      nameOfPI: validData.data.nameOfPI,
      designationOfPI: validData.data.designationOfPI,
      organizationOfPI: validData.data.organizationOfPI,
      startingDate: validData.data.startingDate,
      endingDate: validData.data.endingDate,
      dateOfContract: validData.data.dateOfContract,
      contractResearchCopy: file,
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

export async function saveContractResearchNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
  }

  const currentYear = new Date().getFullYear();

  const existingNillRecord = await prisma.contractResearchAward.findFirst({
    where: {
      userId: id,
      scope: "NILL",
      createdAt: {
        gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
        lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
      },
    },
  });

  if (existingNillRecord) {
    return { error: "NILL record for the current year already exists" };
  }

  await prisma.contractResearchAward.create({
    data: {
      scope: "NILL",
      sponsoringAgencyCountry: "NILL",
      contractAwardingAgency: "NILL",
      title: "NILL",
      amountOfContract: 0,
      role: "NILL",
      nameOfPI: "NILL",
      designationOfPI: "NILL",
      organizationOfPI: "NILL",
      startingDate: "NILL",
      endingDate: "NILL",
      dateOfContract: "NILL",
      contractResearchCopy: "NILL",
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
