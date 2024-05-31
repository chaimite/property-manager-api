/*
  Warnings:

  - The primary key for the `Property` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Property" DROP CONSTRAINT "PK_d80743e6191258a5003d5843b4f",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY ("id");
DROP SEQUENCE "Property_id_seq";
