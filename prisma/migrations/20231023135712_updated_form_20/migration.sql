/*
  Warnings:

  - Added the required column `available_to_student` to the `ListOfFacilities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ListOfFacilities" ADD COLUMN     "available_to_student" TEXT NOT NULL;
