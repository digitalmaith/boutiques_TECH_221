-- AlterTable
ALTER TABLE "Categorie" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Categorie_deletedAt_idx" ON "Categorie"("deletedAt");
