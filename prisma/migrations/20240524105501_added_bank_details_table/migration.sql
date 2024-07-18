/*
  Warnings:

  - You are about to drop the column `accountName` on the `VendorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `accountNumber` on the `VendorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `bankName` on the `VendorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `ifsc` on the `VendorProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VendorProfile" DROP COLUMN "accountName",
DROP COLUMN "accountNumber",
DROP COLUMN "bankName",
DROP COLUMN "ifsc";

-- CreateTable
CREATE TABLE "BankDetails" (
    "bankId" SERIAL NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "bankName" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "ifsc" TEXT NOT NULL,
    "accountType" TEXT,
    "bankBranch" TEXT,

    CONSTRAINT "BankDetails_pkey" PRIMARY KEY ("bankId")
);

-- AddForeignKey
ALTER TABLE "BankDetails" ADD CONSTRAINT "BankDetails_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "VendorProfile"("vendorId") ON DELETE CASCADE ON UPDATE CASCADE;
