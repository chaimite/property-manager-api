/*
  Warnings:

  - A unique constraint covering the columns `[propertyId]` on the table `Expenses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `propertyId` to the `Expenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expenses" ADD COLUMN     "propertyId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_PropertyExpenses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyExpenses_AB_unique" ON "_PropertyExpenses"("A", "B");

-- CreateIndex
CREATE INDEX "_PropertyExpenses_B_index" ON "_PropertyExpenses"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Expenses_propertyId_key" ON "Expenses"("propertyId");

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyExpenses" ADD CONSTRAINT "_PropertyExpenses_A_fkey" FOREIGN KEY ("A") REFERENCES "Expenses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyExpenses" ADD CONSTRAINT "_PropertyExpenses_B_fkey" FOREIGN KEY ("B") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
