/*
  Warnings:

  - You are about to drop the column `propertyId` on the `Property` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_propertyId_fkey";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "propertyId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
