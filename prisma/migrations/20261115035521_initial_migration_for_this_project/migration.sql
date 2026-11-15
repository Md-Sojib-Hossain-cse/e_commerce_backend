-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('CUSTOMER', 'ADMIN', 'STUFF');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('HOME', 'OFFICE', 'OTHER');

-- CreateEnum
CREATE TYPE "StockManagementType" AS ENUM ('PURCHASE', 'SALE', 'RETURN', 'RESTOCK', 'ADJUSTMENT', 'RESERVED', 'RELEASED');

-- CreateEnum
CREATE TYPE "ProductVariantStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'OUT_OF_STOCK');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "CategoryStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "BrandStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ProductReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "CouponType" AS ENUM ('PERCENTAGE', 'FIXED_AMOUNT');

-- CreateEnum
CREATE TYPE "CouponStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'EXPIRES');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'READY_TO_SHIP', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'RETURNED', 'FAILED');

-- CreateEnum
CREATE TYPE "ShippingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'FAILED', 'RETURNED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH_ON', 'CARD', 'MOBILE_BANKING');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED', 'PARTIALLY_REFUNDED');

-- CreateEnum
CREATE TYPE "RefundStatus" AS ENUM ('PENDING', 'APPROVED', 'PROCESSING', 'COMPLETED', 'REJECTED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "GatewayProvider" AS ENUM ('CASH_ON', 'BKASH', 'STRIPE', 'SSLCOMMERZ');

-- CreateEnum
CREATE TYPE "BannerPosition" AS ENUM ('HOME_HERO', 'HOME_MIDDLE', 'HOME_BOTTOM', 'CATEGORY');

-- CreateEnum
CREATE TYPE "BannerStatus" AS ENUM ('DRAFT', 'ARCHIVED', 'INACTIVE', 'ACTIVE');

-- CreateEnum
CREATE TYPE "FaqStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('ORDER', 'PAYMENT', 'SHIPPING', 'PROMOTION', 'ACCOUNT', 'SYSTEM');

-- CreateEnum
CREATE TYPE "NotificationPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "NotificationChannels" AS ENUM ('IN_APP', 'EMAIL', 'SMS', 'PUSH');

-- CreateEnum
CREATE TYPE "ContactMessageCategory" AS ENUM ('GENERAL', 'ORDER', 'PAYMENT', 'SHIPPING', 'RETURN_REFUND', 'PRODUCT', 'TECHNICAL', 'OTHER');

-- CreateEnum
CREATE TYPE "ContactMessageStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'REPLIED', 'RESOLVED', 'SPAM');

-- CreateTable
CREATE TABLE "Addresses" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "addressType" "AddressType" NOT NULL,
    "addressLine" VARCHAR(100) NOT NULL,
    "city" VARCHAR(30) NOT NULL,
    "district" VARCHAR(30) NOT NULL,
    "postalCode" VARCHAR(6),
    "country" VARCHAR(30) NOT NULL,
    "landmark" TEXT,
    "deliveryInstructions" VARCHAR(150) NOT NULL,
    "isDefaultBilling" BOOLEAN DEFAULT false,
    "isDefaultShipping" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Banners" (
    "id" UUID NOT NULL,
    "title" VARCHAR(30) NOT NULL,
    "subtitle" VARCHAR(50),
    "description" VARCHAR(100),
    "image" TEXT NOT NULL,
    "mobileImage" TEXT,
    "buttonText" VARCHAR(20),
    "buttonLink" TEXT,
    "position" "BannerPosition" NOT NULL DEFAULT 'HOME_HERO',
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3) NOT NULL,
    "displayOrder" SMALLINT NOT NULL,
    "status" "BannerStatus" NOT NULL DEFAULT 'DRAFT',
    "altText" VARCHAR(50),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brands" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "slug" VARCHAR(60) NOT NULL,
    "description" VARCHAR(255),
    "logo" TEXT NOT NULL,
    "banner" TEXT,
    "website" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" SMALLINT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "status" "BrandStatus" NOT NULL DEFAULT 'INACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carts" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItems" (
    "id" UUID NOT NULL,
    "cartId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "variantId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" UUID NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "slug" VARCHAR(30) NOT NULL,
    "description" VARCHAR(255),
    "image" TEXT NOT NULL,
    "parentId" UUID,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" SMALLINT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "status" "CategoryStatus" NOT NULL DEFAULT 'INACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessages" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(15),
    "subject" VARCHAR(50) NOT NULL,
    "message" TEXT NOT NULL,
    "category" "ContactMessageCategory" NOT NULL DEFAULT 'GENERAL',
    "status" "ContactMessageStatus" NOT NULL DEFAULT 'NEW',
    "adminNote" TEXT,
    "repliedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactMessages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupons" (
    "id" UUID NOT NULL,
    "code" VARCHAR(30) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),
    "type" "CouponType" NOT NULL,
    "value" INTEGER NOT NULL,
    "maxDiscount" INTEGER,
    "minOrderAmount" INTEGER,
    "usageLimit" INTEGER,
    "usagePerUser" SMALLINT,
    "usedCount" INTEGER,
    "startsAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "firstOrderOnly" BOOLEAN NOT NULL DEFAULT false,
    "status" "CouponStatus" NOT NULL DEFAULT 'INACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CouponUsages" (
    "id" UUID NOT NULL,
    "couponId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "usedAt" TIMESTAMP(3) NOT NULL,
    "couponCode" VARCHAR(30) NOT NULL,
    "discountAmount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CouponUsages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faqs" (
    "id" UUID NOT NULL,
    "question" VARCHAR(50) NOT NULL,
    "answer" VARCHAR(50) NOT NULL,
    "category" VARCHAR(30) NOT NULL,
    "displayOrder" SMALLINT NOT NULL,
    "status" "FaqStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventories" (
    "id" UUID NOT NULL,
    "variantId" UUID NOT NULL,
    "quantityOnHand" INTEGER NOT NULL,
    "quantityReserved" INTEGER NOT NULL,
    "reOrderLevel" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" VARCHAR(30) NOT NULL,
    "message" VARCHAR(100) NOT NULL,
    "type" "NotificationType" NOT NULL DEFAULT 'SYSTEM',
    "priority" "NotificationPriority" NOT NULL DEFAULT 'NORMAL',
    "channel" "NotificationChannels" NOT NULL DEFAULT 'IN_APP',
    "accountUrl" TEXT NOT NULL,
    "metaData" JSONB NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "failureReason" VARCHAR(200),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" UUID NOT NULL,
    "orderNumber" VARCHAR(15) NOT NULL,
    "userId" UUID NOT NULL,
    "customerName" VARCHAR(50) NOT NULL,
    "customerEmail" VARCHAR(50) NOT NULL,
    "customerPhone" VARCHAR(15) NOT NULL,
    "status" "ShippingStatus" NOT NULL DEFAULT 'PENDING',
    "subtotal" INTEGER NOT NULL,
    "discountAmount" INTEGER NOT NULL,
    "shippingCost" INTEGER NOT NULL,
    "taxAmount" INTEGER NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "customerNote" VARCHAR(200),
    "adminNote" VARCHAR(200),
    "confirmedAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderAddresses" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "addressLine" VARCHAR(100) NOT NULL,
    "city" VARCHAR(30) NOT NULL,
    "district" VARCHAR(30) NOT NULL,
    "postalCode" VARCHAR(15) NOT NULL,
    "country" VARCHAR(30) NOT NULL,
    "landmark" TEXT NOT NULL,
    "deliveryInstructions" VARCHAR(200),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderAddresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItems" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "variantId" UUID NOT NULL,
    "brandId" UUID NOT NULL,
    "description" VARCHAR(255),
    "categories" TEXT NOT NULL,
    "productName" VARCHAR(100) NOT NULL,
    "productSlug" VARCHAR(110) NOT NULL,
    "productImage" TEXT NOT NULL,
    "sku" VARCHAR(50) NOT NULL,
    "variantName" VARCHAR(100) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" INTEGER NOT NULL,
    "discountAmount" INTEGER NOT NULL DEFAULT 0,
    "totalPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "method" "PaymentMethod" NOT NULL DEFAULT 'CASH_ON',
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "description" TEXT,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'BDT',
    "gatewayInfo" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" UUID NOT NULL,
    "brandId" UUID NOT NULL,
    "sizeChartId" UUID,
    "name" VARCHAR(50) NOT NULL,
    "slug" VARCHAR(60) NOT NULL,
    "shortDescription" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER,
    "salePrice" INTEGER,
    "image" TEXT NOT NULL,
    "status" "ProductStatus" NOT NULL DEFAULT 'DRAFT',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isNewArrival" BOOLEAN NOT NULL DEFAULT false,
    "isBestSeller" BOOLEAN NOT NULL DEFAULT false,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImages" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "url" VARCHAR(50) NOT NULL,
    "alt" VARCHAR(50),
    "logo" VARCHAR(50),
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" SMALLINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductReviews" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" TEXT,
    "comment" VARCHAR(100) NOT NULL,
    "isVerifiedPurchase" BOOLEAN NOT NULL DEFAULT false,
    "status" "ProductReviewStatus" NOT NULL DEFAULT 'PENDING',
    "helpfulContent" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductReviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariants" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "sku" VARCHAR(20) NOT NULL,
    "barcode" TEXT,
    "color" VARCHAR(15),
    "size" VARCHAR(5),
    "colorCode" VARCHAR(10),
    "price" INTEGER NOT NULL,
    "salePrice" INTEGER,
    "stock" INTEGER NOT NULL,
    "reservedStock" INTEGER NOT NULL,
    "lowStockThreshold" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "status" "ProductVariantStatus" NOT NULL DEFAULT 'INACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductVariants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Refunds" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "paymentId" UUID NOT NULL,
    "refundNumber" VARCHAR(10) NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" VARCHAR(5) NOT NULL,
    "description" VARCHAR(255),
    "status" "RefundStatus" NOT NULL DEFAULT 'PENDING',
    "gatewayRefundId" TEXT,
    "transactionReference" TEXT,
    "processedBy" TEXT NOT NULL,
    "processedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Refunds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shippings" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "courierName" VARCHAR(30),
    "courierService" VARCHAR(30),
    "trackingNumber" TEXT,
    "consignmentId" TEXT,
    "status" "ShippingStatus" NOT NULL DEFAULT 'PENDING',
    "estimatedDelivery" TIMESTAMP(3),
    "shippingAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "trackingUrl" TEXT,
    "deliveryNote" VARCHAR(200),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shippings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" UUID NOT NULL,
    "key" VARCHAR(30) NOT NULL,
    "value" JSON NOT NULL,
    "group" VARCHAR(30) NOT NULL,
    "label" VARCHAR(30),
    "description" VARCHAR(200),
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SizeCharts" (
    "id" UUID NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "categoryId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SizeCharts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SizeChartMeasurements" (
    "id" UUID NOT NULL,
    "sizeChartId" UUID NOT NULL,
    "size" VARCHAR(20) NOT NULL,
    "measurements" JSONB NOT NULL,
    "sortOrder" SMALLINT NOT NULL,

    CONSTRAINT "SizeChartMeasurements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockManagements" (
    "id" UUID NOT NULL,
    "inventoryId" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "orderItemId" UUID NOT NULL,
    "performedById" UUID NOT NULL,
    "type" "StockManagementType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "stockBefore" INTEGER NOT NULL,
    "stockAfter" INTEGER NOT NULL,
    "note" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StockManagements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "password" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "phone" VARCHAR(15),
    "image" TEXT,
    "role" "UserRoles" NOT NULL DEFAULT 'CUSTOMER',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "emailVerifiedAt" TIMESTAMP(3),
    "phoneVerifiedAt" TIMESTAMP(3),
    "lastLoggedInAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wishlists" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wishlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishlistItems" (
    "id" UUID NOT NULL,
    "wishlistId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WishlistItems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Addresses_userId_idx" ON "Addresses"("userId");

-- CreateIndex
CREATE INDEX "Addresses_userId_isDefaultBilling_idx" ON "Addresses"("userId", "isDefaultBilling");

-- CreateIndex
CREATE INDEX "Addresses_userId_isDefaultShipping_idx" ON "Addresses"("userId", "isDefaultShipping");

-- CreateIndex
CREATE INDEX "Banners_status_position_idx" ON "Banners"("status", "position");

-- CreateIndex
CREATE INDEX "Banners_displayOrder_idx" ON "Banners"("displayOrder");

-- CreateIndex
CREATE INDEX "Banners_startsAt_endsAt_idx" ON "Banners"("startsAt", "endsAt");

-- CreateIndex
CREATE INDEX "Brands_status_idx" ON "Brands"("status");

-- CreateIndex
CREATE INDEX "Brands_isFeatured_idx" ON "Brands"("isFeatured");

-- CreateIndex
CREATE INDEX "Brands_displayOrder_idx" ON "Brands"("displayOrder");

-- CreateIndex
CREATE INDEX "CartItems_productId_idx" ON "CartItems"("productId");

-- CreateIndex
CREATE INDEX "CartItems_variantId_idx" ON "CartItems"("variantId");

-- CreateIndex
CREATE UNIQUE INDEX "CartItems_cartId_variantId_key" ON "CartItems"("cartId", "variantId");

-- CreateIndex
CREATE INDEX "Categories_parentId_idx" ON "Categories"("parentId");

-- CreateIndex
CREATE INDEX "Categories_status_idx" ON "Categories"("status");

-- CreateIndex
CREATE INDEX "Categories_isFeatured_idx" ON "Categories"("isFeatured");

-- CreateIndex
CREATE INDEX "Categories_displayOrder_idx" ON "Categories"("displayOrder");

-- CreateIndex
CREATE INDEX "ContactMessages_userId_idx" ON "ContactMessages"("userId");

-- CreateIndex
CREATE INDEX "ContactMessages_status_createdAt_idx" ON "ContactMessages"("status", "createdAt");

-- CreateIndex
CREATE INDEX "ContactMessages_email_idx" ON "ContactMessages"("email");

-- CreateIndex
CREATE INDEX "ContactMessages_createdAt_idx" ON "ContactMessages"("createdAt");

-- CreateIndex
CREATE INDEX "Coupons_status_idx" ON "Coupons"("status");

-- CreateIndex
CREATE INDEX "Coupons_expiresAt_idx" ON "Coupons"("expiresAt");

-- CreateIndex
CREATE INDEX "CouponUsages_couponId_userId_idx" ON "CouponUsages"("couponId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "CouponUsages_couponId_userId_orderId_key" ON "CouponUsages"("couponId", "userId", "orderId");

-- CreateIndex
CREATE INDEX "Faqs_status_category_idx" ON "Faqs"("status", "category");

-- CreateIndex
CREATE INDEX "Faqs_displayOrder_idx" ON "Faqs"("displayOrder");

-- CreateIndex
CREATE INDEX "Notifications_userId_isRead_createdAt_idx" ON "Notifications"("userId", "isRead", "createdAt");

-- CreateIndex
CREATE INDEX "Notifications_type_createdAt_idx" ON "Notifications"("type", "createdAt");

-- CreateIndex
CREATE INDEX "Notifications_channel_sentAt_idx" ON "Notifications"("channel", "sentAt");

-- CreateIndex
CREATE INDEX "Orders_userId_idx" ON "Orders"("userId");

-- CreateIndex
CREATE INDEX "Orders_status_idx" ON "Orders"("status");

-- CreateIndex
CREATE INDEX "Orders_createdAt_idx" ON "Orders"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "OrderAddresses_orderId_key" ON "OrderAddresses"("orderId");

-- CreateIndex
CREATE INDEX "OrderItems_orderId_idx" ON "OrderItems"("orderId");

-- CreateIndex
CREATE INDEX "OrderItems_productId_idx" ON "OrderItems"("productId");

-- CreateIndex
CREATE INDEX "OrderItems_variantId_idx" ON "OrderItems"("variantId");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_orderId_key" ON "Payments"("orderId");

-- CreateIndex
CREATE INDEX "Payments_orderId_idx" ON "Payments"("orderId");

-- CreateIndex
CREATE INDEX "Payments_status_idx" ON "Payments"("status");

-- CreateIndex
CREATE INDEX "Payments_method_idx" ON "Payments"("method");

-- CreateIndex
CREATE INDEX "Products_brandId_idx" ON "Products"("brandId");

-- CreateIndex
CREATE INDEX "Products_status_idx" ON "Products"("status");

-- CreateIndex
CREATE INDEX "Products_isFeatured_idx" ON "Products"("isFeatured");

-- CreateIndex
CREATE INDEX "Products_createdAt_idx" ON "Products"("createdAt");

-- CreateIndex
CREATE INDEX "ProductImages_productId_idx" ON "ProductImages"("productId");

-- CreateIndex
CREATE INDEX "ProductReviews_productId_status_idx" ON "ProductReviews"("productId", "status");

-- CreateIndex
CREATE INDEX "ProductReviews_userId_idx" ON "ProductReviews"("userId");

-- CreateIndex
CREATE INDEX "ProductReviews_rating_idx" ON "ProductReviews"("rating");

-- CreateIndex
CREATE UNIQUE INDEX "ProductReviews_userId_productId_key" ON "ProductReviews"("userId", "productId");

-- CreateIndex
CREATE INDEX "ProductVariants_productId_idx" ON "ProductVariants"("productId");

-- CreateIndex
CREATE INDEX "ProductVariants_status_idx" ON "ProductVariants"("status");

-- CreateIndex
CREATE INDEX "Refunds_orderId_idx" ON "Refunds"("orderId");

-- CreateIndex
CREATE INDEX "Refunds_paymentId_idx" ON "Refunds"("paymentId");

-- CreateIndex
CREATE INDEX "Refunds_status_idx" ON "Refunds"("status");

-- CreateIndex
CREATE INDEX "Refunds_createdAt_idx" ON "Refunds"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Shippings_orderId_key" ON "Shippings"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Shippings_trackingNumber_key" ON "Shippings"("trackingNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Shippings_consignmentId_key" ON "Shippings"("consignmentId");

-- CreateIndex
CREATE INDEX "Shippings_orderId_idx" ON "Shippings"("orderId");

-- CreateIndex
CREATE INDEX "Shippings_status_idx" ON "Shippings"("status");

-- CreateIndex
CREATE INDEX "Shippings_consignmentId_idx" ON "Shippings"("consignmentId");

-- CreateIndex
CREATE INDEX "SiteSettings_group_idx" ON "SiteSettings"("group");

-- CreateIndex
CREATE INDEX "SiteSettings_isPublic_idx" ON "SiteSettings"("isPublic");

-- CreateIndex
CREATE INDEX "SizeChartMeasurements_sizeChartId_sortOrder_idx" ON "SizeChartMeasurements"("sizeChartId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "SizeChartMeasurements_sizeChartId_size_key" ON "SizeChartMeasurements"("sizeChartId", "size");

-- CreateIndex
CREATE INDEX "StockManagements_inventoryId_createdAt_idx" ON "StockManagements"("inventoryId", "createdAt");

-- CreateIndex
CREATE INDEX "StockManagements_orderId_idx" ON "StockManagements"("orderId");

-- CreateIndex
CREATE INDEX "StockManagements_type_idx" ON "StockManagements"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_key" ON "Users"("phone");

-- CreateIndex
CREATE INDEX "Users_role_idx" ON "Users"("role");

-- CreateIndex
CREATE INDEX "Users_status_idx" ON "Users"("status");

-- CreateIndex
CREATE INDEX "Users_createdAt_idx" ON "Users"("createdAt");

-- CreateIndex
CREATE INDEX "Users_isDeleted_idx" ON "Users"("isDeleted");

-- CreateIndex
CREATE INDEX "WishlistItems_productId_idx" ON "WishlistItems"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "WishlistItems_wishlistId_productId_key" ON "WishlistItems"("wishlistId", "productId");

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carts" ADD CONSTRAINT "Carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactMessages" ADD CONSTRAINT "ContactMessages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CouponUsages" ADD CONSTRAINT "CouponUsages_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CouponUsages" ADD CONSTRAINT "CouponUsages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CouponUsages" ADD CONSTRAINT "CouponUsages_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventories" ADD CONSTRAINT "Inventories_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderAddresses" ADD CONSTRAINT "OrderAddresses_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_sizeChartId_fkey" FOREIGN KEY ("sizeChartId") REFERENCES "SizeCharts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImages" ADD CONSTRAINT "ProductImages_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReviews" ADD CONSTRAINT "ProductReviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReviews" ADD CONSTRAINT "ProductReviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariants" ADD CONSTRAINT "ProductVariants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refunds" ADD CONSTRAINT "Refunds_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refunds" ADD CONSTRAINT "Refunds_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shippings" ADD CONSTRAINT "Shippings_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SizeChartMeasurements" ADD CONSTRAINT "SizeChartMeasurements_sizeChartId_fkey" FOREIGN KEY ("sizeChartId") REFERENCES "SizeCharts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockManagements" ADD CONSTRAINT "StockManagements_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockManagements" ADD CONSTRAINT "StockManagements_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockManagements" ADD CONSTRAINT "StockManagements_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockManagements" ADD CONSTRAINT "StockManagements_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlists" ADD CONSTRAINT "Wishlists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItems" ADD CONSTRAINT "WishlistItems_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItems" ADD CONSTRAINT "WishlistItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
