/*
  Warnings:

  - You are about to drop the `_PropertyExpenses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PropertyExpenses" DROP CONSTRAINT "_PropertyExpenses_A_fkey";

-- DropForeignKey
ALTER TABLE "_PropertyExpenses" DROP CONSTRAINT "_PropertyExpenses_B_fkey";

-- DropIndex
DROP INDEX "Expenses_propertyId_key";

-- DropTable
DROP TABLE "_PropertyExpenses";
