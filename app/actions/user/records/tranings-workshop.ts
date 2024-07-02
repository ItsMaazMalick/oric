"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  bookAuthoredSchema,
  researchProjectSchema,
  traningsWorkshopSchema,
} from "@/lib/validations/formValidations";

export async function saveTrainingsWorkshops(
  values: z.infer<typeof traningsWorkshopSchema>,
  id: string
) {
  const validData = traningsWorkshopSchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  await prisma.training.create({
    data: {
      eventType: validData.data.eventType,
      applicantRole: validData.data.applicantRole,
      startDate: validData.data.startDate,
      endDate: validData.data.endDate,
      eventTitle: validData.data.eventTitle,
      noOfParticipants: validData.data.noOfParticipants,
      majorFocusArea: validData.data.majorFocusArea,
      audienceType: validData.data.audienceType,
      organizer: validData.data.organizer,
      country: validData.data.country,
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

export async function saveTrainingsWorkshopsNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
  }

  const currentYear = new Date().getFullYear();

  const existingNillRecord = await prisma.training.findFirst({
    where: {
      userId: id,
      eventType: "NILL",
      createdAt: {
        gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
        lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
      },
    },
  });

  if (existingNillRecord) {
    return { error: "NILL record for the current year already exists" };
  }

  await prisma.training.create({
    data: {
      eventType: "NILL",
      applicantRole: "NILL",
      startDate: "NILL",
      endDate: "NILL",
      eventTitle: "NILL",
      noOfParticipants: 0,
      majorFocusArea: "NILL",
      audienceType: "NILL",
      organizer: "NILL",
      country: "NILL",
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
