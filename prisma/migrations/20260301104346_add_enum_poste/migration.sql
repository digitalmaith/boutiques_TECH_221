/*
  Warnings:

  - Changed the type of `poste` on the `Employe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Poste" AS ENUM ('CAISSIER', 'VENDEUR', 'MANAGER');

-- AlterTable
ALTER TABLE "Employe" DROP COLUMN "poste",
ADD COLUMN     "poste" "Poste" NOT NULL;
