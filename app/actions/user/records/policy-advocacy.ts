"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  policyAdvocacySchema,
  researchProjectSchema,
} from "@/lib/validations/formValidations";

export async function savePolicyAdvocacy(
  values: z.infer<typeof policyAdvocacySchema>,
  file: string,
  id: string
) {
  const validData = policyAdvocacySchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  await prisma.policyAdvocacy.create({
    data: {
      year: validData.data.year,
      nameOfGovernmentBody: validData.data.nameOfGovernmentBody,
      nameOfResearcher: validData.data.nameOfResearcher,
      designationOfResearcher: validData.data.designationOfResearcher,
      areaAdvocated: validData.data.areaAdvocated,
      brief: validData.data.brief,
      partners: validData.data.partners,
      advocacyTools: validData.data.advocacyTools,
      policyCaseStudyCopy: file,
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

export async function ssavePolicyAdvocacyNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
  }

  await prisma.policyAdvocacy.create({
    data: {
      year: "NILL",
      nameOfGovernmentBody: "NILL",
      nameOfResearcher: "NILL",
      designationOfResearcher: "NILL",
      areaAdvocated: "NILL",
      brief: "NILL",
      partners: "NILL",
      advocacyTools: "NILL",
      policyCaseStudyCopy: "NILL",
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