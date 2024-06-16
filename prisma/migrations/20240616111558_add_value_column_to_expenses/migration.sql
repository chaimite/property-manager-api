/*
  Warnings:

  - Added the required column `value` to the `Expenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expenses" ADD COLUMN     "value" DECIMAL(19,4) NOT NULL;
