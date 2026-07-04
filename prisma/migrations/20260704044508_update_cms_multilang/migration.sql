/*
  Warnings:

  - You are about to drop the column `answer` on the `CmsFaq` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `CmsFaq` table. All the data in the column will be lost.
  - You are about to drop the column `subtitle` on the `CmsHero` table. All the data in the column will be lost.
  - You are about to drop the column `tagline` on the `CmsHero` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `CmsHero` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `CmsHeroFeature` table. All the data in the column will be lost.
  - You are about to drop the column `subtitle` on the `CmsWhyChooseUs` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `CmsWhyChooseUs` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `CmsWhyChooseUsFeature` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `CmsWhyChooseUsFeature` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CmsFaq" DROP COLUMN "answer",
DROP COLUMN "question",
ADD COLUMN     "answerEn" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "answerPl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "questionEn" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "questionPl" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "CmsHero" DROP COLUMN "subtitle",
DROP COLUMN "tagline",
DROP COLUMN "title",
ADD COLUMN     "subtitleEn" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "subtitlePl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "taglineEn" TEXT,
ADD COLUMN     "taglinePl" TEXT,
ADD COLUMN     "titleEn" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "titlePl" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "CmsHeroFeature" DROP COLUMN "text",
ADD COLUMN     "textEn" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "textPl" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "CmsWhyChooseUs" DROP COLUMN "subtitle",
DROP COLUMN "title",
ADD COLUMN     "subtitleEn" TEXT,
ADD COLUMN     "subtitlePl" TEXT,
ADD COLUMN     "titleEn" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "titlePl" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "CmsWhyChooseUsFeature" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "descriptionEn" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "descriptionPl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "titleEn" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "titlePl" TEXT NOT NULL DEFAULT '';
