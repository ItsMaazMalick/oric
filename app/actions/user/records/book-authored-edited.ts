"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  bookAuthoredSchema,
  researchProjectSchema,
} from "@/lib/validations/formValidations";

export async function saveBookAuthoredEdited(
  values: z.infer<typeof bookAuthoredSchema>,
  id: string
) {
  const validData = bookAuthoredSchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  await prisma.bookAuthoredEdited.create({
    data: {
      isbn: validData.data.isbn,
      role: validData.data.role,
      pages: validData.data.pages,
      year: validData.data.year,
      country: validData.data.country,
      bookTitle: validData.data.bookTitle,
      chapterTitle: validData.data.chapterTitle,
      publisherName: validData.data.publisherName,
      affiliation: validData.data.affiliation,
      link: validData.data.link,
      addressing: validData.data.addressing,
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

export async function saveBookAuthoredEditedNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
  }

  await prisma.bookAuthoredEdited.create({
    data: {
      isbn: "NILL",
      role: "NILL",
      pages: 0,
      year: "NILL",
      country: "NILL",
      bookTitle: "NILL",
      chapterTitle: "NILL",
      publisherName: "NILL",
      affiliation: "NILL",
      link: "NILL",
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
