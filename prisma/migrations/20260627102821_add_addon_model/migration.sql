-- CreateTable
CREATE TABLE "ProtectionPackage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT[],
    "price" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ProtectionPackage_pkey" PRIMARY KEY ("id")
);
