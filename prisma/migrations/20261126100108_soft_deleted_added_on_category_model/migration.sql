-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "CategoryProducts" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "categoryId" UUID NOT NULL,

    CONSTRAINT "CategoryProducts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CategoryProducts" ADD CONSTRAINT "CategoryProducts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryProducts" ADD CONSTRAINT "CategoryProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
