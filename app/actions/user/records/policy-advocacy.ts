"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  policyAdvocacySchema,
  formStatusSchema,
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

  const currentYear = new Date().getFullYear();

  const existingNillRecord = await prisma.policyAdvocacy.findFirst({
    where: {
      userId: id,
      nameOfGovernmentBody: "NILL",
      createdAt: {
        gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
        lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
      },
    },
  });

  if (existingNillRecord) {
    return { error: "NILL record for the current year already exists" };
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

export async function deletePolicyAdvocacy(id: string) {
  try {
    if (!id) {
      return { error: "Id is required" };
    }
    const existingRecord = await prisma.policyAdvocacy.findUnique({
      where: { id },
    });
    if (!existingRecord) {
      return { error: "No record found" };
    }
    await prisma.policyAdvocacy.delete({
      where: { id },
    });
    return { success: "Record successfully deleted" };
  } catch (error) {
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/user/dashboard/add-record");
  }
}

export async function getPolicyAdvocacy(userId: string, id: string) {
  try {
    const data = await prisma.policyAdvocacy.findUnique({
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

export async function updatePolicyAdvocacyStatus(
  values: z.infer<typeof formStatusSchema>,
  id: string
) {
  try {
    const validData = formStatusSchema.safeParse(values);
    if (!validData?.success) {
      return { error: "Invalid data provided" };
    }

    const { status } = validData.data;

    const res = await prisma.policyAdvocacy.update({
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
