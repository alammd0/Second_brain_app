/*
  Warnings:

  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `contentType` on the `Content` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_userid_fkey";

-- DropForeignKey
ALTER TABLE "_contentTags" DROP CONSTRAINT "_contentTags_B_fkey";

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "userId" TEXT,
DROP COLUMN "contentType",
ADD COLUMN     "contentType" TEXT NOT NULL;

-- DropTable
DROP TABLE "Tags";

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_contentTags" ADD CONSTRAINT "_contentTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
