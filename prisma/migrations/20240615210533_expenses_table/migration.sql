-- CreateEnum
CREATE TYPE "ExpenseType" AS ENUM ('MunicipalTax', 'Insurance', 'Other', 'Condominium', 'ExtraCondominium');

-- CreateEnum
CREATE TYPE "ExpenseStatus" AS ENUM ('Paid', 'Overdue');

-- AlterTable
ALTER TABLE "Property" RENAME CONSTRAINT "PK_d80743e6191258a5003d5843b4f" TO "Property_pkey";

-- CreateTable
CREATE TABLE "Expenses" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(90) NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "type" "ExpenseType" NOT NULL,
    "status" "ExpenseStatus" NOT NULL,
    "yearOfExpense" DATE NOT NULL,
    "paymentDate" DATE NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id")
);
