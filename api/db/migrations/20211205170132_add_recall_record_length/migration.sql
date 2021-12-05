/*
  Warnings:

  - Added the required column `length` to the `RecallRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecallRecord" ADD COLUMN     "length" INTEGER NOT NULL;
