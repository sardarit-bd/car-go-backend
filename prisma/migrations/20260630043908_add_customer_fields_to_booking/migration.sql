/*
  Warnings:

  - Added the required column `customerEmail` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerFirstName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerLastName` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "addonsData" JSONB,
ADD COLUMN     "customerEmail" TEXT NOT NULL,
ADD COLUMN     "customerFirstName" TEXT NOT NULL,
ADD COLUMN     "customerLastName" TEXT NOT NULL,
ADD COLUMN     "customerNotes" TEXT,
ADD COLUMN     "packageData" JSONB;
