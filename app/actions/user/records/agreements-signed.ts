"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  agreementSignedSchema,
  formStatusSchema,
  patentsTradeSchema,
  researchProductsSchema,
  researchProjectSchema,
  scienceArtsProductsSchema,
} from "@/lib/validations/formValidations";

export async function saveAgreementsSigned(
  values: z.infer<typeof agreementSignedSchema>,
  file: string,
  id: string
) {
  const validData = agreementSignedSchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  await prisma.agreementSigned.create({
    data: {
      typeOfLinkage: validData.data.typeOfLinkage,
      linkageEstablishmentDate: validData.data.linkageEstablishmentDate,
      scope: validData.data.scope,
      collaboratingAgency: validData.data.collaboratingAgency,
      collaboratingAgencyCountry: validData.data.collaboratingAgencyCountry,
      duration: validData.data.duration,
      areaOfFocus: validData.data.areaOfFocus,
      mouCopy: file,
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

export async function saveAgreementsSignedNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
  }

  const currentYear = new Date().getFullYear();

  const existingNillRecord = await prisma.agreementSigned.findFirst({
    where: {
      userId: id,
      typeOfLinkage: "NILL",
      createdAt: {
        gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
        lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
      },
    },
  });

  if (existingNillRecord) {
    return { error: "NILL record for the current year already exists" };
  }

  await prisma.agreementSigned.create({
    data: {
      typeOfLinkage: "NILL",
      linkageEstablishmentDate: "NILL",
      scope: "NILL",
      collaboratingAgency: "NILL",
      collaboratingAgencyCountry: "NILL",
      duration: "NILL",
      areaOfFocus: "NILL",
      mouCopy: "NILL",
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

export async function deleteAgreementsSigned(id: string) {
  try {
    if (!id) {
      return { error: "Id is required" };
    }
    const existingRecord = await prisma.agreementSigned.findUnique({
      where: { id },
    });
    if (!existingRecord) {
      return { error: "No record found" };
    }
    await prisma.agreementSigned.delete({
      where: { id },
    });
    return { success: "Record successfully deleted" };
  } catch (error) {
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/user/dashboard/add-record");
  }
}

export async function getAgreementsSigned(userId: string, id: string) {
  try {
    const data = await prisma.agreementSigned.findUnique({
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

export async function updateAgreementsSignedStatus(
  values: z.infer<typeof formStatusSchema>,
  id: string
) {
  try {
    const validData = formStatusSchema.safeParse(values);
    if (!validData?.success) {
      return { error: "Invalid data provided" };
    }

    const { status } = validData.data;

    const res = await prisma.agreementSigned.update({
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
