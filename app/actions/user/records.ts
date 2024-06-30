"use server";

import prisma from "@/lib/db";
import { getUser } from "./auth";

// ALL RECORDS
// TODO:
export async function allRecords(id: string, userCookie: string) {
  if (!id || !userCookie) {
    return { status: 401, success: false, message: "Unauthorized" };
  }
  const user = await getUser(userCookie);
  if (!user) {
    return { status: 404, success: false, message: "User not found" };
  }

  // 1 OK:
  const researchPublication = await prisma.researchPublication.findMany({
    where: { userId: id },
    include: {
      user: {
        select: {
          name: true,
          department: true,
        },
      },
    },
  });
  // 2 OK:
  const bookAuthoredEdited = await prisma.bookAuthoredEdited.findMany({
    where: { userId: id },
    include: {
      user: {
        select: {
          name: true,
          department: true,
        },
      },
    },
  });
  // 3 OK:
  const researchProject = await prisma.researchProject.findMany({
    where: { userId: id },
    include: {
      user: {
        select: {
          name: true,
          department: true,
        },
      },
    },
  });
  // 4 OK:
  const trainings = await prisma.training.findMany({
    where: { userId: id },
    include: {
      user: {
        select: {
          name: true,
          department: true,
        },
      },
    },
  });
  // 5 OK:
  const thesis = await prisma.thesis.findMany({
    where: { userId: id },
    include: {
      user: {
        select: {
          name: true,
          department: true,
        },
      },
    },
  });
  // 6 OK:
  const policyAdvocacy = await prisma.policyAdvocacy.findMany({
    where: { userId: id },
    include: {
      user: {
        select: {
          name: true,
          department: true,
        },
      },
    },
  });

  // 7 OK:
  const linksEstablished = await prisma.linksEstablished.findMany({
    where: { userId: id },
    include: {
      user: {
        select: {
          name: true,
          department: true,
        },
      },
    },
  });
  // 8 OK:
  const contractResearchAward = await prisma.contractResearchAward.findMany({
    where: { userId: id },
    include: {
      user: {
        select: {
          name: true,
          department: true,
        },
      },
    },
  });

  // 9 OK:
  const civicEngagementEvent = await prisma.civicEngagementEvent.findMany({
    where: { userId: id },
    include: {
      user: {
        select: {
          name: true,
          department: true,
        },
      },
    },
  });
  // 10 OK:
  const consultancyContract = await prisma.consultancyContract.findMany({
    where: { userId: id },
    include: {
      user: {
        select: {
          name: true,
          department: true,
        },
      },
    },
  });

  if (bookAuthoredEdited) {
    const books = [
      researchPublication,
      bookAuthoredEdited,
      researchProject,
      trainings,
      thesis,
      policyAdvocacy,
      linksEstablished,
      contractResearchAward,
      civicEngagementEvent,
      consultancyContract,
    ];
    return { status: 200, success: true, books };
  }
}
