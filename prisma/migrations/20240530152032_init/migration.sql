/*
  Warnings:

  - You are about to drop the `property` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('AvailableToRent', 'NotForRent', 'Sold', 'Rented');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('Commercial', 'Residential');

-- DropTable
DROP TABLE "property";

-- DropEnum
DROP TYPE "property_status_enum";

-- DropEnum
DROP TYPE "property_type_enum";

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(90) NOT NULL,
    "type" "PropertyType" NOT NULL,
    "status" "PropertyStatus" NOT NULL,
    "location" VARCHAR(25) NOT NULL,
    "contractBeginAt" DATE NOT NULL,
    "contractEndingAt" DATE NOT NULL,

    CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY ("id")
);
