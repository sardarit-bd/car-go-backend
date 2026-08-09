-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN "highlights" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];