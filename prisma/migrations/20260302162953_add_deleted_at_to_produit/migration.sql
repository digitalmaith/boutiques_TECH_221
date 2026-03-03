/*
  Warnings:

  - A unique constraint covering the columns `[telephone]` on the table `Employe` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Employe_telephone_key" ON "Employe"("telephone");
