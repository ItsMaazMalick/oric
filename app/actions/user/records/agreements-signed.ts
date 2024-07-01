"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  agreementSignedSchema,
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
