"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  civicEngagementSchema,
  consultancyContractSchema,
  contractResearchSchema,
  researchProjectSchema,
} from "@/lib/validations/formValidations";

export async function saveConsultancyContracts(
  values: z.infer<typeof consultancyContractSchema>,
  file: string,
  id: string
) {
  const validData = consultancyContractSchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  await prisma.consultancyContract.create({
    data: {
      consultancyType: validData.data.consultancyType,
      titleOfConsultancy: validData.data.titleOfConsultancy,
      role: validData.data.role,
      companyName: validData.data.companyName,
      companyCountry: validData.data.companyCountry,
      contractValue: validData.data.contractValue,
      startDate: validData.data.startDate,
      endDate: validData.data.endDate,
      keyDeliverables: validData.data.keyDeliverables,
      remarks: validData.data.remarks,
      copyOfContract: file,
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

export async function saveConsultancyContractsNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
  }

  await prisma.consultancyContract.create({
    data: {
      consultancyType: "NILL",
      titleOfConsultancy: "NILL",
      role: "NILL",
      companyName: "NILL",
      companyCountry: "NILL",
      contractValue: 0,
      startDate: "NILL",
      endDate: "NILL",
      keyDeliverables: "NILL",
      remarks: "NILL",
      copyOfContract: "NILL",
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
