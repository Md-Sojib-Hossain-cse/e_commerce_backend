/*
  Warnings:

  - Added the required column `logoPublicId` to the `Brands` table without a default value. This is not possible if the table is not empty.
  - Made the column `isDeleted` on table `Categories` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Brands" ADD COLUMN     "bannerPublicId" TEXT,
ADD COLUMN     "logoPublicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Categories" ALTER COLUMN "isDeleted" SET NOT NULL;
