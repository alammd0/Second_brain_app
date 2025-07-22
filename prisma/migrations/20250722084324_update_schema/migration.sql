/*
  Warnings:

  - You are about to drop the column `Url` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `contentid` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ContentTags` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[hash]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Content` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `contentId` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Type" ADD VALUE 'LinkedIn';

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_contentid_fkey";

-- DropForeignKey
ALTER TABLE "_ContentTags" DROP CONSTRAINT "_ContentTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContentTags" DROP CONSTRAINT "_ContentTags_B_fkey";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "Url",
ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "contentid",
ADD COLUMN     "contentId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "Tags";

-- DropTable
DROP TABLE "_ContentTags";

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_hash_key" ON "Link"("hash");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
