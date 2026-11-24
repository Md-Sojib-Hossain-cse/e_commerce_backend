/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Categories` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Categories" ALTER COLUMN "image" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");
