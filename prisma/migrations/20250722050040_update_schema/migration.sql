/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Content` table. All the data in the column will be lost.
  - Added the required column `Url` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentLink` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Document', 'Twitter', 'Youtube', 'Instagram');

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "imageUrl",
DROP COLUMN "videoUrl",
ADD COLUMN     "Url" TEXT NOT NULL,
ADD COLUMN     "contentLink" TEXT NOT NULL,
ADD COLUMN     "contentType" "Type" NOT NULL DEFAULT 'Document',
ALTER COLUMN "description" DROP NOT NULL;
