-- CreateTable
CREATE TABLE "CmsAboutUs" (
    "id" TEXT NOT NULL,
    "titlePl" TEXT NOT NULL DEFAULT '',
    "subtitlePl" TEXT NOT NULL DEFAULT '',
    "titleEn" TEXT NOT NULL DEFAULT '',
    "subtitleEn" TEXT NOT NULL DEFAULT '',
    "feature1Icon" TEXT NOT NULL DEFAULT '',
    "feature1TitlePl" TEXT NOT NULL DEFAULT '',
    "feature1TitleEn" TEXT NOT NULL DEFAULT '',
    "feature1DescPl" TEXT NOT NULL DEFAULT '',
    "feature1DescEn" TEXT NOT NULL DEFAULT '',
    "feature2Icon" TEXT NOT NULL DEFAULT '',
    "feature2TitlePl" TEXT NOT NULL DEFAULT '',
    "feature2TitleEn" TEXT NOT NULL DEFAULT '',
    "feature2DescPl" TEXT NOT NULL DEFAULT '',
    "feature2DescEn" TEXT NOT NULL DEFAULT '',
    "ctaTextPl" TEXT NOT NULL DEFAULT '',
    "ctaTextEn" TEXT NOT NULL DEFAULT '',
    "ctaLink" TEXT NOT NULL DEFAULT '',
    "image1Url" TEXT NOT NULL DEFAULT '',
    "image2Url" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CmsAboutUs_pkey" PRIMARY KEY ("id")
);
