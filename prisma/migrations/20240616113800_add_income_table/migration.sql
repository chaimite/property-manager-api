-- CreateEnum
CREATE TYPE "IncomeType" AS ENUM ('Rent', 'Other');

-- CreateEnum
CREATE TYPE "IncomeStatus" AS ENUM ('Received', 'NotReceived');

-- CreateTable
CREATE TABLE "Income" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(90),
    "description" VARCHAR(150),
    "type" "IncomeType",
    "status" "IncomeStatus" NOT NULL,
    "propertyId" TEXT NOT NULL,
    "value" DECIMAL(19,4),
    "paymentDate" DATE NOT NULL,

    CONSTRAINT "Income_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
