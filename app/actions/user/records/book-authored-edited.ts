"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  bookAuthoredSchema,
  formStatusSchema,
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

export async function updateBookAuthoredEdited(
  values: z.infer<typeof bookAuthoredSchema>,
  id: string
) {
  const validData = bookAuthoredSchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  const existingRecord = await prisma.bookAuthoredEdited.findUnique({
    where: { id },
  });
  if (!existingRecord) {
    return { error: "No record found" };
  }

  await prisma.bookAuthoredEdited.update({
    where: { id },
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
    },
  });
  return { success: "Data saved Successfully" };
  revalidatePath("/user/dashboard/add-record");
}

export async function saveBookAuthoredEditedNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
  }

  const currentYear = new Date().getFullYear();

  const existingNillRecord = await prisma.bookAuthoredEdited.findFirst({
    where: {
      userId: id,
      isbn: "NILL",
      createdAt: {
        gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
        lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
      },
    },
  });

  if (existingNillRecord) {
    return { error: "NILL record for the current year already exists" };
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

export async function deleteBookAuthoredEdited(id: string) {
  try {
    if (!id) {
      return { error: "Id is required" };
    }
    const existingRecord = await prisma.bookAuthoredEdited.findUnique({
      where: { id },
    });
    if (!existingRecord) {
      return { error: "No record found" };
    }
    await prisma.bookAuthoredEdited.delete({
      where: { id },
    });
    return { success: "Record successfully deleted" };
  } catch (error) {
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/user/dashboard/add-record");
  }
}

export async function getBookAuthoredEdited(userId: string, id: string) {
  try {
    const data = await prisma.bookAuthoredEdited.findUnique({
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

export async function updateBookAuthoredEditedStatus(
  values: z.infer<typeof formStatusSchema>,
  id: string
) {
  try {
    const validData = formStatusSchema.safeParse(values);
    if (!validData?.success) {
      return { error: "Invalid data provided" };
    }

    const { status } = validData.data;

    const res = await prisma.bookAuthoredEdited.update({
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
