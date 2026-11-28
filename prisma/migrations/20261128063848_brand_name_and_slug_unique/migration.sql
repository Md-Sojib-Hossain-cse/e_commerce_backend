/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Brands` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Brands` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Brands_name_key" ON "Brands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Brands_slug_key" ON "Brands"("slug");
