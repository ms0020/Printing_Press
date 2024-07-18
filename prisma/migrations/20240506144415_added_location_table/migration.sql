-- CreateTable
CREATE TABLE "Location" (
    "locationId" SERIAL NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("locationId")
);

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "VendorProfile"("vendorId") ON DELETE CASCADE ON UPDATE CASCADE;
