/*
  Warnings:

  - You are about to drop the column `userId` on the `Content` table. All the data in the column will be lost.
  - The `contentType` column on the `Content` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_userId_fkey";

-- DropForeignKey
ALTER TABLE "_contentTags" DROP CONSTRAINT "_contentTags_B_fkey";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "userId",
DROP COLUMN "contentType",
ADD COLUMN     "contentType" "Type" NOT NULL DEFAULT 'Document';

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contentid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_contentTags" ADD CONSTRAINT "_contentTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
