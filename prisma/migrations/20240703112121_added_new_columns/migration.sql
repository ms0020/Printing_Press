/*
  Warnings:

  - Added the required column `areaDetails` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `houseDetails` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationName` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryLocation` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryLocation` to the `VendorProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "areaDetails" TEXT NOT NULL,
ADD COLUMN     "houseDetails" TEXT NOT NULL,
ADD COLUMN     "locationName" TEXT NOT NULL,
ADD COLUMN     "vendorId" INTEGER;

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "primaryLocation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VendorProfile" ADD COLUMN     "primaryLocation" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "VendorProfile"("vendorId") ON DELETE CASCADE ON UPDATE CASCADE;
