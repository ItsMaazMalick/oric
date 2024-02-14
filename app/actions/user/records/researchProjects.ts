"use server";
import prisma from "@/lib/db";
import { validateForm3 } from "@/lib/validator";
import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";

export async function saveResearchProjects(formData: FormData) {
  const validatedFields = validateForm3.safeParse({
    date: formData.get("date"),
    fundingAgency: formData.get("fundingAgency"),
    nameOfResearch: formData.get("nameOfResearch"),
    status: formData.get("status"),
    type: formData.get("type"),
    role: formData.get("role"),
    grantAmount: Number(formData.get("grantAmount")),
    title: formData.get("title"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    totalFunding: Number(formData.get("totalFunding")),
    collaboratingPartner: formData.get("collaboratingPartner"),
    coFundingPartner: formData.get("coFundingPartner"),
    completion: formData.get("completion"),
    remarks: formData.get("remarks"),
  });

  if (!validatedFields.success) {
    return {
      status: 401,
      success: false,
      message: "Invalid data provided",
    };
  }
  const file = formData.get("file") as string;
  const id = formData.get("userId") as string;
  const {
    date,
    fundingAgency,
    nameOfResearch,
    status,
    type,
    role,
    grantAmount,
    title,
    startDate,
    endDate,
    totalFunding,
    collaboratingPartner,
    coFundingPartner,
    completion,
    remarks,
  } = validatedFields.data;

  await prisma.researchProject.create({
    data: {
      date,
      fundingAgency,
      nameOfResearch,
      status,
      type,
      role,
      grantAmount,
      title,
      startDate,
      endDate,
      totalFunding,
      collaboratingPartner,
      coFundingPartner,
      completion,
      remarks,
      file,
      user: {
        connect: {
          id,
        },
      },
    },
  });
  revalidatePath("/user/dashboard/add-record");
}

export async function saveResearchProjectsNill(formData: FormData) {
  const id = formData.get("userId") as string;

  await prisma.researchProject.create({
    data: {
      date: "NILL",
      fundingAgency: "NILL",
      nameOfResearch: "NILL",
      status: "NILL",
      type: "NILL",
      role: "NILL",
      grantAmount: 0,
      title: "NILL",
      startDate: "NILL",
      endDate: "NILL",
      totalFunding: 0,
      collaboratingPartner: "NILL",
      coFundingPartner: "NILL",
      completion: "NILL",
      remarks: "NILL",
      file: "NILL",
      user: {
        connect: {
          id,
        },
      },
    },
  });
  revalidatePath("/user/dashboard-add-record");
}
