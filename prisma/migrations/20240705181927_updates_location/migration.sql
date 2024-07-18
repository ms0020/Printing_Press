/*
  Warnings:

  - The primary key for the `AdminConfiguration` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BankDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Document` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `VendorProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `areaDetails` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `houseDetails` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationName` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryLocation` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryLocation` to the `VendorProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AdminConfiguration" DROP CONSTRAINT "AdminConfiguration_lastModifiedBy_fkey";

-- DropForeignKey
ALTER TABLE "BankDetails" DROP CONSTRAINT "BankDetails_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_userId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_profileId_fkey";

-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "VendorProfile" DROP CONSTRAINT "VendorProfile_userId_fkey";

-- AlterTable
ALTER TABLE "AdminConfiguration" DROP CONSTRAINT "AdminConfiguration_pkey",
ALTER COLUMN "lastModifiedBy" SET DATA TYPE TEXT,
ALTER COLUMN "configId" DROP DEFAULT,
ALTER COLUMN "configId" SET DATA TYPE TEXT,
ADD CONSTRAINT "AdminConfiguration_pkey" PRIMARY KEY ("configId");
DROP SEQUENCE "AdminConfiguration_configId_seq";

-- AlterTable
ALTER TABLE "BankDetails" DROP CONSTRAINT "BankDetails_pkey",
ALTER COLUMN "bankId" DROP DEFAULT,
ALTER COLUMN "bankId" SET DATA TYPE TEXT,
ALTER COLUMN "vendorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "BankDetails_pkey" PRIMARY KEY ("bankId");
DROP SEQUENCE "BankDetails_bankId_seq";

-- AlterTable
ALTER TABLE "Document" DROP CONSTRAINT "Document_pkey",
ALTER COLUMN "documentId" DROP DEFAULT,
ALTER COLUMN "documentId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Document_pkey" PRIMARY KEY ("documentId");
DROP SEQUENCE "Document_documentId_seq";

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
ADD COLUMN     "areaDetails" TEXT NOT NULL,
ADD COLUMN     "houseDetails" TEXT NOT NULL,
ADD COLUMN     "locationName" TEXT NOT NULL,
ADD COLUMN     "vendorId" TEXT,
ALTER COLUMN "locationId" DROP DEFAULT,
ALTER COLUMN "locationId" SET DATA TYPE TEXT,
ALTER COLUMN "profileId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("locationId");
DROP SEQUENCE "Location_locationId_seq";

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
ALTER COLUMN "roleId" DROP DEFAULT,
ALTER COLUMN "roleId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("roleId");
DROP SEQUENCE "Role_roleId_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "userId" DROP DEFAULT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");
DROP SEQUENCE "User_userId_seq";

-- AlterTable
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_pkey",
ADD COLUMN     "primaryLocation" TEXT NOT NULL,
ALTER COLUMN "profileId" DROP DEFAULT,
ALTER COLUMN "profileId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("profileId");
DROP SEQUENCE "UserProfile_profileId_seq";

-- AlterTable
ALTER TABLE "VendorProfile" DROP CONSTRAINT "VendorProfile_pkey",
ADD COLUMN     "primaryLocation" TEXT NOT NULL,
ALTER COLUMN "vendorId" DROP DEFAULT,
ALTER COLUMN "vendorId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "VendorProfile_pkey" PRIMARY KEY ("vendorId");
DROP SEQUENCE "VendorProfile_vendorId_seq";

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorProfile" ADD CONSTRAINT "VendorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminConfiguration" ADD CONSTRAINT "AdminConfiguration_lastModifiedBy_fkey" FOREIGN KEY ("lastModifiedBy") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "UserProfile"("profileId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "VendorProfile"("vendorId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankDetails" ADD CONSTRAINT "BankDetails_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "VendorProfile"("vendorId") ON DELETE CASCADE ON UPDATE CASCADE;
