/*
  Warnings:

  - You are about to drop the column `productId` on the `CartItems` table. All the data in the column will be lost.
  - You are about to alter the column `totalAmount` on the `Carts` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `discountAmount` on the `CouponUsages` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `value` on the `Coupons` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `maxDiscount` on the `Coupons` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `minOrderAmount` on the `Coupons` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to drop the column `brandId` on the `OrderItems` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `OrderItems` table. All the data in the column will be lost.
  - You are about to alter the column `unitPrice` on the `OrderItems` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `discountAmount` on the `OrderItems` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `totalPrice` on the `OrderItems` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to drop the column `deliveredAt` on the `Orders` table. All the data in the column will be lost.
  - The `status` column on the `Orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `subtotal` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `discountAmount` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `shippingCost` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `taxAmount` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `totalAmount` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `amount` on the `Payments` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `price` on the `ProductVariants` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `salePrice` on the `ProductVariants` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `price` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `salePrice` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `amount` on the `Refunds` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - A unique constraint covering the columns `[userId]` on the table `Carts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId]` on the table `CouponUsages` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Coupons` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[variantId]` on the table `Inventories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId]` on the table `Refunds` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[paymentId]` on the table `Refunds` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Wishlists` will be added. If there are existing duplicate values, this will fail.
  - Made the column `discountAmount` on table `CouponUsages` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Addresses" DROP CONSTRAINT "Addresses_userId_fkey";

-- DropForeignKey
ALTER TABLE "CartItems" DROP CONSTRAINT "CartItems_cartId_fkey";

-- DropForeignKey
ALTER TABLE "CartItems" DROP CONSTRAINT "CartItems_productId_fkey";

-- DropForeignKey
ALTER TABLE "CartItems" DROP CONSTRAINT "CartItems_variantId_fkey";

-- DropForeignKey
ALTER TABLE "Carts" DROP CONSTRAINT "Carts_userId_fkey";

-- DropForeignKey
ALTER TABLE "ContactMessages" DROP CONSTRAINT "ContactMessages_userId_fkey";

-- DropForeignKey
ALTER TABLE "CouponUsages" DROP CONSTRAINT "CouponUsages_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Inventories" DROP CONSTRAINT "Inventories_variantId_fkey";

-- DropForeignKey
ALTER TABLE "OrderAddresses" DROP CONSTRAINT "OrderAddresses_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItems" DROP CONSTRAINT "OrderItems_brandId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItems" DROP CONSTRAINT "OrderItems_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItems" DROP CONSTRAINT "OrderItems_productId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItems" DROP CONSTRAINT "OrderItems_variantId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProductImages" DROP CONSTRAINT "ProductImages_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductReviews" DROP CONSTRAINT "ProductReviews_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductReviews" DROP CONSTRAINT "ProductReviews_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariants" DROP CONSTRAINT "ProductVariants_productId_fkey";

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_brandId_fkey";

-- DropForeignKey
ALTER TABLE "Shippings" DROP CONSTRAINT "Shippings_orderId_fkey";

-- DropForeignKey
ALTER TABLE "SizeChartMeasurements" DROP CONSTRAINT "SizeChartMeasurements_sizeChartId_fkey";

-- DropForeignKey
ALTER TABLE "StockManagements" DROP CONSTRAINT "StockManagements_orderId_fkey";

-- DropForeignKey
ALTER TABLE "StockManagements" DROP CONSTRAINT "StockManagements_orderItemId_fkey";

-- DropForeignKey
ALTER TABLE "WishlistItems" DROP CONSTRAINT "WishlistItems_productId_fkey";

-- DropForeignKey
ALTER TABLE "WishlistItems" DROP CONSTRAINT "WishlistItems_wishlistId_fkey";

-- DropForeignKey
ALTER TABLE "Wishlists" DROP CONSTRAINT "Wishlists_userId_fkey";

-- DropIndex
DROP INDEX "CartItems_productId_idx";

-- DropIndex
DROP INDEX "OrderItems_productId_idx";

-- AlterTable
ALTER TABLE "CartItems" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "Carts" ALTER COLUMN "totalAmount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "CouponUsages" ALTER COLUMN "discountAmount" SET NOT NULL,
ALTER COLUMN "discountAmount" SET DEFAULT 0,
ALTER COLUMN "discountAmount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Coupons" ALTER COLUMN "value" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "maxDiscount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "minOrderAmount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "usagePerUser" SET DATA TYPE INTEGER,
ALTER COLUMN "usedCount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "OrderItems" DROP COLUMN "brandId",
DROP COLUMN "productId",
ALTER COLUMN "unitPrice" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "discountAmount" SET DEFAULT 0,
ALTER COLUMN "discountAmount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "totalPrice" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "deliveredAt",
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "subtotal" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "discountAmount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "shippingCost" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "taxAmount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "totalAmount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Payments" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "ProductVariants" ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "salePrice" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "brandId" DROP NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "salePrice" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Refunds" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "StockManagements" ALTER COLUMN "orderId" DROP NOT NULL,
ALTER COLUMN "orderItemId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Carts_userId_key" ON "Carts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CouponUsages_orderId_key" ON "CouponUsages"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Coupons_code_key" ON "Coupons"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Inventories_variantId_key" ON "Inventories"("variantId");

-- CreateIndex
CREATE INDEX "Orders_status_idx" ON "Orders"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Refunds_orderId_key" ON "Refunds"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Refunds_paymentId_key" ON "Refunds"("paymentId");

-- CreateIndex
CREATE INDEX "StockManagements_orderItemId_idx" ON "StockManagements"("orderItemId");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlists_userId_key" ON "Wishlists"("userId");

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carts" ADD CONSTRAINT "Carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactMessages" ADD CONSTRAINT "ContactMessages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CouponUsages" ADD CONSTRAINT "CouponUsages_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventories" ADD CONSTRAINT "Inventories_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderAddresses" ADD CONSTRAINT "OrderAddresses_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImages" ADD CONSTRAINT "ProductImages_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReviews" ADD CONSTRAINT "ProductReviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReviews" ADD CONSTRAINT "ProductReviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariants" ADD CONSTRAINT "ProductVariants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shippings" ADD CONSTRAINT "Shippings_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SizeChartMeasurements" ADD CONSTRAINT "SizeChartMeasurements_sizeChartId_fkey" FOREIGN KEY ("sizeChartId") REFERENCES "SizeCharts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockManagements" ADD CONSTRAINT "StockManagements_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockManagements" ADD CONSTRAINT "StockManagements_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItems"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlists" ADD CONSTRAINT "Wishlists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItems" ADD CONSTRAINT "WishlistItems_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItems" ADD CONSTRAINT "WishlistItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
