"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  researchProjectSchema,
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
      countries: "NILL",
      addressing: "NILL",
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
