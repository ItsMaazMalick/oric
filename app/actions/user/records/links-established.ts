"use server";
import prisma from "@/lib/db";

import { getUserSession } from "../../session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  linksEstablishedSchema,
  formStatusSchema,
  researchProjectSchema,
} from "@/lib/validations/formValidations";

export async function saveLinksEstablished(
  values: z.infer<typeof linksEstablishedSchema>,
  file: string,
  id: string
) {
  const validData = linksEstablishedSchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  await prisma.linksEstablished.create({
    data: {
      linkageType: validData.data.linkageType,
      scope: validData.data.scope,
      nameOfCollaboratingAgency: validData.data.nameOfCollaboratingAgency,
      countryOfCollaboratingAgency: validData.data.countryOfCollaboratingAgency,
      scopeOfCollaboration: validData.data.scopeOfCollaboration,
      linkageDate: validData.data.linkageDate,
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

export async function updateLinksEstablished(
  values: z.infer<typeof linksEstablishedSchema>,
  file: string,
  id: string
) {
  const validData = linksEstablishedSchema.safeParse(values);
  if (!validData?.success) {
    return { error: "Invalid data provided" };
  }

  const existingRecord = await prisma.linksEstablished.findUnique({
    where: { id },
  });
  if (!existingRecord) {
    return { error: "No record found" };
  }

  await prisma.linksEstablished.update({
    where: { id },
    data: {
      linkageType: validData.data.linkageType,
      scope: validData.data.scope,
      nameOfCollaboratingAgency: validData.data.nameOfCollaboratingAgency,
      countryOfCollaboratingAgency: validData.data.countryOfCollaboratingAgency,
      scopeOfCollaboration: validData.data.scopeOfCollaboration,
      linkageDate: validData.data.linkageDate,
      mouCopy: file,
    },
  });
  return { success: "Data saved Successfully" };
  revalidatePath("/user/dashboard/add-record");
}

export async function saveLinksEstablishedNill(id: string) {
  if (!id) {
    return { error: "Id is required" };
  }

  const currentYear = new Date().getFullYear();

  const existingNillRecord = await prisma.linksEstablished.findFirst({
    where: {
      userId: id,
      linkageType: "NILL",
      createdAt: {
        gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
        lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
      },
    },
  });

  if (existingNillRecord) {
    return { error: "NILL record for the current year already exists" };
  }

  await prisma.linksEstablished.create({
    data: {
      linkageType: "NILL",
      scope: "NILL",
      nameOfCollaboratingAgency: "NILL",
      countryOfCollaboratingAgency: "NILL",
      scopeOfCollaboration: "NILL",
      linkageDate: "NILL",
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

export async function deleteLinksEstablished(id: string) {
  try {
    if (!id) {
      return { error: "Id is required" };
    }
    const existingRecord = await prisma.linksEstablished.findUnique({
      where: { id },
    });
    if (!existingRecord) {
      return { error: "No record found" };
    }
    await prisma.linksEstablished.delete({
      where: { id },
    });
    return { success: "Record successfully deleted" };
  } catch (error) {
    return { error: "Something went wrong" };
  } finally {
    revalidatePath("/user/dashboard/add-record");
  }
}

export async function getLinksEstablished(userId: string, id: string) {
  try {
    const data = await prisma.linksEstablished.findUnique({
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

export async function updateLinksEstablishedStatus(
  values: z.infer<typeof formStatusSchema>,
  id: string
) {
  try {
    const validData = formStatusSchema.safeParse(values);
    if (!validData?.success) {
      return { error: "Invalid data provided" };
    }

    const { status } = validData.data;

    const res = await prisma.linksEstablished.update({
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
