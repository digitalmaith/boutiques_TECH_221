-- AlterTable
ALTER TABLE "Produit" ADD COLUMN "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Produit_deletedAt_idx" ON "Produit"("deletedAt");