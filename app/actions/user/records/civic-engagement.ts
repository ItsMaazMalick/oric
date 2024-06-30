"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  civicEngagementSchema,
  contractResearchSchema,
  researchProjectSchema,
} from "@/lib/validations/formValidations";

export async function saveCivicEngagement(
  values: z.infer<typeof civicEngagementSchema>,
  file: string,
  id: string
) {
  const validData = civicEngagementSchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  await prisma.civicEngagementEvent.create({
    data: {
      type: validData.data.type,
      role: validData.data.role,
      title: validData.data.title,
      communityInvolved: validData.data.communityInvolved,
      outcomes: validData.data.outcomes,
      date: validData.data.date,
      collaboratingAgency: validData.data.collaboratingAgency,
      collaboratingAgencyName: validData.data.collaboratingAgencyName,
      briefReport: file,
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

export async function saveCivicEngagementNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
  }

  await prisma.civicEngagementEvent.create({
    data: {
      type: "NILL",
      role: "NILL",
      title: "NILL",
      communityInvolved: "NILL",
      outcomes: "NILL",
      date: "NILL",
      collaboratingAgency: "NILL",
      collaboratingAgencyName: "NILL",
      briefReport: "NILL",
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
