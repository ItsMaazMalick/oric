"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  researchProjectSchema,
  formStatusSchema,
  researchPublicationSchema,
} from "@/lib/validations/formValidations";

export async function saveResearchPublications(
  values: z.infer<typeof researchPublicationSchema>,
  id: string
) {
  try {
    const validData = researchPublicationSchema.safeParse(values);
    if (!validData?.success) {
      return { error: "Invalid data provided" };
    }

    await prisma.researchPublication.create({
      data: {
        year: validData.data.year,
        country: validData.data.country,
        journalName: validData.data.journalName,
        title: validData.data.title,
        authorName: validData.data.authorName,
        category: validData.data.category,
        status: validData.data.status,
        issn: validData.data.issn,
        volume: validData.data.volume,
        pages: validData.data.pages,
        affiliation: validData.data.affiliation,
        link: validData.data.link,
        countries: validData.data.countries,
        addressing: validData.data.addressing,
        user: {
          connect: {
            id,
          },
        },
      },
    });
    return { success: "Data saved Successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

export async function updateResearchPublications(
  values: z.infer<typeof researchPublicationSchema>,
  id: string
) {
  try {
    const validData = researchPublicationSchema.safeParse(values);
    if (!validData?.success) {
      return { error: "Invalid data provided" };
    }

    const existingRecord = await prisma.researchPublication.findUnique({
      where: { id },
    });
    if (!existingRecord) {
      return { error: "No record found" };
    }

    await prisma.researchPublication.update({
      where: { id },
      data: {
        year: validData.data.year,
        country: validData.data.country,
        journalName: validData.data.journalName,
        title: validData.data.title,
        authorName: validData.data.authorName,
        category: validData.data.category,
        status: validData.data.status,
        issn: validData.data.issn,
        volume: validData.data.volume,
        pages: validData.data.pages,
        affiliation: validData.data.affiliation,
        link: validData.data.link,
        countries: validData.data.countries,
        addressing: validData.data.addressing,
      },
    });
    return { success: "Data saved Successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

export async function saveResearchPublicationsNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
  }

  const currentYear = new Date().getFullYear();

  const existingNillRecord = await prisma.researchPublication.findFirst({
    where: {
      userId: id,
      title: "NILL",
      createdAt: {
        gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
        lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
      },
    },
  });

  if (existingNillRecord) {
    return { error: "NILL record for the current year already exists" };
  }

  await prisma.researchPublication.create({
    data: {
      year: "NILL",
      country: "NILL",
      journalName: "NILL",
      title: "NILL",
      authorName: "NILL",
      category: "NILL",
      status: "NILL",
      issn: "NILL",
      volume: "NILL",
      pages: 0,
      affiliation: "NILL",
      link: "NILL",
      countries: [],
      addressing: [],
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

export async function deleteResearchPublications(id: string) {
  try {
    if (!id) {
      return { error: "Id is required" };
    }
    const existingRecord = await prisma.researchPublication.findUnique({
      where: { id },
    });
    if (!existingRecord) {
      return { error: "No record found" };
    }
    await prisma.researchPublication.delete({
      where: { id },
    });
    return { success: "Record successfully deleted" };
  } catch (error) {
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/user/dashboard/add-record");
  }
}

export async function getResearchPublications(userId: string, id: string) {
  try {
    const data = await prisma.researchPublication.findUnique({
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

export async function updateResearchPublicationsStatus(
  values: z.infer<typeof formStatusSchema>,
  id: string
) {
  try {
    const validData = formStatusSchema.safeParse(values);
    if (!validData?.success) {
      return { error: "Invalid data provided" };
    }

    const { status } = validData.data;

    const res = await prisma.researchPublication.update({
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
