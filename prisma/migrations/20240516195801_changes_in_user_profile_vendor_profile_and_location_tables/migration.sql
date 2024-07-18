/*
  Warnings:

  - You are about to drop the column `vendorId` on the `Location` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_vendorId_fkey";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "vendorId",
ADD COLUMN     "profileId" INTEGER;

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "city" TEXT NOT NULL DEFAULT 'Delhi',
ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'Delhi';

-- AlterTable
ALTER TABLE "VendorProfile" ADD COLUMN     "accountName" TEXT NOT NULL DEFAULT 'Delhi',
ADD COLUMN     "accountNumber" TEXT NOT NULL DEFAULT 'Delhi',
ADD COLUMN     "bankName" TEXT NOT NULL DEFAULT 'Delhi',
ADD COLUMN     "ifsc" TEXT NOT NULL DEFAULT 'Delhi',
ADD COLUMN     "registrationStatus" TEXT NOT NULL DEFAULT 'Unverified',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Inactive';

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "UserProfile"("profileId") ON DELETE CASCADE ON UPDATE CASCADE;
