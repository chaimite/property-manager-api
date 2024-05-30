-- CreateEnum
CREATE TYPE "property_status_enum" AS ENUM ('AvailableToRent', 'NotForRent', 'Sold', 'Rented');

-- CreateEnum
CREATE TYPE "property_type_enum" AS ENUM ('Commercial', 'Residential');

-- CreateTable
CREATE TABLE "property" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(90) NOT NULL,
    "type" "property_type_enum" NOT NULL,
    "status" "property_status_enum" NOT NULL,
    "location" VARCHAR(25) NOT NULL,
    "contract_begin_at" DATE NOT NULL,
    "contract_ending_at" DATE NOT NULL,

    CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY ("id")
);

