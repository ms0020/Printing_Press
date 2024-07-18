/*
  Warnings:

  - You are about to drop the column `areaDetails` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `houseDetails` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `locationName` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `vendorId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `primaryLocation` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `primaryLocation` on the `VendorProfile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_vendorId_fkey";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "areaDetails",
DROP COLUMN "houseDetails",
DROP COLUMN "locationName",
DROP COLUMN "vendorId";

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "primaryLocation";

-- AlterTable
ALTER TABLE "VendorProfile" DROP COLUMN "primaryLocation";

-- CreateTable
CREATE TABLE "Document" (
    "documentId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "frontDocument" TEXT NOT NULL,
    "backDocument" TEXT NOT NULL,
    "frontDocumentType" TEXT NOT NULL,
    "backDocumentType" TEXT NOT NULL,
    "documentName" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "comments" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "frontVerified" BOOLEAN NOT NULL DEFAULT false,
    "backVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("documentId")
);

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
