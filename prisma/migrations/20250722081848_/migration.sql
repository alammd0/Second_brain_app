/*
  Warnings:

  - You are about to drop the column `contentid` on the `Tags` table. All the data in the column will be lost.
  - You are about to drop the `_contentTags` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_contentTags" DROP CONSTRAINT "_contentTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_contentTags" DROP CONSTRAINT "_contentTags_B_fkey";

-- AlterTable
ALTER TABLE "Tags" DROP COLUMN "contentid";

-- DropTable
DROP TABLE "_contentTags";

-- CreateTable
CREATE TABLE "_ContentTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ContentTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ContentTags_B_index" ON "_ContentTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- AddForeignKey
ALTER TABLE "_ContentTags" ADD CONSTRAINT "_ContentTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentTags" ADD CONSTRAINT "_ContentTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
