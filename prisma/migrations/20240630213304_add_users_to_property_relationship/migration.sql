/*
  Warnings:

  - Added the required column `propertyId` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "propertyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
