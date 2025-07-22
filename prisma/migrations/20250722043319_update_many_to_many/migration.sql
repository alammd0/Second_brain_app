-- DropForeignKey
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_contentid_fkey";

-- CreateTable
CREATE TABLE "_contentTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_contentTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_contentTags_B_index" ON "_contentTags"("B");

-- AddForeignKey
ALTER TABLE "_contentTags" ADD CONSTRAINT "_contentTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_contentTags" ADD CONSTRAINT "_contentTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
