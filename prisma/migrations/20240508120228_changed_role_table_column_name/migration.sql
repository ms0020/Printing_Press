/*
  Warnings:

  - The primary key for the `AdminConfiguration` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `configid` on the `AdminConfiguration` table. All the data in the column will be lost.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roleid` on the `Role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AdminConfiguration" DROP CONSTRAINT "AdminConfiguration_pkey",
DROP COLUMN "configid",
ADD COLUMN     "configId" SERIAL NOT NULL,
ADD CONSTRAINT "AdminConfiguration_pkey" PRIMARY KEY ("configId");

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
DROP COLUMN "roleid",
ADD COLUMN     "roleId" SERIAL NOT NULL,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("roleId");
