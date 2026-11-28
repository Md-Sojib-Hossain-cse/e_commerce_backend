import { createRequire } from "module";
  const require = createRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import pino from "pino-http";

// src/config/index.ts
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
var config = {
  port: process.env.PORT || 5e3,
  database_url: process.env.DATABASE_URL,
  frontend_url_dev: process.env.FRONTEND_URL_DEV || "http://localhost:3000",
  node_env: process.env.NODE_ENV || "development",
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || 12,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || "1d",
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_redirect_uri: process.env.GOOGLE_REDIRECT_URI,
  cloudinary_client_name: process.env.CLOUDINARY_CLIENT_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  resend_api_key: process.env.RESEND_API_KEY,
  smtp_pass: process.env.SMTP_PASS,
  password_reset_secret: process.env.PASSWORD_RESET_SECRET,
  password_reset_expires_in: process.env.PASSWORD_RESET_EXPIRES_IN || "15m",
  password_reset_salt: process.env.PASSWORD_RESET_SALT
};

// src/utils/sendResponse.ts
var sendResponse = (res, data) => {
  const statusCode = data.statusCode || 500;
  res.status(statusCode).json({
    success: data.success,
    message: data.message || "Internal Server Error!",
    statusCode,
    data: data.data,
    meta: data.meta
  });
};

// src/middlewares/notFound.ts
var notFound = (req, res) => {
  sendResponse(res, {
    success: false,
    message: "Route Not Found!",
    statusCode: 404
  });
};

// src/routes/index.ts
import { Router as Router5 } from "express";

// src/modules/auth/auth.routes.ts
import { Router } from "express";

// src/utils/jwtUtils.ts
import jwt from "jsonwebtoken";
var generateToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};
var verifyToken = (token, secret) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return {
      success: true,
      data: verifiedToken
    };
  } catch (error) {
    return {
      success: false,
      error
    };
  }
};
var jwtUtils = {
  generateToken,
  verifyToken
};

// src/modules/auth/auth.service.ts
import bcrypt from "bcryptjs";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import "process";
import * as path2 from "path";
import { fileURLToPath } from "url";
import "@prisma/client/runtime/client";

// generated/prisma/enums.ts
var UserRoles = {
  CUSTOMER: "CUSTOMER",
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  STUFF: "STUFF"
};
var UserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED"
};
var CategoryStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  ARCHIVED: "ARCHIVED"
};

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config2 = {
  "previewFeatures": [],
  "clientVersion": "7.10.1",
  "engineVersion": "d1b3f377ca835d73fd50954a5e22128b9ebdd6b8",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Addresses {\n  id                   String      @id @default(uuid()) @db.Uuid\n  userId               String      @db.Uuid\n  name                 String      @db.VarChar(50)\n  phone                String      @db.VarChar(15)\n  addressType          AddressType\n  addressLine          String      @db.VarChar(100)\n  city                 String      @db.VarChar(30)\n  district             String      @db.VarChar(30)\n  postalCode           String?     @db.VarChar(6)\n  country              String      @db.VarChar(30)\n  landmark             String?     @db.Text()\n  deliveryInstructions String      @db.VarChar(150)\n  isDefaultBilling     Boolean?    @default(false)\n  isDefaultShipping    Boolean?    @default(false)\n  createdAt            DateTime?   @default(now())\n  updatedAt            DateTime?   @updatedAt()\n\n  user Users @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@index([userId, isDefaultBilling])\n  @@index([userId, isDefaultShipping])\n}\n\nmodel Banners {\n  id           String         @id @default(uuid()) @db.Uuid\n  title        String         @db.VarChar(30)\n  subtitle     String?        @db.VarChar(50)\n  description  String?        @db.VarChar(100)\n  image        String         @db.Text()\n  mobileImage  String?        @db.Text()\n  buttonText   String?        @db.VarChar(20)\n  buttonLink   String?        @db.Text()\n  position     BannerPosition @default(HOME_HERO)\n  startsAt     DateTime?\n  endsAt       DateTime\n  displayOrder Int            @db.SmallInt\n  status       BannerStatus   @default(DRAFT)\n  altText      String?        @db.VarChar(50)\n  createdAt    DateTime       @default(now())\n  updatedAt    DateTime       @updatedAt()\n\n  @@index([status, position])\n  @@index([displayOrder])\n  @@index([startsAt, endsAt])\n}\n\nmodel Brands {\n  id              String      @id @default(uuid()) @db.Uuid\n  name            String      @unique @db.VarChar(50)\n  slug            String      @unique @db.VarChar(60)\n  description     String?     @db.VarChar(255)\n  logo            String      @db.Text()\n  logoPublicId    String      @db.Text()\n  banner          String?     @db.Text()\n  bannerPublicId  String?     @db.Text()\n  website         String?     @db.Text()\n  isFeatured      Boolean     @default(false)\n  displayOrder    Int         @db.SmallInt\n  metaTitle       String?     @db.Text()\n  metaDescription String?     @db.Text()\n  status          BrandStatus @default(INACTIVE)\n\n  products Products[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt()\n\n  @@index([status])\n  @@index([isFeatured])\n  @@index([displayOrder])\n}\n\nmodel Carts {\n  id          String   @id @default(uuid()) @db.Uuid\n  userId      String   @unique @db.Uuid\n  totalAmount Decimal  @db.Decimal(10, 2)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt()\n\n  user Users @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  items CartItems[]\n}\n\nmodel CartItems {\n  id        String   @id @default(uuid()) @db.Uuid\n  cartId    String   @db.Uuid\n  variantId String   @db.Uuid\n  quantity  Int\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt()\n\n  cart    Carts           @relation(fields: [cartId], references: [id], onDelete: Cascade)\n  variant ProductVariants @relation(fields: [variantId], references: [id], onDelete: Cascade)\n\n  @@unique([cartId, variantId])\n  @@index([variantId])\n}\n\nmodel Categories {\n  id              String         @id @default(uuid()) @db.Uuid\n  creatorId       String         @db.Uuid\n  name            String         @unique @db.VarChar(25)\n  slug            String?        @unique @db.VarChar(30)\n  description     String?        @db.VarChar(255)\n  image           String?        @db.Text()\n  imagePublicId   String?        @db.Text()\n  parentId        String?        @db.Uuid\n  isFeatured      Boolean        @default(false)\n  displayOrder    Int?           @db.SmallInt\n  metaTitle       String?        @db.Text()\n  metaDescription String?        @db.Text()\n  isDeleted       Boolean        @default(false)\n  status          CategoryStatus @default(INACTIVE)\n  createdAt       DateTime       @default(now())\n  updatedAt       DateTime       @updatedAt()\n\n  createdBy       Users              @relation(fields: [creatorId], references: [id])\n  parent          Categories?        @relation("CategoryHierarchy", fields: [parentId], references: [id], onDelete: SetNull)\n  children        Categories[]       @relation("CategoryHierarchy")\n  categoryProduct CategoryProducts[]\n\n  @@index([parentId])\n  @@index([status])\n  @@index([isFeatured])\n  @@index([displayOrder])\n}\n\nmodel CategoryProducts {\n  id         String @id @db.Uuid\n  productId  String @db.Uuid\n  categoryId String @db.Uuid\n\n  category Categories @relation(fields: [categoryId], references: [id])\n  product  Products   @relation(fields: [productId], references: [id])\n}\n\nmodel ContactMessages {\n  id        String                 @id @default(uuid()) @db.Uuid\n  userId    String?                @db.Uuid\n  name      String                 @db.VarChar(50)\n  email     String                 @db.VarChar(50)\n  phone     String?                @db.VarChar(15)\n  subject   String                 @db.VarChar(50)\n  message   String                 @db.Text()\n  category  ContactMessageCategory @default(GENERAL)\n  status    ContactMessageStatus   @default(NEW)\n  adminNote String?                @db.Text()\n  repliedAt DateTime?\n  createdAt DateTime               @default(now())\n  updatedAt DateTime               @updatedAt()\n\n  user Users? @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@index([status, createdAt])\n  @@index([email])\n  @@index([createdAt])\n}\n\nmodel Coupons {\n  id             String       @id @default(uuid()) @db.Uuid\n  code           String       @unique @db.VarChar(30)\n  name           String       @db.VarChar(50)\n  description    String?      @db.VarChar(255)\n  type           CouponType\n  value          Decimal      @db.Decimal(10, 2)\n  maxDiscount    Decimal?     @db.Decimal(10, 2)\n  minOrderAmount Decimal?     @db.Decimal(10, 2)\n  usageLimit     Int?\n  usagePerUser   Int?\n  usedCount      Int?         @default(0)\n  startsAt       DateTime?\n  expiresAt      DateTime?\n  firstOrderOnly Boolean      @default(false)\n  status         CouponStatus @default(INACTIVE)\n  createdAt      DateTime     @default(now())\n  updatedAt      DateTime     @updatedAt()\n\n  usages CouponUsages[]\n\n  @@index([status])\n  @@index([expiresAt])\n}\n\nmodel CouponUsages {\n  id             String   @id @default(uuid()) @db.Uuid\n  couponId       String   @db.Uuid\n  userId         String   @db.Uuid\n  orderId        String   @unique @db.Uuid\n  usedAt         DateTime\n  couponCode     String   @db.VarChar(30)\n  discountAmount Decimal  @default(0) @db.Decimal(10, 2)\n  createdAt      DateTime @default(now())\n  updatedAt      DateTime @updatedAt()\n\n  coupon Coupons @relation(fields: [couponId], references: [id])\n  user   Users   @relation(fields: [userId], references: [id])\n  order  Orders  @relation(fields: [orderId], references: [id], onDelete: Cascade)\n\n  @@unique([couponId, userId, orderId])\n  @@index([couponId, userId])\n}\n\nenum UserRoles {\n  CUSTOMER\n  SUPER_ADMIN\n  ADMIN\n  STUFF\n}\n\nenum UserStatus {\n  ACTIVE\n  INACTIVE\n  SUSPENDED\n}\n\nenum AddressType {\n  HOME\n  OFFICE\n  OTHER\n}\n\nenum StockManagementType {\n  PURCHASE\n  SALE\n  RETURN\n  RESTOCK\n  ADJUSTMENT\n  RESERVED\n  RELEASED\n}\n\nenum ProductVariantStatus {\n  ACTIVE\n  INACTIVE\n  OUT_OF_STOCK\n}\n\nenum ProductStatus {\n  DRAFT\n  ACTIVE\n  INACTIVE\n  ARCHIVED\n}\n\nenum CategoryStatus {\n  ACTIVE\n  INACTIVE\n  ARCHIVED\n}\n\nenum BrandStatus {\n  ACTIVE\n  INACTIVE\n  ARCHIVED\n}\n\nenum ProductReviewStatus {\n  PENDING\n  APPROVED\n  REJECTED\n}\n\nenum CouponType {\n  PERCENTAGE\n  FIXED_AMOUNT\n}\n\nenum CouponStatus {\n  ACTIVE\n  INACTIVE\n  EXPIRES\n}\n\nenum OrderStatus {\n  PENDING\n  CONFIRMED\n  PROCESSING\n  READY_TO_SHIP\n  SHIPPED\n  OUT_FOR_DELIVERY\n  DELIVERED\n  CANCELLED\n  RETURNED\n  FAILED\n}\n\nenum ShippingStatus {\n  PENDING\n  CONFIRMED\n  PICKED_UP\n  IN_TRANSIT\n  OUT_FOR_DELIVERY\n  DELIVERED\n  FAILED\n  RETURNED\n}\n\nenum PaymentMethod {\n  CASH_ON\n  CARD\n  MOBILE_BANKING\n}\n\nenum PaymentStatus {\n  PENDING\n  PROCESSING\n  PAID\n  FAILED\n  CANCELLED\n  REFUNDED\n  PARTIALLY_REFUNDED\n}\n\nenum RefundStatus {\n  PENDING\n  APPROVED\n  PROCESSING\n  COMPLETED\n  REJECTED\n  FAILED\n  CANCELLED\n}\n\nenum GatewayProvider {\n  CASH_ON\n  BKASH\n  STRIPE\n  SSLCOMMERZ\n}\n\nenum BannerPosition {\n  HOME_HERO\n  HOME_MIDDLE\n  HOME_BOTTOM\n  CATEGORY\n}\n\nenum BannerStatus {\n  DRAFT\n  ARCHIVED\n  INACTIVE\n  ACTIVE\n}\n\nenum FaqStatus {\n  DRAFT\n  PUBLISHED\n  ARCHIVED\n}\n\nenum NotificationType {\n  ORDER\n  PAYMENT\n  SHIPPING\n  PROMOTION\n  ACCOUNT\n  SYSTEM\n}\n\nenum NotificationPriority {\n  LOW\n  NORMAL\n  HIGH\n  URGENT\n}\n\nenum NotificationChannels {\n  IN_APP\n  EMAIL\n  SMS\n  PUSH\n}\n\nenum ContactMessageCategory {\n  GENERAL\n  ORDER\n  PAYMENT\n  SHIPPING\n  RETURN_REFUND\n  PRODUCT\n  TECHNICAL\n  OTHER\n}\n\nenum ContactMessageStatus {\n  NEW\n  IN_PROGRESS\n  REPLIED\n  RESOLVED\n  SPAM\n}\n\nmodel Faqs {\n  id           String    @id @default(uuid()) @db.Uuid\n  question     String    @db.VarChar(50)\n  answer       String    @db.VarChar(50)\n  category     String    @db.VarChar(30)\n  displayOrder Int       @db.SmallInt\n  status       FaqStatus @default(DRAFT)\n  createdAt    DateTime  @default(now())\n  updatedAt    DateTime  @updatedAt()\n\n  @@index([status, category])\n  @@index([displayOrder])\n}\n\nmodel Inventories {\n  id               String   @id @default(uuid()) @db.Uuid\n  variantId        String   @unique @db.Uuid\n  quantityOnHand   Int\n  quantityReserved Int\n  reOrderLevel     Int\n  createdAt        DateTime @default(now())\n  updatedAt        DateTime @updatedAt()\n\n  variant ProductVariants @relation(fields: [variantId], references: [id], onDelete: Cascade)\n\n  stocks StockManagements[]\n}\n\nmodel Notifications {\n  id            String               @id @default(uuid()) @db.Uuid\n  userId        String               @db.Uuid\n  title         String               @db.VarChar(30)\n  message       String               @db.VarChar(100)\n  type          NotificationType     @default(SYSTEM)\n  priority      NotificationPriority @default(NORMAL)\n  channel       NotificationChannels @default(IN_APP)\n  accountUrl    String               @db.Text()\n  metaData      Json                 @db.JsonB\n  isRead        Boolean              @default(false)\n  readAt        DateTime?\n  sentAt        DateTime?\n  failedAt      DateTime?\n  failureReason String?              @db.VarChar(200)\n  createdAt     DateTime             @default(now())\n  updatedAt     DateTime             @updatedAt()\n\n  user Users @relation(fields: [userId], references: [id])\n\n  @@index([userId, isRead, createdAt])\n  @@index([type, createdAt])\n  @@index([channel, sentAt])\n}\n\nmodel Orders {\n  id             String      @id @default(uuid()) @db.Uuid\n  orderNumber    String      @db.VarChar(15)\n  userId         String      @db.Uuid\n  customerName   String      @db.VarChar(50)\n  customerEmail  String      @db.VarChar(50)\n  customerPhone  String      @db.VarChar(15)\n  payment        Payments?\n  shipping       Shippings?\n  status         OrderStatus @default(PENDING)\n  subtotal       Decimal     @db.Decimal(10, 2)\n  discountAmount Decimal     @db.Decimal(10, 2)\n  shippingCost   Decimal     @db.Decimal(10, 2)\n  taxAmount      Decimal     @db.Decimal(10, 2)\n  totalAmount    Decimal     @db.Decimal(10, 2)\n  customerNote   String?     @db.VarChar(200)\n  adminNote      String?     @db.VarChar(200)\n  confirmedAt    DateTime?\n  cancelledAt    DateTime?\n  createdAt      DateTime    @default(now())\n  updatedAt      DateTime    @updatedAt()\n\n  user Users @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  couponUsages     CouponUsages?\n  refunds          Refunds?\n  shippingAddress  OrderAddresses?\n  items            OrderItems[]\n  stockManagements StockManagements[]\n\n  @@index([userId])\n  @@index([status])\n  @@index([createdAt])\n}\n\nmodel OrderAddresses {\n  id                   String   @id @default(uuid()) @db.Uuid\n  orderId              String   @unique @db.Uuid\n  name                 String   @db.VarChar(50)\n  phone                String   @db.VarChar(15)\n  addressLine          String   @db.VarChar(100)\n  city                 String   @db.VarChar(30)\n  district             String   @db.VarChar(30)\n  postalCode           String   @db.VarChar(15)\n  country              String   @db.VarChar(30)\n  landmark             String   @db.Text()\n  deliveryInstructions String?  @db.VarChar(200)\n  createdAt            DateTime @default(now())\n  updatedAt            DateTime @updatedAt()\n\n  order Orders @relation(fields: [orderId], references: [id], onDelete: Cascade)\n}\n\nmodel OrderItems {\n  id             String   @id @default(uuid()) @db.Uuid\n  orderId        String   @db.Uuid\n  variantId      String   @db.Uuid\n  description    String?  @db.VarChar(255)\n  categories     String\n  productName    String   @db.VarChar(100)\n  productSlug    String   @db.VarChar(110)\n  productImage   String   @db.Text()\n  sku            String   @db.VarChar(50)\n  variantName    String   @db.VarChar(100)\n  quantity       Int\n  unitPrice      Decimal  @db.Decimal(10, 2)\n  discountAmount Decimal  @default(0) @db.Decimal(10, 2)\n  totalPrice     Decimal  @db.Decimal(10, 2)\n  createdAt      DateTime @default(now())\n  updatedAt      DateTime @updatedAt()\n\n  order   Orders          @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  variant ProductVariants @relation(fields: [variantId], references: [id], onDelete: Cascade)\n\n  stockManagements StockManagements[]\n\n  @@index([orderId])\n  @@index([variantId])\n}\n\nmodel PasswordReset {\n  id        String    @id @default(uuid()) @db.Uuid\n  userId    String    @db.Uuid\n  tokenHash String    @unique @db.Text()\n  expiresAt DateTime\n  usedAt    DateTime?\n  createdAt DateTime  @default(now())\n\n  user Users @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n}\n\nmodel Payments {\n  id          String        @id @default(uuid()) @db.Uuid\n  orderId     String        @unique @db.Uuid\n  method      PaymentMethod @default(CASH_ON)\n  status      PaymentStatus @default(PENDING)\n  description String?       @db.Text()\n  amount      Decimal       @db.Decimal(10, 2)\n  currency    String        @default("BDT")\n  gatewayInfo Json          @db.JsonB\n  createdAt   DateTime      @default(now())\n  updatedAt   DateTime      @updatedAt()\n\n  order Orders @relation(fields: [orderId], references: [id], onDelete: Restrict)\n\n  refunds Refunds?\n\n  @@index([orderId])\n  @@index([status])\n  @@index([method])\n}\n\nmodel Products {\n  id               String        @id @default(uuid()) @db.Uuid\n  brandId          String?       @db.Uuid\n  sizeChartId      String?       @db.Uuid\n  name             String        @db.VarChar(50)\n  slug             String        @db.VarChar(60)\n  shortDescription String        @db.VarChar(100)\n  description      String        @db.Text()\n  price            Decimal?      @db.Decimal(10, 2)\n  salePrice        Decimal?      @db.Decimal(10, 2)\n  image            String        @db.Text()\n  status           ProductStatus @default(DRAFT)\n  isFeatured       Boolean       @default(false)\n  isNewArrival     Boolean       @default(false)\n  isBestSeller     Boolean       @default(false)\n  metaTitle        String?       @db.Text()\n  metaDescription  String?       @db.Text()\n  publishedAt      DateTime?\n  createdAt        DateTime      @default(now())\n  updatedAt        DateTime      @updatedAt()\n\n  sizeChart SizeCharts? @relation(fields: [sizeChartId], references: [id], onDelete: SetNull)\n  brand     Brands?     @relation(fields: [brandId], references: [id], onDelete: SetNull)\n\n  gallery          ProductImages[]\n  variant          ProductVariants[]\n  review           ProductReviews[]\n  wishlistItems    WishlistItems[]\n  categoryProducts CategoryProducts[]\n\n  @@index([brandId])\n  @@index([status])\n  @@index([isFeatured])\n  @@index([createdAt])\n}\n\nmodel ProductImages {\n  id        String   @id @default(uuid()) @db.Uuid\n  productId String   @db.Uuid\n  url       String   @db.VarChar(50)\n  alt       String?  @db.VarChar(50)\n  logo      String?  @db.VarChar(50)\n  isPrimary Boolean  @default(false)\n  sortOrder Int      @db.SmallInt\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt()\n\n  product Products @relation(fields: productId, references: [id], onDelete: Cascade)\n\n  @@index([productId])\n}\n\nmodel ProductReviews {\n  id                 String              @id @default(uuid()) @db.Uuid\n  productId          String              @db.Uuid\n  userId             String              @db.Uuid\n  rating             Int\n  title              String?\n  comment            String              @db.VarChar(100)\n  isVerifiedPurchase Boolean             @default(false)\n  status             ProductReviewStatus @default(PENDING)\n  helpfulContent     Int?\n  createdAt          DateTime            @default(now())\n  updatedAt          DateTime            @updatedAt()\n\n  product Products @relation(fields: [productId], references: [id], onDelete: Cascade)\n  user    Users    @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([userId, productId])\n  @@index([productId, status])\n  @@index([userId])\n  @@index([rating])\n}\n\nmodel ProductVariants {\n  id                String               @id @default(uuid()) @db.Uuid\n  productId         String               @db.Uuid\n  sku               String               @db.VarChar(20)\n  barcode           String?              @db.Text()\n  color             String?              @db.VarChar(15)\n  size              String?              @db.VarChar(5)\n  colorCode         String?              @db.VarChar(10)\n  price             Decimal              @db.Decimal(10, 2)\n  salePrice         Decimal?             @db.Decimal(10, 2)\n  stock             Int\n  reservedStock     Int\n  lowStockThreshold Int\n  image             String               @db.Text()\n  status            ProductVariantStatus @default(INACTIVE)\n  createdAt         DateTime             @default(now())\n  updatedAt         DateTime             @updatedAt()\n\n  product Products @relation(fields: [productId], references: [id], onDelete: Cascade)\n\n  inventories Inventories?\n  cartItems   CartItems[]\n  orderItems  OrderItems[]\n\n  @@index([productId])\n  @@index([status])\n}\n\nmodel Refunds {\n  id                   String       @id @default(uuid()) @db.Uuid\n  orderId              String       @unique @db.Uuid\n  paymentId            String       @unique @db.Uuid\n  refundNumber         String       @db.VarChar(10)\n  amount               Decimal      @db.Decimal(10, 2)\n  currency             String       @db.VarChar(5)\n  description          String?      @db.VarChar(255)\n  status               RefundStatus @default(PENDING)\n  gatewayRefundId      String?      @db.Text()\n  transactionReference String?      @db.Text()\n  processedBy          String\n  processedAt          DateTime?\n  completedAt          DateTime?\n  createdAt            DateTime     @default(now())\n  updatedAt            DateTime     @updatedAt()\n\n  order   Orders   @relation(fields: [orderId], references: [id], onDelete: Restrict)\n  payment Payments @relation(fields: [paymentId], references: [id], onDelete: Restrict)\n\n  @@index([orderId])\n  @@index([paymentId])\n  @@index([status])\n  @@index([createdAt])\n}\n\nmodel Shippings {\n  id                String         @id @default(uuid()) @db.Uuid\n  orderId           String         @unique @db.Uuid\n  courierName       String?        @db.VarChar(30)\n  courierService    String?        @db.VarChar(30)\n  trackingNumber    String?        @unique @db.Text()\n  consignmentId     String?        @unique @db.Text()\n  status            ShippingStatus @default(PENDING)\n  estimatedDelivery DateTime?\n  shippingAt        DateTime?\n  deliveredAt       DateTime?\n  trackingUrl       String?        @db.Text()\n  deliveryNote      String?        @db.VarChar(200)\n  createdAt         DateTime       @default(now())\n  updatedAt         DateTime       @updatedAt()\n\n  order Orders @relation(fields: [orderId], references: [id], onDelete: Cascade)\n\n  @@index([orderId])\n  @@index([status])\n  @@index([consignmentId])\n}\n\nmodel SiteSettings {\n  id          String   @id @default(uuid()) @db.Uuid\n  key         String   @db.VarChar(30)\n  value       Json     @db.Json\n  group       String   @db.VarChar(30)\n  label       String?  @db.VarChar(30)\n  description String?  @db.VarChar(200)\n  isPublic    Boolean  @default(false)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt()\n\n  @@index([group])\n  @@index([isPublic])\n}\n\nmodel SizeCharts {\n  id          String  @id @default(uuid()) @db.Uuid\n  name        String  @db.VarChar(150)\n  description String? @db.Text()\n  categoryId  String? @db.Uuid\n\n  measurements SizeChartMeasurements[]\n  products     Products[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt()\n}\n\nmodel SizeChartMeasurements {\n  id           String @id @default(uuid()) @db.Uuid\n  sizeChartId  String @db.Uuid\n  size         String @db.VarChar(20)\n  measurements Json   @db.JsonB\n  sortOrder    Int    @db.SmallInt\n\n  sizeChart SizeCharts @relation(fields: [sizeChartId], references: [id], onDelete: Cascade)\n\n  @@unique([sizeChartId, size])\n  @@index([sizeChartId, sortOrder])\n}\n\nmodel StockManagements {\n  id            String              @id @default(uuid()) @db.Uuid\n  inventoryId   String              @db.Uuid\n  orderId       String?             @db.Uuid\n  orderItemId   String?             @db.Uuid\n  performedById String              @db.Uuid\n  type          StockManagementType\n  quantity      Int\n  stockBefore   Int\n  stockAfter    Int\n  note          String?             @db.VarChar(255)\n  createdAt     DateTime            @default(now())\n  updatedAt     DateTime            @updatedAt()\n\n  inventory   Inventories @relation(fields: [inventoryId], references: [id], onDelete: Restrict)\n  order       Orders?     @relation(fields: [orderId], references: [id], onDelete: SetNull)\n  orderItem   OrderItems? @relation(fields: [orderItemId], references: [id], onDelete: SetNull)\n  performedBy Users       @relation(fields: [performedById], references: [id], onDelete: Restrict)\n\n  @@index([inventoryId, createdAt])\n  @@index([orderId])\n  @@index([orderItemId])\n  @@index([type])\n}\n\nmodel Users {\n  id              String     @id @default(uuid()) @db.Uuid\n  email           String     @unique @db.VarChar(50)\n  name            String     @db.VarChar(50)\n  password        String?    @db.Text()\n  googleId        String?    @unique @db.Text()\n  dateOfBirth     DateTime?\n  phone           String?    @unique @db.VarChar(15)\n  image           String?    @db.Text()\n  imagePublicId   String?    @db.Text()\n  role            UserRoles  @default(CUSTOMER)\n  status          UserStatus @default(ACTIVE)\n  emailVerifiedAt DateTime?\n  phoneVerifiedAt DateTime?\n  lastLoggedInAt  DateTime?\n  isDeleted       Boolean    @default(false)\n  tokenVersion    Int?       @default(0)\n  createdAt       DateTime   @default(now())\n  updatedAt       DateTime   @updatedAt()\n\n  carts            Carts?\n  wishlists        Wishlists?\n  addresses        Addresses[]\n  contactMessages  ContactMessages[]\n  couponUsages     CouponUsages[]\n  stockManagements StockManagements[]\n  productReviews   ProductReviews[]\n  notifications    Notifications[]\n  orders           Orders[]\n  passwordReset    PasswordReset[]\n  categories       Categories[]\n\n  @@index([role])\n  @@index([status])\n  @@index([createdAt])\n  @@index([isDeleted])\n}\n\nmodel Wishlists {\n  id        String   @id @default(uuid()) @db.Uuid\n  userId    String   @unique @db.Uuid\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt()\n\n  user Users @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  items WishlistItems[]\n}\n\nmodel WishlistItems {\n  id         String   @id @default(uuid()) @db.Uuid\n  wishlistId String   @db.Uuid\n  productId  String   @db.Uuid\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt()\n\n  wishlist Wishlists @relation(fields: [wishlistId], references: [id], onDelete: Cascade)\n  product  Products  @relation(fields: [productId], references: [id], onDelete: Cascade)\n\n  @@unique([wishlistId, productId])\n  @@index([productId])\n}\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config2.runtimeDataModel = JSON.parse('{"models":{"Addresses":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"addressType","kind":"enum","type":"AddressType"},{"name":"addressLine","kind":"scalar","type":"String"},{"name":"city","kind":"scalar","type":"String"},{"name":"district","kind":"scalar","type":"String"},{"name":"postalCode","kind":"scalar","type":"String"},{"name":"country","kind":"scalar","type":"String"},{"name":"landmark","kind":"scalar","type":"String"},{"name":"deliveryInstructions","kind":"scalar","type":"String"},{"name":"isDefaultBilling","kind":"scalar","type":"Boolean"},{"name":"isDefaultShipping","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"Users","relationName":"AddressesToUsers"}],"dbName":null,"schema":null},"Banners":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"subtitle","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"mobileImage","kind":"scalar","type":"String"},{"name":"buttonText","kind":"scalar","type":"String"},{"name":"buttonLink","kind":"scalar","type":"String"},{"name":"position","kind":"enum","type":"BannerPosition"},{"name":"startsAt","kind":"scalar","type":"DateTime"},{"name":"endsAt","kind":"scalar","type":"DateTime"},{"name":"displayOrder","kind":"scalar","type":"Int"},{"name":"status","kind":"enum","type":"BannerStatus"},{"name":"altText","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null,"schema":null},"Brands":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"logo","kind":"scalar","type":"String"},{"name":"logoPublicId","kind":"scalar","type":"String"},{"name":"banner","kind":"scalar","type":"String"},{"name":"bannerPublicId","kind":"scalar","type":"String"},{"name":"website","kind":"scalar","type":"String"},{"name":"isFeatured","kind":"scalar","type":"Boolean"},{"name":"displayOrder","kind":"scalar","type":"Int"},{"name":"metaTitle","kind":"scalar","type":"String"},{"name":"metaDescription","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"BrandStatus"},{"name":"products","kind":"object","type":"Products","relationName":"BrandsToProducts"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null,"schema":null},"Carts":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"totalAmount","kind":"scalar","type":"Decimal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"Users","relationName":"CartsToUsers"},{"name":"items","kind":"object","type":"CartItems","relationName":"CartItemsToCarts"}],"dbName":null,"schema":null},"CartItems":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"cartId","kind":"scalar","type":"String"},{"name":"variantId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"cart","kind":"object","type":"Carts","relationName":"CartItemsToCarts"},{"name":"variant","kind":"object","type":"ProductVariants","relationName":"CartItemsToProductVariants"}],"dbName":null,"schema":null},"Categories":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"creatorId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"imagePublicId","kind":"scalar","type":"String"},{"name":"parentId","kind":"scalar","type":"String"},{"name":"isFeatured","kind":"scalar","type":"Boolean"},{"name":"displayOrder","kind":"scalar","type":"Int"},{"name":"metaTitle","kind":"scalar","type":"String"},{"name":"metaDescription","kind":"scalar","type":"String"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"status","kind":"enum","type":"CategoryStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"createdBy","kind":"object","type":"Users","relationName":"CategoriesToUsers"},{"name":"parent","kind":"object","type":"Categories","relationName":"CategoryHierarchy"},{"name":"children","kind":"object","type":"Categories","relationName":"CategoryHierarchy"},{"name":"categoryProduct","kind":"object","type":"CategoryProducts","relationName":"CategoriesToCategoryProducts"}],"dbName":null,"schema":null},"CategoryProducts":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"productId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Categories","relationName":"CategoriesToCategoryProducts"},{"name":"product","kind":"object","type":"Products","relationName":"CategoryProductsToProducts"}],"dbName":null,"schema":null},"ContactMessages":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"subject","kind":"scalar","type":"String"},{"name":"message","kind":"scalar","type":"String"},{"name":"category","kind":"enum","type":"ContactMessageCategory"},{"name":"status","kind":"enum","type":"ContactMessageStatus"},{"name":"adminNote","kind":"scalar","type":"String"},{"name":"repliedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"Users","relationName":"ContactMessagesToUsers"}],"dbName":null,"schema":null},"Coupons":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"code","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"type","kind":"enum","type":"CouponType"},{"name":"value","kind":"scalar","type":"Decimal"},{"name":"maxDiscount","kind":"scalar","type":"Decimal"},{"name":"minOrderAmount","kind":"scalar","type":"Decimal"},{"name":"usageLimit","kind":"scalar","type":"Int"},{"name":"usagePerUser","kind":"scalar","type":"Int"},{"name":"usedCount","kind":"scalar","type":"Int"},{"name":"startsAt","kind":"scalar","type":"DateTime"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"firstOrderOnly","kind":"scalar","type":"Boolean"},{"name":"status","kind":"enum","type":"CouponStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"usages","kind":"object","type":"CouponUsages","relationName":"CouponUsagesToCoupons"}],"dbName":null,"schema":null},"CouponUsages":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"couponId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"usedAt","kind":"scalar","type":"DateTime"},{"name":"couponCode","kind":"scalar","type":"String"},{"name":"discountAmount","kind":"scalar","type":"Decimal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"coupon","kind":"object","type":"Coupons","relationName":"CouponUsagesToCoupons"},{"name":"user","kind":"object","type":"Users","relationName":"CouponUsagesToUsers"},{"name":"order","kind":"object","type":"Orders","relationName":"CouponUsagesToOrders"}],"dbName":null,"schema":null},"Faqs":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"question","kind":"scalar","type":"String"},{"name":"answer","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"displayOrder","kind":"scalar","type":"Int"},{"name":"status","kind":"enum","type":"FaqStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null,"schema":null},"Inventories":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"variantId","kind":"scalar","type":"String"},{"name":"quantityOnHand","kind":"scalar","type":"Int"},{"name":"quantityReserved","kind":"scalar","type":"Int"},{"name":"reOrderLevel","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"variant","kind":"object","type":"ProductVariants","relationName":"InventoriesToProductVariants"},{"name":"stocks","kind":"object","type":"StockManagements","relationName":"InventoriesToStockManagements"}],"dbName":null,"schema":null},"Notifications":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"message","kind":"scalar","type":"String"},{"name":"type","kind":"enum","type":"NotificationType"},{"name":"priority","kind":"enum","type":"NotificationPriority"},{"name":"channel","kind":"enum","type":"NotificationChannels"},{"name":"accountUrl","kind":"scalar","type":"String"},{"name":"metaData","kind":"scalar","type":"Json"},{"name":"isRead","kind":"scalar","type":"Boolean"},{"name":"readAt","kind":"scalar","type":"DateTime"},{"name":"sentAt","kind":"scalar","type":"DateTime"},{"name":"failedAt","kind":"scalar","type":"DateTime"},{"name":"failureReason","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"Users","relationName":"NotificationsToUsers"}],"dbName":null,"schema":null},"Orders":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderNumber","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"customerName","kind":"scalar","type":"String"},{"name":"customerEmail","kind":"scalar","type":"String"},{"name":"customerPhone","kind":"scalar","type":"String"},{"name":"payment","kind":"object","type":"Payments","relationName":"OrdersToPayments"},{"name":"shipping","kind":"object","type":"Shippings","relationName":"OrdersToShippings"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"subtotal","kind":"scalar","type":"Decimal"},{"name":"discountAmount","kind":"scalar","type":"Decimal"},{"name":"shippingCost","kind":"scalar","type":"Decimal"},{"name":"taxAmount","kind":"scalar","type":"Decimal"},{"name":"totalAmount","kind":"scalar","type":"Decimal"},{"name":"customerNote","kind":"scalar","type":"String"},{"name":"adminNote","kind":"scalar","type":"String"},{"name":"confirmedAt","kind":"scalar","type":"DateTime"},{"name":"cancelledAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"Users","relationName":"OrdersToUsers"},{"name":"couponUsages","kind":"object","type":"CouponUsages","relationName":"CouponUsagesToOrders"},{"name":"refunds","kind":"object","type":"Refunds","relationName":"OrdersToRefunds"},{"name":"shippingAddress","kind":"object","type":"OrderAddresses","relationName":"OrderAddressesToOrders"},{"name":"items","kind":"object","type":"OrderItems","relationName":"OrderItemsToOrders"},{"name":"stockManagements","kind":"object","type":"StockManagements","relationName":"OrdersToStockManagements"}],"dbName":null,"schema":null},"OrderAddresses":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"addressLine","kind":"scalar","type":"String"},{"name":"city","kind":"scalar","type":"String"},{"name":"district","kind":"scalar","type":"String"},{"name":"postalCode","kind":"scalar","type":"String"},{"name":"country","kind":"scalar","type":"String"},{"name":"landmark","kind":"scalar","type":"String"},{"name":"deliveryInstructions","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"order","kind":"object","type":"Orders","relationName":"OrderAddressesToOrders"}],"dbName":null,"schema":null},"OrderItems":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"variantId","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"categories","kind":"scalar","type":"String"},{"name":"productName","kind":"scalar","type":"String"},{"name":"productSlug","kind":"scalar","type":"String"},{"name":"productImage","kind":"scalar","type":"String"},{"name":"sku","kind":"scalar","type":"String"},{"name":"variantName","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"unitPrice","kind":"scalar","type":"Decimal"},{"name":"discountAmount","kind":"scalar","type":"Decimal"},{"name":"totalPrice","kind":"scalar","type":"Decimal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"order","kind":"object","type":"Orders","relationName":"OrderItemsToOrders"},{"name":"variant","kind":"object","type":"ProductVariants","relationName":"OrderItemsToProductVariants"},{"name":"stockManagements","kind":"object","type":"StockManagements","relationName":"OrderItemsToStockManagements"}],"dbName":null,"schema":null},"PasswordReset":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"tokenHash","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"usedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"Users","relationName":"PasswordResetToUsers"}],"dbName":null,"schema":null},"Payments":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"method","kind":"enum","type":"PaymentMethod"},{"name":"status","kind":"enum","type":"PaymentStatus"},{"name":"description","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"currency","kind":"scalar","type":"String"},{"name":"gatewayInfo","kind":"scalar","type":"Json"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"order","kind":"object","type":"Orders","relationName":"OrdersToPayments"},{"name":"refunds","kind":"object","type":"Refunds","relationName":"PaymentsToRefunds"}],"dbName":null,"schema":null},"Products":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"brandId","kind":"scalar","type":"String"},{"name":"sizeChartId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"shortDescription","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"salePrice","kind":"scalar","type":"Decimal"},{"name":"image","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"ProductStatus"},{"name":"isFeatured","kind":"scalar","type":"Boolean"},{"name":"isNewArrival","kind":"scalar","type":"Boolean"},{"name":"isBestSeller","kind":"scalar","type":"Boolean"},{"name":"metaTitle","kind":"scalar","type":"String"},{"name":"metaDescription","kind":"scalar","type":"String"},{"name":"publishedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sizeChart","kind":"object","type":"SizeCharts","relationName":"ProductsToSizeCharts"},{"name":"brand","kind":"object","type":"Brands","relationName":"BrandsToProducts"},{"name":"gallery","kind":"object","type":"ProductImages","relationName":"ProductImagesToProducts"},{"name":"variant","kind":"object","type":"ProductVariants","relationName":"ProductVariantsToProducts"},{"name":"review","kind":"object","type":"ProductReviews","relationName":"ProductReviewsToProducts"},{"name":"wishlistItems","kind":"object","type":"WishlistItems","relationName":"ProductsToWishlistItems"},{"name":"categoryProducts","kind":"object","type":"CategoryProducts","relationName":"CategoryProductsToProducts"}],"dbName":null,"schema":null},"ProductImages":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"productId","kind":"scalar","type":"String"},{"name":"url","kind":"scalar","type":"String"},{"name":"alt","kind":"scalar","type":"String"},{"name":"logo","kind":"scalar","type":"String"},{"name":"isPrimary","kind":"scalar","type":"Boolean"},{"name":"sortOrder","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"product","kind":"object","type":"Products","relationName":"ProductImagesToProducts"}],"dbName":null,"schema":null},"ProductReviews":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"productId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"title","kind":"scalar","type":"String"},{"name":"comment","kind":"scalar","type":"String"},{"name":"isVerifiedPurchase","kind":"scalar","type":"Boolean"},{"name":"status","kind":"enum","type":"ProductReviewStatus"},{"name":"helpfulContent","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"product","kind":"object","type":"Products","relationName":"ProductReviewsToProducts"},{"name":"user","kind":"object","type":"Users","relationName":"ProductReviewsToUsers"}],"dbName":null,"schema":null},"ProductVariants":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"productId","kind":"scalar","type":"String"},{"name":"sku","kind":"scalar","type":"String"},{"name":"barcode","kind":"scalar","type":"String"},{"name":"color","kind":"scalar","type":"String"},{"name":"size","kind":"scalar","type":"String"},{"name":"colorCode","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"salePrice","kind":"scalar","type":"Decimal"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"reservedStock","kind":"scalar","type":"Int"},{"name":"lowStockThreshold","kind":"scalar","type":"Int"},{"name":"image","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"ProductVariantStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"product","kind":"object","type":"Products","relationName":"ProductVariantsToProducts"},{"name":"inventories","kind":"object","type":"Inventories","relationName":"InventoriesToProductVariants"},{"name":"cartItems","kind":"object","type":"CartItems","relationName":"CartItemsToProductVariants"},{"name":"orderItems","kind":"object","type":"OrderItems","relationName":"OrderItemsToProductVariants"}],"dbName":null,"schema":null},"Refunds":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"paymentId","kind":"scalar","type":"String"},{"name":"refundNumber","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"currency","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"RefundStatus"},{"name":"gatewayRefundId","kind":"scalar","type":"String"},{"name":"transactionReference","kind":"scalar","type":"String"},{"name":"processedBy","kind":"scalar","type":"String"},{"name":"processedAt","kind":"scalar","type":"DateTime"},{"name":"completedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"order","kind":"object","type":"Orders","relationName":"OrdersToRefunds"},{"name":"payment","kind":"object","type":"Payments","relationName":"PaymentsToRefunds"}],"dbName":null,"schema":null},"Shippings":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"courierName","kind":"scalar","type":"String"},{"name":"courierService","kind":"scalar","type":"String"},{"name":"trackingNumber","kind":"scalar","type":"String"},{"name":"consignmentId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"ShippingStatus"},{"name":"estimatedDelivery","kind":"scalar","type":"DateTime"},{"name":"shippingAt","kind":"scalar","type":"DateTime"},{"name":"deliveredAt","kind":"scalar","type":"DateTime"},{"name":"trackingUrl","kind":"scalar","type":"String"},{"name":"deliveryNote","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"order","kind":"object","type":"Orders","relationName":"OrdersToShippings"}],"dbName":null,"schema":null},"SiteSettings":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"key","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"Json"},{"name":"group","kind":"scalar","type":"String"},{"name":"label","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"isPublic","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null,"schema":null},"SizeCharts":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"measurements","kind":"object","type":"SizeChartMeasurements","relationName":"SizeChartMeasurementsToSizeCharts"},{"name":"products","kind":"object","type":"Products","relationName":"ProductsToSizeCharts"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null,"schema":null},"SizeChartMeasurements":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"sizeChartId","kind":"scalar","type":"String"},{"name":"size","kind":"scalar","type":"String"},{"name":"measurements","kind":"scalar","type":"Json"},{"name":"sortOrder","kind":"scalar","type":"Int"},{"name":"sizeChart","kind":"object","type":"SizeCharts","relationName":"SizeChartMeasurementsToSizeCharts"}],"dbName":null,"schema":null},"StockManagements":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"inventoryId","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"orderItemId","kind":"scalar","type":"String"},{"name":"performedById","kind":"scalar","type":"String"},{"name":"type","kind":"enum","type":"StockManagementType"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"stockBefore","kind":"scalar","type":"Int"},{"name":"stockAfter","kind":"scalar","type":"Int"},{"name":"note","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"inventory","kind":"object","type":"Inventories","relationName":"InventoriesToStockManagements"},{"name":"order","kind":"object","type":"Orders","relationName":"OrdersToStockManagements"},{"name":"orderItem","kind":"object","type":"OrderItems","relationName":"OrderItemsToStockManagements"},{"name":"performedBy","kind":"object","type":"Users","relationName":"StockManagementsToUsers"}],"dbName":null,"schema":null},"Users":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"googleId","kind":"scalar","type":"String"},{"name":"dateOfBirth","kind":"scalar","type":"DateTime"},{"name":"phone","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"imagePublicId","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"UserRoles"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"emailVerifiedAt","kind":"scalar","type":"DateTime"},{"name":"phoneVerifiedAt","kind":"scalar","type":"DateTime"},{"name":"lastLoggedInAt","kind":"scalar","type":"DateTime"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"tokenVersion","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"carts","kind":"object","type":"Carts","relationName":"CartsToUsers"},{"name":"wishlists","kind":"object","type":"Wishlists","relationName":"UsersToWishlists"},{"name":"addresses","kind":"object","type":"Addresses","relationName":"AddressesToUsers"},{"name":"contactMessages","kind":"object","type":"ContactMessages","relationName":"ContactMessagesToUsers"},{"name":"couponUsages","kind":"object","type":"CouponUsages","relationName":"CouponUsagesToUsers"},{"name":"stockManagements","kind":"object","type":"StockManagements","relationName":"StockManagementsToUsers"},{"name":"productReviews","kind":"object","type":"ProductReviews","relationName":"ProductReviewsToUsers"},{"name":"notifications","kind":"object","type":"Notifications","relationName":"NotificationsToUsers"},{"name":"orders","kind":"object","type":"Orders","relationName":"OrdersToUsers"},{"name":"passwordReset","kind":"object","type":"PasswordReset","relationName":"PasswordResetToUsers"},{"name":"categories","kind":"object","type":"Categories","relationName":"CategoriesToUsers"}],"dbName":null,"schema":null},"Wishlists":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"Users","relationName":"UsersToWishlists"},{"name":"items","kind":"object","type":"WishlistItems","relationName":"WishlistItemsToWishlists"}],"dbName":null,"schema":null},"WishlistItems":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"wishlistId","kind":"scalar","type":"String"},{"name":"productId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"wishlist","kind":"object","type":"Wishlists","relationName":"WishlistItemsToWishlists"},{"name":"product","kind":"object","type":"Products","relationName":"ProductsToWishlistItems"}],"dbName":null,"schema":null}},"enums":{},"types":{}}');
config2.parameterizationSchema = {
  strings: JSON.parse('["where","user","orderBy","cursor","cart","sizeChart","measurements","products","_count","brand","product","gallery","variant","review","items","wishlist","wishlistItems","createdBy","parent","children","categoryProduct","category","categoryProducts","inventory","order","payment","refunds","shipping","usages","coupon","couponUsages","shippingAddress","stockManagements","orderItem","performedBy","stocks","inventories","cartItems","orderItems","carts","wishlists","addresses","contactMessages","productReviews","notifications","orders","passwordReset","categories","Addresses.findUnique","Addresses.findUniqueOrThrow","Addresses.findFirst","Addresses.findFirstOrThrow","Addresses.findMany","data","Addresses.createOne","Addresses.createMany","Addresses.createManyAndReturn","Addresses.updateOne","Addresses.updateMany","Addresses.updateManyAndReturn","create","update","Addresses.upsertOne","Addresses.deleteOne","Addresses.deleteMany","having","_min","_max","Addresses.groupBy","Addresses.aggregate","Banners.findUnique","Banners.findUniqueOrThrow","Banners.findFirst","Banners.findFirstOrThrow","Banners.findMany","Banners.createOne","Banners.createMany","Banners.createManyAndReturn","Banners.updateOne","Banners.updateMany","Banners.updateManyAndReturn","Banners.upsertOne","Banners.deleteOne","Banners.deleteMany","_avg","_sum","Banners.groupBy","Banners.aggregate","Brands.findUnique","Brands.findUniqueOrThrow","Brands.findFirst","Brands.findFirstOrThrow","Brands.findMany","Brands.createOne","Brands.createMany","Brands.createManyAndReturn","Brands.updateOne","Brands.updateMany","Brands.updateManyAndReturn","Brands.upsertOne","Brands.deleteOne","Brands.deleteMany","Brands.groupBy","Brands.aggregate","Carts.findUnique","Carts.findUniqueOrThrow","Carts.findFirst","Carts.findFirstOrThrow","Carts.findMany","Carts.createOne","Carts.createMany","Carts.createManyAndReturn","Carts.updateOne","Carts.updateMany","Carts.updateManyAndReturn","Carts.upsertOne","Carts.deleteOne","Carts.deleteMany","Carts.groupBy","Carts.aggregate","CartItems.findUnique","CartItems.findUniqueOrThrow","CartItems.findFirst","CartItems.findFirstOrThrow","CartItems.findMany","CartItems.createOne","CartItems.createMany","CartItems.createManyAndReturn","CartItems.updateOne","CartItems.updateMany","CartItems.updateManyAndReturn","CartItems.upsertOne","CartItems.deleteOne","CartItems.deleteMany","CartItems.groupBy","CartItems.aggregate","Categories.findUnique","Categories.findUniqueOrThrow","Categories.findFirst","Categories.findFirstOrThrow","Categories.findMany","Categories.createOne","Categories.createMany","Categories.createManyAndReturn","Categories.updateOne","Categories.updateMany","Categories.updateManyAndReturn","Categories.upsertOne","Categories.deleteOne","Categories.deleteMany","Categories.groupBy","Categories.aggregate","CategoryProducts.findUnique","CategoryProducts.findUniqueOrThrow","CategoryProducts.findFirst","CategoryProducts.findFirstOrThrow","CategoryProducts.findMany","CategoryProducts.createOne","CategoryProducts.createMany","CategoryProducts.createManyAndReturn","CategoryProducts.updateOne","CategoryProducts.updateMany","CategoryProducts.updateManyAndReturn","CategoryProducts.upsertOne","CategoryProducts.deleteOne","CategoryProducts.deleteMany","CategoryProducts.groupBy","CategoryProducts.aggregate","ContactMessages.findUnique","ContactMessages.findUniqueOrThrow","ContactMessages.findFirst","ContactMessages.findFirstOrThrow","ContactMessages.findMany","ContactMessages.createOne","ContactMessages.createMany","ContactMessages.createManyAndReturn","ContactMessages.updateOne","ContactMessages.updateMany","ContactMessages.updateManyAndReturn","ContactMessages.upsertOne","ContactMessages.deleteOne","ContactMessages.deleteMany","ContactMessages.groupBy","ContactMessages.aggregate","Coupons.findUnique","Coupons.findUniqueOrThrow","Coupons.findFirst","Coupons.findFirstOrThrow","Coupons.findMany","Coupons.createOne","Coupons.createMany","Coupons.createManyAndReturn","Coupons.updateOne","Coupons.updateMany","Coupons.updateManyAndReturn","Coupons.upsertOne","Coupons.deleteOne","Coupons.deleteMany","Coupons.groupBy","Coupons.aggregate","CouponUsages.findUnique","CouponUsages.findUniqueOrThrow","CouponUsages.findFirst","CouponUsages.findFirstOrThrow","CouponUsages.findMany","CouponUsages.createOne","CouponUsages.createMany","CouponUsages.createManyAndReturn","CouponUsages.updateOne","CouponUsages.updateMany","CouponUsages.updateManyAndReturn","CouponUsages.upsertOne","CouponUsages.deleteOne","CouponUsages.deleteMany","CouponUsages.groupBy","CouponUsages.aggregate","Faqs.findUnique","Faqs.findUniqueOrThrow","Faqs.findFirst","Faqs.findFirstOrThrow","Faqs.findMany","Faqs.createOne","Faqs.createMany","Faqs.createManyAndReturn","Faqs.updateOne","Faqs.updateMany","Faqs.updateManyAndReturn","Faqs.upsertOne","Faqs.deleteOne","Faqs.deleteMany","Faqs.groupBy","Faqs.aggregate","Inventories.findUnique","Inventories.findUniqueOrThrow","Inventories.findFirst","Inventories.findFirstOrThrow","Inventories.findMany","Inventories.createOne","Inventories.createMany","Inventories.createManyAndReturn","Inventories.updateOne","Inventories.updateMany","Inventories.updateManyAndReturn","Inventories.upsertOne","Inventories.deleteOne","Inventories.deleteMany","Inventories.groupBy","Inventories.aggregate","Notifications.findUnique","Notifications.findUniqueOrThrow","Notifications.findFirst","Notifications.findFirstOrThrow","Notifications.findMany","Notifications.createOne","Notifications.createMany","Notifications.createManyAndReturn","Notifications.updateOne","Notifications.updateMany","Notifications.updateManyAndReturn","Notifications.upsertOne","Notifications.deleteOne","Notifications.deleteMany","Notifications.groupBy","Notifications.aggregate","Orders.findUnique","Orders.findUniqueOrThrow","Orders.findFirst","Orders.findFirstOrThrow","Orders.findMany","Orders.createOne","Orders.createMany","Orders.createManyAndReturn","Orders.updateOne","Orders.updateMany","Orders.updateManyAndReturn","Orders.upsertOne","Orders.deleteOne","Orders.deleteMany","Orders.groupBy","Orders.aggregate","OrderAddresses.findUnique","OrderAddresses.findUniqueOrThrow","OrderAddresses.findFirst","OrderAddresses.findFirstOrThrow","OrderAddresses.findMany","OrderAddresses.createOne","OrderAddresses.createMany","OrderAddresses.createManyAndReturn","OrderAddresses.updateOne","OrderAddresses.updateMany","OrderAddresses.updateManyAndReturn","OrderAddresses.upsertOne","OrderAddresses.deleteOne","OrderAddresses.deleteMany","OrderAddresses.groupBy","OrderAddresses.aggregate","OrderItems.findUnique","OrderItems.findUniqueOrThrow","OrderItems.findFirst","OrderItems.findFirstOrThrow","OrderItems.findMany","OrderItems.createOne","OrderItems.createMany","OrderItems.createManyAndReturn","OrderItems.updateOne","OrderItems.updateMany","OrderItems.updateManyAndReturn","OrderItems.upsertOne","OrderItems.deleteOne","OrderItems.deleteMany","OrderItems.groupBy","OrderItems.aggregate","PasswordReset.findUnique","PasswordReset.findUniqueOrThrow","PasswordReset.findFirst","PasswordReset.findFirstOrThrow","PasswordReset.findMany","PasswordReset.createOne","PasswordReset.createMany","PasswordReset.createManyAndReturn","PasswordReset.updateOne","PasswordReset.updateMany","PasswordReset.updateManyAndReturn","PasswordReset.upsertOne","PasswordReset.deleteOne","PasswordReset.deleteMany","PasswordReset.groupBy","PasswordReset.aggregate","Payments.findUnique","Payments.findUniqueOrThrow","Payments.findFirst","Payments.findFirstOrThrow","Payments.findMany","Payments.createOne","Payments.createMany","Payments.createManyAndReturn","Payments.updateOne","Payments.updateMany","Payments.updateManyAndReturn","Payments.upsertOne","Payments.deleteOne","Payments.deleteMany","Payments.groupBy","Payments.aggregate","Products.findUnique","Products.findUniqueOrThrow","Products.findFirst","Products.findFirstOrThrow","Products.findMany","Products.createOne","Products.createMany","Products.createManyAndReturn","Products.updateOne","Products.updateMany","Products.updateManyAndReturn","Products.upsertOne","Products.deleteOne","Products.deleteMany","Products.groupBy","Products.aggregate","ProductImages.findUnique","ProductImages.findUniqueOrThrow","ProductImages.findFirst","ProductImages.findFirstOrThrow","ProductImages.findMany","ProductImages.createOne","ProductImages.createMany","ProductImages.createManyAndReturn","ProductImages.updateOne","ProductImages.updateMany","ProductImages.updateManyAndReturn","ProductImages.upsertOne","ProductImages.deleteOne","ProductImages.deleteMany","ProductImages.groupBy","ProductImages.aggregate","ProductReviews.findUnique","ProductReviews.findUniqueOrThrow","ProductReviews.findFirst","ProductReviews.findFirstOrThrow","ProductReviews.findMany","ProductReviews.createOne","ProductReviews.createMany","ProductReviews.createManyAndReturn","ProductReviews.updateOne","ProductReviews.updateMany","ProductReviews.updateManyAndReturn","ProductReviews.upsertOne","ProductReviews.deleteOne","ProductReviews.deleteMany","ProductReviews.groupBy","ProductReviews.aggregate","ProductVariants.findUnique","ProductVariants.findUniqueOrThrow","ProductVariants.findFirst","ProductVariants.findFirstOrThrow","ProductVariants.findMany","ProductVariants.createOne","ProductVariants.createMany","ProductVariants.createManyAndReturn","ProductVariants.updateOne","ProductVariants.updateMany","ProductVariants.updateManyAndReturn","ProductVariants.upsertOne","ProductVariants.deleteOne","ProductVariants.deleteMany","ProductVariants.groupBy","ProductVariants.aggregate","Refunds.findUnique","Refunds.findUniqueOrThrow","Refunds.findFirst","Refunds.findFirstOrThrow","Refunds.findMany","Refunds.createOne","Refunds.createMany","Refunds.createManyAndReturn","Refunds.updateOne","Refunds.updateMany","Refunds.updateManyAndReturn","Refunds.upsertOne","Refunds.deleteOne","Refunds.deleteMany","Refunds.groupBy","Refunds.aggregate","Shippings.findUnique","Shippings.findUniqueOrThrow","Shippings.findFirst","Shippings.findFirstOrThrow","Shippings.findMany","Shippings.createOne","Shippings.createMany","Shippings.createManyAndReturn","Shippings.updateOne","Shippings.updateMany","Shippings.updateManyAndReturn","Shippings.upsertOne","Shippings.deleteOne","Shippings.deleteMany","Shippings.groupBy","Shippings.aggregate","SiteSettings.findUnique","SiteSettings.findUniqueOrThrow","SiteSettings.findFirst","SiteSettings.findFirstOrThrow","SiteSettings.findMany","SiteSettings.createOne","SiteSettings.createMany","SiteSettings.createManyAndReturn","SiteSettings.updateOne","SiteSettings.updateMany","SiteSettings.updateManyAndReturn","SiteSettings.upsertOne","SiteSettings.deleteOne","SiteSettings.deleteMany","SiteSettings.groupBy","SiteSettings.aggregate","SizeCharts.findUnique","SizeCharts.findUniqueOrThrow","SizeCharts.findFirst","SizeCharts.findFirstOrThrow","SizeCharts.findMany","SizeCharts.createOne","SizeCharts.createMany","SizeCharts.createManyAndReturn","SizeCharts.updateOne","SizeCharts.updateMany","SizeCharts.updateManyAndReturn","SizeCharts.upsertOne","SizeCharts.deleteOne","SizeCharts.deleteMany","SizeCharts.groupBy","SizeCharts.aggregate","SizeChartMeasurements.findUnique","SizeChartMeasurements.findUniqueOrThrow","SizeChartMeasurements.findFirst","SizeChartMeasurements.findFirstOrThrow","SizeChartMeasurements.findMany","SizeChartMeasurements.createOne","SizeChartMeasurements.createMany","SizeChartMeasurements.createManyAndReturn","SizeChartMeasurements.updateOne","SizeChartMeasurements.updateMany","SizeChartMeasurements.updateManyAndReturn","SizeChartMeasurements.upsertOne","SizeChartMeasurements.deleteOne","SizeChartMeasurements.deleteMany","SizeChartMeasurements.groupBy","SizeChartMeasurements.aggregate","StockManagements.findUnique","StockManagements.findUniqueOrThrow","StockManagements.findFirst","StockManagements.findFirstOrThrow","StockManagements.findMany","StockManagements.createOne","StockManagements.createMany","StockManagements.createManyAndReturn","StockManagements.updateOne","StockManagements.updateMany","StockManagements.updateManyAndReturn","StockManagements.upsertOne","StockManagements.deleteOne","StockManagements.deleteMany","StockManagements.groupBy","StockManagements.aggregate","Users.findUnique","Users.findUniqueOrThrow","Users.findFirst","Users.findFirstOrThrow","Users.findMany","Users.createOne","Users.createMany","Users.createManyAndReturn","Users.updateOne","Users.updateMany","Users.updateManyAndReturn","Users.upsertOne","Users.deleteOne","Users.deleteMany","Users.groupBy","Users.aggregate","Wishlists.findUnique","Wishlists.findUniqueOrThrow","Wishlists.findFirst","Wishlists.findFirstOrThrow","Wishlists.findMany","Wishlists.createOne","Wishlists.createMany","Wishlists.createManyAndReturn","Wishlists.updateOne","Wishlists.updateMany","Wishlists.updateManyAndReturn","Wishlists.upsertOne","Wishlists.deleteOne","Wishlists.deleteMany","Wishlists.groupBy","Wishlists.aggregate","WishlistItems.findUnique","WishlistItems.findUniqueOrThrow","WishlistItems.findFirst","WishlistItems.findFirstOrThrow","WishlistItems.findMany","WishlistItems.createOne","WishlistItems.createMany","WishlistItems.createManyAndReturn","WishlistItems.updateOne","WishlistItems.updateMany","WishlistItems.updateManyAndReturn","WishlistItems.upsertOne","WishlistItems.deleteOne","WishlistItems.deleteMany","WishlistItems.groupBy","WishlistItems.aggregate","AND","OR","NOT","id","wishlistId","productId","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","userId","every","some","none","email","name","password","googleId","dateOfBirth","phone","image","imagePublicId","UserRoles","role","UserStatus","status","emailVerifiedAt","phoneVerifiedAt","lastLoggedInAt","isDeleted","tokenVersion","inventoryId","orderId","orderItemId","performedById","StockManagementType","type","quantity","stockBefore","stockAfter","note","sizeChartId","size","sortOrder","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","description","categoryId","key","value","group","label","isPublic","courierName","courierService","trackingNumber","consignmentId","ShippingStatus","estimatedDelivery","shippingAt","deliveredAt","trackingUrl","deliveryNote","paymentId","refundNumber","amount","currency","RefundStatus","gatewayRefundId","transactionReference","processedBy","processedAt","completedAt","sku","barcode","color","colorCode","price","salePrice","stock","reservedStock","lowStockThreshold","ProductVariantStatus","rating","title","comment","isVerifiedPurchase","ProductReviewStatus","helpfulContent","url","alt","logo","isPrimary","brandId","slug","shortDescription","ProductStatus","isFeatured","isNewArrival","isBestSeller","metaTitle","metaDescription","publishedAt","PaymentMethod","method","PaymentStatus","gatewayInfo","tokenHash","expiresAt","usedAt","variantId","productName","productSlug","productImage","variantName","unitPrice","discountAmount","totalPrice","addressLine","city","district","postalCode","country","landmark","deliveryInstructions","orderNumber","customerName","customerEmail","customerPhone","OrderStatus","subtotal","shippingCost","taxAmount","totalAmount","customerNote","adminNote","confirmedAt","cancelledAt","message","NotificationType","NotificationPriority","priority","NotificationChannels","channel","accountUrl","metaData","isRead","readAt","sentAt","failedAt","failureReason","quantityOnHand","quantityReserved","reOrderLevel","question","answer","displayOrder","FaqStatus","couponId","couponCode","code","CouponType","maxDiscount","minOrderAmount","usageLimit","usagePerUser","usedCount","startsAt","firstOrderOnly","CouponStatus","subject","ContactMessageCategory","ContactMessageStatus","repliedAt","creatorId","parentId","CategoryStatus","cartId","logoPublicId","banner","bannerPublicId","website","BrandStatus","subtitle","mobileImage","buttonText","buttonLink","BannerPosition","position","endsAt","BannerStatus","altText","AddressType","addressType","isDefaultBilling","isDefaultShipping","couponId_userId_orderId","wishlistId_productId","userId_productId","sizeChartId_size","cartId_variantId","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "6w-tAvADFAEAAOYGACCoBAAAtAgAMKkEAABlABCqBAAAtAgAMKsEAQAAAAGuBEAAgQcAIa8EQACBBwAhuwQBAKUHACHABAEA_wYAIcQEAQD_BgAhqwUBAP8GACGsBQEA_wYAIa0FAQD_BgAhrgUBAIAHACGvBQEA_wYAIbAFAQCABwAhsQUBAP8GACH2BQAAtQj2BSL3BSAAtggAIfgFIAC2CAAhAQAAAAEAIAoBAADmBgAgDgAAjAgAIKgEAACLCAAwqQQAAAMAEKoEAACLCAAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAhuwQBAKUHACG6BRAAtwcAIQEAAAADACALBAAA3AgAIAwAAOoHACCoBAAA2wgAMKkEAAAFABCqBAAA2wgAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIdYEAgDpBwAhowUBAKUHACHmBQEApQcAIQIEAAC3CwAgDAAAtA0AIAwEAADcCAAgDAAA6gcAIKgEAADbCAAwqQQAAAUAEKoEAADbCAAwqwQBAAAAAa4EQADlBgAhrwRAAOUGACHWBAIA6QcAIaMFAQClBwAh5gUBAKUHACH9BQAA2ggAIAMAAAAFACACAAAGADADAAAHACALBgAAoAcAIAcAAKEHACCoBAAAngcAMKkEAAAJABCqBAAAngcAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIcAEAQD_BgAh4wQBAIAHACHkBAEAnwcAIQEAAAAJACAJBQAA2QgAIAYAAKYHACCoBAAA2AgAMKkEAAALABCqBAAA2AgAMKsEAQClBwAh2gQBAKUHACHbBAEA_wYAIdwEAgDpBwAhAQUAAJMOACAKBQAA2QgAIAYAAKYHACCoBAAA2AgAMKkEAAALABCqBAAA2AgAMKsEAQAAAAHaBAEApQcAIdsEAQD_BgAh3AQCAOkHACH8BQAA1wgAIAMAAAALACACAAAMADADAAANACAdBQAA0wgAIAkAANQIACALAADVCAAgDAAA1ggAIA0AAIwHACAQAADnBgAgFgAAwwgAIKgEAADRCAAwqQQAAA8AEKoEAADRCAAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAhwAQBAP8GACHFBAEA_wYAIcoEAADSCJYFItoEAQCfBwAh4wQBAP8GACGCBRAA-wcAIYMFEAD7BwAhkgUBAJ8HACGTBQEA_wYAIZQFAQD_BgAhlgUgAIQHACGXBSAAhAcAIZgFIACEBwAhmQUBAIAHACGaBQEAgAcAIZsFQACBBwAhDgUAAJMOACAJAACUDgAgCwAAlQ4AIAwAAJYOACANAAC9CwAgEAAA-ggAIBYAAJEOACDaBAAA-wgAIIIFAAD7CAAggwUAAPsIACCSBQAA-wgAIJkFAAD7CAAgmgUAAPsIACCbBQAA-wgAIB0FAADTCAAgCQAA1AgAIAsAANUIACAMAADWCAAgDQAAjAcAIBAAAOcGACAWAADDCAAgqAQAANEIADCpBAAADwAQqgQAANEIADCrBAEAAAABrgRAAOUGACGvBEAA5QYAIcAEAQD_BgAhxQQBAP8GACHKBAAA0giWBSLaBAEAnwcAIeMEAQD_BgAhggUQAPsHACGDBRAA-wcAIZIFAQCfBwAhkwUBAP8GACGUBQEA_wYAIZYFIACEBwAhlwUgAIQHACGYBSAAhAcAIZkFAQCABwAhmgUBAIAHACGbBUAAgQcAIQMAAAAPACACAAAQADADAAARACABAAAACwAgAQAAAA8AIBQHAAChBwAgqAQAAJEIADCpBAAAFQAQqgQAAJEIADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACHABAEA_wYAIcoEAACSCOwFIuMEAQCABwAhkAUBAP8GACGTBQEA_wYAIZYFIACEBwAhmQUBAIAHACGaBQEAgAcAIdEFAgDpBwAh5wUBAP8GACHoBQEAgAcAIekFAQCABwAh6gUBAIAHACEBAAAAFQAgAwAAAA8AIAIAABAAMAMAABEAIAEAAAAPACANCgAAxggAIKgEAADQCAAwqQQAABkAEKoEAADQCAAwqwQBAKUHACGtBAEApQcAIa4EQADlBgAhrwRAAOUGACHcBAIA6QcAIY4FAQD_BgAhjwUBAIAHACGQBQEAgAcAIZEFIACEBwAhAwoAAJIOACCPBQAA-wgAIJAFAAD7CAAgDQoAAMYIACCoBAAA0AgAMKkEAAAZABCqBAAA0AgAMKsEAQAAAAGtBAEApQcAIa4EQADlBgAhrwRAAOUGACHcBAIA6QcAIY4FAQD_BgAhjwUBAIAHACGQBQEAgAcAIZEFIACEBwAhAwAAABkAIAIAABoAMAMAABsAIBcKAADGCAAgJAAAzwgAICUAAIwIACAmAACrCAAgqAQAAM0IADCpBAAAHQAQqgQAAM0IADCrBAEApQcAIa0EAQClBwAhrgRAAOUGACGvBEAA5QYAIcUEAQD_BgAhygQAAM4IiAUi2wQBAIAHACH-BAEA_wYAIf8EAQCABwAhgAUBAIAHACGBBQEAgAcAIYIFEAC3BwAhgwUQAPsHACGEBQIA6QcAIYUFAgDpBwAhhgUCAOkHACEJCgAAkg4AICQAAI4OACAlAADrDQAgJgAAjA4AINsEAAD7CAAg_wQAAPsIACCABQAA-wgAIIEFAAD7CAAggwUAAPsIACAXCgAAxggAICQAAM8IACAlAACMCAAgJgAAqwgAIKgEAADNCAAwqQQAAB0AEKoEAADNCAAwqwQBAAAAAa0EAQClBwAhrgRAAOUGACGvBEAA5QYAIcUEAQD_BgAhygQAAM4IiAUi2wQBAIAHACH-BAEA_wYAIf8EAQCABwAhgAUBAIAHACGBBQEAgAcAIYIFEAC3BwAhgwUQAPsHACGEBQIA6QcAIYUFAgDpBwAhhgUCAOkHACEDAAAAHQAgAgAAHgAwAwAAHwAgEAEAAOYGACAKAADGCAAgqAQAAMsIADCpBAAAIQAQqgQAAMsIADCrBAEApQcAIa0EAQClBwAhrgRAAOUGACGvBEAA5QYAIbsEAQClBwAhygQAAMwIjQUiiAUCAOkHACGJBQEAgAcAIYoFAQD_BgAhiwUgAIQHACGNBQIAhQcAIQQBAAD5CAAgCgAAkg4AIIkFAAD7CAAgjQUAAPsIACARAQAA5gYAIAoAAMYIACCoBAAAywgAMKkEAAAhABCqBAAAywgAMKsEAQAAAAGtBAEApQcAIa4EQADlBgAhrwRAAOUGACG7BAEApQcAIcoEAADMCI0FIogFAgDpBwAhiQUBAIAHACGKBQEA_wYAIYsFIACEBwAhjQUCAIUHACH7BQAAyggAIAMAAAAhACACAAAiADADAAAjACAKCgAAxggAIA8AAMkIACCoBAAAyAgAMKkEAAAlABCqBAAAyAgAMKsEAQClBwAhrAQBAKUHACGtBAEApQcAIa4EQADlBgAhrwRAAOUGACECCgAAkg4AIA8AALgLACALCgAAxggAIA8AAMkIACCoBAAAyAgAMKkEAAAlABCqBAAAyAgAMKsEAQAAAAGsBAEApQcAIa0EAQClBwAhrgRAAOUGACGvBEAA5QYAIfoFAADHCAAgAwAAACUAIAIAACYAMAMAACcAIAMAAAAlACACAAAmADADAAAnACABAAAAJQAgCAoAAMYIACAVAADFCAAgqAQAAMQIADCpBAAAKwAQqgQAAMQIADCrBAEApQcAIa0EAQClBwAh5AQBAKUHACECCgAAkg4AIBUAAJAOACAICgAAxggAIBUAAMUIACCoBAAAxAgAMKkEAAArABCqBAAAxAgAMKsEAQAAAAGtBAEApQcAIeQEAQClBwAhAwAAACsAIAIAACwAMAMAAC0AIBcRAADmBgAgEgAAwggAIBMAAJAHACAUAADDCAAgqAQAAMAIADCpBAAALwAQqgQAAMAIADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACHABAEA_wYAIcUEAQCABwAhxgQBAIAHACHKBAAAwQjmBSLOBCAAhAcAIeMEAQCABwAhkwUBAIAHACGWBSAAhAcAIZkFAQCABwAhmgUBAIAHACHRBQIAhQcAIeMFAQClBwAh5AUBAJ8HACEBAAAALwAgDBEAAPkIACASAACQDgAgEwAAwQsAIBQAAJEOACDFBAAA-wgAIMYEAAD7CAAg4wQAAPsIACCTBQAA-wgAIJkFAAD7CAAgmgUAAPsIACDRBQAA-wgAIOQFAAD7CAAgFxEAAOYGACASAADCCAAgEwAAkAcAIBQAAMMIACCoBAAAwAgAMKkEAAAvABCqBAAAwAgAMKsEAQAAAAGuBEAA5QYAIa8EQADlBgAhwAQBAAAAAcUEAQCABwAhxgQBAIAHACHKBAAAwQjmBSLOBCAAhAcAIeMEAQCABwAhkwUBAAAAAZYFIACEBwAhmQUBAIAHACGaBQEAgAcAIdEFAgCFBwAh4wUBAKUHACHkBQEAnwcAIQMAAAAvACACAAAxADADAAAyACADAAAAKwAgAgAALAAwAwAALQAgAQAAAC8AIAEAAAArACABAAAAGQAgAQAAAB0AIAEAAAAhACABAAAAJQAgAQAAACsAIAwMAADqBwAgIwAAiwcAIKgEAADoBwAwqQQAADwAEKoEAADoBwAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAhowUBAKUHACHMBQIA6QcAIc0FAgDpBwAhzgUCAOkHACEBAAAAPAAgExcAAL0IACAYAAC-CAAgIQAAvwgAICIAAOYGACCoBAAAuwgAMKkEAAA-ABCqBAAAuwgAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIdAEAQClBwAh0QQBAJ8HACHSBAEAnwcAIdMEAQClBwAh1QQAALwI1QQi1gQCAOkHACHXBAIA6QcAIdgEAgDpBwAh2QQBAIAHACEHFwAAjg4AIBgAAOkMACAhAACPDgAgIgAA-QgAINEEAAD7CAAg0gQAAPsIACDZBAAA-wgAIBMXAAC9CAAgGAAAvggAICEAAL8IACAiAADmBgAgqAQAALsIADCpBAAAPgAQqgQAALsIADCrBAEAAAABrgRAAOUGACGvBEAA5QYAIdAEAQClBwAh0QQBAJ8HACHSBAEAnwcAIdMEAQClBwAh1QQAALwI1QQi1gQCAOkHACHXBAIA6QcAIdgEAgDpBwAh2QQBAIAHACEDAAAAPgAgAgAAPwAwAwAAQAAgHQEAAOYGACAOAACrCAAgGQAApwgAIBoAANQHACAbAACoCAAgHgAAqQgAIB8AAKoIACAgAACLBwAgqAQAAKUIADCpBAAAQgAQqgQAAKUIADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACG7BAEApQcAIcoEAACmCLcFIqkFEAC3BwAhsgUBAP8GACGzBQEA_wYAIbQFAQD_BgAhtQUBAP8GACG3BRAAtwcAIbgFEAC3BwAhuQUQALcHACG6BRAAtwcAIbsFAQCABwAhvAUBAIAHACG9BUAAgQcAIb4FQACBBwAhAQAAAEIAIA8YAACuBwAgGgAA1AcAIKgEAADRBwAwqQQAAEQAEKoEAADRBwAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAhygQAANMHnwUi0QQBAKUHACHjBAEAgAcAIfYEEAC3BwAh9wQBAP8GACGdBQAA0gedBSKfBQAApgcAIAEAAABEACAUGAAArgcAIBkAALkHACCoBAAAtgcAMKkEAABGABCqBAAAtgcAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIcoEAAC4B_kEItEEAQClBwAh4wQBAIAHACH0BAEApQcAIfUEAQD_BgAh9gQQALcHACH3BAEA_wYAIfkEAQCABwAh-gQBAIAHACH7BAEA_wYAIfwEQACBBwAh_QRAAIEHACEBAAAARgAgEhgAAK4HACCoBAAArAcAMKkEAABIABCqBAAArAcAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIcoEAACtB-8EItEEAQClBwAh6gQBAIAHACHrBAEAgAcAIewEAQCABwAh7QQBAIAHACHvBEAAgQcAIfAEQACBBwAh8QRAAIEHACHyBAEAgAcAIfMEAQCABwAhAQAAAEgAIA8BAADmBgAgGAAArgcAIB0AALoIACCoBAAAuQgAMKkEAABKABCqBAAAuQgAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIbsEAQClBwAh0QQBAKUHACGiBUAA5QYAIakFEAC3BwAh0wUBAKUHACHUBQEA_wYAIQEAAABKACADAQAA-QgAIBgAAOkMACAdAACNDgAgEAEAAOYGACAYAACuBwAgHQAAuggAIKgEAAC5CAAwqQQAAEoAEKoEAAC5CAAwqwQBAAAAAa4EQADlBgAhrwRAAOUGACG7BAEApQcAIdEEAQAAAAGiBUAA5QYAIakFEAC3BwAh0wUBAKUHACHUBQEA_wYAIfkFAAC4CAAgAwAAAEoAIAIAAEwAMAMAAE0AIAEAAABKACABAAAARgAgERgAAK4HACCoBAAA2AcAMKkEAABRABCqBAAA2AcAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIcAEAQD_BgAhxAQBAP8GACHRBAEApQcAIasFAQD_BgAhrAUBAP8GACGtBQEA_wYAIa4FAQD_BgAhrwUBAP8GACGwBQEA_wYAIbEFAQCABwAhAQAAAFEAIBYMAADqBwAgGAAArgcAICAAAIsHACAvAQD_BgAhqAQAALcIADCpBAAAUwAQqgQAALcIADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACHRBAEApQcAIdYEAgDpBwAh4wQBAIAHACH-BAEA_wYAIaMFAQClBwAhpAUBAP8GACGlBQEA_wYAIaYFAQD_BgAhpwUBAP8GACGoBRAAtwcAIakFEAC3BwAhqgUQALcHACEEDAAAtA0AIBgAAOkMACAgAAC8CwAg4wQAAPsIACAWDAAA6gcAIBgAAK4HACAgAACLBwAgLwEA_wYAIagEAAC3CAAwqQQAAFMAEKoEAAC3CAAwqwQBAAAAAa4EQADlBgAhrwRAAOUGACHRBAEApQcAIdYEAgDpBwAh4wQBAIAHACH-BAEA_wYAIaMFAQClBwAhpAUBAP8GACGlBQEA_wYAIaYFAQD_BgAhpwUBAP8GACGoBRAAtwcAIakFEAC3BwAhqgUQALcHACEDAAAAUwAgAgAAVAAwAwAAVQAgAwAAAD4AIAIAAD8AMAMAAEAAIAEAAAA-ACADAAAAPgAgAgAAPwAwAwAAQAAgAQAAAFMAIAEAAAA-ACABAAAAUwAgAQAAAD4AIAMAAAAFACACAAAGADADAAAHACADAAAAUwAgAgAAVAAwAwAAVQAgAQAAAAUAIAEAAABTACABAAAABQAgCQEAAOYGACAOAADnBgAgqAQAAOQGADCpBAAAYwAQqgQAAOQGADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACG7BAEApQcAIQEAAABjACAUAQAA5gYAIKgEAAC0CAAwqQQAAGUAEKoEAAC0CAAwqwQBAKUHACGuBEAAgQcAIa8EQACBBwAhuwQBAKUHACHABAEA_wYAIcQEAQD_BgAhqwUBAP8GACGsBQEA_wYAIa0FAQD_BgAhrgUBAIAHACGvBQEA_wYAIbAFAQCABwAhsQUBAP8GACH2BQAAtQj2BSL3BSAAtggAIfgFIAC2CAAhBwEAAPkIACCuBAAA-wgAIK8EAAD7CAAgrgUAAPsIACCwBQAA-wgAIPcFAAD7CAAg-AUAAPsIACADAAAAZQAgAgAAZgAwAwAAAQAgEQEAALMIACAVAACxCOEFIqgEAACwCAAwqQQAAGgAEKoEAACwCAAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAhuwQBAJ8HACG_BAEA_wYAIcAEAQD_BgAhxAQBAIAHACHKBAAAsgjiBSK8BQEAgAcAIb8FAQD_BgAh3wUBAP8GACHiBUAAgQcAIQUBAAD5CAAguwQAAPsIACDEBAAA-wgAILwFAAD7CAAg4gUAAPsIACARAQAAswgAIBUAALEI4QUiqAQAALAIADCpBAAAaAAQqgQAALAIADCrBAEAAAABrgRAAOUGACGvBEAA5QYAIbsEAQCfBwAhvwQBAP8GACHABAEA_wYAIcQEAQCABwAhygQAALII4gUivAUBAIAHACG_BQEA_wYAId8FAQD_BgAh4gVAAIEHACEDAAAAaAAgAgAAaQAwAwAAagAgIB4AAIoHACAgAACLBwAgJwAAhgcAICgAAIcHACApAACIBwAgKgAAiQcAICsAAIwHACAsAACNBwAgLQAAjgcAIC4AAI8HACAvAACQBwAgqAQAAP4GADCpBAAAbAAQqgQAAP4GADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACG_BAEA_wYAIcAEAQD_BgAhwQQBAIAHACHCBAEAgAcAIcMEQACBBwAhxAQBAIAHACHFBAEAgAcAIcYEAQCABwAhyAQAAIIHyAQiygQAAIMHygQiywRAAIEHACHMBEAAgQcAIc0EQACBBwAhzgQgAIQHACHPBAIAhQcAIQEAAABsACADAAAASgAgAgAATAAwAwAATQAgAwAAAD4AIAIAAD8AMAMAAEAAIAMAAAAhACACAAAiADADAAAjACAUAQAA5gYAIKgEAACsCAAwqQQAAHEAEKoEAACsCAAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAhuwQBAKUHACHVBAAArQjBBSKJBQEA_wYAIb8FAQD_BgAhwgUAAK4IwgUixAUAAK8IxAUixQUBAP8GACHGBQAApgcAIMcFIACEBwAhyAVAAIEHACHJBUAAgQcAIcoFQACBBwAhywUBAIAHACEFAQAA-QgAIMgFAAD7CAAgyQUAAPsIACDKBQAA-wgAIMsFAAD7CAAgFAEAAOYGACCoBAAArAgAMKkEAABxABCqBAAArAgAMKsEAQAAAAGuBEAA5QYAIa8EQADlBgAhuwQBAKUHACHVBAAArQjBBSKJBQEA_wYAIb8FAQD_BgAhwgUAAK4IwgUixAUAAK8IxAUixQUBAP8GACHGBQAApgcAIMcFIACEBwAhyAVAAIEHACHJBUAAgQcAIcoFQACBBwAhywUBAIAHACEDAAAAcQAgAgAAcgAwAwAAcwAgDAEAAPkIACAOAACMDgAgGQAA7wwAIBoAAJENACAbAACJDgAgHgAAig4AIB8AAIsOACAgAAC8CwAguwUAAPsIACC8BQAA-wgAIL0FAAD7CAAgvgUAAPsIACAdAQAA5gYAIA4AAKsIACAZAACnCAAgGgAA1AcAIBsAAKgIACAeAACpCAAgHwAAqggAICAAAIsHACCoBAAApQgAMKkEAABCABCqBAAApQgAMKsEAQAAAAGuBEAA5QYAIa8EQADlBgAhuwQBAKUHACHKBAAApgi3BSKpBRAAtwcAIbIFAQD_BgAhswUBAP8GACG0BQEA_wYAIbUFAQD_BgAhtwUQALcHACG4BRAAtwcAIbkFEAC3BwAhugUQALcHACG7BQEAgAcAIbwFAQCABwAhvQVAAIEHACG-BUAAgQcAIQMAAABCACACAAB1ADADAAB2ACAKAQAA5gYAIKgEAACkCAAwqQQAAHgAEKoEAACkCAAwqwQBAKUHACGuBEAA5QYAIbsEAQClBwAhoAUBAP8GACGhBUAA5QYAIaIFQACBBwAhAgEAAPkIACCiBQAA-wgAIAoBAADmBgAgqAQAAKQIADCpBAAAeAAQqgQAAKQIADCrBAEAAAABrgRAAOUGACG7BAEApQcAIaAFAQAAAAGhBUAA5QYAIaIFQACBBwAhAwAAAHgAIAIAAHkAMAMAAHoAIAMAAAAvACACAAAxADADAAAyACABAAAAZQAgAQAAAGgAIAEAAABKACABAAAAPgAgAQAAACEAIAEAAABxACABAAAAQgAgAQAAAHgAIAEAAAAvACABAAAAAQAgAwAAAGUAIAIAAGYAMAMAAAEAIAMAAABlACACAABmADADAAABACADAAAAZQAgAgAAZgAwAwAAAQAgEQEAAIgOACCrBAEAAAABrgRAAAAAAa8EQAAAAAG7BAEAAAABwAQBAAAAAcQEAQAAAAGrBQEAAAABrAUBAAAAAa0FAQAAAAGuBQEAAAABrwUBAAAAAbAFAQAAAAGxBQEAAAAB9gUAAAD2BQL3BSAAAAAB-AUgAAAAAQE1AACKAQAgEKsEAQAAAAGuBEAAAAABrwRAAAAAAbsEAQAAAAHABAEAAAABxAQBAAAAAasFAQAAAAGsBQEAAAABrQUBAAAAAa4FAQAAAAGvBQEAAAABsAUBAAAAAbEFAQAAAAH2BQAAAPYFAvcFIAAAAAH4BSAAAAABATUAAIwBADABNQAAjAEAMBEBAACHDgAgqwQBAOAIACGuBEAAggkAIa8EQACCCQAhuwQBAOAIACHABAEA4AgAIcQEAQDgCAAhqwUBAOAIACGsBQEA4AgAIa0FAQDgCAAhrgUBAIEJACGvBQEA4AgAIbAFAQCBCQAhsQUBAOAIACH2BQAAjgv2BSL3BSAAjwsAIfgFIACPCwAhAgAAAAEAIDUAAI8BACAQqwQBAOAIACGuBEAAggkAIa8EQACCCQAhuwQBAOAIACHABAEA4AgAIcQEAQDgCAAhqwUBAOAIACGsBQEA4AgAIa0FAQDgCAAhrgUBAIEJACGvBQEA4AgAIbAFAQCBCQAhsQUBAOAIACH2BQAAjgv2BSL3BSAAjwsAIfgFIACPCwAhAgAAAGUAIDUAAJEBACACAAAAZQAgNQAAkQEAIAMAAAABACA8AACKAQAgPQAAjwEAIAEAAAABACABAAAAZQAgCQgAAIQOACBCAACGDgAgQwAAhQ4AIK4EAAD7CAAgrwQAAPsIACCuBQAA-wgAILAFAAD7CAAg9wUAAPsIACD4BQAA-wgAIBOoBAAAnQgAMKkEAACYAQAQqgQAAJ0IADCrBAEA3AYAIa4EQADrBgAhrwRAAOsGACG7BAEA3AYAIcAEAQDpBgAhxAQBAOkGACGrBQEA6QYAIawFAQDpBgAhrQUBAOkGACGuBQEA6gYAIa8FAQDpBgAhsAUBAOoGACGxBQEA6QYAIfYFAACeCPYFIvcFIACfCAAh-AUgAJ8IACEDAAAAZQAgAgAAlwEAMEEAAJgBACADAAAAZQAgAgAAZgAwAwAAAQAgE6gEAACaCAAwqQQAAJ4BABCqBAAAmggAMKsEAQAAAAGuBEAA5QYAIa8EQADlBgAhxQQBAP8GACHKBAAAnAj0BSLjBAEAgAcAIYkFAQD_BgAh0QUCAOkHACHcBUAAgQcAIewFAQCABwAh7QUBAIAHACHuBQEAgAcAIe8FAQCABwAh8QUAAJsI8QUi8gVAAOUGACH0BQEAgAcAIQEAAACbAQAgAQAAAJsBACATqAQAAJoIADCpBAAAngEAEKoEAACaCAAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAhxQQBAP8GACHKBAAAnAj0BSLjBAEAgAcAIYkFAQD_BgAh0QUCAOkHACHcBUAAgQcAIewFAQCABwAh7QUBAIAHACHuBQEAgAcAIe8FAQCABwAh8QUAAJsI8QUi8gVAAOUGACH0BQEAgAcAIQfjBAAA-wgAINwFAAD7CAAg7AUAAPsIACDtBQAA-wgAIO4FAAD7CAAg7wUAAPsIACD0BQAA-wgAIAMAAACeAQAgAgAAnwEAMAMAAJsBACADAAAAngEAIAIAAJ8BADADAACbAQAgAwAAAJ4BACACAACfAQAwAwAAmwEAIBCrBAEAAAABrgRAAAAAAa8EQAAAAAHFBAEAAAABygQAAAD0BQLjBAEAAAABiQUBAAAAAdEFAgAAAAHcBUAAAAAB7AUBAAAAAe0FAQAAAAHuBQEAAAAB7wUBAAAAAfEFAAAA8QUC8gVAAAAAAfQFAQAAAAEBNQAAowEAIBCrBAEAAAABrgRAAAAAAa8EQAAAAAHFBAEAAAABygQAAAD0BQLjBAEAAAABiQUBAAAAAdEFAgAAAAHcBUAAAAAB7AUBAAAAAe0FAQAAAAHuBQEAAAAB7wUBAAAAAfEFAAAA8QUC8gVAAAAAAfQFAQAAAAEBNQAApQEAMAE1AAClAQAwEKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIcUEAQDgCAAhygQAAIMO9AUi4wQBAIEJACGJBQEA4AgAIdEFAgDpCQAh3AVAAIIJACHsBQEAgQkAIe0FAQCBCQAh7gUBAIEJACHvBQEAgQkAIfEFAACCDvEFIvIFQADhCAAh9AUBAIEJACECAAAAmwEAIDUAAKgBACAQqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhxQQBAOAIACHKBAAAgw70BSLjBAEAgQkAIYkFAQDgCAAh0QUCAOkJACHcBUAAggkAIewFAQCBCQAh7QUBAIEJACHuBQEAgQkAIe8FAQCBCQAh8QUAAIIO8QUi8gVAAOEIACH0BQEAgQkAIQIAAACeAQAgNQAAqgEAIAIAAACeAQAgNQAAqgEAIAMAAACbAQAgPAAAowEAID0AAKgBACABAAAAmwEAIAEAAACeAQAgDAgAAP0NACBCAACADgAgQwAA_w0AIFQAAP4NACBVAACBDgAg4wQAAPsIACDcBQAA-wgAIOwFAAD7CAAg7QUAAPsIACDuBQAA-wgAIO8FAAD7CAAg9AUAAPsIACATqAQAAJMIADCpBAAAsQEAEKoEAACTCAAwqwQBANwGACGuBEAA3QYAIa8EQADdBgAhxQQBAOkGACHKBAAAlQj0BSLjBAEA6gYAIYkFAQDpBgAh0QUCAJQHACHcBUAA6wYAIewFAQDqBgAh7QUBAOoGACHuBQEA6gYAIe8FAQDqBgAh8QUAAJQI8QUi8gVAAN0GACH0BQEA6gYAIQMAAACeAQAgAgAAsAEAMEEAALEBACADAAAAngEAIAIAAJ8BADADAACbAQAgFAcAAKEHACCoBAAAkQgAMKkEAAAVABCqBAAAkQgAMKsEAQAAAAGuBEAA5QYAIa8EQADlBgAhwAQBAAAAAcoEAACSCOwFIuMEAQCABwAhkAUBAP8GACGTBQEAAAABlgUgAIQHACGZBQEAgAcAIZoFAQCABwAh0QUCAOkHACHnBQEA_wYAIegFAQCABwAh6QUBAIAHACHqBQEAgAcAIQEAAAC0AQAgAQAAALQBACAHBwAA4AwAIOMEAAD7CAAgmQUAAPsIACCaBQAA-wgAIOgFAAD7CAAg6QUAAPsIACDqBQAA-wgAIAMAAAAVACACAAC3AQAwAwAAtAEAIAMAAAAVACACAAC3AQAwAwAAtAEAIAMAAAAVACACAAC3AQAwAwAAtAEAIBEHAAD8DQAgqwQBAAAAAa4EQAAAAAGvBEAAAAABwAQBAAAAAcoEAAAA7AUC4wQBAAAAAZAFAQAAAAGTBQEAAAABlgUgAAAAAZkFAQAAAAGaBQEAAAAB0QUCAAAAAecFAQAAAAHoBQEAAAAB6QUBAAAAAeoFAQAAAAEBNQAAuwEAIBCrBAEAAAABrgRAAAAAAa8EQAAAAAHABAEAAAABygQAAADsBQLjBAEAAAABkAUBAAAAAZMFAQAAAAGWBSAAAAABmQUBAAAAAZoFAQAAAAHRBQIAAAAB5wUBAAAAAegFAQAAAAHpBQEAAAAB6gUBAAAAAQE1AAC9AQAwATUAAL0BADARBwAA8g0AIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIcAEAQDgCAAhygQAAPEN7AUi4wQBAIEJACGQBQEA4AgAIZMFAQDgCAAhlgUgAIUJACGZBQEAgQkAIZoFAQCBCQAh0QUCAOkJACHnBQEA4AgAIegFAQCBCQAh6QUBAIEJACHqBQEAgQkAIQIAAAC0AQAgNQAAwAEAIBCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACHABAEA4AgAIcoEAADxDewFIuMEAQCBCQAhkAUBAOAIACGTBQEA4AgAIZYFIACFCQAhmQUBAIEJACGaBQEAgQkAIdEFAgDpCQAh5wUBAOAIACHoBQEAgQkAIekFAQCBCQAh6gUBAIEJACECAAAAFQAgNQAAwgEAIAIAAAAVACA1AADCAQAgAwAAALQBACA8AAC7AQAgPQAAwAEAIAEAAAC0AQAgAQAAABUAIAsIAADsDQAgQgAA7w0AIEMAAO4NACBUAADtDQAgVQAA8A0AIOMEAAD7CAAgmQUAAPsIACCaBQAA-wgAIOgFAAD7CAAg6QUAAPsIACDqBQAA-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_wEAID0AAIUCACABAAAAMgAgAQAAAC8AIA0IAADaDQAgQgAA3Q0AIEMAANwNACBUAADbDQAgVQAA3g0AIMUEAAD7CAAgxgQAAPsIACDjBAAA-wgAIJMFAAD7CAAgmQUAAPsIACCaBQAA-wgAINEFAAD7CAAg5AUAAPsIACATqAQAAIUIADCpBAAAjwIAEKoEAACFCAAwqwQBANwGACGuBEAA3QYAIa8EQADdBgAhwAQBAOkGACHFBAEA6gYAIcYEAQDqBgAhygQAAIYI5gUizgQgAO4GACHjBAEA6gYAIZMFAQDqBgAhlgUgAO4GACGZBQEA6gYAIZoFAQDqBgAh0QUCAO8GACHjBQEA3AYAIeQFAQCSBwAhAwAAAC8AIAIAAI4CADBBAACPAgAgAwAAAC8AIAIAADEAMAMAADIAIAEAAAAtACABAAAALQAgAwAAACsAIAIAACwAMAMAAC0AIAMAAAArACACAAAsADADAAAtACADAAAAKwAgAgAALAAwAwAALQAgBQoAAK4JACAVAADwCwAgqwQBAAAAAa0EAQAAAAHkBAEAAAABATUAAJcCACADqwQBAAAAAa0EAQAAAAHkBAEAAAABATUAAJkCADABNQAAmQIAMAUKAACsCQAgFQAA7gsAIKsEAQDgCAAhrQQBAOAIACHkBAEA4AgAIQIAAAAtACA1AACcAgAgA6sEAQDgCAAhrQQBAOAIACHkBAEA4AgAIQIAAAArACA1AACeAgAgAgAAACsAIDUAAJ4CACADAAAALQAgPAAAlwIAID0AAJwCACABAAAALQAgAQAAACsAIAMIAADXDQAgQgAA2Q0AIEMAANgNACAGqAQAAIQIADCpBAAApQIAEKoEAACECAAwqwQBANwGACGtBAEA3AYAIeQEAQDcBgAhAwAAACsAIAIAAKQCADBBAAClAgAgAwAAACsAIAIAACwAMAMAAC0AIAEAAABqACABAAAAagAgAwAAAGgAIAIAAGkAMAMAAGoAIAMAAABoACACAABpADADAABqACADAAAAaAAgAgAAaQAwAwAAagAgDgEAANYNACAVAAAA4QUCqwQBAAAAAa4EQAAAAAGvBEAAAAABuwQBAAAAAb8EAQAAAAHABAEAAAABxAQBAAAAAcoEAAAA4gUCvAUBAAAAAb8FAQAAAAHfBQEAAAAB4gVAAAAAAQE1AACtAgAgDRUAAADhBQKrBAEAAAABrgRAAAAAAa8EQAAAAAG7BAEAAAABvwQBAAAAAcAEAQAAAAHEBAEAAAABygQAAADiBQK8BQEAAAABvwUBAAAAAd8FAQAAAAHiBUAAAAABATUAAK8CADABNQAArwIAMAEAAABsACAOAQAA1Q0AIBUAAIAL4QUiqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhuwQBAIEJACG_BAEA4AgAIcAEAQDgCAAhxAQBAIEJACHKBAAAgQviBSK8BQEAgQkAIb8FAQDgCAAh3wUBAOAIACHiBUAAggkAIQIAAABqACA1AACzAgAgDRUAAIAL4QUiqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhuwQBAIEJACG_BAEA4AgAIcAEAQDgCAAhxAQBAIEJACHKBAAAgQviBSK8BQEAgQkAIb8FAQDgCAAh3wUBAOAIACHiBUAAggkAIQIAAABoACA1AAC1AgAgAgAAAGgAIDUAALUCACABAAAAbAAgAwAAAGoAIDwAAK0CACA9AACzAgAgAQAAAGoAIAEAAABoACAHCAAA0g0AIEIAANQNACBDAADTDQAguwQAAPsIACDEBAAA-wgAILwFAAD7CAAg4gUAAPsIACAQFQAA_gfhBSKoBAAA_QcAMKkEAAC9AgAQqgQAAP0HADCrBAEA3AYAIa4EQADdBgAhrwRAAN0GACG7BAEAkgcAIb8EAQDpBgAhwAQBAOkGACHEBAEA6gYAIcoEAAD_B-IFIrwFAQDqBgAhvwUBAOkGACHfBQEA6QYAIeIFQADrBgAhAwAAAGgAIAIAALwCADBBAAC9AgAgAwAAAGgAIAIAAGkAMAMAAGoAIBUcAACKBwAgqAQAAPkHADCpBAAAwwIAEKoEAAD5BwAwqwQBAAAAAa4EQADlBgAhrwRAAOUGACHABAEA_wYAIcoEAAD8B98FItUEAAD6B9cFIuMEAQCABwAh5gQQALcHACGhBUAAgQcAIdUFAQAAAAHXBRAA-wcAIdgFEAD7BwAh2QUCAIUHACHaBQIAhQcAIdsFAgCFBwAh3AVAAIEHACHdBSAAhAcAIQEAAADAAgAgAQAAAMACACAVHAAAigcAIKgEAAD5BwAwqQQAAMMCABCqBAAA-QcAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIcAEAQD_BgAhygQAAPwH3wUi1QQAAPoH1wUi4wQBAIAHACHmBBAAtwcAIaEFQACBBwAh1QUBAP8GACHXBRAA-wcAIdgFEAD7BwAh2QUCAIUHACHaBQIAhQcAIdsFAgCFBwAh3AVAAIEHACHdBSAAhAcAIQkcAAC7CwAg4wQAAPsIACChBQAA-wgAINcFAAD7CAAg2AUAAPsIACDZBQAA-wgAINoFAAD7CAAg2wUAAPsIACDcBQAA-wgAIAMAAADDAgAgAgAAxAIAMAMAAMACACADAAAAwwIAIAIAAMQCADADAADAAgAgAwAAAMMCACACAADEAgAwAwAAwAIAIBIcAADRDQAgqwQBAAAAAa4EQAAAAAGvBEAAAAABwAQBAAAAAcoEAAAA3wUC1QQAAADXBQLjBAEAAAAB5gQQAAAAAaEFQAAAAAHVBQEAAAAB1wUQAAAAAdgFEAAAAAHZBQIAAAAB2gUCAAAAAdsFAgAAAAHcBUAAAAAB3QUgAAAAAQE1AADIAgAgEasEAQAAAAGuBEAAAAABrwRAAAAAAcAEAQAAAAHKBAAAAN8FAtUEAAAA1wUC4wQBAAAAAeYEEAAAAAGhBUAAAAAB1QUBAAAAAdcFEAAAAAHYBRAAAAAB2QUCAAAAAdoFAgAAAAHbBQIAAAAB3AVAAAAAAd0FIAAAAAEBNQAAygIAMAE1AADKAgAwEhwAAMcNACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACHABAEA4AgAIcoEAADGDd8FItUEAADFDdcFIuMEAQCBCQAh5gQQANUJACGhBUAAggkAIdUFAQDgCAAh1wUQAN0LACHYBRAA3QsAIdkFAgCGCQAh2gUCAIYJACHbBQIAhgkAIdwFQACCCQAh3QUgAIUJACECAAAAwAIAIDUAAM0CACARqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhwAQBAOAIACHKBAAAxg3fBSLVBAAAxQ3XBSLjBAEAgQkAIeYEEADVCQAhoQVAAIIJACHVBQEA4AgAIdcFEADdCwAh2AUQAN0LACHZBQIAhgkAIdoFAgCGCQAh2wUCAIYJACHcBUAAggkAId0FIACFCQAhAgAAAMMCACA1AADPAgAgAgAAAMMCACA1AADPAgAgAwAAAMACACA8AADIAgAgPQAAzQIAIAEAAADAAgAgAQAAAMMCACANCAAAwA0AIEIAAMMNACBDAADCDQAgVAAAwQ0AIFUAAMQNACDjBAAA-wgAIKEFAAD7CAAg1wUAAPsIACDYBQAA-wgAINkFAAD7CAAg2gUAAPsIACDbBQAA-wgAINwFAAD7CAAgFKgEAADyBwAwqQQAANYCABCqBAAA8gcAMKsEAQDcBgAhrgRAAN0GACGvBEAA3QYAIcAEAQDpBgAhygQAAPQH3wUi1QQAAPMH1wUi4wQBAOoGACHmBBAAsAcAIaEFQADrBgAh1QUBAOkGACHXBRAAuwcAIdgFEAC7BwAh2QUCAO8GACHaBQIA7wYAIdsFAgDvBgAh3AVAAOsGACHdBSAA7gYAIQMAAADDAgAgAgAA1QIAMEEAANYCACADAAAAwwIAIAIAAMQCADADAADAAgAgAQAAAE0AIAEAAABNACADAAAASgAgAgAATAAwAwAATQAgAwAAAEoAIAIAAEwAMAMAAE0AIAMAAABKACACAABMADADAABNACAMAQAAogoAIBgAAPUKACAdAAChCgAgqwQBAAAAAa4EQAAAAAGvBEAAAAABuwQBAAAAAdEEAQAAAAGiBUAAAAABqQUQAAAAAdMFAQAAAAHUBQEAAAABATUAAN4CACAJqwQBAAAAAa4EQAAAAAGvBEAAAAABuwQBAAAAAdEEAQAAAAGiBUAAAAABqQUQAAAAAdMFAQAAAAHUBQEAAAABATUAAOACADABNQAA4AIAMAwBAACgCgAgGAAA8woAIB0AAJ8KACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACG7BAEA4AgAIdEEAQDgCAAhogVAAOEIACGpBRAA1QkAIdMFAQDgCAAh1AUBAOAIACECAAAATQAgNQAA4wIAIAmrBAEA4AgAIa4EQADhCAAhrwRAAOEIACG7BAEA4AgAIdEEAQDgCAAhogVAAOEIACGpBRAA1QkAIdMFAQDgCAAh1AUBAOAIACECAAAASgAgNQAA5QIAIAIAAABKACA1AADlAgAgAwAAAE0AIDwAAN4CACA9AADjAgAgAQAAAE0AIAEAAABKACAFCAAAuw0AIEIAAL4NACBDAAC9DQAgVAAAvA0AIFUAAL8NACAMqAQAAPEHADCpBAAA7AIAEKoEAADxBwAwqwQBANwGACGuBEAA3QYAIa8EQADdBgAhuwQBANwGACHRBAEA3AYAIaIFQADdBgAhqQUQALAHACHTBQEA3AYAIdQFAQDpBgAhAwAAAEoAIAIAAOsCADBBAADsAgAgAwAAAEoAIAIAAEwAMAMAAE0AIAsVAQD_BgAhqAQAAO8HADCpBAAA8gIAEKoEAADvBwAwqwQBAAAAAa4EQADlBgAhrwRAAOUGACHKBAAA8AfTBSLPBQEA_wYAIdAFAQD_BgAh0QUCAOkHACEBAAAA7wIAIAEAAADvAgAgCxUBAP8GACGoBAAA7wcAMKkEAADyAgAQqgQAAO8HADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACHKBAAA8AfTBSLPBQEA_wYAIdAFAQD_BgAh0QUCAOkHACEAAwAAAPICACACAADzAgAwAwAA7wIAIAMAAADyAgAgAgAA8wIAMAMAAO8CACADAAAA8gIAIAIAAPMCADADAADvAgAgCBUBAAAAAasEAQAAAAGuBEAAAAABrwRAAAAAAcoEAAAA0wUCzwUBAAAAAdAFAQAAAAHRBQIAAAABATUAAPcCACAIFQEAAAABqwQBAAAAAa4EQAAAAAGvBEAAAAABygQAAADTBQLPBQEAAAAB0AUBAAAAAdEFAgAAAAEBNQAA-QIAMAE1AAD5AgAwCBUBAOAIACGrBAEA4AgAIa4EQADhCAAhrwRAAOEIACHKBAAAug3TBSLPBQEA4AgAIdAFAQDgCAAh0QUCAOkJACECAAAA7wIAIDUAAPwCACAIFQEA4AgAIasEAQDgCAAhrgRAAOEIACGvBEAA4QgAIcoEAAC6DdMFIs8FAQDgCAAh0AUBAOAIACHRBQIA6QkAIQIAAADyAgAgNQAA_gIAIAIAAADyAgAgNQAA_gIAIAMAAADvAgAgPAAA9wIAID0AAPwCACABAAAA7wIAIAEAAADyAgAgBQgAALUNACBCAAC4DQAgQwAAtw0AIFQAALYNACBVAAC5DQAgCxUBAOkGACGoBAAA6wcAMKkEAACFAwAQqgQAAOsHADCrBAEA3AYAIa4EQADdBgAhrwRAAN0GACHKBAAA7AfTBSLPBQEA6QYAIdAFAQDpBgAh0QUCAJQHACEDAAAA8gIAIAIAAIQDADBBAACFAwAgAwAAAPICACACAADzAgAwAwAA7wIAIAwMAADqBwAgIwAAiwcAIKgEAADoBwAwqQQAADwAEKoEAADoBwAwqwQBAAAAAa4EQADlBgAhrwRAAOUGACGjBQEAAAABzAUCAOkHACHNBQIA6QcAIc4FAgDpBwAhAQAAAIgDACABAAAAiAMAIAIMAAC0DQAgIwAAvAsAIAMAAAA8ACACAACLAwAwAwAAiAMAIAMAAAA8ACACAACLAwAwAwAAiAMAIAMAAAA8ACACAACLAwAwAwAAiAMAIAkMAACzDQAgIwAAuQwAIKsEAQAAAAGuBEAAAAABrwRAAAAAAaMFAQAAAAHMBQIAAAABzQUCAAAAAc4FAgAAAAEBNQAAjwMAIAerBAEAAAABrgRAAAAAAa8EQAAAAAGjBQEAAAABzAUCAAAAAc0FAgAAAAHOBQIAAAABATUAAJEDADABNQAAkQMAMAkMAACyDQAgIwAArwwAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIaMFAQDgCAAhzAUCAOkJACHNBQIA6QkAIc4FAgDpCQAhAgAAAIgDACA1AACUAwAgB6sEAQDgCAAhrgRAAOEIACGvBEAA4QgAIaMFAQDgCAAhzAUCAOkJACHNBQIA6QkAIc4FAgDpCQAhAgAAADwAIDUAAJYDACACAAAAPAAgNQAAlgMAIAMAAACIAwAgPAAAjwMAID0AAJQDACABAAAAiAMAIAEAAAA8ACAFCAAArQ0AIEIAALANACBDAACvDQAgVAAArg0AIFUAALENACAKqAQAAOcHADCpBAAAnQMAEKoEAADnBwAwqwQBANwGACGuBEAA3QYAIa8EQADdBgAhowUBANwGACHMBQIAlAcAIc0FAgCUBwAhzgUCAJQHACEDAAAAPAAgAgAAnAMAMEEAAJ0DACADAAAAPAAgAgAAiwMAMAMAAIgDACABAAAAcwAgAQAAAHMAIAMAAABxACACAAByADADAABzACADAAAAcQAgAgAAcgAwAwAAcwAgAwAAAHEAIAIAAHIAMAMAAHMAIBEBAACsDQAgqwQBAAAAAa4EQAAAAAGvBEAAAAABuwQBAAAAAdUEAAAAwQUCiQUBAAAAAb8FAQAAAAHCBQAAAMIFAsQFAAAAxAUCxQUBAAAAAcYFgAAAAAHHBSAAAAAByAVAAAAAAckFQAAAAAHKBUAAAAABywUBAAAAAQE1AAClAwAgEKsEAQAAAAGuBEAAAAABrwRAAAAAAbsEAQAAAAHVBAAAAMEFAokFAQAAAAG_BQEAAAABwgUAAADCBQLEBQAAAMQFAsUFAQAAAAHGBYAAAAABxwUgAAAAAcgFQAAAAAHJBUAAAAABygVAAAAAAcsFAQAAAAEBNQAApwMAMAE1AACnAwAwEQEAAKsNACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACG7BAEA4AgAIdUEAADLCsEFIokFAQDgCAAhvwUBAOAIACHCBQAAzArCBSLEBQAAzQrEBSLFBQEA4AgAIcYFgAAAAAHHBSAAhQkAIcgFQACCCQAhyQVAAIIJACHKBUAAggkAIcsFAQCBCQAhAgAAAHMAIDUAAKoDACAQqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhuwQBAOAIACHVBAAAywrBBSKJBQEA4AgAIb8FAQDgCAAhwgUAAMwKwgUixAUAAM0KxAUixQUBAOAIACHGBYAAAAABxwUgAIUJACHIBUAAggkAIckFQACCCQAhygVAAIIJACHLBQEAgQkAIQIAAABxACA1AACsAwAgAgAAAHEAIDUAAKwDACADAAAAcwAgPAAApQMAID0AAKoDACABAAAAcwAgAQAAAHEAIAcIAACoDQAgQgAAqg0AIEMAAKkNACDIBQAA-wgAIMkFAAD7CAAgygUAAPsIACDLBQAA-wgAIBOoBAAA3QcAMKkEAACzAwAQqgQAAN0HADCrBAEA3AYAIa4EQADdBgAhrwRAAN0GACG7BAEA3AYAIdUEAADeB8EFIokFAQDpBgAhvwUBAOkGACHCBQAA3wfCBSLEBQAA4AfEBSLFBQEA6QYAIcYFAACbBwAgxwUgAO4GACHIBUAA6wYAIckFQADrBgAhygVAAOsGACHLBQEA6gYAIQMAAABxACACAACyAwAwQQAAswMAIAMAAABxACACAAByADADAABzACABAAAAdgAgAQAAAHYAIAMAAABCACACAAB1ADADAAB2ACADAAAAQgAgAgAAdQAwAwAAdgAgAwAAAEIAIAIAAHUAMAMAAHYAIBoBAACnDQAgDgAAvwoAIBkAALoKACAaAAC9CgAgGwAAuwoAIB4AALwKACAfAAC-CgAgIAAAwAoAIKsEAQAAAAGuBEAAAAABrwRAAAAAAbsEAQAAAAHKBAAAALcFAqkFEAAAAAGyBQEAAAABswUBAAAAAbQFAQAAAAG1BQEAAAABtwUQAAAAAbgFEAAAAAG5BRAAAAABugUQAAAAAbsFAQAAAAG8BQEAAAABvQVAAAAAAb4FQAAAAAEBNQAAuwMAIBKrBAEAAAABrgRAAAAAAa8EQAAAAAG7BAEAAAABygQAAAC3BQKpBRAAAAABsgUBAAAAAbMFAQAAAAG0BQEAAAABtQUBAAAAAbcFEAAAAAG4BRAAAAABuQUQAAAAAboFEAAAAAG7BQEAAAABvAUBAAAAAb0FQAAAAAG-BUAAAAABATUAAL0DADABNQAAvQMAMBoBAACmDQAgDgAA3AkAIBkAANcJACAaAADaCQAgGwAA2AkAIB4AANkJACAfAADbCQAgIAAA3QkAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIbsEAQDgCAAhygQAANQJtwUiqQUQANUJACGyBQEA4AgAIbMFAQDgCAAhtAUBAOAIACG1BQEA4AgAIbcFEADVCQAhuAUQANUJACG5BRAA1QkAIboFEADVCQAhuwUBAIEJACG8BQEAgQkAIb0FQACCCQAhvgVAAIIJACECAAAAdgAgNQAAwAMAIBKrBAEA4AgAIa4EQADhCAAhrwRAAOEIACG7BAEA4AgAIcoEAADUCbcFIqkFEADVCQAhsgUBAOAIACGzBQEA4AgAIbQFAQDgCAAhtQUBAOAIACG3BRAA1QkAIbgFEADVCQAhuQUQANUJACG6BRAA1QkAIbsFAQCBCQAhvAUBAIEJACG9BUAAggkAIb4FQACCCQAhAgAAAEIAIDUAAMIDACACAAAAQgAgNQAAwgMAIAMAAAB2ACA8AAC7AwAgPQAAwAMAIAEAAAB2ACABAAAAQgAgCQgAAKENACBCAACkDQAgQwAAow0AIFQAAKINACBVAAClDQAguwUAAPsIACC8BQAA-wgAIL0FAAD7CAAgvgUAAPsIACAVqAQAANkHADCpBAAAyQMAEKoEAADZBwAwqwQBANwGACGuBEAA3QYAIa8EQADdBgAhuwQBANwGACHKBAAA2ge3BSKpBRAAsAcAIbIFAQDpBgAhswUBAOkGACG0BQEA6QYAIbUFAQDpBgAhtwUQALAHACG4BRAAsAcAIbkFEACwBwAhugUQALAHACG7BQEA6gYAIbwFAQDqBgAhvQVAAOsGACG-BUAA6wYAIQMAAABCACACAADIAwAwQQAAyQMAIAMAAABCACACAAB1ADADAAB2ACARGAAArgcAIKgEAADYBwAwqQQAAFEAEKoEAADYBwAwqwQBAAAAAa4EQADlBgAhrwRAAOUGACHABAEA_wYAIcQEAQD_BgAh0QQBAAAAAasFAQD_BgAhrAUBAP8GACGtBQEA_wYAIa4FAQD_BgAhrwUBAP8GACGwBQEA_wYAIbEFAQCABwAhAQAAAMwDACABAAAAzAMAIAIYAADpDAAgsQUAAPsIACADAAAAUQAgAgAAzwMAMAMAAMwDACADAAAAUQAgAgAAzwMAMAMAAMwDACADAAAAUQAgAgAAzwMAMAMAAMwDACAOGAAAoA0AIKsEAQAAAAGuBEAAAAABrwRAAAAAAcAEAQAAAAHEBAEAAAAB0QQBAAAAAasFAQAAAAGsBQEAAAABrQUBAAAAAa4FAQAAAAGvBQEAAAABsAUBAAAAAbEFAQAAAAEBNQAA0wMAIA2rBAEAAAABrgRAAAAAAa8EQAAAAAHABAEAAAABxAQBAAAAAdEEAQAAAAGrBQEAAAABrAUBAAAAAa0FAQAAAAGuBQEAAAABrwUBAAAAAbAFAQAAAAGxBQEAAAABATUAANUDADABNQAA1QMAMA4YAACfDQAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhwAQBAOAIACHEBAEA4AgAIdEEAQDgCAAhqwUBAOAIACGsBQEA4AgAIa0FAQDgCAAhrgUBAOAIACGvBQEA4AgAIbAFAQDgCAAhsQUBAIEJACECAAAAzAMAIDUAANgDACANqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhwAQBAOAIACHEBAEA4AgAIdEEAQDgCAAhqwUBAOAIACGsBQEA4AgAIa0FAQDgCAAhrgUBAOAIACGvBQEA4AgAIbAFAQDgCAAhsQUBAIEJACECAAAAUQAgNQAA2gMAIAIAAABRACA1AADaAwAgAwAAAMwDACA8AADTAwAgPQAA2AMAIAEAAADMAwAgAQAAAFEAIAQIAACcDQAgQgAAng0AIEMAAJ0NACCxBQAA-wgAIBCoBAAA1wcAMKkEAADhAwAQqgQAANcHADCrBAEA3AYAIa4EQADdBgAhrwRAAN0GACHABAEA6QYAIcQEAQDpBgAh0QQBANwGACGrBQEA6QYAIawFAQDpBgAhrQUBAOkGACGuBQEA6QYAIa8FAQDpBgAhsAUBAOkGACGxBQEA6gYAIQMAAABRACACAADgAwAwQQAA4QMAIAMAAABRACACAADPAwAwAwAAzAMAIAEAAABVACABAAAAVQAgAwAAAFMAIAIAAFQAMAMAAFUAIAMAAABTACACAABUADADAABVACADAAAAUwAgAgAAVAAwAwAAVQAgEwwAAIsKACAYAACeDAAgIAAAjAoAIC8BAAAAAasEAQAAAAGuBEAAAAABrwRAAAAAAdEEAQAAAAHWBAIAAAAB4wQBAAAAAf4EAQAAAAGjBQEAAAABpAUBAAAAAaUFAQAAAAGmBQEAAAABpwUBAAAAAagFEAAAAAGpBRAAAAABqgUQAAAAAQE1AADpAwAgEC8BAAAAAasEAQAAAAGuBEAAAAABrwRAAAAAAdEEAQAAAAHWBAIAAAAB4wQBAAAAAf4EAQAAAAGjBQEAAAABpAUBAAAAAaUFAQAAAAGmBQEAAAABpwUBAAAAAagFEAAAAAGpBRAAAAABqgUQAAAAAQE1AADrAwAwATUAAOsDADATDAAA_QkAIBgAAJwMACAgAAD-CQAgLwEA4AgAIasEAQDgCAAhrgRAAOEIACGvBEAA4QgAIdEEAQDgCAAh1gQCAOkJACHjBAEAgQkAIf4EAQDgCAAhowUBAOAIACGkBQEA4AgAIaUFAQDgCAAhpgUBAOAIACGnBQEA4AgAIagFEADVCQAhqQUQANUJACGqBRAA1QkAIQIAAABVACA1AADuAwAgEC8BAOAIACGrBAEA4AgAIa4EQADhCAAhrwRAAOEIACHRBAEA4AgAIdYEAgDpCQAh4wQBAIEJACH-BAEA4AgAIaMFAQDgCAAhpAUBAOAIACGlBQEA4AgAIaYFAQDgCAAhpwUBAOAIACGoBRAA1QkAIakFEADVCQAhqgUQANUJACECAAAAUwAgNQAA8AMAIAIAAABTACA1AADwAwAgAwAAAFUAIDwAAOkDACA9AADuAwAgAQAAAFUAIAEAAABTACAGCAAAlw0AIEIAAJoNACBDAACZDQAgVAAAmA0AIFUAAJsNACDjBAAA-wgAIBMvAQDpBgAhqAQAANYHADCpBAAA9wMAEKoEAADWBwAwqwQBANwGACGuBEAA3QYAIa8EQADdBgAh0QQBANwGACHWBAIAlAcAIeMEAQDqBgAh_gQBAOkGACGjBQEA3AYAIaQFAQDpBgAhpQUBAOkGACGmBQEA6QYAIacFAQDpBgAhqAUQALAHACGpBRAAsAcAIaoFEACwBwAhAwAAAFMAIAIAAPYDADBBAAD3AwAgAwAAAFMAIAIAAFQAMAMAAFUAIAEAAAB6ACABAAAAegAgAwAAAHgAIAIAAHkAMAMAAHoAIAMAAAB4ACACAAB5ADADAAB6ACADAAAAeAAgAgAAeQAwAwAAegAgBwEAAJYNACCrBAEAAAABrgRAAAAAAbsEAQAAAAGgBQEAAAABoQVAAAAAAaIFQAAAAAEBNQAA_wMAIAarBAEAAAABrgRAAAAAAbsEAQAAAAGgBQEAAAABoQVAAAAAAaIFQAAAAAEBNQAAgQQAMAE1AACBBAAwBwEAAJUNACCrBAEA4AgAIa4EQADhCAAhuwQBAOAIACGgBQEA4AgAIaEFQADhCAAhogVAAIIJACECAAAAegAgNQAAhAQAIAarBAEA4AgAIa4EQADhCAAhuwQBAOAIACGgBQEA4AgAIaEFQADhCAAhogVAAIIJACECAAAAeAAgNQAAhgQAIAIAAAB4ACA1AACGBAAgAwAAAHoAIDwAAP8DACA9AACEBAAgAQAAAHoAIAEAAAB4ACAECAAAkg0AIEIAAJQNACBDAACTDQAgogUAAPsIACAJqAQAANUHADCpBAAAjQQAEKoEAADVBwAwqwQBANwGACGuBEAA3QYAIbsEAQDcBgAhoAUBAOkGACGhBUAA3QYAIaIFQADrBgAhAwAAAHgAIAIAAIwEADBBAACNBAAgAwAAAHgAIAIAAHkAMAMAAHoAIA8YAACuBwAgGgAA1AcAIKgEAADRBwAwqQQAAEQAEKoEAADRBwAwqwQBAAAAAa4EQADlBgAhrwRAAOUGACHKBAAA0wefBSLRBAEAAAAB4wQBAIAHACH2BBAAtwcAIfcEAQD_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-wgAIJIFAAD7CAAgmQUAAPsIACCaBQAA-wgAIJsFAAD7CAAgFqgEAADGBwAwqQQAAL8EABCqBAAAxgcAMKsEAQDcBgAhrgRAAN0GACGvBEAA3QYAIcAEAQDpBgAhxQQBAOkGACHKBAAAxweWBSLaBAEAkgcAIeMEAQDpBgAhggUQALsHACGDBRAAuwcAIZIFAQCSBwAhkwUBAOkGACGUBQEA6QYAIZYFIADuBgAhlwUgAO4GACGYBSAA7gYAIZkFAQDqBgAhmgUBAOoGACGbBUAA6wYAIQMAAAAPACACAAC-BAAwQQAAvwQAIAMAAAAPACACAAAQADADAAARACABAAAAGwAgAQAAABsAIAMAAAAZACACAAAaADADAAAbACADAAAAGQAgAgAAGgAwAwAAGwAgAwAAABkAIAIAABoAMAMAABsAIAoKAACCDQAgqwQBAAAAAa0EAQAAAAGuBEAAAAABrwRAAAAAAdwEAgAAAAGOBQEAAAABjwUBAAAAAZAFAQAAAAGRBSAAAAABATUAAMcEACAJqwQBAAAAAa0EAQAAAAGuBEAAAAABrwRAAAAAAdwEAgAAAAGOBQEAAAABjwUBAAAAAZAFAQAAAAGRBSAAAAABATUAAMkEADABNQAAyQQAMAoKAACBDQAgqwQBAOAIACGtBAEA4AgAIa4EQADhCAAhrwRAAOEIACHcBAIA6QkAIY4FAQDgCAAhjwUBAIEJACGQBQEAgQkAIZEFIACFCQAhAgAAABsAIDUAAMwEACAJqwQBAOAIACGtBAEA4AgAIa4EQADhCAAhrwRAAOEIACHcBAIA6QkAIY4FAQDgCAAhjwUBAIEJACGQBQEAgQkAIZEFIACFCQAhAgAAABkAIDUAAM4EACACAAAAGQAgNQAAzgQAIAMAAAAbACA8AADHBAAgPQAAzAQAIAEAAAAbACABAAAAGQAgBwgAAPwMACBCAAD_DAAgQwAA_gwAIFQAAP0MACBVAACADQAgjwUAAPsIACCQBQAA-wgAIAyoBAAAxQcAMKkEAADVBAAQqgQAAMUHADCrBAEA3AYAIa0EAQDcBgAhrgRAAN0GACGvBEAA3QYAIdwEAgCUBwAhjgUBAOkGACGPBQEA6gYAIZAFAQDqBgAhkQUgAO4GACEDAAAAGQAgAgAA1AQAMEEAANUEACADAAAAGQAgAgAAGgAwAwAAGwAgAQAAACMAIAEAAAAjACADAAAAIQAgAgAAIgAwAwAAIwAgAwAAACEAIAIAACIAMAMAACMAIAMAAAAhACACAAAiADADAAAjACANAQAAhAwAIAoAAN4KACCrBAEAAAABrQQBAAAAAa4EQAAAAAGvBEAAAAABuwQBAAAAAcoEAAAAjQUCiAUCAAAAAYkFAQAAAAGKBQEAAAABiwUgAAAAAY0FAgAAAAEBNQAA3QQAIAurBAEAAAABrQQBAAAAAa4EQAAAAAGvBEAAAAABuwQBAAAAAcoEAAAAjQUCiAUCAAAAAYkFAQAAAAGKBQEAAAABiwUgAAAAAY0FAgAAAAEBNQAA3wQAMAE1AADfBAAwDQEAAIIMACAKAADcCgAgqwQBAOAIACGtBAEA4AgAIa4EQADhCAAhrwRAAOEIACG7BAEA4AgAIcoEAADaCo0FIogFAgDpCQAhiQUBAIEJACGKBQEA4AgAIYsFIACFCQAhjQUCAIYJACECAAAAIwAgNQAA4gQAIAurBAEA4AgAIa0EAQDgCAAhrgRAAOEIACGvBEAA4QgAIbsEAQDgCAAhygQAANoKjQUiiAUCAOkJACGJBQEAgQkAIYoFAQDgCAAhiwUgAIUJACGNBQIAhgkAIQIAAAAhACA1AADkBAAgAgAAACEAIDUAAOQEACADAAAAIwAgPAAA3QQAID0AAOIEACABAAAAIwAgAQAAACEAIAcIAAD3DAAgQgAA-gwAIEMAAPkMACBUAAD4DAAgVQAA-wwAIIkFAAD7CAAgjQUAAPsIACAOqAQAAMEHADCpBAAA6wQAEKoEAADBBwAwqwQBANwGACGtBAEA3AYAIa4EQADdBgAhrwRAAN0GACG7BAEA3AYAIcoEAADCB40FIogFAgCUBwAhiQUBAOoGACGKBQEA6QYAIYsFIADuBgAhjQUCAO8GACEDAAAAIQAgAgAA6gQAMEEAAOsEACADAAAAIQAgAgAAIgAwAwAAIwAgAQAAAB8AIAEAAAAfACADAAAAHQAgAgAAHgAwAwAAHwAgAwAAAB0AIAIAAB4AMAMAAB8AIAMAAAAdACACAAAeADADAAAfACAUCgAA9gwAICQAALsMACAlAAC8DAAgJgAAvQwAIKsEAQAAAAGtBAEAAAABrgRAAAAAAa8EQAAAAAHFBAEAAAABygQAAACIBQLbBAEAAAAB_gQBAAAAAf8EAQAAAAGABQEAAAABgQUBAAAAAYIFEAAAAAGDBRAAAAABhAUCAAAAAYUFAgAAAAGGBQIAAAABATUAAPMEACAQqwQBAAAAAa0EAQAAAAGuBEAAAAABrwRAAAAAAcUEAQAAAAHKBAAAAIgFAtsEAQAAAAH-BAEAAAAB_wQBAAAAAYAFAQAAAAGBBQEAAAABggUQAAAAAYMFEAAAAAGEBQIAAAABhQUCAAAAAYYFAgAAAAEBNQAA9QQAMAE1AAD1BAAwFAoAAPUMACAkAACRDAAgJQAAkgwAICYAAJMMACCrBAEA4AgAIa0EAQDgCAAhrgRAAOEIACGvBEAA4QgAIcUEAQDgCAAhygQAAI8MiAUi2wQBAIEJACH-BAEA4AgAIf8EAQCBCQAhgAUBAIEJACGBBQEAgQkAIYIFEADVCQAhgwUQAN0LACGEBQIA6QkAIYUFAgDpCQAhhgUCAOkJACECAAAAHwAgNQAA-AQAIBCrBAEA4AgAIa0EAQDgCAAhrgRAAOEIACGvBEAA4QgAIcUEAQDgCAAhygQAAI8MiAUi2wQBAIEJACH-BAEA4AgAIf8EAQCBCQAhgAUBAIEJACGBBQEAgQkAIYIFEADVCQAhgwUQAN0LACGEBQIA6QkAIYUFAgDpCQAhhgUCAOkJACECAAAAHQAgNQAA-gQAIAIAAAAdACA1AAD6BAAgAwAAAB8AIDwAAPMEACA9AAD4BAAgAQAAAB8AIAEAAAAdACAKCAAA8AwAIEIAAPMMACBDAADyDAAgVAAA8QwAIFUAAPQMACDbBAAA-wgAIP8EAAD7CAAggAUAAPsIACCBBQAA-wgAIIMFAAD7CAAgE6gEAAC6BwAwqQQAAIEFABCqBAAAugcAMKsEAQDcBgAhrQQBANwGACGuBEAA3QYAIa8EQADdBgAhxQQBAOkGACHKBAAAvAeIBSLbBAEA6gYAIf4EAQDpBgAh_wQBAOoGACGABQEA6gYAIYEFAQDqBgAhggUQALAHACGDBRAAuwcAIYQFAgCUBwAhhQUCAJQHACGGBQIAlAcAIQMAAAAdACACAACABQAwQQAAgQUAIAMAAAAdACACAAAeADADAAAfACAUGAAArgcAIBkAALkHACCoBAAAtgcAMKkEAABGABCqBAAAtgcAMKsEAQAAAAGuBEAA5QYAIa8EQADlBgAhygQAALgH-QQi0QQBAAAAAeMEAQCABwAh9AQBAAAAAfUEAQD_BgAh9gQQALcHACH3BAEA_wYAIfkEAQCABwAh-gQBAIAHACH7BAEA_wYAIfwEQACBBwAh_QRAAIEHACEBAAAAhAUAIAEAAACEBQAgBxgAAOkMACAZAADvDAAg4wQAAPsIACD5BAAA-wgAIPoEAAD7CAAg_AQAAPsIACD9BAAA-wgAIAMAAABGACACAACHBQAwAwAAhAUAIAMAAABGACACAACHBQAwAwAAhAUAIAMAAABGACACAACHBQAwAwAAhAUAIBEYAAC3CgAgGQAAmQoAIKsEAQAAAAGuBEAAAAABrwRAAAAAAcoEAAAA-QQC0QQBAAAAAeMEAQAAAAH0BAEAAAAB9QQBAAAAAfYEEAAAAAH3BAEAAAAB-QQBAAAAAfoEAQAAAAH7BAEAAAAB_ARAAAAAAf0EQAAAAAEBNQAAiwUAIA-rBAEAAAABrgRAAAAAAa8EQAAAAAHKBAAAAPkEAtEEAQAAAAHjBAEAAAAB9AQBAAAAAfUEAQAAAAH2BBAAAAAB9wQBAAAAAfkEAQAAAAH6BAEAAAAB-wQBAAAAAfwEQAAAAAH9BEAAAAABATUAAI0FADABNQAAjQUAMBEYAAC2CgAgGQAAmAoAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIcoEAACXCvkEItEEAQDgCAAh4wQBAIEJACH0BAEA4AgAIfUEAQDgCAAh9gQQANUJACH3BAEA4AgAIfkEAQCBCQAh-gQBAIEJACH7BAEA4AgAIfwEQACCCQAh_QRAAIIJACECAAAAhAUAIDUAAJAFACAPqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhygQAAJcK-QQi0QQBAOAIACHjBAEAgQkAIfQEAQDgCAAh9QQBAOAIACH2BBAA1QkAIfcEAQDgCAAh-QQBAIEJACH6BAEAgQkAIfsEAQDgCAAh_ARAAIIJACH9BEAAggkAIQIAAABGACA1AACSBQAgAgAAAEYAIDUAAJIFACADAAAAhAUAIDwAAIsFACA9AACQBQAgAQAAAIQFACABAAAARgAgCggAAOoMACBCAADtDAAgQwAA7AwAIFQAAOsMACBVAADuDAAg4wQAAPsIACD5BAAA-wgAIPoEAAD7CAAg_AQAAPsIACD9BAAA-wgAIBKoBAAArwcAMKkEAACZBQAQqgQAAK8HADCrBAEA3AYAIa4EQADdBgAhrwRAAN0GACHKBAAAsQf5BCLRBAEA3AYAIeMEAQDqBgAh9AQBANwGACH1BAEA6QYAIfYEEACwBwAh9wQBAOkGACH5BAEA6gYAIfoEAQDqBgAh-wQBAOkGACH8BEAA6wYAIf0EQADrBgAhAwAAAEYAIAIAAJgFADBBAACZBQAgAwAAAEYAIAIAAIcFADADAACEBQAgEhgAAK4HACCoBAAArAcAMKkEAABIABCqBAAArAcAMKsEAQAAAAGuBEAA5QYAIa8EQADlBgAhygQAAK0H7wQi0QQBAAAAAeoEAQCABwAh6wQBAIAHACHsBAEAAAAB7QQBAAAAAe8EQACBBwAh8ARAAIEHACHxBEAAgQcAIfIEAQCABwAh8wQBAIAHACEBAAAAnAUAIAEAAACcBQAgChgAAOkMACDqBAAA-wgAIOsEAAD7CAAg7AQAAPsIACDtBAAA-wgAIO8EAAD7CAAg8AQAAPsIACDxBAAA-wgAIPIEAAD7CAAg8wQAAPsIACADAAAASAAgAgAAnwUAMAMAAJwFACADAAAASAAgAgAAnwUAMAMAAJwFACADAAAASAAgAgAAnwUAMAMAAJwFACAPGAAA6AwAIKsEAQAAAAGuBEAAAAABrwRAAAAAAcoEAAAA7wQC0QQBAAAAAeoEAQAAAAHrBAEAAAAB7AQBAAAAAe0EAQAAAAHvBEAAAAAB8ARAAAAAAfEEQAAAAAHyBAEAAAAB8wQBAAAAAQE1AACjBQAgDqsEAQAAAAGuBEAAAAABrwRAAAAAAcoEAAAA7wQC0QQBAAAAAeoEAQAAAAHrBAEAAAAB7AQBAAAAAe0EAQAAAAHvBEAAAAAB8ARAAAAAAfEEQAAAAAHyBAEAAAAB8wQBAAAAAQE1AAClBQAwATUAAKUFADAPGAAA5wwAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIcoEAACoCu8EItEEAQDgCAAh6gQBAIEJACHrBAEAgQkAIewEAQCBCQAh7QQBAIEJACHvBEAAggkAIfAEQACCCQAh8QRAAIIJACHyBAEAgQkAIfMEAQCBCQAhAgAAAJwFACA1AACoBQAgDqsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIcoEAACoCu8EItEEAQDgCAAh6gQBAIEJACHrBAEAgQkAIewEAQCBCQAh7QQBAIEJACHvBEAAggkAIfAEQACCCQAh8QRAAIIJACHyBAEAgQkAIfMEAQCBCQAhAgAAAEgAIDUAAKoFACACAAAASAAgNQAAqgUAIAMAAACcBQAgPAAAowUAID0AAKgFACABAAAAnAUAIAEAAABIACAMCAAA5AwAIEIAAOYMACBDAADlDAAg6gQAAPsIACDrBAAA-wgAIOwEAAD7CAAg7QQAAPsIACDvBAAA-wgAIPAEAAD7CAAg8QQAAPsIACDyBAAA-wgAIPMEAAD7CAAgEagEAACoBwAwqQQAALEFABCqBAAAqAcAMKsEAQDcBgAhrgRAAN0GACGvBEAA3QYAIcoEAACpB-8EItEEAQDcBgAh6gQBAOoGACHrBAEA6gYAIewEAQDqBgAh7QQBAOoGACHvBEAA6wYAIfAEQADrBgAh8QRAAOsGACHyBAEA6gYAIfMEAQDqBgAhAwAAAEgAIAIAALAFADBBAACxBQAgAwAAAEgAIAIAAJ8FADADAACcBQAgDKgEAACkBwAwqQQAALcFABCqBAAApAcAMKsEAQAAAAGuBEAA5QYAIa8EQADlBgAh4wQBAIAHACHlBAEA_wYAIeYEAACmBwAg5wQBAP8GACHoBAEAgAcAIekEIACEBwAhAQAAALQFACABAAAAtAUAIAyoBAAApAcAMKkEAAC3BQAQqgQAAKQHADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACHjBAEAgAcAIeUEAQD_BgAh5gQAAKYHACDnBAEA_wYAIegEAQCABwAh6QQgAIQHACEC4wQAAPsIACDoBAAA-wgAIAMAAAC3BQAgAgAAuAUAMAMAALQFACADAAAAtwUAIAIAALgFADADAAC0BQAgAwAAALcFACACAAC4BQAwAwAAtAUAIAmrBAEAAAABrgRAAAAAAa8EQAAAAAHjBAEAAAAB5QQBAAAAAeYEgAAAAAHnBAEAAAAB6AQBAAAAAekEIAAAAAEBNQAAvAUAIAmrBAEAAAABrgRAAAAAAa8EQAAAAAHjBAEAAAAB5QQBAAAAAeYEgAAAAAHnBAEAAAAB6AQBAAAAAekEIAAAAAEBNQAAvgUAMAE1AAC-BQAwCasEAQDgCAAhrgRAAOEIACGvBEAA4QgAIeMEAQCBCQAh5QQBAOAIACHmBIAAAAAB5wQBAOAIACHoBAEAgQkAIekEIACFCQAhAgAAALQFACA1AADBBQAgCasEAQDgCAAhrgRAAOEIACGvBEAA4QgAIeMEAQCBCQAh5QQBAOAIACHmBIAAAAAB5wQBAOAIACHoBAEAgQkAIekEIACFCQAhAgAAALcFACA1AADDBQAgAgAAALcFACA1AADDBQAgAwAAALQFACA8AAC8BQAgPQAAwQUAIAEAAAC0BQAgAQAAALcFACAFCAAA4QwAIEIAAOMMACBDAADiDAAg4wQAAPsIACDoBAAA-wgAIAyoBAAAowcAMKkEAADKBQAQqgQAAKMHADCrBAEA3AYAIa4EQADdBgAhrwRAAN0GACHjBAEA6gYAIeUEAQDpBgAh5gQAAJsHACDnBAEA6QYAIegEAQDqBgAh6QQgAO4GACEDAAAAtwUAIAIAAMkFADBBAADKBQAgAwAAALcFACACAAC4BQAwAwAAtAUAIAsGAACgBwAgBwAAoQcAIKgEAACeBwAwqQQAAAkAEKoEAACeBwAwqwQBAAAAAa4EQADlBgAhrwRAAOUGACHABAEA_wYAIeMEAQCABwAh5AQBAJ8HACEBAAAAzQUAIAEAAADNBQAgBAYAAN8MACAHAADgDAAg4wQAAPsIACDkBAAA-wgAIAMAAAAJACACAADQBQAwAwAAzQUAIAMAAAAJACACAADQBQAwAwAAzQUAIAMAAAAJACACAADQBQAwAwAAzQUAIAgGAADdDAAgBwAA3gwAIKsEAQAAAAGuBEAAAAABrwRAAAAAAcAEAQAAAAHjBAEAAAAB5AQBAAAAAQE1AADUBQAgBqsEAQAAAAGuBEAAAAABrwRAAAAAAcAEAQAAAAHjBAEAAAAB5AQBAAAAAQE1AADWBQAwATUAANYFADAIBgAA0QsAIAcAANILACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACHABAEA4AgAIeMEAQCBCQAh5AQBAIEJACECAAAAzQUAIDUAANkFACAGqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhwAQBAOAIACHjBAEAgQkAIeQEAQCBCQAhAgAAAAkAIDUAANsFACACAAAACQAgNQAA2wUAIAMAAADNBQAgPAAA1AUAID0AANkFACABAAAAzQUAIAEAAAAJACAFCAAAzgsAIEIAANALACBDAADPCwAg4wQAAPsIACDkBAAA-wgAIAmoBAAAnQcAMKkEAADiBQAQqgQAAJ0HADCrBAEA3AYAIa4EQADdBgAhrwRAAN0GACHABAEA6QYAIeMEAQDqBgAh5AQBAJIHACEDAAAACQAgAgAA4QUAMEEAAOIFACADAAAACQAgAgAA0AUAMAMAAM0FACABAAAADQAgAQAAAA0AIAMAAAALACACAAAMADADAAANACADAAAACwAgAgAADAAwAwAADQAgAwAAAAsAIAIAAAwAMAMAAA0AIAYFAADNCwAgBoAAAAABqwQBAAAAAdoEAQAAAAHbBAEAAAAB3AQCAAAAAQE1AADqBQAgBQaAAAAAAasEAQAAAAHaBAEAAAAB2wQBAAAAAdwEAgAAAAEBNQAA7AUAMAE1AADsBQAwBgUAAMwLACAGgAAAAAGrBAEA4AgAIdoEAQDgCAAh2wQBAOAIACHcBAIA6QkAIQIAAAANACA1AADvBQAgBQaAAAAAAasEAQDgCAAh2gQBAOAIACHbBAEA4AgAIdwEAgDpCQAhAgAAAAsAIDUAAPEFACACAAAACwAgNQAA8QUAIAMAAAANACA8AADqBQAgPQAA7wUAIAEAAAANACABAAAACwAgBQgAAMcLACBCAADKCwAgQwAAyQsAIFQAAMgLACBVAADLCwAgCAYAAJsHACCoBAAAmgcAMKkEAAD4BQAQqgQAAJoHADCrBAEA3AYAIdoEAQDcBgAh2wQBAOkGACHcBAIAlAcAIQMAAAALACACAAD3BQAwQQAA-AUAIAMAAAALACACAAAMADADAAANACABAAAAQAAgAQAAAEAAIAMAAAA-ACACAAA_ADADAABAACADAAAAPgAgAgAAPwAwAwAAQAAgAwAAAD4AIAIAAD8AMAMAAEAAIBAXAADvCQAgGAAAiQoAICEAAPAJACAiAADxCQAgqwQBAAAAAa4EQAAAAAGvBEAAAAAB0AQBAAAAAdEEAQAAAAHSBAEAAAAB0wQBAAAAAdUEAAAA1QQC1gQCAAAAAdcEAgAAAAHYBAIAAAAB2QQBAAAAAQE1AACABgAgDKsEAQAAAAGuBEAAAAABrwRAAAAAAdAEAQAAAAHRBAEAAAAB0gQBAAAAAdMEAQAAAAHVBAAAANUEAtYEAgAAAAHXBAIAAAAB2AQCAAAAAdkEAQAAAAEBNQAAggYAMAE1AACCBgAwAQAAAEIAIAEAAABTACAQFwAA6wkAIBgAAIcKACAhAADsCQAgIgAA7QkAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIdAEAQDgCAAh0QQBAIEJACHSBAEAgQkAIdMEAQDgCAAh1QQAAOgJ1QQi1gQCAOkJACHXBAIA6QkAIdgEAgDpCQAh2QQBAIEJACECAAAAQAAgNQAAhwYAIAyrBAEA4AgAIa4EQADhCAAhrwRAAOEIACHQBAEA4AgAIdEEAQCBCQAh0gQBAIEJACHTBAEA4AgAIdUEAADoCdUEItYEAgDpCQAh1wQCAOkJACHYBAIA6QkAIdkEAQCBCQAhAgAAAD4AIDUAAIkGACACAAAAPgAgNQAAiQYAIAEAAABCACABAAAAUwAgAwAAAEAAIDwAAIAGACA9AACHBgAgAQAAAEAAIAEAAAA-ACAICAAAwgsAIEIAAMULACBDAADECwAgVAAAwwsAIFUAAMYLACDRBAAA-wgAINIEAAD7CAAg2QQAAPsIACAPqAQAAJEHADCpBAAAkgYAEKoEAACRBwAwqwQBANwGACGuBEAA3QYAIa8EQADdBgAh0AQBANwGACHRBAEAkgcAIdIEAQCSBwAh0wQBANwGACHVBAAAkwfVBCLWBAIAlAcAIdcEAgCUBwAh2AQCAJQHACHZBAEA6gYAIQMAAAA-ACACAACRBgAwQQAAkgYAIAMAAAA-ACACAAA_ADADAABAACAgHgAAigcAICAAAIsHACAnAACGBwAgKAAAhwcAICkAAIgHACAqAACJBwAgKwAAjAcAICwAAI0HACAtAACOBwAgLgAAjwcAIC8AAJAHACCoBAAA_gYAMKkEAABsABCqBAAA_gYAMKsEAQAAAAGuBEAA5QYAIa8EQADlBgAhvwQBAAAAAcAEAQD_BgAhwQQBAIAHACHCBAEAAAABwwRAAIEHACHEBAEAAAABxQQBAIAHACHGBAEAgAcAIcgEAACCB8gEIsoEAACDB8oEIssEQACBBwAhzARAAIEHACHNBEAAgQcAIc4EIACEBwAhzwQCAIUHACEBAAAAlQYAIAEAAACVBgAgFR4AALsLACAgAAC8CwAgJwAAtwsAICgAALgLACApAAC5CwAgKgAAugsAICsAAL0LACAsAAC-CwAgLQAAvwsAIC4AAMALACAvAADBCwAgwQQAAPsIACDCBAAA-wgAIMMEAAD7CAAgxAQAAPsIACDFBAAA-wgAIMYEAAD7CAAgywQAAPsIACDMBAAA-wgAIM0EAAD7CAAgzwQAAPsIACADAAAAbAAgAgAAmAYAMAMAAJUGACADAAAAbAAgAgAAmAYAMAMAAJUGACADAAAAbAAgAgAAmAYAMAMAAJUGACAdHgAAsAsAICAAALELACAnAACsCwAgKAAArQsAICkAAK4LACAqAACvCwAgKwAAsgsAICwAALMLACAtAAC0CwAgLgAAtQsAIC8AALYLACCrBAEAAAABrgRAAAAAAa8EQAAAAAG_BAEAAAABwAQBAAAAAcEEAQAAAAHCBAEAAAABwwRAAAAAAcQEAQAAAAHFBAEAAAABxgQBAAAAAcgEAAAAyAQCygQAAADKBALLBEAAAAABzARAAAAAAc0EQAAAAAHOBCAAAAABzwQCAAAAAQE1AACcBgAgEqsEAQAAAAGuBEAAAAABrwRAAAAAAb8EAQAAAAHABAEAAAABwQQBAAAAAcIEAQAAAAHDBEAAAAABxAQBAAAAAcUEAQAAAAHGBAEAAAAByAQAAADIBALKBAAAAMoEAssEQAAAAAHMBEAAAAABzQRAAAAAAc4EIAAAAAHPBAIAAAABATUAAJ4GADABNQAAngYAMB0eAACLCQAgIAAAjAkAICcAAIcJACAoAACICQAgKQAAiQkAICoAAIoJACArAACNCQAgLAAAjgkAIC0AAI8JACAuAACQCQAgLwAAkQkAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIb8EAQDgCAAhwAQBAOAIACHBBAEAgQkAIcIEAQCBCQAhwwRAAIIJACHEBAEAgQkAIcUEAQCBCQAhxgQBAIEJACHIBAAAgwnIBCLKBAAAhAnKBCLLBEAAggkAIcwEQACCCQAhzQRAAIIJACHOBCAAhQkAIc8EAgCGCQAhAgAAAJUGACA1AAChBgAgEqsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIb8EAQDgCAAhwAQBAOAIACHBBAEAgQkAIcIEAQCBCQAhwwRAAIIJACHEBAEAgQkAIcUEAQCBCQAhxgQBAIEJACHIBAAAgwnIBCLKBAAAhAnKBCLLBEAAggkAIcwEQACCCQAhzQRAAIIJACHOBCAAhQkAIc8EAgCGCQAhAgAAAGwAIDUAAKMGACACAAAAbAAgNQAAowYAIAMAAACVBgAgPAAAnAYAID0AAKEGACABAAAAlQYAIAEAAABsACAPCAAA_AgAIEIAAP8IACBDAAD-CAAgVAAA_QgAIFUAAIAJACDBBAAA-wgAIMIEAAD7CAAgwwQAAPsIACDEBAAA-wgAIMUEAAD7CAAgxgQAAPsIACDLBAAA-wgAIMwEAAD7CAAgzQQAAPsIACDPBAAA-wgAIBWoBAAA6AYAMKkEAACqBgAQqgQAAOgGADCrBAEA3AYAIa4EQADdBgAhrwRAAN0GACG_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_BAEA_wYAIcAEAQD_BgAhwQQBAIAHACHCBAEAgAcAIcMEQACBBwAhxAQBAIAHACHFBAEAgAcAIcYEAQCABwAhyAQAAIIHyAQiygQAAIMHygQiywRAAIEHACHMBEAAgQcAIc0EQACBBwAhzgQgAIQHACHPBAIAhQcAIf4FAABsACD_BQAAbAAgA7wEAAAlACC9BAAAJQAgvgQAACUAIBWoBAAA6AYAMKkEAACqBgAQqgQAAOgGADCrBAEA3AYAIa4EQADdBgAhrwRAAN0GACG_BAEA6QYAIcAEAQDpBgAhwQQBAOoGACHCBAEA6gYAIcMEQADrBgAhxAQBAOoGACHFBAEA6gYAIcYEAQDqBgAhyAQAAOwGyAQiygQAAO0GygQiywRAAOsGACHMBEAA6wYAIc0EQADrBgAhzgQgAO4GACHPBAIA7wYAIQ4IAADfBgAgQgAA4gYAIEMAAOIGACCwBAEAAAABsQQBAAAABLIEAQAAAASzBAEAAAABtAQBAAAAAbUEAQAAAAG2BAEAAAABtwQBAP0GACG4BAEAAAABuQQBAAAAAboEAQAAAAEOCAAA8QYAIEIAAPwGACBDAAD8BgAgsAQBAAAAAbEEAQAAAAWyBAEAAAAFswQBAAAAAbQEAQAAAAG1BAEAAAABtgQBAAAAAbcEAQD7BgAhuAQBAAAAAbkEAQAAAAG6BAEAAAABCwgAAPEGACBCAAD6BgAgQwAA-gYAILAEQAAAAAGxBEAAAAAFsgRAAAAABbMEQAAAAAG0BEAAAAABtQRAAAAAAbYEQAAAAAG3BEAA-QYAIQcIAADfBgAgQgAA-AYAIEMAAPgGACCwBAAAAMgEArEEAAAAyAQIsgQAAADIBAi3BAAA9wbIBCIHCAAA3wYAIEIAAPYGACBDAAD2BgAgsAQAAADKBAKxBAAAAMoECLIEAAAAygQItwQAAPUGygQiBQgAAN8GACBCAAD0BgAgQwAA9AYAILAEIAAAAAG3BCAA8wYAIQ0IAADxBgAgQgAA8QYAIEMAAPEGACBUAADyBgAgVQAA8QYAILAEAgAAAAGxBAIAAAAFsgQCAAAABbMEAgAAAAG0BAIAAAABtQQCAAAAAbYEAgAAAAG3BAIA8AYAIQ0IAADxBgAgQgAA8QYAIEMAAPEGACBUAADyBgAgVQAA8QYAILAEAgAAAAGxBAIAAAAFsgQCAAAABbMEAgAAAAG0BAIAAAABtQQCAAAAAbYEAgAAAAG3BAIA8AYAIQiwBAIAAAABsQQCAAAABbIEAgAAAAWzBAIAAAABtAQCAAAAAbUEAgAAAAG2BAIAAAABtwQCAPEGACEIsAQIAAAAAbEECAAAAAWyBAgAAAAFswQIAAAAAbQECAAAAAG1BAgAAAABtgQIAAAAAbcECADyBgAhBQgAAN8GACBCAAD0BgAgQwAA9AYAILAEIAAAAAG3BCAA8wYAIQKwBCAAAAABtwQgAPQGACEHCAAA3wYAIEIAAPYGACBDAAD2BgAgsAQAAADKBAKxBAAAAMoECLIEAAAAygQItwQAAPUGygQiBLAEAAAAygQCsQQAAADKBAiyBAAAAMoECLcEAAD2BsoEIgcIAADfBgAgQgAA-AYAIEMAAPgGACCwBAAAAMgEArEEAAAAyAQIsgQAAADIBAi3BAAA9wbIBCIEsAQAAADIBAKxBAAAAMgECLIEAAAAyAQItwQAAPgGyAQiCwgAAPEGACBCAAD6BgAgQwAA-gYAILAEQAAAAAGxBEAAAAAFsgRAAAAABbMEQAAAAAG0BEAAAAABtQRAAAAAAbYEQAAAAAG3BEAA-QYAIQiwBEAAAAABsQRAAAAABbIEQAAAAAWzBEAAAAABtARAAAAAAbUEQAAAAAG2BEAAAAABtwRAAPoGACEOCAAA8QYAIEIAAPwGACBDAAD8BgAgsAQBAAAAAbEEAQAAAAWyBAEAAAAFswQBAAAAAbQEAQAAAAG1BAEAAAABtgQBAAAAAbcEAQD7BgAhuAQBAAAAAbkEAQAAAAG6BAEAAAABC7AEAQAAAAGxBAEAAAAFsgQBAAAABbMEAQAAAAG0BAEAAAABtQQBAAAAAbYEAQAAAAG3BAEA_AYAIbgEAQAAAAG5BAEAAAABugQBAAAAAQ4IAADfBgAgQgAA4gYAIEMAAOIGACCwBAEAAAABsQQBAAAABLIEAQAAAASzBAEAAAABtAQBAAAAAbUEAQAAAAG2BAEAAAABtwQBAP0GACG4BAEAAAABuQQBAAAAAboEAQAAAAEgHgAAigcAICAAAIsHACAnAACGBwAgKAAAhwcAICkAAIgHACAqAACJBwAgKwAAjAcAICwAAI0HACAtAACOBwAgLgAAjwcAIC8AAJAHACCoBAAA_gYAMKkEAABsABCqBAAA_gYAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIb8EAQD_BgAhwAQBAP8GACHBBAEAgAcAIcIEAQCABwAhwwRAAIEHACHEBAEAgAcAIcUEAQCABwAhxgQBAIAHACHIBAAAggfIBCLKBAAAgwfKBCLLBEAAgQcAIcwEQACBBwAhzQRAAIEHACHOBCAAhAcAIc8EAgCFBwAhC7AEAQAAAAGxBAEAAAAEsgQBAAAABLMEAQAAAAG0BAEAAAABtQQBAAAAAbYEAQAAAAG3BAEA4gYAIbgEAQAAAAG5BAEAAAABugQBAAAAAQuwBAEAAAABsQQBAAAABbIEAQAAAAWzBAEAAAABtAQBAAAAAbUEAQAAAAG2BAEAAAABtwQBAPwGACG4BAEAAAABuQQBAAAAAboEAQAAAAEIsARAAAAAAbEEQAAAAAWyBEAAAAAFswRAAAAAAbQEQAAAAAG1BEAAAAABtgRAAAAAAbcEQAD6BgAhBLAEAAAAyAQCsQQAAADIBAiyBAAAAMgECLcEAAD4BsgEIgSwBAAAAMoEArEEAAAAygQIsgQAAADKBAi3BAAA9gbKBCICsAQgAAAAAbcEIAD0BgAhCLAEAgAAAAGxBAIAAAAFsgQCAAAABbMEAgAAAAG0BAIAAAABtQQCAAAAAbYEAgAAAAG3BAIA8QYAIQwBAADmBgAgDgAAjAgAIKgEAACLCAAwqQQAAAMAEKoEAACLCAAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAhuwQBAKUHACG6BRAAtwcAIf4FAAADACD_BQAAAwAgCwEAAOYGACAOAADnBgAgqAQAAOQGADCpBAAAYwAQqgQAAOQGADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACG7BAEApQcAIf4FAABjACD_BQAAYwAgA7wEAABlACC9BAAAZQAgvgQAAGUAIAO8BAAAaAAgvQQAAGgAIL4EAABoACADvAQAAEoAIL0EAABKACC-BAAASgAgA7wEAAA-ACC9BAAAPgAgvgQAAD4AIAO8BAAAIQAgvQQAACEAIL4EAAAhACADvAQAAHEAIL0EAABxACC-BAAAcQAgA7wEAABCACC9BAAAQgAgvgQAAEIAIAO8BAAAeAAgvQQAAHgAIL4EAAB4ACADvAQAAC8AIL0EAAAvACC-BAAALwAgD6gEAACRBwAwqQQAAJIGABCqBAAAkQcAMKsEAQDcBgAhrgRAAN0GACGvBEAA3QYAIdAEAQDcBgAh0QQBAJIHACHSBAEAkgcAIdMEAQDcBgAh1QQAAJMH1QQi1gQCAJQHACHXBAIAlAcAIdgEAgCUBwAh2QQBAOoGACELCAAA8QYAIEIAAPwGACBDAAD8BgAgsAQBAAAAAbEEAQAAAAWyBAEAAAAFswQBAAAAAbQEAQAAAAG1BAEAAAABtgQBAAAAAbcEAQCZBwAhBwgAAN8GACBCAACYBwAgQwAAmAcAILAEAAAA1QQCsQQAAADVBAiyBAAAANUECLcEAACXB9UEIg0IAADfBgAgQgAA3wYAIEMAAN8GACBUAACWBwAgVQAA3wYAILAEAgAAAAGxBAIAAAAEsgQCAAAABLMEAgAAAAG0BAIAAAABtQQCAAAAAbYEAgAAAAG3BAIAlQcAIQ0IAADfBgAgQgAA3wYAIEMAAN8GACBUAACWBwAgVQAA3wYAILAEAgAAAAGxBAIAAAAEsgQCAAAABLMEAgAAAAG0BAIAAAABtQQCAAAAAbYEAgAAAAG3BAIAlQcAIQiwBAgAAAABsQQIAAAABLIECAAAAASzBAgAAAABtAQIAAAAAbUECAAAAAG2BAgAAAABtwQIAJYHACEHCAAA3wYAIEIAAJgHACBDAACYBwAgsAQAAADVBAKxBAAAANUECLIEAAAA1QQItwQAAJcH1QQiBLAEAAAA1QQCsQQAAADVBAiyBAAAANUECLcEAACYB9UEIgsIAADxBgAgQgAA_AYAIEMAAPwGACCwBAEAAAABsQQBAAAABbIEAQAAAAWzBAEAAAABtAQBAAAAAbUEAQAAAAG2BAEAAAABtwQBAJkHACEIBgAAmwcAIKgEAACaBwAwqQQAAPgFABCqBAAAmgcAMKsEAQDcBgAh2gQBANwGACHbBAEA6QYAIdwEAgCUBwAhDwgAAN8GACBCAACcBwAgQwAAnAcAILAEgAAAAAGzBIAAAAABtASAAAAAAbUEgAAAAAG2BIAAAAABtwSAAAAAAd0EAQAAAAHeBAEAAAAB3wQBAAAAAeAEgAAAAAHhBIAAAAAB4gSAAAAAAQywBIAAAAABswSAAAAAAbQEgAAAAAG1BIAAAAABtgSAAAAAAbcEgAAAAAHdBAEAAAAB3gQBAAAAAd8EAQAAAAHgBIAAAAAB4QSAAAAAAeIEgAAAAAEJqAQAAJ0HADCpBAAA4gUAEKoEAACdBwAwqwQBANwGACGuBEAA3QYAIa8EQADdBgAhwAQBAOkGACHjBAEA6gYAIeQEAQCSBwAhCwYAAKAHACAHAAChBwAgqAQAAJ4HADCpBAAACQAQqgQAAJ4HADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACHABAEA_wYAIeMEAQCABwAh5AQBAJ8HACEIsAQBAAAAAbEEAQAAAAWyBAEAAAAFswQBAAAAAbQEAQAAAAG1BAEAAAABtgQBAAAAAbcEAQCiBwAhA7wEAAALACC9BAAACwAgvgQAAAsAIAO8BAAADwAgvQQAAA8AIL4EAAAPACAIsAQBAAAAAbEEAQAAAAWyBAEAAAAFswQBAAAAAbQEAQAAAAG1BAEAAAABtgQBAAAAAbcEAQCiBwAhDKgEAACjBwAwqQQAAMoFABCqBAAAowcAMKsEAQDcBgAhrgRAAN0GACGvBEAA3QYAIeMEAQDqBgAh5QQBAOkGACHmBAAAmwcAIOcEAQDpBgAh6AQBAOoGACHpBCAA7gYAIQyoBAAApAcAMKkEAAC3BQAQqgQAAKQHADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACHjBAEAgAcAIeUEAQD_BgAh5gQAAKYHACDnBAEA_wYAIegEAQCABwAh6QQgAIQHACEIsAQBAAAAAbEEAQAAAASyBAEAAAAEswQBAAAAAbQEAQAAAAG1BAEAAAABtgQBAAAAAbcEAQCnBwAhDLAEgAAAAAGzBIAAAAABtASAAAAAAbUEgAAAAAG2BIAAAAABtwSAAAAAAd0EAQAAAAHeBAEAAAAB3wQBAAAAAeAEgAAAAAHhBIAAAAAB4gSAAAAAAQiwBAEAAAABsQQBAAAABLIEAQAAAASzBAEAAAABtAQBAAAAAbUEAQAAAAG2BAEAAAABtwQBAKcHACERqAQAAKgHADCpBAAAsQUAEKoEAACoBwAwqwQBANwGACGuBEAA3QYAIa8EQADdBgAhygQAAKkH7wQi0QQBANwGACHqBAEA6gYAIesEAQDqBgAh7AQBAOoGACHtBAEA6gYAIe8EQADrBgAh8ARAAOsGACHxBEAA6wYAIfIEAQDqBgAh8wQBAOoGACEHCAAA3wYAIEIAAKsHACBDAACrBwAgsAQAAADvBAKxBAAAAO8ECLIEAAAA7wQItwQAAKoH7wQiBwgAAN8GACBCAACrBwAgQwAAqwcAILAEAAAA7wQCsQQAAADvBAiyBAAAAO8ECLcEAACqB-8EIgSwBAAAAO8EArEEAAAA7wQIsgQAAADvBAi3BAAAqwfvBCISGAAArgcAIKgEAACsBwAwqQQAAEgAEKoEAACsBwAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAhygQAAK0H7wQi0QQBAKUHACHqBAEAgAcAIesEAQCABwAh7AQBAIAHACHtBAEAgAcAIe8EQACBBwAh8ARAAIEHACHxBEAAgQcAIfIEAQCABwAh8wQBAIAHACEEsAQAAADvBAKxBAAAAO8ECLIEAAAA7wQItwQAAKsH7wQiHwEAAOYGACAOAACrCAAgGQAApwgAIBoAANQHACAbAACoCAAgHgAAqQgAIB8AAKoIACAgAACLBwAgqAQAAKUIADCpBAAAQgAQqgQAAKUIADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACG7BAEApQcAIcoEAACmCLcFIqkFEAC3BwAhsgUBAP8GACGzBQEA_wYAIbQFAQD_BgAhtQUBAP8GACG3BRAAtwcAIbgFEAC3BwAhuQUQALcHACG6BRAAtwcAIbsFAQCABwAhvAUBAIAHACG9BUAAgQcAIb4FQACBBwAh_gUAAEIAIP8FAABCACASqAQAAK8HADCpBAAAmQUAEKoEAACvBwAwqwQBANwGACGuBEAA3QYAIa8EQADdBgAhygQAALEH-QQi0QQBANwGACHjBAEA6gYAIfQEAQDcBgAh9QQBAOkGACH2BBAAsAcAIfcEAQDpBgAh-QQBAOoGACH6BAEA6gYAIfsEAQDpBgAh_ARAAOsGACH9BEAA6wYAIQ0IAADfBgAgQgAAtQcAIEMAALUHACBUAAC1BwAgVQAAtQcAILAEEAAAAAGxBBAAAAAEsgQQAAAABLMEEAAAAAG0BBAAAAABtQQQAAAAAbYEEAAAAAG3BBAAtAcAIQcIAADfBgAgQgAAswcAIEMAALMHACCwBAAAAPkEArEEAAAA-QQIsgQAAAD5BAi3BAAAsgf5BCIHCAAA3wYAIEIAALMHACBDAACzBwAgsAQAAAD5BAKxBAAAAPkECLIEAAAA-QQItwQAALIH-QQiBLAEAAAA-QQCsQQAAAD5BAiyBAAAAPkECLcEAACzB_kEIg0IAADfBgAgQgAAtQcAIEMAALUHACBUAAC1BwAgVQAAtQcAILAEEAAAAAGxBBAAAAAEsgQQAAAABLMEEAAAAAG0BBAAAAABtQQQAAAAAbYEEAAAAAG3BBAAtAcAIQiwBBAAAAABsQQQAAAABLIEEAAAAASzBBAAAAABtAQQAAAAAbUEEAAAAAG2BBAAAAABtwQQALUHACEUGAAArgcAIBkAALkHACCoBAAAtgcAMKkEAABGABCqBAAAtgcAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIcoEAAC4B_kEItEEAQClBwAh4wQBAIAHACH0BAEApQcAIfUEAQD_BgAh9gQQALcHACH3BAEA_wYAIfkEAQCABwAh-gQBAIAHACH7BAEA_wYAIfwEQACBBwAh_QRAAIEHACEIsAQQAAAAAbEEEAAAAASyBBAAAAAEswQQAAAAAbQEEAAAAAG1BBAAAAABtgQQAAAAAbcEEAC1BwAhBLAEAAAA-QQCsQQAAAD5BAiyBAAAAPkECLcEAACzB_kEIhEYAACuBwAgGgAA1AcAIKgEAADRBwAwqQQAAEQAEKoEAADRBwAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAhygQAANMHnwUi0QQBAKUHACHjBAEAgAcAIfYEEAC3BwAh9wQBAP8GACGdBQAA0gedBSKfBQAApgcAIP4FAABEACD_BQAARAAgE6gEAAC6BwAwqQQAAIEFABCqBAAAugcAMKsEAQDcBgAhrQQBANwGACGuBEAA3QYAIa8EQADdBgAhxQQBAOkGACHKBAAAvAeIBSLbBAEA6gYAIf4EAQDpBgAh_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_wYAIZ0FAADSB50FIp8FAACmBwAgBLAEAAAAnQUCsQQAAACdBQiyBAAAAJ0FCLcEAADQB50FIgSwBAAAAJ8FArEEAAAAnwUIsgQAAACfBQi3BAAAzgefBSIWGAAArgcAIBkAALkHACCoBAAAtgcAMKkEAABGABCqBAAAtgcAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIcoEAAC4B_kEItEEAQClBwAh4wQBAIAHACH0BAEApQcAIfUEAQD_BgAh9gQQALcHACH3BAEA_wYAIfkEAQCABwAh-gQBAIAHACH7BAEA_wYAIfwEQACBBwAh_QRAAIEHACH-BQAARgAg_wUAAEYAIAmoBAAA1QcAMKkEAACNBAAQqgQAANUHADCrBAEA3AYAIa4EQADdBgAhuwQBANwGACGgBQEA6QYAIaEFQADdBgAhogVAAOsGACETLwEA6QYAIagEAADWBwAwqQQAAPcDABCqBAAA1gcAMKsEAQDcBgAhrgRAAN0GACGvBEAA3QYAIdEEAQDcBgAh1gQCAJQHACHjBAEA6gYAIf4EAQDpBgAhowUBANwGACGkBQEA6QYAIaUFAQDpBgAhpgUBAOkGACGnBQEA6QYAIagFEACwBwAhqQUQALAHACGqBRAAsAcAIRCoBAAA1wcAMKkEAADhAwAQqgQAANcHADCrBAEA3AYAIa4EQADdBgAhrwRAAN0GACHABAEA6QYAIcQEAQDpBgAh0QQBANwGACGrBQEA6QYAIawFAQDpBgAhrQUBAOkGACGuBQEA6QYAIa8FAQDpBgAhsAUBAOkGACGxBQEA6gYAIREYAACuBwAgqAQAANgHADCpBAAAUQAQqgQAANgHADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACHABAEA_wYAIcQEAQD_BgAh0QQBAKUHACGrBQEA_wYAIawFAQD_BgAhrQUBAP8GACGuBQEA_wYAIa8FAQD_BgAhsAUBAP8GACGxBQEAgAcAIRWoBAAA2QcAMKkEAADJAwAQqgQAANkHADCrBAEA3AYAIa4EQADdBgAhrwRAAN0GACG7BAEA3AYAIcoEAADaB7cFIqkFEACwBwAhsgUBAOkGACGzBQEA6QYAIbQFAQDpBgAhtQUBAOkGACG3BRAAsAcAIbgFEACwBwAhuQUQALAHACG6BRAAsAcAIbsFAQDqBgAhvAUBAOoGACG9BUAA6wYAIb4FQADrBgAhBwgAAN8GACBCAADcBwAgQwAA3AcAILAEAAAAtwUCsQQAAAC3BQiyBAAAALcFCLcEAADbB7cFIgcIAADfBgAgQgAA3AcAIEMAANwHACCwBAAAALcFArEEAAAAtwUIsgQAAAC3BQi3BAAA2we3BSIEsAQAAAC3BQKxBAAAALcFCLIEAAAAtwUItwQAANwHtwUiE6gEAADdBwAwqQQAALMDABCqBAAA3QcAMKsEAQDcBgAhrgRAAN0GACGvBEAA3QYAIbsEAQDcBgAh1QQAAN4HwQUiiQUBAOkGACG_BQEA6QYAIcIFAADfB8IFIsQFAADgB8QFIsUFAQDpBgAhxgUAAJsHACDHBSAA7gYAIcgFQADrBgAhyQVAAOsGACHKBUAA6wYAIcsFAQDqBgAhBwgAAN8GACBCAADmBwAgQwAA5gcAILAEAAAAwQUCsQQAAADBBQiyBAAAAMEFCLcEAADlB8EFIgcIAADfBgAgQgAA5AcAIEMAAOQHACCwBAAAAMIFArEEAAAAwgUIsgQAAADCBQi3BAAA4wfCBSIHCAAA3wYAIEIAAOIHACBDAADiBwAgsAQAAADEBQKxBAAAAMQFCLIEAAAAxAUItwQAAOEHxAUiBwgAAN8GACBCAADiBwAgQwAA4gcAILAEAAAAxAUCsQQAAADEBQiyBAAAAMQFCLcEAADhB8QFIgSwBAAAAMQFArEEAAAAxAUIsgQAAADEBQi3BAAA4gfEBSIHCAAA3wYAIEIAAOQHACBDAADkBwAgsAQAAADCBQKxBAAAAMIFCLIEAAAAwgUItwQAAOMHwgUiBLAEAAAAwgUCsQQAAADCBQiyBAAAAMIFCLcEAADkB8IFIgcIAADfBgAgQgAA5gcAIEMAAOYHACCwBAAAAMEFArEEAAAAwQUIsgQAAADBBQi3BAAA5QfBBSIEsAQAAADBBQKxBAAAAMEFCLIEAAAAwQUItwQAAOYHwQUiCqgEAADnBwAwqQQAAJ0DABCqBAAA5wcAMKsEAQDcBgAhrgRAAN0GACGvBEAA3QYAIaMFAQDcBgAhzAUCAJQHACHNBQIAlAcAIc4FAgCUBwAhDAwAAOoHACAjAACLBwAgqAQAAOgHADCpBAAAPAAQqgQAAOgHADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACGjBQEApQcAIcwFAgDpBwAhzQUCAOkHACHOBQIA6QcAIQiwBAIAAAABsQQCAAAABLIEAgAAAASzBAIAAAABtAQCAAAAAbUEAgAAAAG2BAIAAAABtwQCAN8GACEZCgAAxggAICQAAM8IACAlAACMCAAgJgAAqwgAIKgEAADNCAAwqQQAAB0AEKoEAADNCAAwqwQBAKUHACGtBAEApQcAIa4EQADlBgAhrwRAAOUGACHFBAEA_wYAIcoEAADOCIgFItsEAQCABwAh_gQBAP8GACH_BAEAgAcAIYAFAQCABwAhgQUBAIAHACGCBRAAtwcAIYMFEAD7BwAhhAUCAOkHACGFBQIA6QcAIYYFAgDpBwAh_gUAAB0AIP8FAAAdACALFQEA6QYAIagEAADrBwAwqQQAAIUDABCqBAAA6wcAMKsEAQDcBgAhrgRAAN0GACGvBEAA3QYAIcoEAADsB9MFIs8FAQDpBgAh0AUBAOkGACHRBQIAlAcAIQcIAADfBgAgQgAA7gcAIEMAAO4HACCwBAAAANMFArEEAAAA0wUIsgQAAADTBQi3BAAA7QfTBSIHCAAA3wYAIEIAAO4HACBDAADuBwAgsAQAAADTBQKxBAAAANMFCLIEAAAA0wUItwQAAO0H0wUiBLAEAAAA0wUCsQQAAADTBQiyBAAAANMFCLcEAADuB9MFIgsVAQD_BgAhqAQAAO8HADCpBAAA8gIAEKoEAADvBwAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAhygQAAPAH0wUizwUBAP8GACHQBQEA_wYAIdEFAgDpBwAhBLAEAAAA0wUCsQQAAADTBQiyBAAAANMFCLcEAADuB9MFIgyoBAAA8QcAMKkEAADsAgAQqgQAAPEHADCrBAEA3AYAIa4EQADdBgAhrwRAAN0GACG7BAEA3AYAIdEEAQDcBgAhogVAAN0GACGpBRAAsAcAIdMFAQDcBgAh1AUBAOkGACEUqAQAAPIHADCpBAAA1gIAEKoEAADyBwAwqwQBANwGACGuBEAA3QYAIa8EQADdBgAhwAQBAOkGACHKBAAA9AffBSLVBAAA8wfXBSLjBAEA6gYAIeYEEACwBwAhoQVAAOsGACHVBQEA6QYAIdcFEAC7BwAh2AUQALsHACHZBQIA7wYAIdoFAgDvBgAh2wUCAO8GACHcBUAA6wYAId0FIADuBgAhBwgAAN8GACBCAAD4BwAgQwAA-AcAILAEAAAA1wUCsQQAAADXBQiyBAAAANcFCLcEAAD3B9cFIgcIAADfBgAgQgAA9gcAIEMAAPYHACCwBAAAAN8FArEEAAAA3wUIsgQAAADfBQi3BAAA9QffBSIHCAAA3wYAIEIAAPYHACBDAAD2BwAgsAQAAADfBQKxBAAAAN8FCLIEAAAA3wUItwQAAPUH3wUiBLAEAAAA3wUCsQQAAADfBQiyBAAAAN8FCLcEAAD2B98FIgcIAADfBgAgQgAA-AcAIEMAAPgHACCwBAAAANcFArEEAAAA1wUIsgQAAADXBQi3BAAA9wfXBSIEsAQAAADXBQKxBAAAANcFCLIEAAAA1wUItwQAAPgH1wUiFRwAAIoHACCoBAAA-QcAMKkEAADDAgAQqgQAAPkHADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACHABAEA_wYAIcoEAAD8B98FItUEAAD6B9cFIuMEAQCABwAh5gQQALcHACGhBUAAgQcAIdUFAQD_BgAh1wUQAPsHACHYBRAA-wcAIdkFAgCFBwAh2gUCAIUHACHbBQIAhQcAIdwFQACBBwAh3QUgAIQHACEEsAQAAADXBQKxBAAAANcFCLIEAAAA1wUItwQAAPgH1wUiCLAEEAAAAAGxBBAAAAAFsgQQAAAABbMEEAAAAAG0BBAAAAABtQQQAAAAAbYEEAAAAAG3BBAAwAcAIQSwBAAAAN8FArEEAAAA3wUIsgQAAADfBQi3BAAA9gffBSIQFQAA_gfhBSKoBAAA_QcAMKkEAAC9AgAQqgQAAP0HADCrBAEA3AYAIa4EQADdBgAhrwRAAN0GACG7BAEAkgcAIb8EAQDpBgAhwAQBAOkGACHEBAEA6gYAIcoEAAD_B-IFIrwFAQDqBgAhvwUBAOkGACHfBQEA6QYAIeIFQADrBgAhBwgAAN8GACBCAACDCAAgQwAAgwgAILAEAAAA4QUCsQQAAADhBQiyBAAAAOEFCLcEAACCCOEFIgcIAADfBgAgQgAAgQgAIEMAAIEIACCwBAAAAOIFArEEAAAA4gUIsgQAAADiBQi3BAAAgAjiBSIHCAAA3wYAIEIAAIEIACBDAACBCAAgsAQAAADiBQKxBAAAAOIFCLIEAAAA4gUItwQAAIAI4gUiBLAEAAAA4gUCsQQAAADiBQiyBAAAAOIFCLcEAACBCOIFIgcIAADfBgAgQgAAgwgAIEMAAIMIACCwBAAAAOEFArEEAAAA4QUIsgQAAADhBQi3BAAAggjhBSIEsAQAAADhBQKxBAAAAOEFCLIEAAAA4QUItwQAAIMI4QUiBqgEAACECAAwqQQAAKUCABCqBAAAhAgAMKsEAQDcBgAhrQQBANwGACHkBAEA3AYAIROoBAAAhQgAMKkEAACPAgAQqgQAAIUIADCrBAEA3AYAIa4EQADdBgAhrwRAAN0GACHABAEA6QYAIcUEAQDqBgAhxgQBAOoGACHKBAAAhgjmBSLOBCAA7gYAIeMEAQDqBgAhkwUBAOoGACGWBSAA7gYAIZkFAQDqBgAhmgUBAOoGACHRBQIA7wYAIeMFAQDcBgAh5AUBAJIHACEHCAAA3wYAIEIAAIgIACBDAACICAAgsAQAAADmBQKxBAAAAOYFCLIEAAAA5gUItwQAAIcI5gUiBwgAAN8GACBCAACICAAgQwAAiAgAILAEAAAA5gUCsQQAAADmBQiyBAAAAOYFCLcEAACHCOYFIgSwBAAAAOYFArEEAAAA5gUIsgQAAADmBQi3BAAAiAjmBSIJqAQAAIkIADCpBAAA9wEAEKoEAACJCAAwqwQBANwGACGuBEAA3QYAIa8EQADdBgAh1gQCAJQHACGjBQEA3AYAIeYFAQDcBgAhCKgEAACKCAAwqQQAAOEBABCqBAAAiggAMKsEAQDcBgAhrgRAAN0GACGvBEAA3QYAIbsEAQDcBgAhugUQALAHACEKAQAA5gYAIA4AAIwIACCoBAAAiwgAMKkEAAADABCqBAAAiwgAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIbsEAQClBwAhugUQALcHACEDvAQAAAUAIL0EAAAFACC-BAAABQAgE6gEAACNCAAwqQQAAMkBABCqBAAAjQgAMKsEAQDcBgAhrgRAAN0GACGvBEAA3QYAIcAEAQDpBgAhygQAAI4I7AUi4wQBAOoGACGQBQEA6QYAIZMFAQDpBgAhlgUgAO4GACGZBQEA6gYAIZoFAQDqBgAh0QUCAJQHACHnBQEA6QYAIegFAQDqBgAh6QUBAOoGACHqBQEA6gYAIQcIAADfBgAgQgAAkAgAIEMAAJAIACCwBAAAAOwFArEEAAAA7AUIsgQAAADsBQi3BAAAjwjsBSIHCAAA3wYAIEIAAJAIACBDAACQCAAgsAQAAADsBQKxBAAAAOwFCLIEAAAA7AUItwQAAI8I7AUiBLAEAAAA7AUCsQQAAADsBQiyBAAAAOwFCLcEAACQCOwFIhQHAAChBwAgqAQAAJEIADCpBAAAFQAQqgQAAJEIADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACHABAEA_wYAIcoEAACSCOwFIuMEAQCABwAhkAUBAP8GACGTBQEA_wYAIZYFIACEBwAhmQUBAIAHACGaBQEAgAcAIdEFAgDpBwAh5wUBAP8GACHoBQEAgAcAIekFAQCABwAh6gUBAIAHACEEsAQAAADsBQKxBAAAAOwFCLIEAAAA7AUItwQAAJAI7AUiE6gEAACTCAAwqQQAALEBABCqBAAAkwgAMKsEAQDcBgAhrgRAAN0GACGvBEAA3QYAIcUEAQDpBgAhygQAAJUI9AUi4wQBAOoGACGJBQEA6QYAIdEFAgCUBwAh3AVAAOsGACHsBQEA6gYAIe0FAQDqBgAh7gUBAOoGACHvBQEA6gYAIfEFAACUCPEFIvIFQADdBgAh9AUBAOoGACEHCAAA3wYAIEIAAJkIACBDAACZCAAgsAQAAADxBQKxBAAAAPEFCLIEAAAA8QUItwQAAJgI8QUiBwgAAN8GACBCAACXCAAgQwAAlwgAILAEAAAA9AUCsQQAAAD0BQiyBAAAAPQFCLcEAACWCPQFIgcIAADfBgAgQgAAlwgAIEMAAJcIACCwBAAAAPQFArEEAAAA9AUIsgQAAAD0BQi3BAAAlgj0BSIEsAQAAAD0BQKxBAAAAPQFCLIEAAAA9AUItwQAAJcI9AUiBwgAAN8GACBCAACZCAAgQwAAmQgAILAEAAAA8QUCsQQAAADxBQiyBAAAAPEFCLcEAACYCPEFIgSwBAAAAPEFArEEAAAA8QUIsgQAAADxBQi3BAAAmQjxBSITqAQAAJoIADCpBAAAngEAEKoEAACaCAAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAhxQQBAP8GACHKBAAAnAj0BSLjBAEAgAcAIYkFAQD_BgAh0QUCAOkHACHcBUAAgQcAIewFAQCABwAh7QUBAIAHACHuBQEAgAcAIe8FAQCABwAh8QUAAJsI8QUi8gVAAOUGACH0BQEAgAcAIQSwBAAAAPEFArEEAAAA8QUIsgQAAADxBQi3BAAAmQjxBSIEsAQAAAD0BQKxBAAAAPQFCLIEAAAA9AUItwQAAJcI9AUiE6gEAACdCAAwqQQAAJgBABCqBAAAnQgAMKsEAQDcBgAhrgRAAOsGACGvBEAA6wYAIbsEAQDcBgAhwAQBAOkGACHEBAEA6QYAIasFAQDpBgAhrAUBAOkGACGtBQEA6QYAIa4FAQDqBgAhrwUBAOkGACGwBQEA6gYAIbEFAQDpBgAh9gUAAJ4I9gUi9wUgAJ8IACH4BSAAnwgAIQcIAADfBgAgQgAAowgAIEMAAKMIACCwBAAAAPYFArEEAAAA9gUIsgQAAAD2BQi3BAAAogj2BSIFCAAA8QYAIEIAAKEIACBDAAChCAAgsAQgAAAAAbcEIACgCAAhBQgAAPEGACBCAAChCAAgQwAAoQgAILAEIAAAAAG3BCAAoAgAIQKwBCAAAAABtwQgAKEIACEHCAAA3wYAIEIAAKMIACBDAACjCAAgsAQAAAD2BQKxBAAAAPYFCLIEAAAA9gUItwQAAKII9gUiBLAEAAAA9gUCsQQAAAD2BQiyBAAAAPYFCLcEAACjCPYFIgoBAADmBgAgqAQAAKQIADCpBAAAeAAQqgQAAKQIADCrBAEApQcAIa4EQADlBgAhuwQBAKUHACGgBQEA_wYAIaEFQADlBgAhogVAAIEHACEdAQAA5gYAIA4AAKsIACAZAACnCAAgGgAA1AcAIBsAAKgIACAeAACpCAAgHwAAqggAICAAAIsHACCoBAAApQgAMKkEAABCABCqBAAApQgAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIbsEAQClBwAhygQAAKYItwUiqQUQALcHACGyBQEA_wYAIbMFAQD_BgAhtAUBAP8GACG1BQEA_wYAIbcFEAC3BwAhuAUQALcHACG5BRAAtwcAIboFEAC3BwAhuwUBAIAHACG8BQEAgAcAIb0FQACBBwAhvgVAAIEHACEEsAQAAAC3BQKxBAAAALcFCLIEAAAAtwUItwQAANwHtwUiERgAAK4HACAaAADUBwAgqAQAANEHADCpBAAARAAQqgQAANEHADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACHKBAAA0wefBSLRBAEApQcAIeMEAQCABwAh9gQQALcHACH3BAEA_wYAIZ0FAADSB50FIp8FAACmBwAg_gUAAEQAIP8FAABEACAUGAAArgcAIKgEAACsBwAwqQQAAEgAEKoEAACsBwAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAhygQAAK0H7wQi0QQBAKUHACHqBAEAgAcAIesEAQCABwAh7AQBAIAHACHtBAEAgAcAIe8EQACBBwAh8ARAAIEHACHxBEAAgQcAIfIEAQCABwAh8wQBAIAHACH-BQAASAAg_wUAAEgAIBEBAADmBgAgGAAArgcAIB0AALoIACCoBAAAuQgAMKkEAABKABCqBAAAuQgAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIbsEAQClBwAh0QQBAKUHACGiBUAA5QYAIakFEAC3BwAh0wUBAKUHACHUBQEA_wYAIf4FAABKACD_BQAASgAgExgAAK4HACCoBAAA2AcAMKkEAABRABCqBAAA2AcAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIcAEAQD_BgAhxAQBAP8GACHRBAEApQcAIasFAQD_BgAhrAUBAP8GACGtBQEA_wYAIa4FAQD_BgAhrwUBAP8GACGwBQEA_wYAIbEFAQCABwAh_gUAAFEAIP8FAABRACADvAQAAFMAIL0EAABTACC-BAAAUwAgFAEAAOYGACCoBAAArAgAMKkEAABxABCqBAAArAgAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIbsEAQClBwAh1QQAAK0IwQUiiQUBAP8GACG_BQEA_wYAIcIFAACuCMIFIsQFAACvCMQFIsUFAQD_BgAhxgUAAKYHACDHBSAAhAcAIcgFQACBBwAhyQVAAIEHACHKBUAAgQcAIcsFAQCABwAhBLAEAAAAwQUCsQQAAADBBQiyBAAAAMEFCLcEAADmB8EFIgSwBAAAAMIFArEEAAAAwgUIsgQAAADCBQi3BAAA5AfCBSIEsAQAAADEBQKxBAAAAMQFCLIEAAAAxAUItwQAAOIHxAUiEQEAALMIACAVAACxCOEFIqgEAACwCAAwqQQAAGgAEKoEAACwCAAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAhuwQBAJ8HACG_BAEA_wYAIcAEAQD_BgAhxAQBAIAHACHKBAAAsgjiBSK8BQEAgAcAIb8FAQD_BgAh3wUBAP8GACHiBUAAgQcAIQSwBAAAAOEFArEEAAAA4QUIsgQAAADhBQi3BAAAgwjhBSIEsAQAAADiBQKxBAAAAOIFCLIEAAAA4gUItwQAAIEI4gUiIh4AAIoHACAgAACLBwAgJwAAhgcAICgAAIcHACApAACIBwAgKgAAiQcAICsAAIwHACAsAACNBwAgLQAAjgcAIC4AAI8HACAvAACQBwAgqAQAAP4GADCpBAAAbAAQqgQAAP4GADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACG_BAEA_wYAIcAEAQD_BgAhwQQBAIAHACHCBAEAgAcAIcMEQACBBwAhxAQBAIAHACHFBAEAgAcAIcYEAQCABwAhyAQAAIIHyAQiygQAAIMHygQiywRAAIEHACHMBEAAgQcAIc0EQACBBwAhzgQgAIQHACHPBAIAhQcAIf4FAABsACD_BQAAbAAgFAEAAOYGACCoBAAAtAgAMKkEAABlABCqBAAAtAgAMKsEAQClBwAhrgRAAIEHACGvBEAAgQcAIbsEAQClBwAhwAQBAP8GACHEBAEA_wYAIasFAQD_BgAhrAUBAP8GACGtBQEA_wYAIa4FAQCABwAhrwUBAP8GACGwBQEAgAcAIbEFAQD_BgAh9gUAALUI9gUi9wUgALYIACH4BSAAtggAIQSwBAAAAPYFArEEAAAA9gUIsgQAAAD2BQi3BAAAowj2BSICsAQgAAAAAbcEIAChCAAhFgwAAOoHACAYAACuBwAgIAAAiwcAIC8BAP8GACGoBAAAtwgAMKkEAABTABCqBAAAtwgAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIdEEAQClBwAh1gQCAOkHACHjBAEAgAcAIf4EAQD_BgAhowUBAKUHACGkBQEA_wYAIaUFAQD_BgAhpgUBAP8GACGnBQEA_wYAIagFEAC3BwAhqQUQALcHACGqBRAAtwcAIQO7BAEAAAAB0QQBAAAAAdMFAQAAAAEPAQAA5gYAIBgAAK4HACAdAAC6CAAgqAQAALkIADCpBAAASgAQqgQAALkIADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACG7BAEApQcAIdEEAQClBwAhogVAAOUGACGpBRAAtwcAIdMFAQClBwAh1AUBAP8GACEXHAAAigcAIKgEAAD5BwAwqQQAAMMCABCqBAAA-QcAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIcAEAQD_BgAhygQAAPwH3wUi1QQAAPoH1wUi4wQBAIAHACHmBBAAtwcAIaEFQACBBwAh1QUBAP8GACHXBRAA-wcAIdgFEAD7BwAh2QUCAIUHACHaBQIAhQcAIdsFAgCFBwAh3AVAAIEHACHdBSAAhAcAIf4FAADDAgAg_wUAAMMCACATFwAAvQgAIBgAAL4IACAhAAC_CAAgIgAA5gYAIKgEAAC7CAAwqQQAAD4AEKoEAAC7CAAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAh0AQBAKUHACHRBAEAnwcAIdIEAQCfBwAh0wQBAKUHACHVBAAAvAjVBCLWBAIA6QcAIdcEAgDpBwAh2AQCAOkHACHZBAEAgAcAIQSwBAAAANUEArEEAAAA1QQIsgQAAADVBAi3BAAAmAfVBCIODAAA6gcAICMAAIsHACCoBAAA6AcAMKkEAAA8ABCqBAAA6AcAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIaMFAQClBwAhzAUCAOkHACHNBQIA6QcAIc4FAgDpBwAh_gUAADwAIP8FAAA8ACAfAQAA5gYAIA4AAKsIACAZAACnCAAgGgAA1AcAIBsAAKgIACAeAACpCAAgHwAAqggAICAAAIsHACCoBAAApQgAMKkEAABCABCqBAAApQgAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIbsEAQClBwAhygQAAKYItwUiqQUQALcHACGyBQEA_wYAIbMFAQD_BgAhtAUBAP8GACG1BQEA_wYAIbcFEAC3BwAhuAUQALcHACG5BRAAtwcAIboFEAC3BwAhuwUBAIAHACG8BQEAgAcAIb0FQACBBwAhvgVAAIEHACH-BQAAQgAg_wUAAEIAIBgMAADqBwAgGAAArgcAICAAAIsHACAvAQD_BgAhqAQAALcIADCpBAAAUwAQqgQAALcIADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACHRBAEApQcAIdYEAgDpBwAh4wQBAIAHACH-BAEA_wYAIaMFAQClBwAhpAUBAP8GACGlBQEA_wYAIaYFAQD_BgAhpwUBAP8GACGoBRAAtwcAIakFEAC3BwAhqgUQALcHACH-BQAAUwAg_wUAAFMAIBcRAADmBgAgEgAAwggAIBMAAJAHACAUAADDCAAgqAQAAMAIADCpBAAALwAQqgQAAMAIADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACHABAEA_wYAIcUEAQCABwAhxgQBAIAHACHKBAAAwQjmBSLOBCAAhAcAIeMEAQCABwAhkwUBAIAHACGWBSAAhAcAIZkFAQCABwAhmgUBAIAHACHRBQIAhQcAIeMFAQClBwAh5AUBAJ8HACEEsAQAAADmBQKxBAAAAOYFCLIEAAAA5gUItwQAAIgI5gUiGREAAOYGACASAADCCAAgEwAAkAcAIBQAAMMIACCoBAAAwAgAMKkEAAAvABCqBAAAwAgAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIcAEAQD_BgAhxQQBAIAHACHGBAEAgAcAIcoEAADBCOYFIs4EIACEBwAh4wQBAIAHACGTBQEAgAcAIZYFIACEBwAhmQUBAIAHACGaBQEAgAcAIdEFAgCFBwAh4wUBAKUHACHkBQEAnwcAIf4FAAAvACD_BQAALwAgA7wEAAArACC9BAAAKwAgvgQAACsAIAgKAADGCAAgFQAAxQgAIKgEAADECAAwqQQAACsAEKoEAADECAAwqwQBAKUHACGtBAEApQcAIeQEAQClBwAhGREAAOYGACASAADCCAAgEwAAkAcAIBQAAMMIACCoBAAAwAgAMKkEAAAvABCqBAAAwAgAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIcAEAQD_BgAhxQQBAIAHACHGBAEAgAcAIcoEAADBCOYFIs4EIACEBwAh4wQBAIAHACGTBQEAgAcAIZYFIACEBwAhmQUBAIAHACGaBQEAgAcAIdEFAgCFBwAh4wUBAKUHACHkBQEAnwcAIf4FAAAvACD_BQAALwAgHwUAANMIACAJAADUCAAgCwAA1QgAIAwAANYIACANAACMBwAgEAAA5wYAIBYAAMMIACCoBAAA0QgAMKkEAAAPABCqBAAA0QgAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIcAEAQD_BgAhxQQBAP8GACHKBAAA0giWBSLaBAEAnwcAIeMEAQD_BgAhggUQAPsHACGDBRAA-wcAIZIFAQCfBwAhkwUBAP8GACGUBQEA_wYAIZYFIACEBwAhlwUgAIQHACGYBSAAhAcAIZkFAQCABwAhmgUBAIAHACGbBUAAgQcAIf4FAAAPACD_BQAADwAgAqwEAQAAAAGtBAEAAAABCgoAAMYIACAPAADJCAAgqAQAAMgIADCpBAAAJQAQqgQAAMgIADCrBAEApQcAIawEAQClBwAhrQQBAKUHACGuBEAA5QYAIa8EQADlBgAhCwEAAOYGACAOAADnBgAgqAQAAOQGADCpBAAAYwAQqgQAAOQGADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACG7BAEApQcAIf4FAABjACD_BQAAYwAgAq0EAQAAAAG7BAEAAAABEAEAAOYGACAKAADGCAAgqAQAAMsIADCpBAAAIQAQqgQAAMsIADCrBAEApQcAIa0EAQClBwAhrgRAAOUGACGvBEAA5QYAIbsEAQClBwAhygQAAMwIjQUiiAUCAOkHACGJBQEAgAcAIYoFAQD_BgAhiwUgAIQHACGNBQIAhQcAIQSwBAAAAI0FArEEAAAAjQUIsgQAAACNBQi3BAAAxAeNBSIXCgAAxggAICQAAM8IACAlAACMCAAgJgAAqwgAIKgEAADNCAAwqQQAAB0AEKoEAADNCAAwqwQBAKUHACGtBAEApQcAIa4EQADlBgAhrwRAAOUGACHFBAEA_wYAIcoEAADOCIgFItsEAQCABwAh_gQBAP8GACH_BAEAgAcAIYAFAQCABwAhgQUBAIAHACGCBRAAtwcAIYMFEAD7BwAhhAUCAOkHACGFBQIA6QcAIYYFAgDpBwAhBLAEAAAAiAUCsQQAAACIBQiyBAAAAIgFCLcEAAC-B4gFIg4MAADqBwAgIwAAiwcAIKgEAADoBwAwqQQAADwAEKoEAADoBwAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAhowUBAKUHACHMBQIA6QcAIc0FAgDpBwAhzgUCAOkHACH-BQAAPAAg_wUAADwAIA0KAADGCAAgqAQAANAIADCpBAAAGQAQqgQAANAIADCrBAEApQcAIa0EAQClBwAhrgRAAOUGACGvBEAA5QYAIdwEAgDpBwAhjgUBAP8GACGPBQEAgAcAIZAFAQCABwAhkQUgAIQHACEdBQAA0wgAIAkAANQIACALAADVCAAgDAAA1ggAIA0AAIwHACAQAADnBgAgFgAAwwgAIKgEAADRCAAwqQQAAA8AEKoEAADRCAAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAhwAQBAP8GACHFBAEA_wYAIcoEAADSCJYFItoEAQCfBwAh4wQBAP8GACGCBRAA-wcAIYMFEAD7BwAhkgUBAJ8HACGTBQEA_wYAIZQFAQD_BgAhlgUgAIQHACGXBSAAhAcAIZgFIACEBwAhmQUBAIAHACGaBQEAgAcAIZsFQACBBwAhBLAEAAAAlgUCsQQAAACWBQiyBAAAAJYFCLcEAADJB5YFIg0GAACgBwAgBwAAoQcAIKgEAACeBwAwqQQAAAkAEKoEAACeBwAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAhwAQBAP8GACHjBAEAgAcAIeQEAQCfBwAh_gUAAAkAIP8FAAAJACAWBwAAoQcAIKgEAACRCAAwqQQAABUAEKoEAACRCAAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAhwAQBAP8GACHKBAAAkgjsBSLjBAEAgAcAIZAFAQD_BgAhkwUBAP8GACGWBSAAhAcAIZkFAQCABwAhmgUBAIAHACHRBQIA6QcAIecFAQD_BgAh6AUBAIAHACHpBQEAgAcAIeoFAQCABwAh_gUAABUAIP8FAAAVACADvAQAABkAIL0EAAAZACC-BAAAGQAgA7wEAAAdACC9BAAAHQAgvgQAAB0AIALaBAEAAAAB2wQBAAAAAQkFAADZCAAgBgAApgcAIKgEAADYCAAwqQQAAAsAEKoEAADYCAAwqwQBAKUHACHaBAEApQcAIdsEAQD_BgAh3AQCAOkHACENBgAAoAcAIAcAAKEHACCoBAAAngcAMKkEAAAJABCqBAAAngcAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIcAEAQD_BgAh4wQBAIAHACHkBAEAnwcAIf4FAAAJACD_BQAACQAgAqMFAQAAAAHmBQEAAAABCwQAANwIACAMAADqBwAgqAQAANsIADCpBAAABQAQqgQAANsIADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACHWBAIA6QcAIaMFAQClBwAh5gUBAKUHACEMAQAA5gYAIA4AAIwIACCoBAAAiwgAMKkEAAADABCqBAAAiwgAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIbsEAQClBwAhugUQALcHACH-BQAAAwAg_wUAAAMAIAAAAAGDBgEAAAABAYMGQAAAAAEFPAAA5A8AID0AAOoPACCABgAA5Q8AIIEGAADpDwAghgYAAK0GACAFPAAA4g8AID0AAOcPACCABgAA4w8AIIEGAADmDwAghgYAABEAIAM8AADkDwAggAYAAOUPACCGBgAArQYAIAM8AADiDwAggAYAAOMPACCGBgAAEQAgAAAABTwAANwPACA9AADgDwAggAYAAN0PACCBBgAA3w8AIIYGAACVBgAgCzwAAOsIADA9AADwCAAwgAYAAOwIADCBBgAA7QgAMIIGAADuCAAggwYAAO8IADCEBgAA7wgAMIUGAADvCAAwhgYAAO8IADCHBgAA8QgAMIgGAADyCAAwBQoAAOUIACCrBAEAAAABrQQBAAAAAa4EQAAAAAGvBEAAAAABAgAAACcAIDwAAPYIACADAAAAJwAgPAAA9ggAID0AAPUIACABNQAA3g8AMAsKAADGCAAgDwAAyQgAIKgEAADICAAwqQQAACUAEKoEAADICAAwqwQBAAAAAawEAQClBwAhrQQBAKUHACGuBEAA5QYAIa8EQADlBgAh-gUAAMcIACACAAAAJwAgNQAA9QgAIAIAAADzCAAgNQAA9AgAIAioBAAA8ggAMKkEAADzCAAQqgQAAPIIADCrBAEApQcAIawEAQClBwAhrQQBAKUHACGuBEAA5QYAIa8EQADlBgAhCKgEAADyCAAwqQQAAPMIABCqBAAA8ggAMKsEAQClBwAhrAQBAKUHACGtBAEApQcAIa4EQADlBgAhrwRAAOUGACEEqwQBAOAIACGtBAEA4AgAIa4EQADhCAAhrwRAAOEIACEFCgAA4wgAIKsEAQDgCAAhrQQBAOAIACGuBEAA4QgAIa8EQADhCAAhBQoAAOUIACCrBAEAAAABrQQBAAAAAa4EQAAAAAGvBEAAAAABAzwAANwPACCABgAA3Q8AIIYGAACVBgAgBDwAAOsIADCABgAA7AgAMIIGAADuCAAghgYAAO8IADAVHgAAuwsAICAAALwLACAnAAC3CwAgKAAAuAsAICkAALkLACAqAAC6CwAgKwAAvQsAICwAAL4LACAtAAC_CwAgLgAAwAsAIC8AAMELACDBBAAA-wgAIMIEAAD7CAAgwwQAAPsIACDEBAAA-wgAIMUEAAD7CAAgxgQAAPsIACDLBAAA-wgAIMwEAAD7CAAgzQQAAPsIACDPBAAA-wgAIAAAAAAAAAABgwYBAAAAAQGDBkAAAAABAYMGAAAAyAQCAYMGAAAAygQCAYMGIAAAAAEFgwYCAAAAAYkGAgAAAAGKBgIAAAABiwYCAAAAAYwGAgAAAAEHPAAAlwsAID0AAJoLACCABgAAmAsAIIEGAACZCwAghAYAAAMAIIUGAAADACCGBgAAzAEAIAc8AACSCwAgPQAAlQsAIIAGAACTCwAggQYAAJQLACCEBgAAYwAghQYAAGMAIIYGAACtBgAgCzwAAIQLADA9AACJCwAwgAYAAIULADCBBgAAhgsAMIIGAACHCwAggwYAAIgLADCEBgAAiAsAMIUGAACICwAwhgYAAIgLADCHBgAAigsAMIgGAACLCwAwCzwAAPYKADA9AAD7CgAwgAYAAPcKADCBBgAA-AoAMIIGAAD5CgAggwYAAPoKADCEBgAA-goAMIUGAAD6CgAwhgYAAPoKADCHBgAA_AoAMIgGAAD9CgAwCzwAAOgKADA9AADtCgAwgAYAAOkKADCBBgAA6goAMIIGAADrCgAggwYAAOwKADCEBgAA7AoAMIUGAADsCgAwhgYAAOwKADCHBgAA7goAMIgGAADvCgAwCzwAAN8KADA9AADjCgAwgAYAAOAKADCBBgAA4QoAMIIGAADiCgAggwYAAOIJADCEBgAA4gkAMIUGAADiCQAwhgYAAOIJADCHBgAA5AoAMIgGAADlCQAwCzwAANAKADA9AADVCgAwgAYAANEKADCBBgAA0goAMIIGAADTCgAggwYAANQKADCEBgAA1AoAMIUGAADUCgAwhgYAANQKADCHBgAA1goAMIgGAADXCgAwCzwAAMEKADA9AADGCgAwgAYAAMIKADCBBgAAwwoAMIIGAADECgAggwYAAMUKADCEBgAAxQoAMIUGAADFCgAwhgYAAMUKADCHBgAAxwoAMIgGAADICgAwCzwAAMoJADA9AADPCQAwgAYAAMsJADCBBgAAzAkAMIIGAADNCQAggwYAAM4JADCEBgAAzgkAMIUGAADOCQAwhgYAAM4JADCHBgAA0AkAMIgGAADRCQAwCzwAAL4JADA9AADDCQAwgAYAAL8JADCBBgAAwAkAMIIGAADBCQAggwYAAMIJADCEBgAAwgkAMIUGAADCCQAwhgYAAMIJADCHBgAAxAkAMIgGAADFCQAwCzwAAJIJADA9AACXCQAwgAYAAJMJADCBBgAAlAkAMIIGAACVCQAggwYAAJYJADCEBgAAlgkAMIUGAACWCQAwhgYAAJYJADCHBgAAmAkAMIgGAACZCQAwEhIAAL0JACATAAC6CQAgFAAAuwkAIKsEAQAAAAGuBEAAAAABrwRAAAAAAcAEAQAAAAHFBAEAAAABxgQBAAAAAcoEAAAA5gUCzgQgAAAAAeMEAQAAAAGTBQEAAAABlgUgAAAAAZkFAQAAAAGaBQEAAAAB0QUCAAAAAeQFAQAAAAECAAAAMgAgPAAAvAkAIAMAAAAyACA8AAC8CQAgPQAAnQkAIAE1AADbDwAwFxEAAOYGACASAADCCAAgEwAAkAcAIBQAAMMIACCoBAAAwAgAMKkEAAAvABCqBAAAwAgAMKsEAQAAAAGuBEAA5QYAIa8EQADlBgAhwAQBAAAAAcUEAQCABwAhxgQBAIAHACHKBAAAwQjmBSLOBCAAhAcAIeMEAQCABwAhkwUBAAAAAZYFIACEBwAhmQUBAIAHACGaBQEAgAcAIdEFAgCFBwAh4wUBAKUHACHkBQEAnwcAIQIAAAAyACA1AACdCQAgAgAAAJoJACA1AACbCQAgE6gEAACZCQAwqQQAAJoJABCqBAAAmQkAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIcAEAQD_BgAhxQQBAIAHACHGBAEAgAcAIcoEAADBCOYFIs4EIACEBwAh4wQBAIAHACGTBQEAgAcAIZYFIACEBwAhmQUBAIAHACGaBQEAgAcAIdEFAgCFBwAh4wUBAKUHACHkBQEAnwcAIROoBAAAmQkAMKkEAACaCQAQqgQAAJkJADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACHABAEA_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_BgAhoQVAAOUGACGiBUAAgQcAIQmoBAAAxQkAMKkEAADGCQAQqgQAAMUJADCrBAEApQcAIa4EQADlBgAhuwQBAKUHACGgBQEA_wYAIaEFQADlBgAhogVAAIEHACEFqwQBAOAIACGuBEAA4QgAIaAFAQDgCAAhoQVAAOEIACGiBUAAggkAIQWrBAEA4AgAIa4EQADhCAAhoAUBAOAIACGhBUAA4QgAIaIFQACCCQAhBasEAQAAAAGuBEAAAAABoAUBAAAAAaEFQAAAAAGiBUAAAAABGA4AAL8KACAZAAC6CgAgGgAAvQoAIBsAALsKACAeAAC8CgAgHwAAvgoAICAAAMAKACCrBAEAAAABrgRAAAAAAa8EQAAAAAHKBAAAALcFAqkFEAAAAAGyBQEAAAABswUBAAAAAbQFAQAAAAG1BQEAAAABtwUQAAAAAbgFEAAAAAG5BRAAAAABugUQAAAAAbsFAQAAAAG8BQEAAAABvQVAAAAAAb4FQAAAAAECAAAAdgAgPAAAuQoAIAMAAAB2ACA8AAC5CgAgPQAA1gkAIAE1AADIDwAwHQEAAOYGACAOAACrCAAgGQAApwgAIBoAANQHACAbAACoCAAgHgAAqQgAIB8AAKoIACAgAACLBwAgqAQAAKUIADCpBAAAQgAQqgQAAKUIADCrBAEAAAABrgRAAOUGACGvBEAA5QYAIbsEAQClBwAhygQAAKYItwUiqQUQALcHACGyBQEA_wYAIbMFAQD_BgAhtAUBAP8GACG1BQEA_wYAIbcFEAC3BwAhuAUQALcHACG5BRAAtwcAIboFEAC3BwAhuwUBAIAHACG8BQEAgAcAIb0FQACBBwAhvgVAAIEHACECAAAAdgAgNQAA1gkAIAIAAADSCQAgNQAA0wkAIBWoBAAA0QkAMKkEAADSCQAQqgQAANEJADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACG7BAEApQcAIcoEAACmCLcFIqkFEAC3BwAhsgUBAP8GACGzBQEA_wYAIbQFAQD_BgAhtQUBAP8GACG3BRAAtwcAIbgFEAC3BwAhuQUQALcHACG6BRAAtwcAIbsFAQCABwAhvAUBAIAHACG9BUAAgQcAIb4FQACBBwAhFagEAADRCQAwqQQAANIJABCqBAAA0QkAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIbsEAQClBwAhygQAAKYItwUiqQUQALcHACGyBQEA_wYAIbMFAQD_BgAhtAUBAP8GACG1BQEA_wYAIbcFEAC3BwAhuAUQALcHACG5BRAAtwcAIboFEAC3BwAhuwUBAIAHACG8BQEAgAcAIb0FQACBBwAhvgVAAIEHACERqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhygQAANQJtwUiqQUQANUJACGyBQEA4AgAIbMFAQDgCAAhtAUBAOAIACG1BQEA4AgAIbcFEADVCQAhuAUQANUJACG5BRAA1QkAIboFEADVCQAhuwUBAIEJACG8BQEAgQkAIb0FQACCCQAhvgVAAIIJACEBgwYAAAC3BQIFgwYQAAAAAYkGEAAAAAGKBhAAAAABiwYQAAAAAYwGEAAAAAEYDgAA3AkAIBkAANcJACAaAADaCQAgGwAA2AkAIB4AANkJACAfAADbCQAgIAAA3QkAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIcoEAADUCbcFIqkFEADVCQAhsgUBAOAIACGzBQEA4AgAIbQFAQDgCAAhtQUBAOAIACG3BRAA1QkAIbgFEADVCQAhuQUQANUJACG6BRAA1QkAIbsFAQCBCQAhvAUBAIEJACG9BUAAggkAIb4FQACCCQAhBzwAAKkKACA9AACsCgAggAYAAKoKACCBBgAAqwoAIIQGAABEACCFBgAARAAghgYAAJAEACAHPAAAowoAID0AAKYKACCABgAApAoAIIEGAAClCgAghAYAAEgAIIUGAABIACCGBgAAnAUAIAc8AACaCgAgPQAAnQoAIIAGAACbCgAggQYAAJwKACCEBgAASgAghQYAAEoAIIYGAABNACAHPAAAkgoAID0AAJUKACCABgAAkwoAIIEGAACUCgAghAYAAEYAIIUGAABGACCGBgAAhAUAIAc8AACNCgAgPQAAkAoAIIAGAACOCgAggQYAAI8KACCEBgAAUQAghQYAAFEAIIYGAADMAwAgCzwAAPIJADA9AAD3CQAwgAYAAPMJADCBBgAA9AkAMIIGAAD1CQAggwYAAPYJADCEBgAA9gkAMIUGAAD2CQAwhgYAAPYJADCHBgAA-AkAMIgGAAD5CQAwCzwAAN4JADA9AADjCQAwgAYAAN8JADCBBgAA4AkAMIIGAADhCQAggwYAAOIJADCEBgAA4gkAMIUGAADiCQAwhgYAAOIJADCHBgAA5AkAMIgGAADlCQAwDhcAAO8JACAhAADwCQAgIgAA8QkAIKsEAQAAAAGuBEAAAAABrwRAAAAAAdAEAQAAAAHSBAEAAAAB0wQBAAAAAdUEAAAA1QQC1gQCAAAAAdcEAgAAAAHYBAIAAAAB2QQBAAAAAQIAAABAACA8AADuCQAgAwAAAEAAIDwAAO4JACA9AADqCQAgATUAAMcPADATFwAAvQgAIBgAAL4IACAhAAC_CAAgIgAA5gYAIKgEAAC7CAAwqQQAAD4AEKoEAAC7CAAwqwQBAAAAAa4EQADlBgAhrwRAAOUGACHQBAEApQcAIdEEAQCfBwAh0gQBAJ8HACHTBAEApQcAIdUEAAC8CNUEItYEAgDpBwAh1wQCAOkHACHYBAIA6QcAIdkEAQCABwAhAgAAAEAAIDUAAOoJACACAAAA5gkAIDUAAOcJACAPqAQAAOUJADCpBAAA5gkAEKoEAADlCQAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAh0AQBAKUHACHRBAEAnwcAIdIEAQCfBwAh0wQBAKUHACHVBAAAvAjVBCLWBAIA6QcAIdcEAgDpBwAh2AQCAOkHACHZBAEAgAcAIQ-oBAAA5QkAMKkEAADmCQAQqgQAAOUJADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACHQBAEApQcAIdEEAQCfBwAh0gQBAJ8HACHTBAEApQcAIdUEAAC8CNUEItYEAgDpBwAh1wQCAOkHACHYBAIA6QcAIdkEAQCABwAhC6sEAQDgCAAhrgRAAOEIACGvBEAA4QgAIdAEAQDgCAAh0gQBAIEJACHTBAEA4AgAIdUEAADoCdUEItYEAgDpCQAh1wQCAOkJACHYBAIA6QkAIdkEAQCBCQAhAYMGAAAA1QQCBYMGAgAAAAGJBgIAAAABigYCAAAAAYsGAgAAAAGMBgIAAAABDhcAAOsJACAhAADsCQAgIgAA7QkAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIdAEAQDgCAAh0gQBAIEJACHTBAEA4AgAIdUEAADoCdUEItYEAgDpCQAh1wQCAOkJACHYBAIA6QkAIdkEAQCBCQAhBTwAALwPACA9AADFDwAggAYAAL0PACCBBgAAxA8AIIYGAACIAwAgBzwAALoPACA9AADCDwAggAYAALsPACCBBgAAwQ8AIIQGAABTACCFBgAAUwAghgYAAFUAIAU8AAC4DwAgPQAAvw8AIIAGAAC5DwAggQYAAL4PACCGBgAAlQYAIA4XAADvCQAgIQAA8AkAICIAAPEJACCrBAEAAAABrgRAAAAAAa8EQAAAAAHQBAEAAAAB0gQBAAAAAdMEAQAAAAHVBAAAANUEAtYEAgAAAAHXBAIAAAAB2AQCAAAAAdkEAQAAAAEDPAAAvA8AIIAGAAC9DwAghgYAAIgDACADPAAAug8AIIAGAAC7DwAghgYAAFUAIAM8AAC4DwAggAYAALkPACCGBgAAlQYAIBEMAACLCgAgIAAAjAoAIC8BAAAAAasEAQAAAAGuBEAAAAABrwRAAAAAAdYEAgAAAAHjBAEAAAAB_gQBAAAAAaMFAQAAAAGkBQEAAAABpQUBAAAAAaYFAQAAAAGnBQEAAAABqAUQAAAAAakFEAAAAAGqBRAAAAABAgAAAFUAIDwAAIoKACADAAAAVQAgPAAAigoAID0AAPwJACABNQAAtw8AMBYMAADqBwAgGAAArgcAICAAAIsHACAvAQD_BgAhqAQAALcIADCpBAAAUwAQqgQAALcIADCrBAEAAAABrgRAAOUGACGvBEAA5QYAIdEEAQClBwAh1gQCAOkHACHjBAEAgAcAIf4EAQD_BgAhowUBAKUHACGkBQEA_wYAIaUFAQD_BgAhpgUBAP8GACGnBQEA_wYAIagFEAC3BwAhqQUQALcHACGqBRAAtwcAIQIAAABVACA1AAD8CQAgAgAAAPoJACA1AAD7CQAgEy8BAP8GACGoBAAA-QkAMKkEAAD6CQAQqgQAAPkJADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACHRBAEApQcAIdYEAgDpBwAh4wQBAIAHACH-BAEA_wYAIaMFAQClBwAhpAUBAP8GACGlBQEA_wYAIaYFAQD_BgAhpwUBAP8GACGoBRAAtwcAIakFEAC3BwAhqgUQALcHACETLwEA_wYAIagEAAD5CQAwqQQAAPoJABCqBAAA-QkAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIdEEAQClBwAh1gQCAOkHACHjBAEAgAcAIf4EAQD_BgAhowUBAKUHACGkBQEA_wYAIaUFAQD_BgAhpgUBAP8GACGnBQEA_wYAIagFEAC3BwAhqQUQALcHACGqBRAAtwcAIQ8vAQDgCAAhqwQBAOAIACGuBEAA4QgAIa8EQADhCAAh1gQCAOkJACHjBAEAgQkAIf4EAQDgCAAhowUBAOAIACGkBQEA4AgAIaUFAQDgCAAhpgUBAOAIACGnBQEA4AgAIagFEADVCQAhqQUQANUJACGqBRAA1QkAIREMAAD9CQAgIAAA_gkAIC8BAOAIACGrBAEA4AgAIa4EQADhCAAhrwRAAOEIACHWBAIA6QkAIeMEAQCBCQAh_gQBAOAIACGjBQEA4AgAIaQFAQDgCAAhpQUBAOAIACGmBQEA4AgAIacFAQDgCAAhqAUQANUJACGpBRAA1QkAIaoFEADVCQAhBTwAAKwPACA9AAC1DwAggAYAAK0PACCBBgAAtA8AIIYGAAAfACALPAAA_wkAMD0AAIMKADCABgAAgAoAMIEGAACBCgAwggYAAIIKACCDBgAA4gkAMIQGAADiCQAwhQYAAOIJADCGBgAA4gkAMIcGAACECgAwiAYAAOUJADAOFwAA7wkAIBgAAIkKACAiAADxCQAgqwQBAAAAAa4EQAAAAAGvBEAAAAAB0AQBAAAAAdEEAQAAAAHTBAEAAAAB1QQAAADVBALWBAIAAAAB1wQCAAAAAdgEAgAAAAHZBAEAAAABAgAAAEAAIDwAAIgKACADAAAAQAAgPAAAiAoAID0AAIYKACABNQAAsw8AMAIAAABAACA1AACGCgAgAgAAAOYJACA1AACFCgAgC6sEAQDgCAAhrgRAAOEIACGvBEAA4QgAIdAEAQDgCAAh0QQBAIEJACHTBAEA4AgAIdUEAADoCdUEItYEAgDpCQAh1wQCAOkJACHYBAIA6QkAIdkEAQCBCQAhDhcAAOsJACAYAACHCgAgIgAA7QkAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIdAEAQDgCAAh0QQBAIEJACHTBAEA4AgAIdUEAADoCdUEItYEAgDpCQAh1wQCAOkJACHYBAIA6QkAIdkEAQCBCQAhBzwAAK4PACA9AACxDwAggAYAAK8PACCBBgAAsA8AIIQGAABCACCFBgAAQgAghgYAAHYAIA4XAADvCQAgGAAAiQoAICIAAPEJACCrBAEAAAABrgRAAAAAAa8EQAAAAAHQBAEAAAAB0QQBAAAAAdMEAQAAAAHVBAAAANUEAtYEAgAAAAHXBAIAAAAB2AQCAAAAAdkEAQAAAAEDPAAArg8AIIAGAACvDwAghgYAAHYAIBEMAACLCgAgIAAAjAoAIC8BAAAAAasEAQAAAAGuBEAAAAABrwRAAAAAAdYEAgAAAAHjBAEAAAAB_gQBAAAAAaMFAQAAAAGkBQEAAAABpQUBAAAAAaYFAQAAAAGnBQEAAAABqAUQAAAAAakFEAAAAAGqBRAAAAABAzwAAKwPACCABgAArQ8AIIYGAAAfACAEPAAA_wkAMIAGAACACgAwggYAAIIKACCGBgAA4gkAMAyrBAEAAAABrgRAAAAAAa8EQAAAAAHABAEAAAABxAQBAAAAAasFAQAAAAGsBQEAAAABrQUBAAAAAa4FAQAAAAGvBQEAAAABsAUBAAAAAbEFAQAAAAECAAAAzAMAIDwAAI0KACADAAAAUQAgPAAAjQoAID0AAJEKACAOAAAAUQAgNQAAkQoAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIcAEAQDgCAAhxAQBAOAIACGrBQEA4AgAIawFAQDgCAAhrQUBAOAIACGuBQEA4AgAIa8FAQDgCAAhsAUBAOAIACGxBQEAgQkAIQyrBAEA4AgAIa4EQADhCAAhrwRAAOEIACHABAEA4AgAIcQEAQDgCAAhqwUBAOAIACGsBQEA4AgAIa0FAQDgCAAhrgUBAOAIACGvBQEA4AgAIbAFAQDgCAAhsQUBAIEJACEPGQAAmQoAIKsEAQAAAAGuBEAAAAABrwRAAAAAAcoEAAAA-QQC4wQBAAAAAfQEAQAAAAH1BAEAAAAB9gQQAAAAAfcEAQAAAAH5BAEAAAAB-gQBAAAAAfsEAQAAAAH8BEAAAAAB_QRAAAAAAQIAAACEBQAgPAAAkgoAIAMAAABGACA8AACSCgAgPQAAlgoAIBEAAABGACAZAACYCgAgNQAAlgoAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIcoEAACXCvkEIuMEAQCBCQAh9AQBAOAIACH1BAEA4AgAIfYEEADVCQAh9wQBAOAIACH5BAEAgQkAIfoEAQCBCQAh-wQBAOAIACH8BEAAggkAIf0EQACCCQAhDxkAAJgKACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACHKBAAAlwr5BCLjBAEAgQkAIfQEAQDgCAAh9QQBAOAIACH2BBAA1QkAIfcEAQDgCAAh-QQBAIEJACH6BAEAgQkAIfsEAQDgCAAh_ARAAIIJACH9BEAAggkAIQGDBgAAAPkEAgU8AACnDwAgPQAAqg8AIIAGAACoDwAggQYAAKkPACCGBgAAkAQAIAM8AACnDwAggAYAAKgPACCGBgAAkAQAIAoBAACiCgAgHQAAoQoAIKsEAQAAAAGuBEAAAAABrwRAAAAAAbsEAQAAAAGiBUAAAAABqQUQAAAAAdMFAQAAAAHUBQEAAAABAgAAAE0AIDwAAJoKACADAAAASgAgPAAAmgoAID0AAJ4KACAMAAAASgAgAQAAoAoAIB0AAJ8KACA1AACeCgAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhuwQBAOAIACGiBUAA4QgAIakFEADVCQAh0wUBAOAIACHUBQEA4AgAIQoBAACgCgAgHQAAnwoAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIbsEAQDgCAAhogVAAOEIACGpBRAA1QkAIdMFAQDgCAAh1AUBAOAIACEFPAAAnw8AID0AAKUPACCABgAAoA8AIIEGAACkDwAghgYAAMACACAFPAAAnQ8AID0AAKIPACCABgAAng8AIIEGAAChDwAghgYAAJUGACADPAAAnw8AIIAGAACgDwAghgYAAMACACADPAAAnQ8AIIAGAACeDwAghgYAAJUGACANqwQBAAAAAa4EQAAAAAGvBEAAAAABygQAAADvBALqBAEAAAAB6wQBAAAAAewEAQAAAAHtBAEAAAAB7wRAAAAAAfAEQAAAAAHxBEAAAAAB8gQBAAAAAfMEAQAAAAECAAAAnAUAIDwAAKMKACADAAAASAAgPAAAowoAID0AAKcKACAPAAAASAAgNQAApwoAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIcoEAACoCu8EIuoEAQCBCQAh6wQBAIEJACHsBAEAgQkAIe0EAQCBCQAh7wRAAIIJACHwBEAAggkAIfEEQACCCQAh8gQBAIEJACHzBAEAgQkAIQ2rBAEA4AgAIa4EQADhCAAhrwRAAOEIACHKBAAAqArvBCLqBAEAgQkAIesEAQCBCQAh7AQBAIEJACHtBAEAgQkAIe8EQACCCQAh8ARAAIIJACHxBEAAggkAIfIEAQCBCQAh8wQBAIEJACEBgwYAAADvBAIKGgAAuAoAIKsEAQAAAAGuBEAAAAABrwRAAAAAAcoEAAAAnwUC4wQBAAAAAfYEEAAAAAH3BAEAAAABnQUAAACdBQKfBYAAAAABAgAAAJAEACA8AACpCgAgAwAAAEQAIDwAAKkKACA9AACtCgAgDAAAAEQAIBoAALAKACA1AACtCgAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhygQAAK8KnwUi4wQBAIEJACH2BBAA1QkAIfcEAQDgCAAhnQUAAK4KnQUinwWAAAAAAQoaAACwCgAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhygQAAK8KnwUi4wQBAIEJACH2BBAA1QkAIfcEAQDgCAAhnQUAAK4KnQUinwWAAAAAAQGDBgAAAJ0FAgGDBgAAAJ8FAgc8AACxCgAgPQAAtAoAIIAGAACyCgAggQYAALMKACCEBgAARgAghQYAAEYAIIYGAACEBQAgDxgAALcKACCrBAEAAAABrgRAAAAAAa8EQAAAAAHKBAAAAPkEAtEEAQAAAAHjBAEAAAAB9QQBAAAAAfYEEAAAAAH3BAEAAAAB-QQBAAAAAfoEAQAAAAH7BAEAAAAB_ARAAAAAAf0EQAAAAAECAAAAhAUAIDwAALEKACADAAAARgAgPAAAsQoAID0AALUKACARAAAARgAgGAAAtgoAIDUAALUKACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACHKBAAAlwr5BCLRBAEA4AgAIeMEAQCBCQAh9QQBAOAIACH2BBAA1QkAIfcEAQDgCAAh-QQBAIEJACH6BAEAgQkAIfsEAQDgCAAh_ARAAIIJACH9BEAAggkAIQ8YAAC2CgAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhygQAAJcK-QQi0QQBAOAIACHjBAEAgQkAIfUEAQDgCAAh9gQQANUJACH3BAEA4AgAIfkEAQCBCQAh-gQBAIEJACH7BAEA4AgAIfwEQACCCQAh_QRAAIIJACEFPAAAmA8AID0AAJsPACCABgAAmQ8AIIEGAACaDwAghgYAAHYAIAM8AACYDwAggAYAAJkPACCGBgAAdgAgAzwAALEKACCABgAAsgoAIIYGAACEBQAgGA4AAL8KACAZAAC6CgAgGgAAvQoAIBsAALsKACAeAAC8CgAgHwAAvgoAICAAAMAKACCrBAEAAAABrgRAAAAAAa8EQAAAAAHKBAAAALcFAqkFEAAAAAGyBQEAAAABswUBAAAAAbQFAQAAAAG1BQEAAAABtwUQAAAAAbgFEAAAAAG5BRAAAAABugUQAAAAAbsFAQAAAAG8BQEAAAABvQVAAAAAAb4FQAAAAAEDPAAAqQoAIIAGAACqCgAghgYAAJAEACADPAAAowoAIIAGAACkCgAghgYAAJwFACADPAAAmgoAIIAGAACbCgAghgYAAE0AIAM8AACSCgAggAYAAJMKACCGBgAAhAUAIAM8AACNCgAggAYAAI4KACCGBgAAzAMAIAQ8AADyCQAwgAYAAPMJADCCBgAA9QkAIIYGAAD2CQAwBDwAAN4JADCABgAA3wkAMIIGAADhCQAghgYAAOIJADAPqwQBAAAAAa4EQAAAAAGvBEAAAAAB1QQAAADBBQKJBQEAAAABvwUBAAAAAcIFAAAAwgUCxAUAAADEBQLFBQEAAAABxgWAAAAAAccFIAAAAAHIBUAAAAAByQVAAAAAAcoFQAAAAAHLBQEAAAABAgAAAHMAIDwAAM8KACADAAAAcwAgPAAAzwoAID0AAM4KACABNQAAlw8AMBQBAADmBgAgqAQAAKwIADCpBAAAcQAQqgQAAKwIADCrBAEAAAABrgRAAOUGACGvBEAA5QYAIbsEAQClBwAh1QQAAK0IwQUiiQUBAP8GACG_BQEA_wYAIcIFAACuCMIFIsQFAACvCMQFIsUFAQD_BgAhxgUAAKYHACDHBSAAhAcAIcgFQACBBwAhyQVAAIEHACHKBUAAgQcAIcsFAQCABwAhAgAAAHMAIDUAAM4KACACAAAAyQoAIDUAAMoKACATqAQAAMgKADCpBAAAyQoAEKoEAADICgAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAhuwQBAKUHACHVBAAArQjBBSKJBQEA_wYAIb8FAQD_BgAhwgUAAK4IwgUixAUAAK8IxAUixQUBAP8GACHGBQAApgcAIMcFIACEBwAhyAVAAIEHACHJBUAAgQcAIcoFQACBBwAhywUBAIAHACETqAQAAMgKADCpBAAAyQoAEKoEAADICgAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAhuwQBAKUHACHVBAAArQjBBSKJBQEA_wYAIb8FAQD_BgAhwgUAAK4IwgUixAUAAK8IxAUixQUBAP8GACHGBQAApgcAIMcFIACEBwAhyAVAAIEHACHJBUAAgQcAIcoFQACBBwAhywUBAIAHACEPqwQBAOAIACGuBEAA4QgAIa8EQADhCAAh1QQAAMsKwQUiiQUBAOAIACG_BQEA4AgAIcIFAADMCsIFIsQFAADNCsQFIsUFAQDgCAAhxgWAAAAAAccFIACFCQAhyAVAAIIJACHJBUAAggkAIcoFQACCCQAhywUBAIEJACEBgwYAAADBBQIBgwYAAADCBQIBgwYAAADEBQIPqwQBAOAIACGuBEAA4QgAIa8EQADhCAAh1QQAAMsKwQUiiQUBAOAIACG_BQEA4AgAIcIFAADMCsIFIsQFAADNCsQFIsUFAQDgCAAhxgWAAAAAAccFIACFCQAhyAVAAIIJACHJBUAAggkAIcoFQACCCQAhywUBAIEJACEPqwQBAAAAAa4EQAAAAAGvBEAAAAAB1QQAAADBBQKJBQEAAAABvwUBAAAAAcIFAAAAwgUCxAUAAADEBQLFBQEAAAABxgWAAAAAAccFIAAAAAHIBUAAAAAByQVAAAAAAcoFQAAAAAHLBQEAAAABCwoAAN4KACCrBAEAAAABrQQBAAAAAa4EQAAAAAGvBEAAAAABygQAAACNBQKIBQIAAAABiQUBAAAAAYoFAQAAAAGLBSAAAAABjQUCAAAAAQIAAAAjACA8AADdCgAgAwAAACMAIDwAAN0KACA9AADbCgAgATUAAJYPADARAQAA5gYAIAoAAMYIACCoBAAAywgAMKkEAAAhABCqBAAAywgAMKsEAQAAAAGtBAEApQcAIa4EQADlBgAhrwRAAOUGACG7BAEApQcAIcoEAADMCI0FIogFAgDpBwAhiQUBAIAHACGKBQEA_wYAIYsFIACEBwAhjQUCAIUHACH7BQAAyggAIAIAAAAjACA1AADbCgAgAgAAANgKACA1AADZCgAgDqgEAADXCgAwqQQAANgKABCqBAAA1woAMKsEAQClBwAhrQQBAKUHACGuBEAA5QYAIa8EQADlBgAhuwQBAKUHACHKBAAAzAiNBSKIBQIA6QcAIYkFAQCABwAhigUBAP8GACGLBSAAhAcAIY0FAgCFBwAhDqgEAADXCgAwqQQAANgKABCqBAAA1woAMKsEAQClBwAhrQQBAKUHACGuBEAA5QYAIa8EQADlBgAhuwQBAKUHACHKBAAAzAiNBSKIBQIA6QcAIYkFAQCABwAhigUBAP8GACGLBSAAhAcAIY0FAgCFBwAhCqsEAQDgCAAhrQQBAOAIACGuBEAA4QgAIa8EQADhCAAhygQAANoKjQUiiAUCAOkJACGJBQEAgQkAIYoFAQDgCAAhiwUgAIUJACGNBQIAhgkAIQGDBgAAAI0FAgsKAADcCgAgqwQBAOAIACGtBAEA4AgAIa4EQADhCAAhrwRAAOEIACHKBAAA2gqNBSKIBQIA6QkAIYkFAQCBCQAhigUBAOAIACGLBSAAhQkAIY0FAgCGCQAhBTwAAJEPACA9AACUDwAggAYAAJIPACCBBgAAkw8AIIYGAAARACALCgAA3goAIKsEAQAAAAGtBAEAAAABrgRAAAAAAa8EQAAAAAHKBAAAAI0FAogFAgAAAAGJBQEAAAABigUBAAAAAYsFIAAAAAGNBQIAAAABAzwAAJEPACCABgAAkg8AIIYGAAARACAOFwAA7wkAIBgAAIkKACAhAADwCQAgqwQBAAAAAa4EQAAAAAGvBEAAAAAB0AQBAAAAAdEEAQAAAAHSBAEAAAAB1QQAAADVBALWBAIAAAAB1wQCAAAAAdgEAgAAAAHZBAEAAAABAgAAAEAAIDwAAOcKACADAAAAQAAgPAAA5woAID0AAOYKACABNQAAkA8AMAIAAABAACA1AADmCgAgAgAAAOYJACA1AADlCgAgC6sEAQDgCAAhrgRAAOEIACGvBEAA4QgAIdAEAQDgCAAh0QQBAIEJACHSBAEAgQkAIdUEAADoCdUEItYEAgDpCQAh1wQCAOkJACHYBAIA6QkAIdkEAQCBCQAhDhcAAOsJACAYAACHCgAgIQAA7AkAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIdAEAQDgCAAh0QQBAIEJACHSBAEAgQkAIdUEAADoCdUEItYEAgDpCQAh1wQCAOkJACHYBAIA6QkAIdkEAQCBCQAhDhcAAO8JACAYAACJCgAgIQAA8AkAIKsEAQAAAAGuBEAAAAABrwRAAAAAAdAEAQAAAAHRBAEAAAAB0gQBAAAAAdUEAAAA1QQC1gQCAAAAAdcEAgAAAAHYBAIAAAAB2QQBAAAAAQoYAAD1CgAgHQAAoQoAIKsEAQAAAAGuBEAAAAABrwRAAAAAAdEEAQAAAAGiBUAAAAABqQUQAAAAAdMFAQAAAAHUBQEAAAABAgAAAE0AIDwAAPQKACADAAAATQAgPAAA9AoAID0AAPIKACABNQAAjw8AMBABAADmBgAgGAAArgcAIB0AALoIACCoBAAAuQgAMKkEAABKABCqBAAAuQgAMKsEAQAAAAGuBEAA5QYAIa8EQADlBgAhuwQBAKUHACHRBAEAAAABogVAAOUGACGpBRAAtwcAIdMFAQClBwAh1AUBAP8GACH5BQAAuAgAIAIAAABNACA1AADyCgAgAgAAAPAKACA1AADxCgAgDKgEAADvCgAwqQQAAPAKABCqBAAA7woAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIbsEAQClBwAh0QQBAKUHACGiBUAA5QYAIakFEAC3BwAh0wUBAKUHACHUBQEA_wYAIQyoBAAA7woAMKkEAADwCgAQqgQAAO8KADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACG7BAEApQcAIdEEAQClBwAhogVAAOUGACGpBRAAtwcAIdMFAQClBwAh1AUBAP8GACEIqwQBAOAIACGuBEAA4QgAIa8EQADhCAAh0QQBAOAIACGiBUAA4QgAIakFEADVCQAh0wUBAOAIACHUBQEA4AgAIQoYAADzCgAgHQAAnwoAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIdEEAQDgCAAhogVAAOEIACGpBRAA1QkAIdMFAQDgCAAh1AUBAOAIACEFPAAAig8AID0AAI0PACCABgAAiw8AIIEGAACMDwAghgYAAHYAIAoYAAD1CgAgHQAAoQoAIKsEAQAAAAGuBEAAAAABrwRAAAAAAdEEAQAAAAGiBUAAAAABqQUQAAAAAdMFAQAAAAHUBQEAAAABAzwAAIoPACCABgAAiw8AIIYGAAB2ACAMFQAAAOEFAqsEAQAAAAGuBEAAAAABrwRAAAAAAb8EAQAAAAHABAEAAAABxAQBAAAAAcoEAAAA4gUCvAUBAAAAAb8FAQAAAAHfBQEAAAAB4gVAAAAAAQIAAABqACA8AACDCwAgAwAAAGoAIDwAAIMLACA9AACCCwAgATUAAIkPADARAQAAswgAIBUAALEI4QUiqAQAALAIADCpBAAAaAAQqgQAALAIADCrBAEAAAABrgRAAOUGACGvBEAA5QYAIbsEAQCfBwAhvwQBAP8GACHABAEA_wYAIcQEAQCABwAhygQAALII4gUivAUBAIAHACG_BQEA_wYAId8FAQD_BgAh4gVAAIEHACECAAAAagAgNQAAggsAIAIAAAD-CgAgNQAA_woAIBAVAACxCOEFIqgEAAD9CgAwqQQAAP4KABCqBAAA_QoAMKsEAQClBwAhrgRAAOUGACGvBEAA5QYAIbsEAQCfBwAhvwQBAP8GACHABAEA_wYAIcQEAQCABwAhygQAALII4gUivAUBAIAHACG_BQEA_wYAId8FAQD_BgAh4gVAAIEHACEQFQAAsQjhBSKoBAAA_QoAMKkEAAD-CgAQqgQAAP0KADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACG7BAEAnwcAIb8EAQD_BgAhwAQBAP8GACHEBAEAgAcAIcoEAACyCOIFIrwFAQCABwAhvwUBAP8GACHfBQEA_wYAIeIFQACBBwAhDBUAAIAL4QUiqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhvwQBAOAIACHABAEA4AgAIcQEAQCBCQAhygQAAIEL4gUivAUBAIEJACG_BQEA4AgAId8FAQDgCAAh4gVAAIIJACEBgwYAAADhBQIBgwYAAADiBQIMFQAAgAvhBSKrBAEA4AgAIa4EQADhCAAhrwRAAOEIACG_BAEA4AgAIcAEAQDgCAAhxAQBAIEJACHKBAAAgQviBSK8BQEAgQkAIb8FAQDgCAAh3wUBAOAIACHiBUAAggkAIQwVAAAA4QUCqwQBAAAAAa4EQAAAAAGvBEAAAAABvwQBAAAAAcAEAQAAAAHEBAEAAAABygQAAADiBQK8BQEAAAABvwUBAAAAAd8FAQAAAAHiBUAAAAABD6sEAQAAAAGuBEAAAAABrwRAAAAAAcAEAQAAAAHEBAEAAAABqwUBAAAAAawFAQAAAAGtBQEAAAABrgUBAAAAAa8FAQAAAAGwBQEAAAABsQUBAAAAAfYFAAAA9gUC9wUgAAAAAfgFIAAAAAECAAAAAQAgPAAAkQsAIAMAAAABACA8AACRCwAgPQAAkAsAIAE1AACIDwAwFAEAAOYGACCoBAAAtAgAMKkEAABlABCqBAAAtAgAMKsEAQAAAAGuBEAAgQcAIa8EQACBBwAhuwQBAKUHACHABAEA_wYAIcQEAQD_BgAhqwUBAP8GACGsBQEA_wYAIa0FAQD_BgAhrgUBAIAHACGvBQEA_wYAIbAFAQCABwAhsQUBAP8GACH2BQAAtQj2BSL3BSAAtggAIfgFIAC2CAAhAgAAAAEAIDUAAJALACACAAAAjAsAIDUAAI0LACATqAQAAIsLADCpBAAAjAsAEKoEAACLCwAwqwQBAKUHACGuBEAAgQcAIa8EQACBBwAhuwQBAKUHACHABAEA_wYAIcQEAQD_BgAhqwUBAP8GACGsBQEA_wYAIa0FAQD_BgAhrgUBAIAHACGvBQEA_wYAIbAFAQCABwAhsQUBAP8GACH2BQAAtQj2BSL3BSAAtggAIfgFIAC2CAAhE6gEAACLCwAwqQQAAIwLABCqBAAAiwsAMKsEAQClBwAhrgRAAIEHACGvBEAAgQcAIbsEAQClBwAhwAQBAP8GACHEBAEA_wYAIasFAQD_BgAhrAUBAP8GACGtBQEA_wYAIa4FAQCABwAhrwUBAP8GACGwBQEAgAcAIbEFAQD_BgAh9gUAALUI9gUi9wUgALYIACH4BSAAtggAIQ-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-ggAIAAAAAAAAAAAAAAAAAAAAAAAAAAFPAAA_Q4AID0AAIAPACCABgAA_g4AIIEGAAD_DgAghgYAAM0FACADPAAA_Q4AIIAGAAD-DgAghgYAAM0FACAAAAALPAAA0QwAMD0AANYMADCABgAA0gwAMIEGAADTDAAwggYAANQMACCDBgAA1QwAMIQGAADVDAAwhQYAANUMADCGBgAA1QwAMIcGAADXDAAwiAYAANgMADALPAAA0wsAMD0AANgLADCABgAA1AsAMIEGAADVCwAwggYAANYLACCDBgAA1wsAMIQGAADXCwAwhQYAANcLADCGBgAA1wsAMIcGAADZCwAwiAYAANoLADAYCQAAywwAIAsAAMwMACAMAADNDAAgDQAAzgwAIBAAAM8MACAWAADQDAAgqwQBAAAAAa4EQAAAAAGvBEAAAAABwAQBAAAAAcUEAQAAAAHKBAAAAJYFAuMEAQAAAAGCBRAAAAABgwUQAAAAAZIFAQAAAAGTBQEAAAABlAUBAAAAAZYFIAAAAAGXBSAAAAABmAUgAAAAAZkFAQAAAAGaBQEAAAABmwVAAAAAAQIAAAARACA8AADKDAAgAwAAABEAIDwAAMoMACA9AADfCwAgATUAAPwOADAdBQAA0wgAIAkAANQIACALAADVCAAgDAAA1ggAIA0AAIwHACAQAADnBgAgFgAAwwgAIKgEAADRCAAwqQQAAA8AEKoEAADRCAAwqwQBAAAAAa4EQADlBgAhrwRAAOUGACHABAEA_wYAIcUEAQD_BgAhygQAANIIlgUi2gQBAJ8HACHjBAEA_wYAIYIFEAD7BwAhgwUQAPsHACGSBQEAnwcAIZMFAQD_BgAhlAUBAP8GACGWBSAAhAcAIZcFIACEBwAhmAUgAIQHACGZBQEAgAcAIZoFAQCABwAhmwVAAIEHACECAAAAEQAgNQAA3wsAIAIAAADbCwAgNQAA3AsAIBaoBAAA2gsAMKkEAADbCwAQqgQAANoLADCrBAEApQcAIa4EQADlBgAhrwRAAOUGACHABAEA_wYAIcUEAQD_BgAhygQAANIIlgUi2gQBAJ8HACHjBAEA_wYAIYIFEAD7BwAhgwUQAPsHACGSBQEAnwcAIZMFAQD_BgAhlAUBAP8GACGWBSAAhAcAIZcFIACEBwAhmAUgAIQHACGZBQEAgAcAIZoFAQCABwAhmwVAAIEHACEWqAQAANoLADCpBAAA2wsAEKoEAADaCwAwqwQBAKUHACGuBEAA5QYAIa8EQADlBgAhwAQBAP8GACHFBAEA_wYAIcoEAADSCJYFItoEAQCfBwAh4wQBAP8GACGCBRAA-wcAIYMFEAD7BwAhkgUBAJ8HACGTBQEA_wYAIZQFAQD_BgAhlgUgAIQHACGXBSAAhAcAIZgFIACEBwAhmQUBAIAHACGaBQEAgAcAIZsFQACBBwAhEqsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIcAEAQDgCAAhxQQBAOAIACHKBAAA3guWBSLjBAEA4AgAIYIFEADdCwAhgwUQAN0LACGSBQEAgQkAIZMFAQDgCAAhlAUBAOAIACGWBSAAhQkAIZcFIACFCQAhmAUgAIUJACGZBQEAgQkAIZoFAQCBCQAhmwVAAIIJACEFgwYQAAAAAYkGEAAAAAGKBhAAAAABiwYQAAAAAYwGEAAAAAEBgwYAAACWBQIYCQAA4AsAIAsAAOELACAMAADiCwAgDQAA4wsAIBAAAOQLACAWAADlCwAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhwAQBAOAIACHFBAEA4AgAIcoEAADeC5YFIuMEAQDgCAAhggUQAN0LACGDBRAA3QsAIZIFAQCBCQAhkwUBAOAIACGUBQEA4AgAIZYFIACFCQAhlwUgAIUJACGYBSAAhQkAIZkFAQCBCQAhmgUBAIEJACGbBUAAggkAIQc8AADbDgAgPQAA-g4AIIAGAADcDgAggQYAAPkOACCEBgAAFQAghQYAABUAIIYGAAC0AQAgCzwAAL4MADA9AADDDAAwgAYAAL8MADCBBgAAwAwAMIIGAADBDAAggwYAAMIMADCEBgAAwgwAMIUGAADCDAAwhgYAAMIMADCHBgAAxAwAMIgGAADFDAAwCzwAAIUMADA9AACKDAAwgAYAAIYMADCBBgAAhwwAMIIGAACIDAAggwYAAIkMADCEBgAAiQwAMIUGAACJDAAwhgYAAIkMADCHBgAAiwwAMIgGAACMDAAwCzwAAPoLADA9AAD-CwAwgAYAAPsLADCBBgAA_AsAMIIGAAD9CwAggwYAANQKADCEBgAA1AoAMIUGAADUCgAwhgYAANQKADCHBgAA_wsAMIgGAADXCgAwCzwAAPELADA9AAD1CwAwgAYAAPILADCBBgAA8wsAMIIGAAD0CwAggwYAAO8IADCEBgAA7wgAMIUGAADvCAAwhgYAAO8IADCHBgAA9gsAMIgGAADyCAAwCzwAAOYLADA9AADqCwAwgAYAAOcLADCBBgAA6AsAMIIGAADpCwAggwYAAKUJADCEBgAApQkAMIUGAAClCQAwhgYAAKUJADCHBgAA6wsAMIgGAACoCQAwAxUAAPALACCrBAEAAAAB5AQBAAAAAQIAAAAtACA8AADvCwAgAwAAAC0AIDwAAO8LACA9AADtCwAgATUAAPgOADACAAAALQAgNQAA7QsAIAIAAACpCQAgNQAA7AsAIAKrBAEA4AgAIeQEAQDgCAAhAxUAAO4LACCrBAEA4AgAIeQEAQDgCAAhBTwAAPMOACA9AAD2DgAggAYAAPQOACCBBgAA9Q4AIIYGAAAyACADFQAA8AsAIKsEAQAAAAHkBAEAAAABAzwAAPMOACCABgAA9A4AIIYGAAAyACAFDwAA5AgAIKsEAQAAAAGsBAEAAAABrgRAAAAAAa8EQAAAAAECAAAAJwAgPAAA-QsAIAMAAAAnACA8AAD5CwAgPQAA-AsAIAE1AADyDgAwAgAAACcAIDUAAPgLACACAAAA8wgAIDUAAPcLACAEqwQBAOAIACGsBAEA4AgAIa4EQADhCAAhrwRAAOEIACEFDwAA4ggAIKsEAQDgCAAhrAQBAOAIACGuBEAA4QgAIa8EQADhCAAhBQ8AAOQIACCrBAEAAAABrAQBAAAAAa4EQAAAAAGvBEAAAAABCwEAAIQMACCrBAEAAAABrgRAAAAAAa8EQAAAAAG7BAEAAAABygQAAACNBQKIBQIAAAABiQUBAAAAAYoFAQAAAAGLBSAAAAABjQUCAAAAAQIAAAAjACA8AACDDAAgAwAAACMAIDwAAIMMACA9AACBDAAgATUAAPEOADACAAAAIwAgNQAAgQwAIAIAAADYCgAgNQAAgAwAIAqrBAEA4AgAIa4EQADhCAAhrwRAAOEIACG7BAEA4AgAIcoEAADaCo0FIogFAgDpCQAhiQUBAIEJACGKBQEA4AgAIYsFIACFCQAhjQUCAIYJACELAQAAggwAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIbsEAQDgCAAhygQAANoKjQUiiAUCAOkJACGJBQEAgQkAIYoFAQDgCAAhiwUgAIUJACGNBQIAhgkAIQU8AADsDgAgPQAA7w4AIIAGAADtDgAggQYAAO4OACCGBgAAlQYAIAsBAACEDAAgqwQBAAAAAa4EQAAAAAGvBEAAAAABuwQBAAAAAcoEAAAAjQUCiAUCAAAAAYkFAQAAAAGKBQEAAAABiwUgAAAAAY0FAgAAAAEDPAAA7A4AIIAGAADtDgAghgYAAJUGACASJAAAuwwAICUAALwMACAmAAC9DAAgqwQBAAAAAa4EQAAAAAGvBEAAAAABxQQBAAAAAcoEAAAAiAUC2wQBAAAAAf4EAQAAAAH_BAEAAAABgAUBAAAAAYEFAQAAAAGCBRAAAAABgwUQAAAAAYQFAgAAAAGFBQIAAAABhgUCAAAAAQIAAAAfACA8AAC6DAAgAwAAAB8AIDwAALoMACA9AACQDAAgATUAAOsOADAXCgAAxggAICQAAM8IACAlAACMCAAgJgAAqwgAIKgEAADNCAAwqQQAAB0AEKoEAADNCAAwqwQBAAAAAa0EAQClBwAhrgRAAOUGACGvBEAA5QYAIcUEAQD_BgAhygQAAM4IiAUi2wQBAIAHACH-BAEA_wYAIf8EAQCABwAhgAUBAIAHACGBBQEAgAcAIYIFEAC3BwAhgwUQAPsHACGEBQIA6QcAIYUFAgDpBwAhhgUCAOkHACECAAAAHwAgNQAAkAwAIAIAAACNDAAgNQAAjgwAIBOoBAAAjAwAMKkEAACNDAAQqgQAAIwMADCrBAEApQcAIa0EAQClBwAhrgRAAOUGACGvBEAA5QYAIcUEAQD_BgAhygQAAM4IiAUi2wQBAIAHACH-BAEA_wYAIf8EAQCABwAhgAUBAIAHACGBBQEAgAcAIYIFEAC3BwAhgwUQAPsHACGEBQIA6QcAIYUFAgDpBwAhhgUCAOkHACETqAQAAIwMADCpBAAAjQwAEKoEAACMDAAwqwQBAKUHACGtBAEApQcAIa4EQADlBgAhrwRAAOUGACHFBAEA_wYAIcoEAADOCIgFItsEAQCABwAh_gQBAP8GACH_BAEAgAcAIYAFAQCABwAhgQUBAIAHACGCBRAAtwcAIYMFEAD7BwAhhAUCAOkHACGFBQIA6QcAIYYFAgDpBwAhD6sEAQDgCAAhrgRAAOEIACGvBEAA4QgAIcUEAQDgCAAhygQAAI8MiAUi2wQBAIEJACH-BAEA4AgAIf8EAQCBCQAhgAUBAIEJACGBBQEAgQkAIYIFEADVCQAhgwUQAN0LACGEBQIA6QkAIYUFAgDpCQAhhgUCAOkJACEBgwYAAACIBQISJAAAkQwAICUAAJIMACAmAACTDAAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhxQQBAOAIACHKBAAAjwyIBSLbBAEAgQkAIf4EAQDgCAAh_wQBAIEJACGABQEAgQkAIYEFAQCBCQAhggUQANUJACGDBRAA3QsAIYQFAgDpCQAhhQUCAOkJACGGBQIA6QkAIQc8AACqDAAgPQAArQwAIIAGAACrDAAggQYAAKwMACCEBgAAPAAghQYAADwAIIYGAACIAwAgCzwAAJ8MADA9AACjDAAwgAYAAKAMADCBBgAAoQwAMIIGAACiDAAggwYAAKELADCEBgAAoQsAMIUGAAChCwAwhgYAAKELADCHBgAApAwAMIgGAACkCwAwCzwAAJQMADA9AACYDAAwgAYAAJUMADCBBgAAlgwAMIIGAACXDAAggwYAAPYJADCEBgAA9gkAMIUGAAD2CQAwhgYAAPYJADCHBgAAmQwAMIgGAAD5CQAwERgAAJ4MACAgAACMCgAgLwEAAAABqwQBAAAAAa4EQAAAAAGvBEAAAAAB0QQBAAAAAdYEAgAAAAHjBAEAAAAB_gQBAAAAAaQFAQAAAAGlBQEAAAABpgUBAAAAAacFAQAAAAGoBRAAAAABqQUQAAAAAaoFEAAAAAECAAAAVQAgPAAAnQwAIAMAAABVACA8AACdDAAgPQAAmwwAIAE1AADqDgAwAgAAAFUAIDUAAJsMACACAAAA-gkAIDUAAJoMACAPLwEA4AgAIasEAQDgCAAhrgRAAOEIACGvBEAA4QgAIdEEAQDgCAAh1gQCAOkJACHjBAEAgQkAIf4EAQDgCAAhpAUBAOAIACGlBQEA4AgAIaYFAQDgCAAhpwUBAOAIACGoBRAA1QkAIakFEADVCQAhqgUQANUJACERGAAAnAwAICAAAP4JACAvAQDgCAAhqwQBAOAIACGuBEAA4QgAIa8EQADhCAAh0QQBAOAIACHWBAIA6QkAIeMEAQCBCQAh_gQBAOAIACGkBQEA4AgAIaUFAQDgCAAhpgUBAOAIACGnBQEA4AgAIagFEADVCQAhqQUQANUJACGqBRAA1QkAIQU8AADlDgAgPQAA6A4AIIAGAADmDgAggQYAAOcOACCGBgAAdgAgERgAAJ4MACAgAACMCgAgLwEAAAABqwQBAAAAAa4EQAAAAAGvBEAAAAAB0QQBAAAAAdYEAgAAAAHjBAEAAAAB_gQBAAAAAaQFAQAAAAGlBQEAAAABpgUBAAAAAacFAQAAAAGoBRAAAAABqQUQAAAAAaoFEAAAAAEDPAAA5Q4AIIAGAADmDgAghgYAAHYAIAYEAACpDAAgqwQBAAAAAa4EQAAAAAGvBEAAAAAB1gQCAAAAAeYFAQAAAAECAAAABwAgPAAAqAwAIAMAAAAHACA8AACoDAAgPQAApgwAIAE1AADkDgAwAgAAAAcAIDUAAKYMACACAAAApQsAIDUAAKUMACAFqwQBAOAIACGuBEAA4QgAIa8EQADhCAAh1gQCAOkJACHmBQEA4AgAIQYEAACnDAAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAh1gQCAOkJACHmBQEA4AgAIQU8AADfDgAgPQAA4g4AIIAGAADgDgAggQYAAOEOACCGBgAAzAEAIAYEAACpDAAgqwQBAAAAAa4EQAAAAAGvBEAAAAAB1gQCAAAAAeYFAQAAAAEDPAAA3w4AIIAGAADgDgAghgYAAMwBACAHIwAAuQwAIKsEAQAAAAGuBEAAAAABrwRAAAAAAcwFAgAAAAHNBQIAAAABzgUCAAAAAQIAAACIAwAgPAAAqgwAIAMAAAA8ACA8AACqDAAgPQAArgwAIAkAAAA8ACAjAACvDAAgNQAArgwAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIcwFAgDpCQAhzQUCAOkJACHOBQIA6QkAIQcjAACvDAAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhzAUCAOkJACHNBQIA6QkAIc4FAgDpCQAhCzwAALAMADA9AAC0DAAwgAYAALEMADCBBgAAsgwAMIIGAACzDAAggwYAAOIJADCEBgAA4gkAMIUGAADiCQAwhgYAAOIJADCHBgAAtQwAMIgGAADlCQAwDhgAAIkKACAhAADwCQAgIgAA8QkAIKsEAQAAAAGuBEAAAAABrwRAAAAAAdEEAQAAAAHSBAEAAAAB0wQBAAAAAdUEAAAA1QQC1gQCAAAAAdcEAgAAAAHYBAIAAAAB2QQBAAAAAQIAAABAACA8AAC4DAAgAwAAAEAAIDwAALgMACA9AAC3DAAgATUAAN4OADACAAAAQAAgNQAAtwwAIAIAAADmCQAgNQAAtgwAIAurBAEA4AgAIa4EQADhCAAhrwRAAOEIACHRBAEAgQkAIdIEAQCBCQAh0wQBAOAIACHVBAAA6AnVBCLWBAIA6QkAIdcEAgDpCQAh2AQCAOkJACHZBAEAgQkAIQ4YAACHCgAgIQAA7AkAICIAAO0JACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACHRBAEAgQkAIdIEAQCBCQAh0wQBAOAIACHVBAAA6AnVBCLWBAIA6QkAIdcEAgDpCQAh2AQCAOkJACHZBAEAgQkAIQ4YAACJCgAgIQAA8AkAICIAAPEJACCrBAEAAAABrgRAAAAAAa8EQAAAAAHRBAEAAAAB0gQBAAAAAdMEAQAAAAHVBAAAANUEAtYEAgAAAAHXBAIAAAAB2AQCAAAAAdkEAQAAAAEEPAAAsAwAMIAGAACxDAAwggYAALMMACCGBgAA4gkAMBIkAAC7DAAgJQAAvAwAICYAAL0MACCrBAEAAAABrgRAAAAAAa8EQAAAAAHFBAEAAAABygQAAACIBQLbBAEAAAAB_gQBAAAAAf8EAQAAAAGABQEAAAABgQUBAAAAAYIFEAAAAAGDBRAAAAABhAUCAAAAAYUFAgAAAAGGBQIAAAABAzwAAKoMACCABgAAqwwAIIYGAACIAwAgBDwAAJ8MADCABgAAoAwAMIIGAACiDAAghgYAAKELADAEPAAAlAwAMIAGAACVDAAwggYAAJcMACCGBgAA9gkAMAirBAEAAAABrgRAAAAAAa8EQAAAAAHcBAIAAAABjgUBAAAAAY8FAQAAAAGQBQEAAAABkQUgAAAAAQIAAAAbACA8AADJDAAgAwAAABsAIDwAAMkMACA9AADIDAAgATUAAN0OADANCgAAxggAIKgEAADQCAAwqQQAABkAEKoEAADQCAAwqwQBAAAAAa0EAQClBwAhrgRAAOUGACGvBEAA5QYAIdwEAgDpBwAhjgUBAP8GACGPBQEAgAcAIZAFAQCABwAhkQUgAIQHACECAAAAGwAgNQAAyAwAIAIAAADGDAAgNQAAxwwAIAyoBAAAxQwAMKkEAADGDAAQqgQAAMUMADCrBAEApQcAIa0EAQClBwAhrgRAAOUGACGvBEAA5QYAIdwEAgDpBwAhjgUBAP8GACGPBQEAgAcAIZAFAQCABwAhkQUgAIQHACEMqAQAAMUMADCpBAAAxgwAEKoEAADFDAAwqwQBAKUHACGtBAEApQcAIa4EQADlBgAhrwRAAOUGACHcBAIA6QcAIY4FAQD_BgAhjwUBAIAHACGQBQEAgAcAIZEFIACEBwAhCKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIdwEAgDpCQAhjgUBAOAIACGPBQEAgQkAIZAFAQCBCQAhkQUgAIUJACEIqwQBAOAIACGuBEAA4QgAIa8EQADhCAAh3AQCAOkJACGOBQEA4AgAIY8FAQCBCQAhkAUBAIEJACGRBSAAhQkAIQirBAEAAAABrgRAAAAAAa8EQAAAAAHcBAIAAAABjgUBAAAAAY8FAQAAAAGQBQEAAAABkQUgAAAAARgJAADLDAAgCwAAzAwAIAwAAM0MACANAADODAAgEAAAzwwAIBYAANAMACCrBAEAAAABrgRAAAAAAa8EQAAAAAHABAEAAAABxQQBAAAAAcoEAAAAlgUC4wQBAAAAAYIFEAAAAAGDBRAAAAABkgUBAAAAAZMFAQAAAAGUBQEAAAABlgUgAAAAAZcFIAAAAAGYBSAAAAABmQUBAAAAAZoFAQAAAAGbBUAAAAABAzwAANsOACCABgAA3A4AIIYGAAC0AQAgBDwAAL4MADCABgAAvwwAMIIGAADBDAAghgYAAMIMADAEPAAAhQwAMIAGAACGDAAwggYAAIgMACCGBgAAiQwAMAQ8AAD6CwAwgAYAAPsLADCCBgAA_QsAIIYGAADUCgAwBDwAAPELADCABgAA8gsAMIIGAAD0CwAghgYAAO8IADAEPAAA5gsAMIAGAADnCwAwggYAAOkLACCGBgAApQkAMAQGgAAAAAGrBAEAAAAB2wQBAAAAAdwEAgAAAAECAAAADQAgPAAA3AwAIAMAAAANACA8AADcDAAgPQAA2wwAIAE1AADaDgAwCgUAANkIACAGAACmBwAgqAQAANgIADCpBAAACwAQqgQAANgIADCrBAEAAAAB2gQBAKUHACHbBAEA_wYAIdwEAgDpBwAh_AUAANcIACACAAAADQAgNQAA2wwAIAIAAADZDAAgNQAA2gwAIAgGAACmBwAgqAQAANgMADCpBAAA2QwAEKoEAADYDAAwqwQBAKUHACHaBAEApQcAIdsEAQD_BgAh3AQCAOkHACEIBgAApgcAIKgEAADYDAAwqQQAANkMABCqBAAA2AwAMKsEAQClBwAh2gQBAKUHACHbBAEA_wYAIdwEAgDpBwAhBAaAAAAAAasEAQDgCAAh2wQBAOAIACHcBAIA6QkAIQQGgAAAAAGrBAEA4AgAIdsEAQDgCAAh3AQCAOkJACEEBoAAAAABqwQBAAAAAdsEAQAAAAHcBAIAAAABBDwAANEMADCABgAA0gwAMIIGAADUDAAghgYAANUMADAEPAAA0wsAMIAGAADUCwAwggYAANYLACCGBgAA1wsAMAAAAAAAAAAABTwAANUOACA9AADYDgAggAYAANYOACCBBgAA1w4AIIYGAAB2ACADPAAA1Q4AIIAGAADWDgAghgYAAHYAIAwBAAD5CAAgDgAAjA4AIBkAAO8MACAaAACRDQAgGwAAiQ4AIB4AAIoOACAfAACLDgAgIAAAvAsAILsFAAD7CAAgvAUAAPsIACC9BQAA-wgAIL4FAAD7CAAgAAAAAAADGAAA6QwAIBoAAJENACDjBAAA-wgAIAAAAAAABTwAANAOACA9AADTDgAggAYAANEOACCBBgAA0g4AIIYGAAARACADPAAA0A4AIIAGAADRDgAghgYAABEAIAAAAAAAAAAAAAAFPAAAyw4AID0AAM4OACCABgAAzA4AIIEGAADNDgAghgYAABEAIAM8AADLDgAggAYAAMwOACCGBgAAEQAgAAAAAAAHPAAAxg4AID0AAMkOACCABgAAxw4AIIEGAADIDgAghAYAAAkAIIUGAAAJACCGBgAAzQUAIAM8AADGDgAggAYAAMcOACCGBgAAzQUAIAAAAAAABTwAAMEOACA9AADEDgAggAYAAMIOACCBBgAAww4AIIYGAAB2ACADPAAAwQ4AIIAGAADCDgAghgYAAHYAIAcYAADpDAAgGQAA7wwAIOMEAAD7CAAg-QQAAPsIACD6BAAA-wgAIPwEAAD7CAAg_QQAAPsIACAAAAAFPAAAvA4AID0AAL8OACCABgAAvQ4AIIEGAAC-DgAghgYAAJUGACADPAAAvA4AIIAGAAC9DgAghgYAAJUGACAAAAAAAAAAAAU8AAC3DgAgPQAAug4AIIAGAAC4DgAggQYAALkOACCGBgAAdgAgAzwAALcOACCABgAAuA4AIIYGAAB2ACAAAAAAAAU8AACyDgAgPQAAtQ4AIIAGAACzDgAggQYAALQOACCGBgAAlQYAIAM8AACyDgAggAYAALMOACCGBgAAlQYAIAAAAAU8AACtDgAgPQAAsA4AIIAGAACuDgAggQYAAK8OACCGBgAAlQYAIAM8AACtDgAggAYAAK4OACCGBgAAlQYAIAAAAAAABTwAAKgOACA9AACrDgAggAYAAKkOACCBBgAAqg4AIIYGAAAfACADPAAAqA4AIIAGAACpDgAghgYAAB8AIAkKAACSDgAgJAAAjg4AICUAAOsNACAmAACMDgAg2wQAAPsIACD_BAAA-wgAIIAFAAD7CAAggQUAAPsIACCDBQAA-wgAIAAAAAAAAYMGAAAA0wUCAAAAAAAAAAAAAAGDBgAAANcFAgGDBgAAAN8FAgs8AADIDQAwPQAAzA0AMIAGAADJDQAwgQYAAMoNADCCBgAAyw0AIIMGAADsCgAwhAYAAOwKADCFBgAA7AoAMIYGAADsCgAwhwYAAM0NADCIBgAA7woAMAoBAACiCgAgGAAA9QoAIKsEAQAAAAGuBEAAAAABrwRAAAAAAbsEAQAAAAHRBAEAAAABogVAAAAAAakFEAAAAAHUBQEAAAABAgAAAE0AIDwAANANACADAAAATQAgPAAA0A0AID0AAM8NACABNQAApw4AMAIAAABNACA1AADPDQAgAgAAAPAKACA1AADODQAgCKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIbsEAQDgCAAh0QQBAOAIACGiBUAA4QgAIakFEADVCQAh1AUBAOAIACEKAQAAoAoAIBgAAPMKACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACG7BAEA4AgAIdEEAQDgCAAhogVAAOEIACGpBRAA1QkAIdQFAQDgCAAhCgEAAKIKACAYAAD1CgAgqwQBAAAAAa4EQAAAAAGvBEAAAAABuwQBAAAAAdEEAQAAAAGiBUAAAAABqQUQAAAAAdQFAQAAAAEEPAAAyA0AMIAGAADJDQAwggYAAMsNACCGBgAA7AoAMAAAAAc8AACiDgAgPQAApQ4AIIAGAACjDgAggQYAAKQOACCEBgAAbAAghQYAAGwAIIYGAACVBgAgAzwAAKIOACCABgAAow4AIIYGAACVBgAgAAAAAAAAAAAAAAAAAAAAAAAABTwAAJ0OACA9AACgDgAggAYAAJ4OACCBBgAAnw4AIIYGAACVBgAgAzwAAJ0OACCABgAAng4AIIYGAACVBgAgAAAAAAAAAYMGAAAA7AUCCzwAAPMNADA9AAD3DQAwgAYAAPQNADCBBgAA9Q0AMIIGAAD2DQAggwYAANcLADCEBgAA1wsAMIUGAADXCwAwhgYAANcLADCHBgAA-A0AMIgGAADaCwAwGAUAAIkNACALAADMDAAgDAAAzQwAIA0AAM4MACAQAADPDAAgFgAA0AwAIKsEAQAAAAGuBEAAAAABrwRAAAAAAcAEAQAAAAHFBAEAAAABygQAAACWBQLaBAEAAAAB4wQBAAAAAYIFEAAAAAGDBRAAAAABkwUBAAAAAZQFAQAAAAGWBSAAAAABlwUgAAAAAZgFIAAAAAGZBQEAAAABmgUBAAAAAZsFQAAAAAECAAAAEQAgPAAA-w0AIAMAAAARACA8AAD7DQAgPQAA-g0AIAE1AACcDgAwAgAAABEAIDUAAPoNACACAAAA2wsAIDUAAPkNACASqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhwAQBAOAIACHFBAEA4AgAIcoEAADeC5YFItoEAQCBCQAh4wQBAOAIACGCBRAA3QsAIYMFEADdCwAhkwUBAOAIACGUBQEA4AgAIZYFIACFCQAhlwUgAIUJACGYBSAAhQkAIZkFAQCBCQAhmgUBAIEJACGbBUAAggkAIRgFAACIDQAgCwAA4QsAIAwAAOILACANAADjCwAgEAAA5AsAIBYAAOULACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACHABAEA4AgAIcUEAQDgCAAhygQAAN4LlgUi2gQBAIEJACHjBAEA4AgAIYIFEADdCwAhgwUQAN0LACGTBQEA4AgAIZQFAQDgCAAhlgUgAIUJACGXBSAAhQkAIZgFIACFCQAhmQUBAIEJACGaBQEAgQkAIZsFQACCCQAhGAUAAIkNACALAADMDAAgDAAAzQwAIA0AAM4MACAQAADPDAAgFgAA0AwAIKsEAQAAAAGuBEAAAAABrwRAAAAAAcAEAQAAAAHFBAEAAAABygQAAACWBQLaBAEAAAAB4wQBAAAAAYIFEAAAAAGDBRAAAAABkwUBAAAAAZQFAQAAAAGWBSAAAAABlwUgAAAAAZgFIAAAAAGZBQEAAAABmgUBAAAAAZsFQAAAAAEEPAAA8w0AMIAGAAD0DQAwggYAAPYNACCGBgAA1wsAMAAAAAAAAYMGAAAA8QUCAYMGAAAA9AUCAAAABTwAAJcOACA9AACaDgAggAYAAJgOACCBBgAAmQ4AIIYGAACVBgAgAzwAAJcOACCABgAAmA4AIIYGAACVBgAgChgAAOkMACDqBAAA-wgAIOsEAAD7CAAg7AQAAPsIACDtBAAA-wgAIO8EAAD7CAAg8AQAAPsIACDxBAAA-wgAIPIEAAD7CAAg8wQAAPsIACADAQAA-QgAIBgAAOkMACAdAACNDgAgAhgAAOkMACCxBQAA-wgAIAAJHAAAuwsAIOMEAAD7CAAgoQUAAPsIACDXBQAA-wgAINgFAAD7CAAg2QUAAPsIACDaBQAA-wgAINsFAAD7CAAg3AUAAPsIACACDAAAtA0AICMAALwLACAEDAAAtA0AIBgAAOkMACAgAAC8CwAg4wQAAPsIACAMEQAA-QgAIBIAAJAOACATAADBCwAgFAAAkQ4AIMUEAAD7CAAgxgQAAPsIACDjBAAA-wgAIJMFAAD7CAAgmQUAAPsIACCaBQAA-wgAINEFAAD7CAAg5AUAAPsIACAADgUAAJMOACAJAACUDgAgCwAAlQ4AIAwAAJYOACANAAC9CwAgEAAA-ggAIBYAAJEOACDaBAAA-wgAIIIFAAD7CAAggwUAAPsIACCSBQAA-wgAIJkFAAD7CAAgmgUAAPsIACCbBQAA-wgAIAQGAADfDAAgBwAA4AwAIOMEAAD7CAAg5AQAAPsIACAHBwAA4AwAIOMEAAD7CAAgmQUAAPsIACCaBQAA-wgAIOgFAAD7CAAg6QUAAPsIACDqBQAA-wgAIAAAHB4AALALACAgAACxCwAgJwAArAsAICgAAK0LACAqAACvCwAgKwAAsgsAICwAALMLACAtAAC0CwAgLgAAtQsAIC8AALYLACCrBAEAAAABrgRAAAAAAa8EQAAAAAG_BAEAAAABwAQBAAAAAcEEAQAAAAHCBAEAAAABwwRAAAAAAcQEAQAAAAHFBAEAAAABxgQBAAAAAcgEAAAAyAQCygQAAADKBALLBEAAAAABzARAAAAAAc0EQAAAAAHOBCAAAAABzwQCAAAAAQIAAACVBgAgPAAAlw4AIAMAAABsACA8AACXDgAgPQAAmw4AIB4AAABsACAeAACLCQAgIAAAjAkAICcAAIcJACAoAACICQAgKgAAigkAICsAAI0JACAsAACOCQAgLQAAjwkAIC4AAJAJACAvAACRCQAgNQAAmw4AIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIb8EAQDgCAAhwAQBAOAIACHBBAEAgQkAIcIEAQCBCQAhwwRAAIIJACHEBAEAgQkAIcUEAQCBCQAhxgQBAIEJACHIBAAAgwnIBCLKBAAAhAnKBCLLBEAAggkAIcwEQACCCQAhzQRAAIIJACHOBCAAhQkAIc8EAgCGCQAhHB4AAIsJACAgAACMCQAgJwAAhwkAICgAAIgJACAqAACKCQAgKwAAjQkAICwAAI4JACAtAACPCQAgLgAAkAkAIC8AAJEJACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACG_BAEA4AgAIcAEAQDgCAAhwQQBAIEJACHCBAEAgQkAIcMEQACCCQAhxAQBAIEJACHFBAEAgQkAIcYEAQCBCQAhyAQAAIMJyAQiygQAAIQJygQiywRAAIIJACHMBEAAggkAIc0EQACCCQAhzgQgAIUJACHPBAIAhgkAIRKrBAEAAAABrgRAAAAAAa8EQAAAAAHABAEAAAABxQQBAAAAAcoEAAAAlgUC2gQBAAAAAeMEAQAAAAGCBRAAAAABgwUQAAAAAZMFAQAAAAGUBQEAAAABlgUgAAAAAZcFIAAAAAGYBSAAAAABmQUBAAAAAZoFAQAAAAGbBUAAAAABHB4AALALACAgAACxCwAgKAAArQsAICkAAK4LACAqAACvCwAgKwAAsgsAICwAALMLACAtAAC0CwAgLgAAtQsAIC8AALYLACCrBAEAAAABrgRAAAAAAa8EQAAAAAG_BAEAAAABwAQBAAAAAcEEAQAAAAHCBAEAAAABwwRAAAAAAcQEAQAAAAHFBAEAAAABxgQBAAAAAcgEAAAAyAQCygQAAADKBALLBEAAAAABzARAAAAAAc0EQAAAAAHOBCAAAAABzwQCAAAAAQIAAACVBgAgPAAAnQ4AIAMAAABsACA8AACdDgAgPQAAoQ4AIB4AAABsACAeAACLCQAgIAAAjAkAICgAAIgJACApAACJCQAgKgAAigkAICsAAI0JACAsAACOCQAgLQAAjwkAIC4AAJAJACAvAACRCQAgNQAAoQ4AIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIb8EAQDgCAAhwAQBAOAIACHBBAEAgQkAIcIEAQCBCQAhwwRAAIIJACHEBAEAgQkAIcUEAQCBCQAhxgQBAIEJACHIBAAAgwnIBCLKBAAAhAnKBCLLBEAAggkAIcwEQACCCQAhzQRAAIIJACHOBCAAhQkAIc8EAgCGCQAhHB4AAIsJACAgAACMCQAgKAAAiAkAICkAAIkJACAqAACKCQAgKwAAjQkAICwAAI4JACAtAACPCQAgLgAAkAkAIC8AAJEJACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACG_BAEA4AgAIcAEAQDgCAAhwQQBAIEJACHCBAEAgQkAIcMEQACCCQAhxAQBAIEJACHFBAEAgQkAIcYEAQCBCQAhyAQAAIMJyAQiygQAAIQJygQiywRAAIIJACHMBEAAggkAIc0EQACCCQAhzgQgAIUJACHPBAIAhgkAIRweAACwCwAgIAAAsQsAICcAAKwLACAoAACtCwAgKQAArgsAICsAALILACAsAACzCwAgLQAAtAsAIC4AALULACAvAAC2CwAgqwQBAAAAAa4EQAAAAAGvBEAAAAABvwQBAAAAAcAEAQAAAAHBBAEAAAABwgQBAAAAAcMEQAAAAAHEBAEAAAABxQQBAAAAAcYEAQAAAAHIBAAAAMgEAsoEAAAAygQCywRAAAAAAcwEQAAAAAHNBEAAAAABzgQgAAAAAc8EAgAAAAECAAAAlQYAIDwAAKIOACADAAAAbAAgPAAAog4AID0AAKYOACAeAAAAbAAgHgAAiwkAICAAAIwJACAnAACHCQAgKAAAiAkAICkAAIkJACArAACNCQAgLAAAjgkAIC0AAI8JACAuAACQCQAgLwAAkQkAIDUAAKYOACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACG_BAEA4AgAIcAEAQDgCAAhwQQBAIEJACHCBAEAgQkAIcMEQACCCQAhxAQBAIEJACHFBAEAgQkAIcYEAQCBCQAhyAQAAIMJyAQiygQAAIQJygQiywRAAIIJACHMBEAAggkAIc0EQACCCQAhzgQgAIUJACHPBAIAhgkAIRweAACLCQAgIAAAjAkAICcAAIcJACAoAACICQAgKQAAiQkAICsAAI0JACAsAACOCQAgLQAAjwkAIC4AAJAJACAvAACRCQAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhvwQBAOAIACHABAEA4AgAIcEEAQCBCQAhwgQBAIEJACHDBEAAggkAIcQEAQCBCQAhxQQBAIEJACHGBAEAgQkAIcgEAACDCcgEIsoEAACECcoEIssEQACCCQAhzARAAIIJACHNBEAAggkAIc4EIACFCQAhzwQCAIYJACEIqwQBAAAAAa4EQAAAAAGvBEAAAAABuwQBAAAAAdEEAQAAAAGiBUAAAAABqQUQAAAAAdQFAQAAAAETCgAA9gwAICUAALwMACAmAAC9DAAgqwQBAAAAAa0EAQAAAAGuBEAAAAABrwRAAAAAAcUEAQAAAAHKBAAAAIgFAtsEAQAAAAH-BAEAAAAB_wQBAAAAAYAFAQAAAAGBBQEAAAABggUQAAAAAYMFEAAAAAGEBQIAAAABhQUCAAAAAYYFAgAAAAECAAAAHwAgPAAAqA4AIAMAAAAdACA8AACoDgAgPQAArA4AIBUAAAAdACAKAAD1DAAgJQAAkgwAICYAAJMMACA1AACsDgAgqwQBAOAIACGtBAEA4AgAIa4EQADhCAAhrwRAAOEIACHFBAEA4AgAIcoEAACPDIgFItsEAQCBCQAh_gQBAOAIACH_BAEAgQkAIYAFAQCBCQAhgQUBAIEJACGCBRAA1QkAIYMFEADdCwAhhAUCAOkJACGFBQIA6QkAIYYFAgDpCQAhEwoAAPUMACAlAACSDAAgJgAAkwwAIKsEAQDgCAAhrQQBAOAIACGuBEAA4QgAIa8EQADhCAAhxQQBAOAIACHKBAAAjwyIBSLbBAEAgQkAIf4EAQDgCAAh_wQBAIEJACGABQEAgQkAIYEFAQCBCQAhggUQANUJACGDBRAA3QsAIYQFAgDpCQAhhQUCAOkJACGGBQIA6QkAIRweAACwCwAgIAAAsQsAICcAAKwLACAoAACtCwAgKQAArgsAICoAAK8LACArAACyCwAgLQAAtAsAIC4AALULACAvAAC2CwAgqwQBAAAAAa4EQAAAAAGvBEAAAAABvwQBAAAAAcAEAQAAAAHBBAEAAAABwgQBAAAAAcMEQAAAAAHEBAEAAAABxQQBAAAAAcYEAQAAAAHIBAAAAMgEAsoEAAAAygQCywRAAAAAAcwEQAAAAAHNBEAAAAABzgQgAAAAAc8EAgAAAAECAAAAlQYAIDwAAK0OACADAAAAbAAgPAAArQ4AID0AALEOACAeAAAAbAAgHgAAiwkAICAAAIwJACAnAACHCQAgKAAAiAkAICkAAIkJACAqAACKCQAgKwAAjQkAIC0AAI8JACAuAACQCQAgLwAAkQkAIDUAALEOACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACG_BAEA4AgAIcAEAQDgCAAhwQQBAIEJACHCBAEAgQkAIcMEQACCCQAhxAQBAIEJACHFBAEAgQkAIcYEAQCBCQAhyAQAAIMJyAQiygQAAIQJygQiywRAAIIJACHMBEAAggkAIc0EQACCCQAhzgQgAIUJACHPBAIAhgkAIRweAACLCQAgIAAAjAkAICcAAIcJACAoAACICQAgKQAAiQkAICoAAIoJACArAACNCQAgLQAAjwkAIC4AAJAJACAvAACRCQAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhvwQBAOAIACHABAEA4AgAIcEEAQCBCQAhwgQBAIEJACHDBEAAggkAIcQEAQCBCQAhxQQBAIEJACHGBAEAgQkAIcgEAACDCcgEIsoEAACECcoEIssEQACCCQAhzARAAIIJACHNBEAAggkAIc4EIACFCQAhzwQCAIYJACEcHgAAsAsAICAAALELACAnAACsCwAgKAAArQsAICkAAK4LACAqAACvCwAgKwAAsgsAICwAALMLACAuAAC1CwAgLwAAtgsAIKsEAQAAAAGuBEAAAAABrwRAAAAAAb8EAQAAAAHABAEAAAABwQQBAAAAAcIEAQAAAAHDBEAAAAABxAQBAAAAAcUEAQAAAAHGBAEAAAAByAQAAADIBALKBAAAAMoEAssEQAAAAAHMBEAAAAABzQRAAAAAAc4EIAAAAAHPBAIAAAABAgAAAJUGACA8AACyDgAgAwAAAGwAIDwAALIOACA9AAC2DgAgHgAAAGwAIB4AAIsJACAgAACMCQAgJwAAhwkAICgAAIgJACApAACJCQAgKgAAigkAICsAAI0JACAsAACOCQAgLgAAkAkAIC8AAJEJACA1AAC2DgAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhvwQBAOAIACHABAEA4AgAIcEEAQCBCQAhwgQBAIEJACHDBEAAggkAIcQEAQCBCQAhxQQBAIEJACHGBAEAgQkAIcgEAACDCcgEIsoEAACECcoEIssEQACCCQAhzARAAIIJACHNBEAAggkAIc4EIACFCQAhzwQCAIYJACEcHgAAiwkAICAAAIwJACAnAACHCQAgKAAAiAkAICkAAIkJACAqAACKCQAgKwAAjQkAICwAAI4JACAuAACQCQAgLwAAkQkAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIb8EAQDgCAAhwAQBAOAIACHBBAEAgQkAIcIEAQCBCQAhwwRAAIIJACHEBAEAgQkAIcUEAQCBCQAhxgQBAIEJACHIBAAAgwnIBCLKBAAAhAnKBCLLBEAAggkAIcwEQACCCQAhzQRAAIIJACHOBCAAhQkAIc8EAgCGCQAhGQEAAKcNACAOAAC_CgAgGQAAugoAIBoAAL0KACAbAAC7CgAgHgAAvAoAICAAAMAKACCrBAEAAAABrgRAAAAAAa8EQAAAAAG7BAEAAAABygQAAAC3BQKpBRAAAAABsgUBAAAAAbMFAQAAAAG0BQEAAAABtQUBAAAAAbcFEAAAAAG4BRAAAAABuQUQAAAAAboFEAAAAAG7BQEAAAABvAUBAAAAAb0FQAAAAAG-BUAAAAABAgAAAHYAIDwAALcOACADAAAAQgAgPAAAtw4AID0AALsOACAbAAAAQgAgAQAApg0AIA4AANwJACAZAADXCQAgGgAA2gkAIBsAANgJACAeAADZCQAgIAAA3QkAIDUAALsOACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACG7BAEA4AgAIcoEAADUCbcFIqkFEADVCQAhsgUBAOAIACGzBQEA4AgAIbQFAQDgCAAhtQUBAOAIACG3BRAA1QkAIbgFEADVCQAhuQUQANUJACG6BRAA1QkAIbsFAQCBCQAhvAUBAIEJACG9BUAAggkAIb4FQACCCQAhGQEAAKYNACAOAADcCQAgGQAA1wkAIBoAANoJACAbAADYCQAgHgAA2QkAICAAAN0JACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACG7BAEA4AgAIcoEAADUCbcFIqkFEADVCQAhsgUBAOAIACGzBQEA4AgAIbQFAQDgCAAhtQUBAOAIACG3BRAA1QkAIbgFEADVCQAhuQUQANUJACG6BRAA1QkAIbsFAQCBCQAhvAUBAIEJACG9BUAAggkAIb4FQACCCQAhHB4AALALACAgAACxCwAgJwAArAsAICgAAK0LACApAACuCwAgKgAArwsAICsAALILACAsAACzCwAgLQAAtAsAIC8AALYLACCrBAEAAAABrgRAAAAAAa8EQAAAAAG_BAEAAAABwAQBAAAAAcEEAQAAAAHCBAEAAAABwwRAAAAAAcQEAQAAAAHFBAEAAAABxgQBAAAAAcgEAAAAyAQCygQAAADKBALLBEAAAAABzARAAAAAAc0EQAAAAAHOBCAAAAABzwQCAAAAAQIAAACVBgAgPAAAvA4AIAMAAABsACA8AAC8DgAgPQAAwA4AIB4AAABsACAeAACLCQAgIAAAjAkAICcAAIcJACAoAACICQAgKQAAiQkAICoAAIoJACArAACNCQAgLAAAjgkAIC0AAI8JACAvAACRCQAgNQAAwA4AIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIb8EAQDgCAAhwAQBAOAIACHBBAEAgQkAIcIEAQCBCQAhwwRAAIIJACHEBAEAgQkAIcUEAQCBCQAhxgQBAIEJACHIBAAAgwnIBCLKBAAAhAnKBCLLBEAAggkAIcwEQACCCQAhzQRAAIIJACHOBCAAhQkAIc8EAgCGCQAhHB4AAIsJACAgAACMCQAgJwAAhwkAICgAAIgJACApAACJCQAgKgAAigkAICsAAI0JACAsAACOCQAgLQAAjwkAIC8AAJEJACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACG_BAEA4AgAIcAEAQDgCAAhwQQBAIEJACHCBAEAgQkAIcMEQACCCQAhxAQBAIEJACHFBAEAgQkAIcYEAQCBCQAhyAQAAIMJyAQiygQAAIQJygQiywRAAIIJACHMBEAAggkAIc0EQACCCQAhzgQgAIUJACHPBAIAhgkAIRkBAACnDQAgDgAAvwoAIBoAAL0KACAbAAC7CgAgHgAAvAoAIB8AAL4KACAgAADACgAgqwQBAAAAAa4EQAAAAAGvBEAAAAABuwQBAAAAAcoEAAAAtwUCqQUQAAAAAbIFAQAAAAGzBQEAAAABtAUBAAAAAbUFAQAAAAG3BRAAAAABuAUQAAAAAbkFEAAAAAG6BRAAAAABuwUBAAAAAbwFAQAAAAG9BUAAAAABvgVAAAAAAQIAAAB2ACA8AADBDgAgAwAAAEIAIDwAAMEOACA9AADFDgAgGwAAAEIAIAEAAKYNACAOAADcCQAgGgAA2gkAIBsAANgJACAeAADZCQAgHwAA2wkAICAAAN0JACA1AADFDgAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhuwQBAOAIACHKBAAA1Am3BSKpBRAA1QkAIbIFAQDgCAAhswUBAOAIACG0BQEA4AgAIbUFAQDgCAAhtwUQANUJACG4BRAA1QkAIbkFEADVCQAhugUQANUJACG7BQEAgQkAIbwFAQCBCQAhvQVAAIIJACG-BUAAggkAIRkBAACmDQAgDgAA3AkAIBoAANoJACAbAADYCQAgHgAA2QkAIB8AANsJACAgAADdCQAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhuwQBAOAIACHKBAAA1Am3BSKpBRAA1QkAIbIFAQDgCAAhswUBAOAIACG0BQEA4AgAIbUFAQDgCAAhtwUQANUJACG4BRAA1QkAIbkFEADVCQAhugUQANUJACG7BQEAgQkAIbwFAQCBCQAhvQVAAIIJACG-BUAAggkAIQcGAADdDAAgqwQBAAAAAa4EQAAAAAGvBEAAAAABwAQBAAAAAeMEAQAAAAHkBAEAAAABAgAAAM0FACA8AADGDgAgAwAAAAkAIDwAAMYOACA9AADKDgAgCQAAAAkAIAYAANELACA1AADKDgAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhwAQBAOAIACHjBAEAgQkAIeQEAQCBCQAhBwYAANELACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACHABAEA4AgAIeMEAQCBCQAh5AQBAIEJACEZBQAAiQ0AIAkAAMsMACAMAADNDAAgDQAAzgwAIBAAAM8MACAWAADQDAAgqwQBAAAAAa4EQAAAAAGvBEAAAAABwAQBAAAAAcUEAQAAAAHKBAAAAJYFAtoEAQAAAAHjBAEAAAABggUQAAAAAYMFEAAAAAGSBQEAAAABkwUBAAAAAZQFAQAAAAGWBSAAAAABlwUgAAAAAZgFIAAAAAGZBQEAAAABmgUBAAAAAZsFQAAAAAECAAAAEQAgPAAAyw4AIAMAAAAPACA8AADLDgAgPQAAzw4AIBsAAAAPACAFAACIDQAgCQAA4AsAIAwAAOILACANAADjCwAgEAAA5AsAIBYAAOULACA1AADPDgAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhwAQBAOAIACHFBAEA4AgAIcoEAADeC5YFItoEAQCBCQAh4wQBAOAIACGCBRAA3QsAIYMFEADdCwAhkgUBAIEJACGTBQEA4AgAIZQFAQDgCAAhlgUgAIUJACGXBSAAhQkAIZgFIACFCQAhmQUBAIEJACGaBQEAgQkAIZsFQACCCQAhGQUAAIgNACAJAADgCwAgDAAA4gsAIA0AAOMLACAQAADkCwAgFgAA5QsAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIcAEAQDgCAAhxQQBAOAIACHKBAAA3guWBSLaBAEAgQkAIeMEAQDgCAAhggUQAN0LACGDBRAA3QsAIZIFAQCBCQAhkwUBAOAIACGUBQEA4AgAIZYFIACFCQAhlwUgAIUJACGYBSAAhQkAIZkFAQCBCQAhmgUBAIEJACGbBUAAggkAIRkFAACJDQAgCQAAywwAIAsAAMwMACANAADODAAgEAAAzwwAIBYAANAMACCrBAEAAAABrgRAAAAAAa8EQAAAAAHABAEAAAABxQQBAAAAAcoEAAAAlgUC2gQBAAAAAeMEAQAAAAGCBRAAAAABgwUQAAAAAZIFAQAAAAGTBQEAAAABlAUBAAAAAZYFIAAAAAGXBSAAAAABmAUgAAAAAZkFAQAAAAGaBQEAAAABmwVAAAAAAQIAAAARACA8AADQDgAgAwAAAA8AIDwAANAOACA9AADUDgAgGwAAAA8AIAUAAIgNACAJAADgCwAgCwAA4QsAIA0AAOMLACAQAADkCwAgFgAA5QsAIDUAANQOACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACHABAEA4AgAIcUEAQDgCAAhygQAAN4LlgUi2gQBAIEJACHjBAEA4AgAIYIFEADdCwAhgwUQAN0LACGSBQEAgQkAIZMFAQDgCAAhlAUBAOAIACGWBSAAhQkAIZcFIACFCQAhmAUgAIUJACGZBQEAgQkAIZoFAQCBCQAhmwVAAIIJACEZBQAAiA0AIAkAAOALACALAADhCwAgDQAA4wsAIBAAAOQLACAWAADlCwAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhwAQBAOAIACHFBAEA4AgAIcoEAADeC5YFItoEAQCBCQAh4wQBAOAIACGCBRAA3QsAIYMFEADdCwAhkgUBAIEJACGTBQEA4AgAIZQFAQDgCAAhlgUgAIUJACGXBSAAhQkAIZgFIACFCQAhmQUBAIEJACGaBQEAgQkAIZsFQACCCQAhGQEAAKcNACAOAAC_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_gQBAAAAAf8EAQAAAAGABQEAAAABgQUBAAAAAYIFEAAAAAGDBRAAAAABhAUCAAAAAYUFAgAAAAGGBQIAAAABHB4AALALACAgAACxCwAgJwAArAsAICgAAK0LACApAACuCwAgKgAArwsAICwAALMLACAtAAC0CwAgLgAAtQsAIC8AALYLACCrBAEAAAABrgRAAAAAAa8EQAAAAAG_BAEAAAABwAQBAAAAAcEEAQAAAAHCBAEAAAABwwRAAAAAAcQEAQAAAAHFBAEAAAABxgQBAAAAAcgEAAAAyAQCygQAAADKBALLBEAAAAABzARAAAAAAc0EQAAAAAHOBCAAAAABzwQCAAAAAQIAAACVBgAgPAAA7A4AIAMAAABsACA8AADsDgAgPQAA8A4AIB4AAABsACAeAACLCQAgIAAAjAkAICcAAIcJACAoAACICQAgKQAAiQkAICoAAIoJACAsAACOCQAgLQAAjwkAIC4AAJAJACAvAACRCQAgNQAA8A4AIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIb8EAQDgCAAhwAQBAOAIACHBBAEAgQkAIcIEAQCBCQAhwwRAAIIJACHEBAEAgQkAIcUEAQCBCQAhxgQBAIEJACHIBAAAgwnIBCLKBAAAhAnKBCLLBEAAggkAIcwEQACCCQAhzQRAAIIJACHOBCAAhQkAIc8EAgCGCQAhHB4AAIsJACAgAACMCQAgJwAAhwkAICgAAIgJACApAACJCQAgKgAAigkAICwAAI4JACAtAACPCQAgLgAAkAkAIC8AAJEJACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACG_BAEA4AgAIcAEAQDgCAAhwQQBAIEJACHCBAEAgQkAIcMEQACCCQAhxAQBAIEJACHFBAEAgQkAIcYEAQCBCQAhyAQAAIMJyAQiygQAAIQJygQiywRAAIIJACHMBEAAggkAIc0EQACCCQAhzgQgAIUJACHPBAIAhgkAIQqrBAEAAAABrgRAAAAAAa8EQAAAAAG7BAEAAAABygQAAACNBQKIBQIAAAABiQUBAAAAAYoFAQAAAAGLBSAAAAABjQUCAAAAAQSrBAEAAAABrAQBAAAAAa4EQAAAAAGvBEAAAAABExEAALkJACASAAC9CQAgEwAAugkAIKsEAQAAAAGuBEAAAAABrwRAAAAAAcAEAQAAAAHFBAEAAAABxgQBAAAAAcoEAAAA5gUCzgQgAAAAAeMEAQAAAAGTBQEAAAABlgUgAAAAAZkFAQAAAAGaBQEAAAAB0QUCAAAAAeMFAQAAAAHkBQEAAAABAgAAADIAIDwAAPMOACADAAAALwAgPAAA8w4AID0AAPcOACAVAAAALwAgEQAAtwkAIBIAAJ4JACATAACfCQAgNQAA9w4AIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIcAEAQDgCAAhxQQBAIEJACHGBAEAgQkAIcoEAACcCeYFIs4EIACFCQAh4wQBAIEJACGTBQEAgQkAIZYFIACFCQAhmQUBAIEJACGaBQEAgQkAIdEFAgCGCQAh4wUBAOAIACHkBQEAgQkAIRMRAAC3CQAgEgAAngkAIBMAAJ8JACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACHABAEA4AgAIcUEAQCBCQAhxgQBAIEJACHKBAAAnAnmBSLOBCAAhQkAIeMEAQCBCQAhkwUBAIEJACGWBSAAhQkAIZkFAQCBCQAhmgUBAIEJACHRBQIAhgkAIeMFAQDgCAAh5AUBAIEJACECqwQBAAAAAeQEAQAAAAEDAAAAFQAgPAAA2w4AID0AAPsOACASAAAAFQAgNQAA-w4AIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIcAEAQDgCAAhygQAAPEN7AUi4wQBAIEJACGQBQEA4AgAIZMFAQDgCAAhlgUgAIUJACGZBQEAgQkAIZoFAQCBCQAh0QUCAOkJACHnBQEA4AgAIegFAQCBCQAh6QUBAIEJACHqBQEAgQkAIRCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACHABAEA4AgAIcoEAADxDewFIuMEAQCBCQAhkAUBAOAIACGTBQEA4AgAIZYFIACFCQAhmQUBAIEJACGaBQEAgQkAIdEFAgDpCQAh5wUBAOAIACHoBQEAgQkAIekFAQCBCQAh6gUBAIEJACESqwQBAAAAAa4EQAAAAAGvBEAAAAABwAQBAAAAAcUEAQAAAAHKBAAAAJYFAuMEAQAAAAGCBRAAAAABgwUQAAAAAZIFAQAAAAGTBQEAAAABlAUBAAAAAZYFIAAAAAGXBSAAAAABmAUgAAAAAZkFAQAAAAGaBQEAAAABmwVAAAAAAQcHAADeDAAgqwQBAAAAAa4EQAAAAAGvBEAAAAABwAQBAAAAAeMEAQAAAAHkBAEAAAABAgAAAM0FACA8AAD9DgAgAwAAAAkAIDwAAP0OACA9AACBDwAgCQAAAAkAIAcAANILACA1AACBDwAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhwAQBAOAIACHjBAEAgQkAIeQEAQCBCQAhBwcAANILACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACHABAEA4AgAIeMEAQCBCQAh5AQBAIEJACETCgAA9gwAICQAALsMACAmAAC9DAAgqwQBAAAAAa0EAQAAAAGuBEAAAAABrwRAAAAAAcUEAQAAAAHKBAAAAIgFAtsEAQAAAAH-BAEAAAAB_wQBAAAAAYAFAQAAAAGBBQEAAAABggUQAAAAAYMFEAAAAAGEBQIAAAABhQUCAAAAAYYFAgAAAAECAAAAHwAgPAAAgg8AIAMAAAAdACA8AACCDwAgPQAAhg8AIBUAAAAdACAKAAD1DAAgJAAAkQwAICYAAJMMACA1AACGDwAgqwQBAOAIACGtBAEA4AgAIa4EQADhCAAhrwRAAOEIACHFBAEA4AgAIcoEAACPDIgFItsEAQCBCQAh_gQBAOAIACH_BAEAgQkAIYAFAQCBCQAhgQUBAIEJACGCBRAA1QkAIYMFEADdCwAhhAUCAOkJACGFBQIA6QkAIYYFAgDpCQAhEwoAAPUMACAkAACRDAAgJgAAkwwAIKsEAQDgCAAhrQQBAOAIACGuBEAA4QgAIa8EQADhCAAhxQQBAOAIACHKBAAAjwyIBSLbBAEAgQkAIf4EAQDgCAAh_wQBAIEJACGABQEAgQkAIYEFAQCBCQAhggUQANUJACGDBRAA3QsAIYQFAgDpCQAhhQUCAOkJACGGBQIA6QkAIQWrBAEAAAABrgRAAAAAAa8EQAAAAAHWBAIAAAABowUBAAAAAQ-rBAEAAAABrgRAAAAAAa8EQAAAAAHABAEAAAABxAQBAAAAAasFAQAAAAGsBQEAAAABrQUBAAAAAa4FAQAAAAGvBQEAAAABsAUBAAAAAbEFAQAAAAH2BQAAAPYFAvcFIAAAAAH4BSAAAAABDBUAAADhBQKrBAEAAAABrgRAAAAAAa8EQAAAAAG_BAEAAAABwAQBAAAAAcQEAQAAAAHKBAAAAOIFArwFAQAAAAG_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_CgAgGQAAugoAIBsAALsKACAeAAC8CgAgHwAAvgoAICAAAMAKACCrBAEAAAABrgRAAAAAAa8EQAAAAAG7BAEAAAABygQAAAC3BQKpBRAAAAABsgUBAAAAAbMFAQAAAAG0BQEAAAABtQUBAAAAAbcFEAAAAAG4BRAAAAABuQUQAAAAAboFEAAAAAG7BQEAAAABvAUBAAAAAb0FQAAAAAG-BUAAAAABAgAAAHYAIDwAAJgPACADAAAAQgAgPAAAmA8AID0AAJwPACAbAAAAQgAgAQAApg0AIA4AANwJACAZAADXCQAgGwAA2AkAIB4AANkJACAfAADbCQAgIAAA3QkAIDUAAJwPACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACG7BAEA4AgAIcoEAADUCbcFIqkFEADVCQAhsgUBAOAIACGzBQEA4AgAIbQFAQDgCAAhtQUBAOAIACG3BRAA1QkAIbgFEADVCQAhuQUQANUJACG6BRAA1QkAIbsFAQCBCQAhvAUBAIEJACG9BUAAggkAIb4FQACCCQAhGQEAAKYNACAOAADcCQAgGQAA1wkAIBsAANgJACAeAADZCQAgHwAA2wkAICAAAN0JACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACG7BAEA4AgAIcoEAADUCbcFIqkFEADVCQAhsgUBAOAIACGzBQEA4AgAIbQFAQDgCAAhtQUBAOAIACG3BRAA1QkAIbgFEADVCQAhuQUQANUJACG6BRAA1QkAIbsFAQCBCQAhvAUBAIEJACG9BUAAggkAIb4FQACCCQAhHCAAALELACAnAACsCwAgKAAArQsAICkAAK4LACAqAACvCwAgKwAAsgsAICwAALMLACAtAAC0CwAgLgAAtQsAIC8AALYLACCrBAEAAAABrgRAAAAAAa8EQAAAAAG_BAEAAAABwAQBAAAAAcEEAQAAAAHCBAEAAAABwwRAAAAAAcQEAQAAAAHFBAEAAAABxgQBAAAAAcgEAAAAyAQCygQAAADKBALLBEAAAAABzARAAAAAAc0EQAAAAAHOBCAAAAABzwQCAAAAAQIAAACVBgAgPAAAnQ8AIBGrBAEAAAABrgRAAAAAAa8EQAAAAAHABAEAAAABygQAAADfBQLVBAAAANcFAuMEAQAAAAHmBBAAAAABoQVAAAAAAdUFAQAAAAHXBRAAAAAB2AUQAAAAAdkFAgAAAAHaBQIAAAAB2wUCAAAAAdwFQAAAAAHdBSAAAAABAgAAAMACACA8AACfDwAgAwAAAGwAIDwAAJ0PACA9AACjDwAgHgAAAGwAICAAAIwJACAnAACHCQAgKAAAiAkAICkAAIkJACAqAACKCQAgKwAAjQkAICwAAI4JACAtAACPCQAgLgAAkAkAIC8AAJEJACA1AACjDwAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhvwQBAOAIACHABAEA4AgAIcEEAQCBCQAhwgQBAIEJACHDBEAAggkAIcQEAQCBCQAhxQQBAIEJACHGBAEAgQkAIcgEAACDCcgEIsoEAACECcoEIssEQACCCQAhzARAAIIJACHNBEAAggkAIc4EIACFCQAhzwQCAIYJACEcIAAAjAkAICcAAIcJACAoAACICQAgKQAAiQkAICoAAIoJACArAACNCQAgLAAAjgkAIC0AAI8JACAuAACQCQAgLwAAkQkAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIb8EAQDgCAAhwAQBAOAIACHBBAEAgQkAIcIEAQCBCQAhwwRAAIIJACHEBAEAgQkAIcUEAQCBCQAhxgQBAIEJACHIBAAAgwnIBCLKBAAAhAnKBCLLBEAAggkAIcwEQACCCQAhzQRAAIIJACHOBCAAhQkAIc8EAgCGCQAhAwAAAMMCACA8AACfDwAgPQAApg8AIBMAAADDAgAgNQAApg8AIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIcAEAQDgCAAhygQAAMYN3wUi1QQAAMUN1wUi4wQBAIEJACHmBBAA1QkAIaEFQACCCQAh1QUBAOAIACHXBRAA3QsAIdgFEADdCwAh2QUCAIYJACHaBQIAhgkAIdsFAgCGCQAh3AVAAIIJACHdBSAAhQkAIRGrBAEA4AgAIa4EQADhCAAhrwRAAOEIACHABAEA4AgAIcoEAADGDd8FItUEAADFDdcFIuMEAQCBCQAh5gQQANUJACGhBUAAggkAIdUFAQDgCAAh1wUQAN0LACHYBRAA3QsAIdkFAgCGCQAh2gUCAIYJACHbBQIAhgkAIdwFQACCCQAh3QUgAIUJACELGAAAkA0AIKsEAQAAAAGuBEAAAAABrwRAAAAAAcoEAAAAnwUC0QQBAAAAAeMEAQAAAAH2BBAAAAAB9wQBAAAAAZ0FAAAAnQUCnwWAAAAAAQIAAACQBAAgPAAApw8AIAMAAABEACA8AACnDwAgPQAAqw8AIA0AAABEACAYAACPDQAgNQAAqw8AIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIcoEAACvCp8FItEEAQDgCAAh4wQBAIEJACH2BBAA1QkAIfcEAQDgCAAhnQUAAK4KnQUinwWAAAAAAQsYAACPDQAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhygQAAK8KnwUi0QQBAOAIACHjBAEAgQkAIfYEEADVCQAh9wQBAOAIACGdBQAArgqdBSKfBYAAAAABEwoAAPYMACAkAAC7DAAgJQAAvAwAIKsEAQAAAAGtBAEAAAABrgRAAAAAAa8EQAAAAAHFBAEAAAABygQAAACIBQLbBAEAAAAB_gQBAAAAAf8EAQAAAAGABQEAAAABgQUBAAAAAYIFEAAAAAGDBRAAAAABhAUCAAAAAYUFAgAAAAGGBQIAAAABAgAAAB8AIDwAAKwPACAZAQAApw0AIA4AAL8KACAZAAC6CgAgGgAAvQoAIBsAALsKACAeAAC8CgAgHwAAvgoAIKsEAQAAAAGuBEAAAAABrwRAAAAAAbsEAQAAAAHKBAAAALcFAqkFEAAAAAGyBQEAAAABswUBAAAAAbQFAQAAAAG1BQEAAAABtwUQAAAAAbgFEAAAAAG5BRAAAAABugUQAAAAAbsFAQAAAAG8BQEAAAABvQVAAAAAAb4FQAAAAAECAAAAdgAgPAAArg8AIAMAAABCACA8AACuDwAgPQAAsg8AIBsAAABCACABAACmDQAgDgAA3AkAIBkAANcJACAaAADaCQAgGwAA2AkAIB4AANkJACAfAADbCQAgNQAAsg8AIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIbsEAQDgCAAhygQAANQJtwUiqQUQANUJACGyBQEA4AgAIbMFAQDgCAAhtAUBAOAIACG1BQEA4AgAIbcFEADVCQAhuAUQANUJACG5BRAA1QkAIboFEADVCQAhuwUBAIEJACG8BQEAgQkAIb0FQACCCQAhvgVAAIIJACEZAQAApg0AIA4AANwJACAZAADXCQAgGgAA2gkAIBsAANgJACAeAADZCQAgHwAA2wkAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIbsEAQDgCAAhygQAANQJtwUiqQUQANUJACGyBQEA4AgAIbMFAQDgCAAhtAUBAOAIACG1BQEA4AgAIbcFEADVCQAhuAUQANUJACG5BRAA1QkAIboFEADVCQAhuwUBAIEJACG8BQEAgQkAIb0FQACCCQAhvgVAAIIJACELqwQBAAAAAa4EQAAAAAGvBEAAAAAB0AQBAAAAAdEEAQAAAAHTBAEAAAAB1QQAAADVBALWBAIAAAAB1wQCAAAAAdgEAgAAAAHZBAEAAAABAwAAAB0AIDwAAKwPACA9AAC2DwAgFQAAAB0AIAoAAPUMACAkAACRDAAgJQAAkgwAIDUAALYPACCrBAEA4AgAIa0EAQDgCAAhrgRAAOEIACGvBEAA4QgAIcUEAQDgCAAhygQAAI8MiAUi2wQBAIEJACH-BAEA4AgAIf8EAQCBCQAhgAUBAIEJACGBBQEAgQkAIYIFEADVCQAhgwUQAN0LACGEBQIA6QkAIYUFAgDpCQAhhgUCAOkJACETCgAA9QwAICQAAJEMACAlAACSDAAgqwQBAOAIACGtBAEA4AgAIa4EQADhCAAhrwRAAOEIACHFBAEA4AgAIcoEAACPDIgFItsEAQCBCQAh_gQBAOAIACH_BAEAgQkAIYAFAQCBCQAhgQUBAIEJACGCBRAA1QkAIYMFEADdCwAhhAUCAOkJACGFBQIA6QkAIYYFAgDpCQAhDy8BAAAAAasEAQAAAAGuBEAAAAABrwRAAAAAAdYEAgAAAAHjBAEAAAAB_gQBAAAAAaMFAQAAAAGkBQEAAAABpQUBAAAAAaYFAQAAAAGnBQEAAAABqAUQAAAAAakFEAAAAAGqBRAAAAABHB4AALALACAnAACsCwAgKAAArQsAICkAAK4LACAqAACvCwAgKwAAsgsAICwAALMLACAtAAC0CwAgLgAAtQsAIC8AALYLACCrBAEAAAABrgRAAAAAAa8EQAAAAAG_BAEAAAABwAQBAAAAAcEEAQAAAAHCBAEAAAABwwRAAAAAAcQEAQAAAAHFBAEAAAABxgQBAAAAAcgEAAAAyAQCygQAAADKBALLBEAAAAABzARAAAAAAc0EQAAAAAHOBCAAAAABzwQCAAAAAQIAAACVBgAgPAAAuA8AIBIMAACLCgAgGAAAngwAIC8BAAAAAasEAQAAAAGuBEAAAAABrwRAAAAAAdEEAQAAAAHWBAIAAAAB4wQBAAAAAf4EAQAAAAGjBQEAAAABpAUBAAAAAaUFAQAAAAGmBQEAAAABpwUBAAAAAagFEAAAAAGpBRAAAAABqgUQAAAAAQIAAABVACA8AAC6DwAgCAwAALMNACCrBAEAAAABrgRAAAAAAa8EQAAAAAGjBQEAAAABzAUCAAAAAc0FAgAAAAHOBQIAAAABAgAAAIgDACA8AAC8DwAgAwAAAGwAIDwAALgPACA9AADADwAgHgAAAGwAIB4AAIsJACAnAACHCQAgKAAAiAkAICkAAIkJACAqAACKCQAgKwAAjQkAICwAAI4JACAtAACPCQAgLgAAkAkAIC8AAJEJACA1AADADwAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhvwQBAOAIACHABAEA4AgAIcEEAQCBCQAhwgQBAIEJACHDBEAAggkAIcQEAQCBCQAhxQQBAIEJACHGBAEAgQkAIcgEAACDCcgEIsoEAACECcoEIssEQACCCQAhzARAAIIJACHNBEAAggkAIc4EIACFCQAhzwQCAIYJACEcHgAAiwkAICcAAIcJACAoAACICQAgKQAAiQkAICoAAIoJACArAACNCQAgLAAAjgkAIC0AAI8JACAuAACQCQAgLwAAkQkAIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIb8EAQDgCAAhwAQBAOAIACHBBAEAgQkAIcIEAQCBCQAhwwRAAIIJACHEBAEAgQkAIcUEAQCBCQAhxgQBAIEJACHIBAAAgwnIBCLKBAAAhAnKBCLLBEAAggkAIcwEQACCCQAhzQRAAIIJACHOBCAAhQkAIc8EAgCGCQAhAwAAAFMAIDwAALoPACA9AADDDwAgFAAAAFMAIAwAAP0JACAYAACcDAAgLwEA4AgAITUAAMMPACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACHRBAEA4AgAIdYEAgDpCQAh4wQBAIEJACH-BAEA4AgAIaMFAQDgCAAhpAUBAOAIACGlBQEA4AgAIaYFAQDgCAAhpwUBAOAIACGoBRAA1QkAIakFEADVCQAhqgUQANUJACESDAAA_QkAIBgAAJwMACAvAQDgCAAhqwQBAOAIACGuBEAA4QgAIa8EQADhCAAh0QQBAOAIACHWBAIA6QkAIeMEAQCBCQAh_gQBAOAIACGjBQEA4AgAIaQFAQDgCAAhpQUBAOAIACGmBQEA4AgAIacFAQDgCAAhqAUQANUJACGpBRAA1QkAIaoFEADVCQAhAwAAADwAIDwAALwPACA9AADGDwAgCgAAADwAIAwAALINACA1AADGDwAgqwQBAOAIACGuBEAA4QgAIa8EQADhCAAhowUBAOAIACHMBQIA6QkAIc0FAgDpCQAhzgUCAOkJACEIDAAAsg0AIKsEAQDgCAAhrgRAAOEIACGvBEAA4QgAIaMFAQDgCAAhzAUCAOkJACHNBQIA6QkAIc4FAgDpCQAhC6sEAQAAAAGuBEAAAAABrwRAAAAAAdAEAQAAAAHSBAEAAAAB0wQBAAAAAdUEAAAA1QQC1gQCAAAAAdcEAgAAAAHYBAIAAAAB2QQBAAAAARGrBAEAAAABrgRAAAAAAa8EQAAAAAHKBAAAALcFAqkFEAAAAAGyBQEAAAABswUBAAAAAbQFAQAAAAG1BQEAAAABtwUQAAAAAbgFEAAAAAG5BRAAAAABugUQAAAAAbsFAQAAAAG8BQEAAAABvQVAAAAAAb4FQAAAAAEFqwQBAAAAAa4EQAAAAAGgBQEAAAABoQVAAAAAAaIFQAAAAAETEQAAuQkAIBIAAL0JACAUAAC7CQAgqwQBAAAAAa4EQAAAAAGvBEAAAAABwAQBAAAAAcUEAQAAAAHGBAEAAAABygQAAADmBQLOBCAAAAAB4wQBAAAAAZMFAQAAAAGWBSAAAAABmQUBAAAAAZoFAQAAAAHRBQIAAAAB4wUBAAAAAeQFAQAAAAECAAAAMgAgPAAAyg8AIBweAACwCwAgIAAAsQsAICcAAKwLACAoAACtCwAgKQAArgsAICoAAK8LACArAACyCwAgLAAAswsAIC0AALQLACAuAAC1CwAgqwQBAAAAAa4EQAAAAAGvBEAAAAABvwQBAAAAAcAEAQAAAAHBBAEAAAABwgQBAAAAAcMEQAAAAAHEBAEAAAABxQQBAAAAAcYEAQAAAAHIBAAAAMgEAsoEAAAAygQCywRAAAAAAcwEQAAAAAHNBEAAAAABzgQgAAAAAc8EAgAAAAECAAAAlQYAIDwAAMwPACADAAAAbAAgPAAAzA8AID0AANAPACAeAAAAbAAgHgAAiwkAICAAAIwJACAnAACHCQAgKAAAiAkAICkAAIkJACAqAACKCQAgKwAAjQkAICwAAI4JACAtAACPCQAgLgAAkAkAIDUAANAPACCrBAEA4AgAIa4EQADhCAAhrwRAAOEIACG_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_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-gFCAPsBQwD8AQAAAAMIAPoBQgD7AUMA_AEAAAMIAIECQgCCAkMAgwIAAAADCACBAkIAggJDAIMCAQUABwEFAAcFCACIAkIAiwJDAIwCVACJAlUAigIAAAAAAAUIAIgCQgCLAkMAjAJUAIkCVQCKAgQXABUYhQYXIYYGHyIAAgQXABUYjAYXIY0GHyIAAgUIAJECQgCUAkMAlQJUAJICVQCTAgAAAAAABQgAkQJCAJQCQwCVAlQAkgJVAJMCAAAFCACaAkIAnQJDAJ4CVACbAlUAnAIAAAAAAAUIAJoCQgCdAkMAngJUAJsCVQCcAgEBAAIBAQACAwgAowJCAKQCQwClAgAAAAMIAKMCQgCkAkMApQICCgAGDwAPAgoABg8ADwMIAKoCQgCrAkMArAIAAAADCACqAkIAqwJDAKwCMAIBMYYBATKHAQEziAEBNIkBATaLAQE3jQEpOI4BKjmQAQE6kgEpO5MBKz6UAQE_lQEBQJYBKUSZASxFmgEwRpwBMUedATFIoAExSaEBMUqiATFLpAExTKYBKU2nATJOqQExT6sBKVCsATNRrQExUq4BMVOvASlWsgE0V7MBOli1AQpZtgEKWrgBClu5AQpcugEKXbwBCl6-ASlfvwE7YMEBCmHDASlixAE8Y8UBCmTGAQplxwEpZsoBPWfLAUNozQEDac4BA2rQAQNr0QEDbNIBA23UAQNu1gEpb9cBRHDZAQNx2wEpctwBRXPdAQN03gEDdd8BKXbiAUZ34wFMeOQBBHnlAQR65gEEe-cBBHzoAQR96gEEfuwBKX_tAU2AAe8BBIEB8QEpggHyAU6DAfMBBIQB9AEEhQH1ASmGAfgBT4cB-QFViAH6ARKJAfsBEooB_AESiwH9ARKMAf4BEo0BgAISjgGCAimPAYMCVpABhgISkQGIAimSAYkCV5MBiwISlAGMAhKVAY0CKZYBkAJYlwGRAl6YAZICEZkBkwIRmgGUAhGbAZUCEZwBlgIRnQGYAhGeAZoCKZ8BmwJfoAGdAhGhAZ8CKaIBoAJgowGhAhGkAaICEaUBowIppgGmAmGnAacCZagBqAIlqQGpAiWqAaoCJasBqwIlrAGsAiWtAa4CJa4BsAIprwGxAmawAbQCJbEBtgIpsgG3AmezAbkCJbQBugIltQG7Aim2Ab4CaLcBvwJsuAHBAhy5AcICHLoBxQIcuwHGAhy8AccCHL0ByQIcvgHLAim_AcwCbcABzgIcwQHQAinCAdECbsMB0gIcxAHTAhzFAdQCKcYB1wJvxwHYAnXIAdkCG8kB2gIbygHbAhvLAdwCG8wB3QIbzQHfAhvOAeECKc8B4gJ20AHkAhvRAeYCKdIB5wJ30wHoAhvUAekCG9UB6gIp1gHtAnjXAe4CftgB8AJ_2QHxAn_aAfQCf9sB9QJ_3AH2An_dAfgCf94B-gIp3wH7AoAB4AH9An_hAf8CKeIBgAOBAeMBgQN_5AGCA3_lAYMDKeYBhgOCAecBhwOIAegBiQMV6QGKAxXqAYwDFesBjQMV7AGOAxXtAZADFe4BkgMp7wGTA4kB8AGVAxXxAZcDKfIBmAOKAfMBmQMV9AGaAxX1AZsDKfYBngOLAfcBnwORAfgBoAMm-QGhAyb6AaIDJvsBowMm_AGkAyb9AaYDJv4BqAMp_wGpA5IBgAKrAyaBAq0DKYICrgOTAYMCrwMmhAKwAyaFArEDKYYCtAOUAYcCtQOYAYgCtgMXiQK3AxeKArgDF4sCuQMXjAK6AxeNArwDF44CvgMpjwK_A5kBkALBAxeRAsMDKZICxAOaAZMCxQMXlALGAxeVAscDKZYCygObAZcCywOhAZgCzQMemQLOAx6aAtADHpsC0QMenALSAx6dAtQDHp4C1gMpnwLXA6IBoALZAx6hAtsDKaIC3AOjAaMC3QMepALeAx6lAt8DKaYC4gOkAacC4wOoAagC5AMfqQLlAx-qAuYDH6sC5wMfrALoAx-tAuoDH64C7AMprwLtA6kBsALvAx-xAvEDKbIC8gOqAbMC8wMftAL0Ax-1AvUDKbYC-AOrAbcC-QOxAbgC-gMnuQL7Aye6AvwDJ7sC_QMnvAL-Aye9AoAEJ74CggQpvwKDBLIBwAKFBCfBAocEKcICiASzAcMCiQQnxAKKBCfFAosEKcYCjgS0AccCjwS4AcgCkQQYyQKSBBjKApQEGMsClQQYzAKWBBjNApgEGM4CmgQpzwKbBLkB0AKdBBjRAp8EKdICoAS6AdMCoQQY1AKiBBjVAqMEKdYCpgS7AdcCpwTBAdgCqAQG2QKpBAbaAqoEBtsCqwQG3AKsBAbdAq4EBt4CsAQp3wKxBMIB4AK1BAbhArcEKeICuATDAeMCuwQG5AK8BAblAr0EKeYCwATEAecCwQTKAegCwgQM6QLDBAzqAsQEDOsCxQQM7ALGBAztAsgEDO4CygQp7wLLBMsB8ALNBAzxAs8EKfIC0ATMAfMC0QQM9ALSBAz1AtMEKfYC1gTNAfcC1wTTAfgC2AQN-QLZBA36AtoEDfsC2wQN_ALcBA39At4EDf4C4AQp_wLhBNQBgAPjBA2BA-UEKYID5gTVAYMD5wQNhAPoBA2FA-kEKYYD7ATWAYcD7QTcAYgD7gQFiQPvBAWKA_AEBYsD8QQFjAPyBAWNA_QEBY4D9gQpjwP3BN0BkAP5BAWRA_sEKZID_ATeAZMD_QQFlAP-BAWVA_8EKZYDggXfAZcDgwXlAZgDhQUZmQOGBRmaA4gFGZsDiQUZnAOKBRmdA4wFGZ4DjgUpnwOPBeYBoAORBRmhA5MFKaIDlAXnAaMDlQUZpAOWBRmlA5cFKaYDmgXoAacDmwXuAagDnQUaqQOeBRqqA6AFGqsDoQUarAOiBRqtA6QFGq4DpgUprwOnBe8BsAOpBRqxA6sFKbIDrAXwAbMDrQUatAOuBRq1A68FKbYDsgXxAbcDswX1AbgDtQX2AbkDtgX2AboDuQX2AbsDugX2AbwDuwX2Ab0DvQX2Ab4DvwUpvwPABfcBwAPCBfYBwQPEBSnCA8UF-AHDA8YF9gHEA8cF9gHFA8gFKcYDywX5AccDzAX9AcgDzgUHyQPPBQfKA9EFB8sD0gUHzAPTBQfNA9UFB84D1wUpzwPYBf4B0APaBQfRA9wFKdID3QX_AdMD3gUH1APfBQfVA-AFKdYD4wWAAtcD5AWEAtgD5QUI2QPmBQjaA-cFCNsD6AUI3APpBQjdA-sFCN4D7QUp3wPuBYUC4APwBQjhA_IFKeID8wWGAuMD9AUI5AP1BQjlA_YFKeYD-QWHAucD-gWNAugD-wUW6QP8BRbqA_0FFusD_gUW7AP_BRbtA4EGFu4DgwYp7wOEBo4C8AOIBhbxA4oGKfIDiwaPAvMDjgYW9AOPBhb1A5AGKfYDkwaQAvcDlAaWAvgDlgYC-QOXBgL6A5kGAvsDmgYC_AObBgL9A50GAv4DnwYp_wOgBpcCgASiBgKBBKQGKYIEpQaYAoMEpgYChASnBgKFBKgGKYYEqwaZAocErAafAogErgYPiQSvBg-KBLEGD4sEsgYPjASzBg-NBLUGD44EtwYpjwS4BqACkAS6Bg-RBLwGKZIEvQahApMEvgYPlAS_Bg-VBMAGKZYEwwaiApcExAamApgExQYOmQTGBg6aBMcGDpsEyAYOnATJBg6dBMsGDp4EzQYpnwTOBqcCoATQBg6hBNIGKaIE0waoAqME1AYOpATVBg6lBNYGKaYE2QapAqcE2gatAg"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config2.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config2);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AddressesScalarFieldEnum: () => AddressesScalarFieldEnum,
  AnyNull: () => AnyNull2,
  BannersScalarFieldEnum: () => BannersScalarFieldEnum,
  BrandsScalarFieldEnum: () => BrandsScalarFieldEnum,
  CartItemsScalarFieldEnum: () => CartItemsScalarFieldEnum,
  CartsScalarFieldEnum: () => CartsScalarFieldEnum,
  CategoriesScalarFieldEnum: () => CategoriesScalarFieldEnum,
  CategoryProductsScalarFieldEnum: () => CategoryProductsScalarFieldEnum,
  ContactMessagesScalarFieldEnum: () => ContactMessagesScalarFieldEnum,
  CouponUsagesScalarFieldEnum: () => CouponUsagesScalarFieldEnum,
  CouponsScalarFieldEnum: () => CouponsScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  FaqsScalarFieldEnum: () => FaqsScalarFieldEnum,
  InventoriesScalarFieldEnum: () => InventoriesScalarFieldEnum,
  JsonNull: () => JsonNull2,
  JsonNullValueFilter: () => JsonNullValueFilter,
  JsonNullValueInput: () => JsonNullValueInput,
  ModelName: () => ModelName,
  NotificationsScalarFieldEnum: () => NotificationsScalarFieldEnum,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  OrderAddressesScalarFieldEnum: () => OrderAddressesScalarFieldEnum,
  OrderItemsScalarFieldEnum: () => OrderItemsScalarFieldEnum,
  OrdersScalarFieldEnum: () => OrdersScalarFieldEnum,
  PasswordResetScalarFieldEnum: () => PasswordResetScalarFieldEnum,
  PaymentsScalarFieldEnum: () => PaymentsScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  ProductImagesScalarFieldEnum: () => ProductImagesScalarFieldEnum,
  ProductReviewsScalarFieldEnum: () => ProductReviewsScalarFieldEnum,
  ProductVariantsScalarFieldEnum: () => ProductVariantsScalarFieldEnum,
  ProductsScalarFieldEnum: () => ProductsScalarFieldEnum,
  QueryMode: () => QueryMode,
  RefundsScalarFieldEnum: () => RefundsScalarFieldEnum,
  ShippingsScalarFieldEnum: () => ShippingsScalarFieldEnum,
  SiteSettingsScalarFieldEnum: () => SiteSettingsScalarFieldEnum,
  SizeChartMeasurementsScalarFieldEnum: () => SizeChartMeasurementsScalarFieldEnum,
  SizeChartsScalarFieldEnum: () => SizeChartsScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  StockManagementsScalarFieldEnum: () => StockManagementsScalarFieldEnum,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UsersScalarFieldEnum: () => UsersScalarFieldEnum,
  WishlistItemsScalarFieldEnum: () => WishlistItemsScalarFieldEnum,
  WishlistsScalarFieldEnum: () => WishlistsScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.10.1",
  engine: "d1b3f377ca835d73fd50954a5e22128b9ebdd6b8"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Addresses: "Addresses",
  Banners: "Banners",
  Brands: "Brands",
  Carts: "Carts",
  CartItems: "CartItems",
  Categories: "Categories",
  CategoryProducts: "CategoryProducts",
  ContactMessages: "ContactMessages",
  Coupons: "Coupons",
  CouponUsages: "CouponUsages",
  Faqs: "Faqs",
  Inventories: "Inventories",
  Notifications: "Notifications",
  Orders: "Orders",
  OrderAddresses: "OrderAddresses",
  OrderItems: "OrderItems",
  PasswordReset: "PasswordReset",
  Payments: "Payments",
  Products: "Products",
  ProductImages: "ProductImages",
  ProductReviews: "ProductReviews",
  ProductVariants: "ProductVariants",
  Refunds: "Refunds",
  Shippings: "Shippings",
  SiteSettings: "SiteSettings",
  SizeCharts: "SizeCharts",
  SizeChartMeasurements: "SizeChartMeasurements",
  StockManagements: "StockManagements",
  Users: "Users",
  Wishlists: "Wishlists",
  WishlistItems: "WishlistItems"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var AddressesScalarFieldEnum = {
  id: "id",
  userId: "userId",
  name: "name",
  phone: "phone",
  addressType: "addressType",
  addressLine: "addressLine",
  city: "city",
  district: "district",
  postalCode: "postalCode",
  country: "country",
  landmark: "landmark",
  deliveryInstructions: "deliveryInstructions",
  isDefaultBilling: "isDefaultBilling",
  isDefaultShipping: "isDefaultShipping",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var BannersScalarFieldEnum = {
  id: "id",
  title: "title",
  subtitle: "subtitle",
  description: "description",
  image: "image",
  mobileImage: "mobileImage",
  buttonText: "buttonText",
  buttonLink: "buttonLink",
  position: "position",
  startsAt: "startsAt",
  endsAt: "endsAt",
  displayOrder: "displayOrder",
  status: "status",
  altText: "altText",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var BrandsScalarFieldEnum = {
  id: "id",
  name: "name",
  slug: "slug",
  description: "description",
  logo: "logo",
  logoPublicId: "logoPublicId",
  banner: "banner",
  bannerPublicId: "bannerPublicId",
  website: "website",
  isFeatured: "isFeatured",
  displayOrder: "displayOrder",
  metaTitle: "metaTitle",
  metaDescription: "metaDescription",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CartsScalarFieldEnum = {
  id: "id",
  userId: "userId",
  totalAmount: "totalAmount",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CartItemsScalarFieldEnum = {
  id: "id",
  cartId: "cartId",
  variantId: "variantId",
  quantity: "quantity",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoriesScalarFieldEnum = {
  id: "id",
  creatorId: "creatorId",
  name: "name",
  slug: "slug",
  description: "description",
  image: "image",
  imagePublicId: "imagePublicId",
  parentId: "parentId",
  isFeatured: "isFeatured",
  displayOrder: "displayOrder",
  metaTitle: "metaTitle",
  metaDescription: "metaDescription",
  isDeleted: "isDeleted",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryProductsScalarFieldEnum = {
  id: "id",
  productId: "productId",
  categoryId: "categoryId"
};
var ContactMessagesScalarFieldEnum = {
  id: "id",
  userId: "userId",
  name: "name",
  email: "email",
  phone: "phone",
  subject: "subject",
  message: "message",
  category: "category",
  status: "status",
  adminNote: "adminNote",
  repliedAt: "repliedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CouponsScalarFieldEnum = {
  id: "id",
  code: "code",
  name: "name",
  description: "description",
  type: "type",
  value: "value",
  maxDiscount: "maxDiscount",
  minOrderAmount: "minOrderAmount",
  usageLimit: "usageLimit",
  usagePerUser: "usagePerUser",
  usedCount: "usedCount",
  startsAt: "startsAt",
  expiresAt: "expiresAt",
  firstOrderOnly: "firstOrderOnly",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CouponUsagesScalarFieldEnum = {
  id: "id",
  couponId: "couponId",
  userId: "userId",
  orderId: "orderId",
  usedAt: "usedAt",
  couponCode: "couponCode",
  discountAmount: "discountAmount",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var FaqsScalarFieldEnum = {
  id: "id",
  question: "question",
  answer: "answer",
  category: "category",
  displayOrder: "displayOrder",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var InventoriesScalarFieldEnum = {
  id: "id",
  variantId: "variantId",
  quantityOnHand: "quantityOnHand",
  quantityReserved: "quantityReserved",
  reOrderLevel: "reOrderLevel",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var NotificationsScalarFieldEnum = {
  id: "id",
  userId: "userId",
  title: "title",
  message: "message",
  type: "type",
  priority: "priority",
  channel: "channel",
  accountUrl: "accountUrl",
  metaData: "metaData",
  isRead: "isRead",
  readAt: "readAt",
  sentAt: "sentAt",
  failedAt: "failedAt",
  failureReason: "failureReason",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrdersScalarFieldEnum = {
  id: "id",
  orderNumber: "orderNumber",
  userId: "userId",
  customerName: "customerName",
  customerEmail: "customerEmail",
  customerPhone: "customerPhone",
  status: "status",
  subtotal: "subtotal",
  discountAmount: "discountAmount",
  shippingCost: "shippingCost",
  taxAmount: "taxAmount",
  totalAmount: "totalAmount",
  customerNote: "customerNote",
  adminNote: "adminNote",
  confirmedAt: "confirmedAt",
  cancelledAt: "cancelledAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderAddressesScalarFieldEnum = {
  id: "id",
  orderId: "orderId",
  name: "name",
  phone: "phone",
  addressLine: "addressLine",
  city: "city",
  district: "district",
  postalCode: "postalCode",
  country: "country",
  landmark: "landmark",
  deliveryInstructions: "deliveryInstructions",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderItemsScalarFieldEnum = {
  id: "id",
  orderId: "orderId",
  variantId: "variantId",
  description: "description",
  categories: "categories",
  productName: "productName",
  productSlug: "productSlug",
  productImage: "productImage",
  sku: "sku",
  variantName: "variantName",
  quantity: "quantity",
  unitPrice: "unitPrice",
  discountAmount: "discountAmount",
  totalPrice: "totalPrice",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var PasswordResetScalarFieldEnum = {
  id: "id",
  userId: "userId",
  tokenHash: "tokenHash",
  expiresAt: "expiresAt",
  usedAt: "usedAt",
  createdAt: "createdAt"
};
var PaymentsScalarFieldEnum = {
  id: "id",
  orderId: "orderId",
  method: "method",
  status: "status",
  description: "description",
  amount: "amount",
  currency: "currency",
  gatewayInfo: "gatewayInfo",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ProductsScalarFieldEnum = {
  id: "id",
  brandId: "brandId",
  sizeChartId: "sizeChartId",
  name: "name",
  slug: "slug",
  shortDescription: "shortDescription",
  description: "description",
  price: "price",
  salePrice: "salePrice",
  image: "image",
  status: "status",
  isFeatured: "isFeatured",
  isNewArrival: "isNewArrival",
  isBestSeller: "isBestSeller",
  metaTitle: "metaTitle",
  metaDescription: "metaDescription",
  publishedAt: "publishedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ProductImagesScalarFieldEnum = {
  id: "id",
  productId: "productId",
  url: "url",
  alt: "alt",
  logo: "logo",
  isPrimary: "isPrimary",
  sortOrder: "sortOrder",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ProductReviewsScalarFieldEnum = {
  id: "id",
  productId: "productId",
  userId: "userId",
  rating: "rating",
  title: "title",
  comment: "comment",
  isVerifiedPurchase: "isVerifiedPurchase",
  status: "status",
  helpfulContent: "helpfulContent",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ProductVariantsScalarFieldEnum = {
  id: "id",
  productId: "productId",
  sku: "sku",
  barcode: "barcode",
  color: "color",
  size: "size",
  colorCode: "colorCode",
  price: "price",
  salePrice: "salePrice",
  stock: "stock",
  reservedStock: "reservedStock",
  lowStockThreshold: "lowStockThreshold",
  image: "image",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var RefundsScalarFieldEnum = {
  id: "id",
  orderId: "orderId",
  paymentId: "paymentId",
  refundNumber: "refundNumber",
  amount: "amount",
  currency: "currency",
  description: "description",
  status: "status",
  gatewayRefundId: "gatewayRefundId",
  transactionReference: "transactionReference",
  processedBy: "processedBy",
  processedAt: "processedAt",
  completedAt: "completedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ShippingsScalarFieldEnum = {
  id: "id",
  orderId: "orderId",
  courierName: "courierName",
  courierService: "courierService",
  trackingNumber: "trackingNumber",
  consignmentId: "consignmentId",
  status: "status",
  estimatedDelivery: "estimatedDelivery",
  shippingAt: "shippingAt",
  deliveredAt: "deliveredAt",
  trackingUrl: "trackingUrl",
  deliveryNote: "deliveryNote",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SiteSettingsScalarFieldEnum = {
  id: "id",
  key: "key",
  value: "value",
  group: "group",
  label: "label",
  description: "description",
  isPublic: "isPublic",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SizeChartsScalarFieldEnum = {
  id: "id",
  name: "name",
  description: "description",
  categoryId: "categoryId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SizeChartMeasurementsScalarFieldEnum = {
  id: "id",
  sizeChartId: "sizeChartId",
  size: "size",
  measurements: "measurements",
  sortOrder: "sortOrder"
};
var StockManagementsScalarFieldEnum = {
  id: "id",
  inventoryId: "inventoryId",
  orderId: "orderId",
  orderItemId: "orderItemId",
  performedById: "performedById",
  type: "type",
  quantity: "quantity",
  stockBefore: "stockBefore",
  stockAfter: "stockAfter",
  note: "note",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var UsersScalarFieldEnum = {
  id: "id",
  email: "email",
  name: "name",
  password: "password",
  googleId: "googleId",
  dateOfBirth: "dateOfBirth",
  phone: "phone",
  image: "image",
  imagePublicId: "imagePublicId",
  role: "role",
  status: "status",
  emailVerifiedAt: "emailVerifiedAt",
  phoneVerifiedAt: "phoneVerifiedAt",
  lastLoggedInAt: "lastLoggedInAt",
  isDeleted: "isDeleted",
  tokenVersion: "tokenVersion",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var WishlistsScalarFieldEnum = {
  id: "id",
  userId: "userId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var WishlistItemsScalarFieldEnum = {
  id: "id",
  wishlistId: "wishlistId",
  productId: "productId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var JsonNullValueInput = {
  JsonNull: JsonNull2
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var JsonNullValueFilter = {
  DbNull: DbNull2,
  JsonNull: JsonNull2,
  AnyNull: AnyNull2
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path2.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/auth/auth.service.ts
import crypto from "crypto";
import "jsonwebtoken";

// src/errors/appError.ts
var AppError = class extends Error {
  statusCode;
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
};
var appError_default = AppError;

// src/modules/auth/auth.service.ts
import httpStatus from "http-status";

// src/lib/google.ts
import { OAuth2Client } from "google-auth-library";
var googleClient = new OAuth2Client(config.google_client_id);

// src/lib/nodeMailer.ts
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "arifulislamofficial26@gmail.com",
    pass: config.smtp_pass
  }
});
var sendForgetPasswordEmail = async (receiverEmail, subject, receiverName, resetPasswordLink) => {
  try {
    const info = await transporter.sendMail({
      from: "arifulislamofficial26@gmail.com",
      to: receiverEmail,
      subject,
      html: `
<div style="margin:0; padding:30px 15px; background-color:#f4f6f8; font-family:Arial,Helvetica,sans-serif;">

  <div style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:8px; overflow:hidden;">

    <!-- Header -->
    <div style="padding:25px 30px; text-align:center; background-color:#111827;">
      <h1 style="margin:0; color:#ffffff; font-size:25px; font-weight:700; letter-spacing:1px;">
        Chaity E-commerce
      </h1>
      <p style="margin:8px 0 0; color:#d1d5db; font-size:12px;">
        Your Shopping Destination
      </p>
    </div>

    <!-- Main Content -->
    <div style="padding:35px 30px;">

      <h2 style="margin:0 0 20px; color:#111827; font-size:23px; font-weight:700;">
        Reset Your Password
      </h2>

      <p style="margin:0 0 15px; color:#374151; font-size:15px; line-height:1.8;">
        Hello <strong>${receiverName || "Dear User"}</strong>,
      </p>

      <p style="margin:0 0 18px; color:#4b5563; font-size:14px; line-height:1.8;">
        We received a request to reset the password associated with your account. If you made this request, click the button below to create a new password.
      </p>

      <!-- Reset Button -->
      <div style="text-align:center; margin:30px 0;">
        <a href="${resetPasswordLink}"
           target="_blank"
           style="display:inline-block; padding:15px 35px; background-color:#2563eb; color:#ffffff; text-decoration:none; font-size:15px; font-weight:600; border-radius:6px;">
          Reset My Password
        </a>
      </div>

      <!-- Expiration Notice -->
      <div style="padding:15px 18px; margin:25px 0; background-color:#eff6ff; border-left:4px solid #2563eb; border-radius:4px;">
        <p style="margin:0; color:#1e40af; font-size:13px; line-height:1.7;">
          <strong>Important:</strong> This password reset link will expire in <strong>15 minutes</strong> for security reasons.
        </p>
      </div>

      <!-- Fallback Link -->
      <p style="margin:20px 0 8px; color:#4b5563; font-size:13px; line-height:1.7;">
        If the button above doesn't work, copy and paste the following link into your browser:
      </p>

      <p style="margin:0 0 22px; padding:12px; background-color:#f9fafb; border:1px solid #e5e7eb; border-radius:5px; font-size:12px; line-height:1.7; word-break:break-all;">
        <a href="${resetPasswordLink}" style="color:#2563eb; text-decoration:underline;">
          ${resetPasswordLink}
        </a>
      </p>

      <!-- Security Notice -->
      <div style="margin-top:25px;">
        <h3 style="margin:0 0 10px; color:#111827; font-size:15px;">
          Didn't Request a Password Reset?
        </h3>

        <p style="margin:0 0 18px; color:#6b7280; font-size:13px; line-height:1.8;">
          No worries! Your account is still secure. You can safely ignore this email. Your password will remain unchanged unless you use the reset link above.
        </p>

        <p style="margin:0; color:#6b7280; font-size:13px; line-height:1.8;">
          For your security, never share this password reset link with anyone. Our team will never ask you for your password or reset token.
        </p>
      </div>

      <!-- Sign-off -->
      <div style="margin-top:30px; padding-top:20px; border-top:1px solid #e5e7eb;">
        <p style="margin:0; color:#374151; font-size:14px; line-height:1.8;">
          Best regards,<br />
          <strong>Chaity E-commerce Security Team</strong>
        </p>
      </div>

    </div>

    <!-- Footer -->
    <div style="padding:22px 30px; background-color:#f9fafb; border-top:1px solid #e5e7eb; text-align:center;">

      <p style="margin:0 0 10px; color:#374151; font-size:13px; font-weight:600;">
        Chaity E-commerce
      </p>

      <p style="margin:0 0 12px; color:#9ca3af; font-size:12px; line-height:1.7;">
        Secure shopping. Trusted experience.
      </p>

      <p style="margin:0 0 12px; font-size:12px;">
        <a href="https://chaity.com" style="color:#2563eb; text-decoration:none;">
          Visit Website
        </a>
        &nbsp;|&nbsp;
        <a href="mailto:support@chaity.com" style="color:#2563eb; text-decoration:none;">
          Contact Support
        </a>
      </p>

      <p style="margin:0; color:#9ca3af; font-size:11px; line-height:1.6;">
        \xA9 2026 Chaity E-commerce. All rights reserved.<br />
        This is an automated security notification. Please do not reply to this email.
      </p>

    </div>

  </div>

</div>
`
    });
    console.log("Sent to your inbox! ID:", info.messageId);
  } catch (error) {
    console.log(error);
  }
};

// src/modules/auth/auth.service.ts
var registerUserOnDB = async (payload) => {
  const { password } = payload;
  const name = payload.name.trim();
  const email2 = payload.email.toLowerCase().trim();
  const isUserExists = await prisma.users.findUnique({
    where: {
      email: email2
    }
  });
  if (isUserExists) {
    throw new appError_default(
      httpStatus.CONFLICT,
      "User with this email already exists!"
    );
  }
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );
  const user = await prisma.users.create({
    data: {
      name,
      email: email2,
      password: hashedPassword
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true
    }
  });
  return user;
};
var loginUserFromDB = async (payload) => {
  const { password, isRemember } = payload;
  const email2 = payload.email.toLowerCase().trim();
  const isUserExists = await prisma.users.findUnique({
    where: {
      email: email2
    },
    select: {
      password: true,
      isDeleted: true,
      status: true,
      id: true,
      name: true,
      email: true,
      role: true,
      tokenVersion: true
    }
  });
  if (!isUserExists || !isUserExists.password) {
    throw new appError_default(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExists.password
  );
  if (!isPasswordMatched) {
    throw new appError_default(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }
  if (isUserExists.isDeleted) {
    throw new appError_default(
      httpStatus.NOT_FOUND,
      "This account has been deleted. Please contact support if you believe this is a mistake."
    );
  }
  if (isUserExists.status !== "ACTIVE") {
    throw new appError_default(
      httpStatus.FORBIDDEN,
      "Your account is currently inactive or suspended. Please activate your account or contact support."
    );
  }
  await prisma.users.update({
    where: {
      email: email2
    },
    data: {
      lastLoggedInAt: /* @__PURE__ */ new Date()
    }
  });
  const jwtAccessTokenPayload = {
    id: isUserExists.id,
    name: isUserExists.name,
    email: isUserExists.email,
    role: isUserExists.role,
    tokenVersion: isUserExists.tokenVersion,
    tokenType: "accessToken"
  };
  const jwtRefreshTokenPayload = {
    id: isUserExists.id,
    name: isUserExists.name,
    email: isUserExists.email,
    role: isUserExists.role,
    tokenVersion: isUserExists.tokenVersion,
    tokenType: "refreshToken"
  };
  const accessToken = jwtUtils.generateToken(
    jwtAccessTokenPayload,
    config.jwt_access_secret,
    isRemember ? config.jwt_access_expires_in : "1d"
  );
  const refreshToken2 = jwtUtils.generateToken(
    jwtRefreshTokenPayload,
    config.jwt_refresh_secret,
    isRemember ? config.jwt_refresh_expires_in : "1d"
  );
  return {
    accessToken,
    refreshToken: refreshToken2,
    isRemember
  };
};
var googleAuthService = async (payload) => {
  const ticket = await googleClient.verifyIdToken({
    idToken: payload.idToken,
    audience: config.google_client_id
  });
  const googleUser = ticket.getPayload();
  if (!googleUser || !googleUser.email || !googleUser.email_verified || !googleUser.sub) {
    throw new appError_default(httpStatus.UNAUTHORIZED, "Invalid Google account");
  }
  const { sub: googleId, email: email2, name, picture } = googleUser;
  const normalizedEmail = email2.toLowerCase().trim();
  let user = await prisma.users.findUnique({
    where: { googleId },
    select: {
      id: true,
      emailVerifiedAt: true,
      isDeleted: true,
      status: true,
      name: true,
      email: true,
      role: true,
      password: true,
      tokenVersion: true
    }
  });
  if (!user) {
    user = await prisma.users.findUnique({
      where: { email: normalizedEmail }
    });
    if (user) {
      user = await prisma.users.update({
        where: { id: user.id },
        data: {
          googleId,
          emailVerifiedAt: user.emailVerifiedAt ?? /* @__PURE__ */ new Date()
        }
      });
    } else {
      user = await prisma.users.create({
        data: {
          name: name || "Google User",
          email: normalizedEmail,
          googleId,
          image: picture ? picture : null,
          emailVerifiedAt: /* @__PURE__ */ new Date()
        }
      });
    }
  }
  if (user && user.isDeleted) {
    throw new appError_default(
      httpStatus.NOT_FOUND,
      "This account has been deleted. Please contact support if you believe this is a mistake."
    );
  }
  if (user.status !== "ACTIVE") {
    throw new appError_default(
      httpStatus.FORBIDDEN,
      "Your account is currently inactive or suspended. Please activate your account or contact support."
    );
  }
  await prisma.users.update({
    where: {
      email: email2
    },
    data: {
      lastLoggedInAt: /* @__PURE__ */ new Date()
    }
  });
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    tokenVersion: user.tokenVersion,
    role: user.role
  };
  const accessToken = jwtUtils.generateToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in
  );
  const refreshToken2 = jwtUtils.generateToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in
  );
  const { password, ...userWithoutPassword } = user;
  return { userWithoutPassword, accessToken, refreshToken: refreshToken2 };
};
var forgetPasswordService = async (payload) => {
  const { email: email2 } = payload;
  const genericResponse = {
    message: "If an account exists with this email, you will receive a password reset link."
  };
  const user = await prisma.users.findUnique({
    where: { email: email2 },
    select: {
      id: true,
      email: true,
      name: true,
      password: true
    }
  });
  if (!user) return genericResponse;
  if (!user.password) return genericResponse;
  const resetToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");
  const expiresAt = new Date(Date.now() + 15 * 60 * 1e3);
  const resetRecord = await prisma.$transaction(async (tx) => {
    await tx.passwordReset.deleteMany({
      where: {
        userId: user.id
      }
    });
    return tx.passwordReset.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt
      },
      select: {
        id: true,
        expiresAt: true
      }
    });
  });
  const resetUrl = new URL("/reset-password", config.frontend_url_dev);
  resetUrl.searchParams.set("id", resetRecord.id);
  resetUrl.searchParams.set("token", resetToken);
  try {
    await sendForgetPasswordEmail(
      user.email,
      "Password Reset Email",
      user.name || "User",
      resetUrl.toString()
    );
  } catch (error) {
    await prisma.passwordReset.deleteMany({
      where: {
        id: resetRecord.id,
        tokenHash
      }
    });
    throw new appError_default(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Unable to send password reset email. Please try again."
    );
  }
  return genericResponse;
};
var refreshTokenService = async (token) => {
  const decodedToken = jwtUtils.verifyToken(
    token,
    config.jwt_refresh_secret
  );
  if (!decodedToken.success || !decodedToken.data) {
    throw new appError_default(httpStatus.UNAUTHORIZED, "Invalid Refresh Token!");
  }
  const payload = decodedToken.data;
  if (typeof payload.id !== "string" || payload.tokenType !== "refreshToken") {
    throw new appError_default(httpStatus.UNAUTHORIZED, "Invalid Refresh Token!");
  }
  const { id } = payload;
  const isUserExists = await prisma.users.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isDeleted: true,
      status: true,
      tokenVersion: true
    }
  });
  if (!isUserExists) {
    throw new appError_default(httpStatus.UNAUTHORIZED, "Invalid Refresh Token");
  }
  if (isUserExists.isDeleted) {
    throw new appError_default(
      httpStatus.NOT_FOUND,
      "This account has been deleted. Please contact support if you believe this is a mistake."
    );
  }
  if (isUserExists.status !== "ACTIVE") {
    throw new appError_default(
      httpStatus.FORBIDDEN,
      "Your account is currently inactive or suspended. Please activate your account or contact support."
    );
  }
  const jwtAccessTokenPayload = {
    id: isUserExists.id,
    name: isUserExists.name,
    email: isUserExists.email,
    role: isUserExists.role,
    tokenVersion: isUserExists.tokenVersion,
    tokenType: "accessToken"
  };
  const accessToken = jwtUtils.generateToken(
    jwtAccessTokenPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in
  );
  return {
    accessToken
  };
};
var logoutUserService = async (userId) => {
  if (!userId) {
    throw new appError_default(
      httpStatus.UNAUTHORIZED,
      "You can't perform this action ,Please try again later!"
    );
  }
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
      isDeleted: false
    },
    select: {
      id: true
    }
  });
  if (!user) {
    throw new appError_default(
      httpStatus.UNAUTHORIZED,
      "You can't perform this action ,Please try again later!"
    );
  }
  return {
    success: true
  };
};
var AuthServices = {
  registerUserOnDB,
  loginUserFromDB,
  googleAuthService,
  forgetPasswordService,
  refreshTokenService,
  logoutUserService
};

// src/modules/auth/auth.controller.ts
import httpStatus2 from "http-status";

// src/utils/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
var catchAsync_default = catchAsync;

// src/modules/auth/auth.consts.ts
var clearCookieOptions = {
  httpOnly: true,
  secure: config.node_env === "production",
  sameSite: "none",
  path: "/",
  maxAge: 0
};

// src/modules/auth/auth.controller.ts
var registerUser = catchAsync_default(
  async (req, res, next) => {
    const authInfo = req.body;
    const result = await AuthServices.registerUserOnDB(authInfo);
    sendResponse(res, {
      statusCode: httpStatus2.CREATED,
      message: "User Registered Successfully!",
      success: true,
      data: result
    });
  }
);
var loginUser = catchAsync_default(
  async (req, res, next) => {
    const authInfo = req.body;
    const result = await AuthServices.loginUserFromDB(authInfo);
    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1e3 * 60 * 60 * 24 * 1
      // 1 day
    });
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: result.isRemember ? 1e3 * 60 * 60 * 24 * 30 : 1e3 * 60 * 60 * 24 * 1
      // 1 day
    });
    sendResponse(res, {
      statusCode: httpStatus2.OK,
      message: "User Logged In Successfully!",
      success: true,
      data: null
    });
  }
);
var googleAuth = catchAsync_default(
  async (req, res, next) => {
    const payload = req.body;
    const result = await AuthServices.googleAuthService(payload);
    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1e3 * 60 * 60 * 24 * 1
      // 1 day
    });
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1e3 * 60 * 60 * 24 * 30
      // 30day
    });
    sendResponse(res, {
      statusCode: httpStatus2.OK,
      message: "Google Authentication Successful!",
      success: true,
      data: null
    });
  }
);
var forgetPassword = catchAsync_default(
  async (req, res, next) => {
    const payload = req.body;
    const result = await AuthServices.forgetPasswordService(payload);
    sendResponse(res, {
      statusCode: httpStatus2.OK,
      message: "Check out your email account for password reset link!",
      success: true,
      data: result
    });
  }
);
var refreshToken = catchAsync_default(
  async (req, res, next) => {
    const refreshToken2 = req.cookies?.refreshToken;
    if (!refreshToken2) {
      throw new appError_default(
        httpStatus2.UNAUTHORIZED,
        "Refresh token is missing. Please log in again."
      );
    }
    const result = await AuthServices.refreshTokenService(
      refreshToken2
    );
    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1e3 * 60 * 60 * 24 * 1
      // 1 day
    });
    sendResponse(res, {
      statusCode: httpStatus2.OK,
      message: "Token Refreshed Successfully!",
      success: true,
      data: null
    });
  }
);
var logoutUser = catchAsync_default(
  async (req, res, next) => {
    const userId = req.user?.id;
    const result = await AuthServices.logoutUserService(userId);
    if (result.success) {
      res.clearCookie("accessToken", clearCookieOptions);
      res.clearCookie("refreshToken", clearCookieOptions);
    }
    sendResponse(res, {
      statusCode: httpStatus2.OK,
      message: "User logged out successfully!",
      success: true,
      data: null
    });
  }
);
var AuthControllers = {
  registerUser,
  loginUser,
  googleAuth,
  forgetPassword,
  refreshToken,
  logoutUser
};

// src/middlewares/validateSchema.ts
import "zod";
var validateSchema = (schema) => {
  return catchAsync_default(async (req, res, next) => {
    const validatedData = schema.parse(req.body);
    req.body = validatedData;
    next();
  });
};

// src/modules/auth/auth.validation.ts
import * as z2 from "zod";
var UserRegistrationValidationSchema = z2.object({
  name: z2.string().min(2, "Name Can't be less then 2 Characters").max(50, "Name Can't be More then 50 Character!"),
  email: z2.email(),
  password: z2.string().min(6, "Password Can't be less then 6 Character!").max(50, "Password Can't be more then 50 Characters!").regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    "Password must contain uppercase, lowercase, number, and special character!"
  )
});
var UserLoginValidationSchema = z2.object({
  email: z2.email("Please provide a valid email address").toLowerCase().trim(),
  password: z2.string().min(1, "Password is required").max(72, "Invalid credentials"),
  isRemember: z2.enum(["true", "false"]).transform((value) => value === "true").optional()
});
var UserForgetPasswordValidationSchema = z2.object({
  email: z2.email()
});

// src/middlewares/multer.ts
import multer from "multer";
var storage = multer.memoryStorage();
var upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
    // 5 MB per file
  }
});
var uploadTextOnly = () => upload.none();
var uploadSingleImage = (fieldName) => {
  return upload.single(fieldName);
};
var uploadMultipleFields = (fields) => upload.fields(fields);

// src/middlewares/rateLimiter.ts
import httpStatus3 from "http-status";
import { rateLimit } from "express-rate-limit";
var authLimiter = rateLimit({
  windowMs: 15 * 60 * 1e3,
  limit: 10,
  standardHeaders: "draft-8",
  message: "Too many authentication attempts. Please try again after 15 minutes.",
  legacyHeaders: false
});
var profilePictureUpdateLimiter = rateLimit({
  windowMs: 15 * 60 * 1e3,
  limit: 5,
  standardHeaders: "draft-8",
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again after 15 minutes.",
    statusCode: httpStatus3.BAD_REQUEST
  },
  legacyHeaders: false
});
var changePasswordLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1e3,
  limit: 5,
  standardHeaders: "draft-8",
  message: "Too many authentication attempts. Please try again after 24 hours.",
  legacyHeaders: false
});

// src/middlewares/auth.ts
import httpStatus4 from "http-status";
var auth = (...roles) => {
  return catchAsync_default(async (req, res, next) => {
    const token = req.cookies.accessToken ? req.cookies.accessToken : req.headers.authorization?.startsWith("Bearer") ? req.headers.authorization.split(" ")[1] : req.headers.authorization;
    if (!token) {
      throw new appError_default(
        httpStatus4.UNAUTHORIZED,
        "You are not logged in , please logged in to access your resource!"
      );
    }
    const verifyToken2 = jwtUtils.verifyToken(token, config.jwt_access_secret);
    if (!verifyToken2.success) {
      throw new appError_default(
        httpStatus4.UNAUTHORIZED,
        "Unauthorized access , You do not have permission to access this route!"
      );
    }
    const { email: email2, name, id, role, tokenVersion } = verifyToken2.data;
    const user = await prisma.users.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isDeleted: true,
        status: true,
        tokenVersion: true
      }
    });
    if (!user || user.isDeleted) {
      throw new appError_default(
        httpStatus4.NOT_FOUND,
        "This account has been deleted. Please contact support if you believe this is a mistake."
      );
    }
    if (roles.length && !roles.includes(user.role)) {
      throw new appError_default(
        httpStatus4.FORBIDDEN,
        "You do not have permission to access this route!"
      );
    }
    if (user.status !== "ACTIVE") {
      throw new appError_default(
        httpStatus4.FORBIDDEN,
        "Your account is currently inactive or suspended. Please activate your account or contact support for assistance."
      );
    }
    if (Number(user.tokenVersion) !== Number(tokenVersion)) {
      throw new appError_default(
        httpStatus4.UNAUTHORIZED,
        "Your session has expired. Please log in again!"
      );
    }
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    next();
  });
};

// src/modules/auth/auth.routes.ts
var router = Router();
router.post(
  "/register",
  uploadTextOnly(),
  validateSchema(UserRegistrationValidationSchema),
  AuthControllers.registerUser
);
router.post(
  "/login",
  authLimiter,
  uploadTextOnly(),
  validateSchema(UserLoginValidationSchema),
  AuthControllers.loginUser
);
router.post("/google", AuthControllers.googleAuth);
router.post(
  "/logout",
  auth(UserRoles.CUSTOMER, UserRoles.ADMIN, UserRoles.STUFF),
  AuthControllers.logoutUser
);
router.post(
  "/forget-password",
  uploadTextOnly(),
  validateSchema(UserForgetPasswordValidationSchema),
  AuthControllers.forgetPassword
);
router.post("/refresh-token", AuthControllers.refreshToken);
var authRoutes = router;

// src/modules/user/user.routes.ts
import { Router as Router2 } from "express";

// src/modules/user/user.service.ts
import httpStatus5 from "http-status";

// src/config/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: config.cloudinary_client_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
  secure: true
});
var cloudinary_default = cloudinary;

// src/utils/uploadCloudinary.ts
var uploadToCloudinary = async (file, folder = "e-commerce") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary_default.uploader.upload_stream(
      {
        folder,
        resource_type: "image"
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result) {
          return reject(new Error("Upload failed"));
        }
        resolve(result);
      }
    );
    stream.end(file.buffer);
  });
};
var uploadCloudinary_default = uploadToCloudinary;

// src/modules/user/user.service.ts
import bcrypt2 from "bcryptjs";

// src/modules/user/user.const.ts
var allowedSortFields = [
  "createdAt",
  "updatedAt",
  "name",
  "email",
  "lastLoggedInAt"
];
var allowedUserStatus = ["ACTIVE", "INACTIVE", "SUSPENDED"];
var allowedUserRoles = [
  "CUSTOMER",
  "STUFF",
  "ADMIN",
  "SUPER_ADMIN"
];
var allowedRolesByPerformer = {
  ADMIN: ["CUSTOMER", "STUFF"],
  SUPER_ADMIN: ["CUSTOMER", "STUFF", "ADMIN"]
};

// src/modules/user/user.service.ts
var getMyUserInfoFromDB = async (payload) => {
  const { id } = payload;
  if (!id) {
    throw new appError_default(
      httpStatus5.UNAUTHORIZED,
      "Unauthorized access! Please log in again."
    );
  }
  const result = await prisma.users.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      dateOfBirth: true,
      role: true,
      status: true,
      emailVerifiedAt: true,
      phoneVerifiedAt: true,
      isDeleted: true,
      createdAt: true,
      updatedAt: true
    }
  });
  if (!result) {
    throw new appError_default(httpStatus5.NOT_FOUND, "User Profile Not Found!");
  }
  if (result.isDeleted) {
    throw new appError_default(
      httpStatus5.NOT_FOUND,
      "This account has been deleted. Please contact support if you believe this is a mistake."
    );
  }
  if (result.status !== "ACTIVE") {
    throw new appError_default(
      httpStatus5.FORBIDDEN,
      "Your account is currently inactive or suspended. Please activate your account or contact support."
    );
  }
  return result;
};
var updateMyUserInfoOnDB = async (userId, payload) => {
  if (!userId) {
    throw new appError_default(
      httpStatus5.UNAUTHORIZED,
      "Unauthorized access! Please log in again."
    );
  }
  const isUserExists = await prisma.users.findUnique({
    where: { id: userId },
    select: {
      id: true,
      status: true,
      isDeleted: true,
      imagePublicId: true
    }
  });
  if (!isUserExists || isUserExists.isDeleted) {
    throw new appError_default(httpStatus5.NOT_FOUND, "User profile not found!");
  }
  if (isUserExists.status !== "ACTIVE") {
    throw new appError_default(
      httpStatus5.FORBIDDEN,
      "Your account is currently inactive or suspended. Please activate your account or contact support."
    );
  }
  const safeUpdateData = {};
  if (payload.name !== void 0) {
    const trimmedName = payload.name.trim();
    if (!trimmedName) {
      throw new appError_default(httpStatus5.BAD_REQUEST, "Name cannot be empty.");
    }
    safeUpdateData.name = trimmedName;
  }
  if (payload.phone !== void 0) {
    const trimmedPhone = payload.phone.trim();
    if (!trimmedPhone) {
      throw new appError_default(httpStatus5.BAD_REQUEST, "Phone cannot be empty.");
    }
    safeUpdateData.phone = trimmedPhone;
  }
  if (payload.dateOfBirth !== void 0 && new Date(payload.dateOfBirth) < /* @__PURE__ */ new Date()) {
    safeUpdateData.dateOfBirth = payload.dateOfBirth;
  }
  if (Object.keys(safeUpdateData).length === 0) {
    throw new appError_default(
      httpStatus5.BAD_REQUEST,
      "Please provide at least one valid field to update."
    );
  }
  const result = await prisma.users.update({
    where: { id: userId },
    data: safeUpdateData,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      dateOfBirth: true,
      updatedAt: true
    }
  });
  return result;
};
var changeMyPasswordFromDB = async (userId, payload) => {
  const { newPassword, oldPassword, confirmPassword } = payload;
  if (newPassword !== confirmPassword) {
    throw new appError_default(
      httpStatus5.BAD_REQUEST,
      "New password and confirm password do not match."
    );
  }
  if (oldPassword === newPassword) {
    throw new appError_default(
      httpStatus5.BAD_REQUEST,
      "New password cannot be the same as your old password."
    );
  }
  const user = await prisma.users.findUnique({
    where: {
      id: userId
    },
    select: {
      password: true,
      isDeleted: true,
      status: true
    }
  });
  if (!user || user.isDeleted) {
    throw new appError_default(httpStatus5.NOT_FOUND, "User profile not found!");
  }
  if (!user.password) {
    throw new appError_default(
      httpStatus5.FORBIDDEN,
      "You can't change a local password of this account!"
    );
  }
  if (user.status !== "ACTIVE") {
    throw new appError_default(
      httpStatus5.FORBIDDEN,
      "Your account is currently inactive or suspended. Please activate your account or contact support."
    );
  }
  const isPasswordMatched = await bcrypt2.compare(oldPassword, user.password);
  if (!isPasswordMatched) {
    throw new appError_default(httpStatus5.UNAUTHORIZED, "Old password is incorrect");
  }
  const hashedNewPassword = await bcrypt2.hash(
    confirmPassword,
    Number(config.bcrypt_salt_rounds)
  );
  const result = await prisma.users.update({
    where: {
      id: userId
    },
    data: {
      password: hashedNewPassword,
      tokenVersion: {
        increment: 1
      }
    },
    select: {
      updatedAt: true
    }
  });
  return {
    success: result ? true : false
  };
};
var updateProfilePictureOnDB = async (userId, payload) => {
  if (!payload) {
    throw new appError_default(
      httpStatus5.BAD_REQUEST,
      "Please provide an image you're trying to update!"
    );
  }
  const user = await prisma.users.findUnique({
    where: {
      id: userId
    },
    select: {
      isDeleted: true,
      status: true,
      imagePublicId: true
    }
  });
  if (!user || user.isDeleted) {
    throw new appError_default(httpStatus5.NOT_FOUND, "User profile not found!");
  }
  if (user.status !== "ACTIVE") {
    throw new appError_default(
      httpStatus5.FORBIDDEN,
      "Your account is currently inactive or suspended. Please activate your account or contact support."
    );
  }
  const uploadedImage = payload?.buffer?.length ? await uploadCloudinary_default(payload, "user") : void 0;
  const safeUpdateData = {};
  if (uploadedImage) {
    safeUpdateData.image = uploadedImage.secure_url;
    safeUpdateData.imagePublicId = uploadedImage.public_id;
  }
  let result;
  try {
    result = await prisma.users.update({
      where: { id: userId },
      data: safeUpdateData,
      select: {
        image: true,
        updatedAt: true
      }
    });
  } catch (error) {
    if (uploadedImage) {
      try {
        await cloudinary_default.uploader.destroy(uploadedImage.public_id);
      } catch (cleanupError) {
        console.error("Failed to clean up new Cloudinary image:", cleanupError);
      }
    }
    throw error;
  }
  if (uploadedImage && user.imagePublicId) {
    try {
      await cloudinary_default.uploader.destroy(user.imagePublicId);
    } catch (cleanupError) {
      console.error("Failed to delete old Cloudinary image:", cleanupError);
    }
  }
  return result;
};
var deleteMyAccountFromDB = async (userId) => {
  if (!userId) {
    throw new appError_default(
      httpStatus5.UNAUTHORIZED,
      "You do not have permission to delete this account!"
    );
  }
  const deletedUser = await prisma.$transaction(async (tx) => {
    const user = await prisma.users.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        isDeleted: true
      }
    });
    if (!user || user.isDeleted) {
      throw new appError_default(
        httpStatus5.NOT_FOUND,
        "User you're trying to delete possibly already deleted!"
      );
    }
    const activeOrders = await prisma.orders.findFirst({
      where: {
        userId,
        status: {
          in: [
            "PENDING",
            "CONFIRMED",
            "PROCESSING",
            "OUT_FOR_DELIVERY",
            "READY_TO_SHIP",
            "SHIPPED"
          ]
        }
      },
      select: {
        id: true
      }
    });
    if (activeOrders) {
      throw new appError_default(
        httpStatus5.CONFLICT,
        "You cannot delete your account while you have active orders!"
      );
    }
    const result = await prisma.users.update({
      where: {
        id: userId,
        isDeleted: false
      },
      data: {
        isDeleted: true,
        tokenVersion: {
          increment: 1
        }
      },
      select: {
        isDeleted: true
      }
    });
    return result;
  });
  return {
    success: deletedUser ? true : false
  };
};
var getAllUserFromDB = async (userId, query) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 10));
  const skip = (page - 1) * limit;
  const sortBy = typeof query.sortBy === "string" && allowedSortFields.includes(query.sortBy) ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder && query.sortOrder === "asc" ? "asc" : "desc";
  const andConditions = [];
  const orConditions = [];
  const usersSearchableFields = ["name", "email", "phone"];
  if (query.isDeleted) {
    if (typeof query.isDeleted === "string") {
      andConditions.push({
        isDeleted: query.isDeleted === "true" ? true : false
      });
    } else {
      andConditions.push({
        isDeleted: Boolean(query.isDeleted) === true ? true : false
      });
    }
  }
  if (query.role) {
    andConditions.push({
      role: query.role
    });
  }
  if (query.status) {
    andConditions.push({
      status: query.status
    });
  }
  if (query.lastLoggedInAt) {
    andConditions.push({
      lastLoggedInAt: {
        gte: new Date(query.lastLoggedInAt)
      }
    });
  }
  if (query.dateOfBirth) {
    andConditions.push({
      dateOfBirth: {
        gte: new Date(query.dateOfBirth)
      }
    });
  }
  if (query.createdAt) {
    andConditions.push({
      createdAt: {
        gte: new Date(query.createdAt)
      }
    });
  }
  if (query.searchTerm) {
    usersSearchableFields.forEach((field) => {
      orConditions.push({
        [field]: {
          contains: query.searchTerm.trim(),
          mode: "insensitive"
        }
      });
    });
    andConditions.push({
      OR: orConditions
    });
  }
  if (!userId) {
    throw new appError_default(
      httpStatus5.UNAUTHORIZED,
      "You do not have permission , to see users information!"
    );
  }
  const isUserExists = await prisma.users.findUnique({
    where: {
      id: userId
    },
    select: {
      isDeleted: true,
      role: true
    }
  });
  if (!isUserExists || isUserExists.isDeleted || isUserExists.role !== "SUPER_ADMIN" && isUserExists.role !== "ADMIN") {
    throw new appError_default(
      httpStatus5.UNAUTHORIZED,
      "You do not have permission , to see users information!"
    );
  }
  const [result, total] = await Promise.all([
    prisma.users.findMany({
      where: {
        AND: andConditions
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        dateOfBirth: true,
        role: true,
        status: true,
        emailVerifiedAt: true,
        lastLoggedInAt: true,
        phoneVerifiedAt: true,
        isDeleted: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        [sortBy]: sortOrder
      },
      skip,
      take: limit
    }),
    prisma.users.count({
      where: {
        AND: andConditions
      }
    })
  ]);
  return {
    result,
    meta: {
      total,
      page,
      limit
    }
  };
};
var getUserDetailsFromDB = async (userId, payload) => {
  if (!userId) {
    throw new appError_default(
      httpStatus5.UNAUTHORIZED,
      "You're not permitted to access this route!"
    );
  }
  if (!payload) {
    throw new appError_default(
      httpStatus5.NOT_FOUND,
      "User details you're trying to access is not found!"
    );
  }
  const adminInfo = await prisma.users.findUnique({
    where: {
      id: userId
    },
    select: {
      isDeleted: true,
      status: true,
      role: true
    }
  });
  if (!adminInfo || adminInfo.isDeleted || adminInfo.role !== "SUPER_ADMIN" && adminInfo.role !== "ADMIN") {
    throw new appError_default(
      httpStatus5.FORBIDDEN,
      "You're not permitted to access this route!"
    );
  }
  if (adminInfo.status !== "ACTIVE") {
    throw new appError_default(
      httpStatus5.FORBIDDEN,
      "You're not permitted to access this route!"
    );
  }
  const user = await prisma.users.findUnique({
    where: {
      id: payload
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      dateOfBirth: true,
      role: true,
      status: true,
      emailVerifiedAt: true,
      lastLoggedInAt: true,
      phoneVerifiedAt: true,
      isDeleted: true,
      createdAt: true,
      updatedAt: true,
      addresses: true
    }
  });
  if (!user) {
    throw new appError_default(
      httpStatus5.NOT_FOUND,
      "User details you're trying to access is not found!"
    );
  }
  return user;
};
var changeUserStatusOnDB = async (performerId, userId, payload) => {
  if (!performerId) {
    throw new appError_default(
      httpStatus5.UNAUTHORIZED,
      "You do not have permission to change this account status!"
    );
  }
  if (!userId || !payload.status || !allowedUserStatus.includes(payload.status)) {
    throw new appError_default(
      httpStatus5.BAD_REQUEST,
      "Please provide valid information to change user status!"
    );
  }
  const performerInfo = await prisma.users.findFirst({
    where: {
      id: performerId,
      isDeleted: false,
      status: "ACTIVE",
      role: {
        in: ["ADMIN", "SUPER_ADMIN"]
      }
    },
    select: {
      role: true
    }
  });
  if (!performerInfo) {
    throw new appError_default(
      httpStatus5.FORBIDDEN,
      "You do not have permission to change this account status!"
    );
  }
  const targetUser = await prisma.users.findFirst({
    where: {
      id: userId,
      isDeleted: false
    },
    select: {
      role: true,
      status: true
    }
  });
  if (!targetUser) {
    throw new appError_default(httpStatus5.NOT_FOUND, "User not found!");
  }
  if (targetUser.role === "SUPER_ADMIN" || targetUser.role === "ADMIN" && performerInfo.role !== "SUPER_ADMIN") {
    throw new appError_default(
      httpStatus5.FORBIDDEN,
      "You do not have permission to change this account status!"
    );
  }
  if (performerId === userId) {
    throw new appError_default(
      httpStatus5.FORBIDDEN,
      "You cannot change your own account status!"
    );
  }
  if (targetUser.status === payload.status) {
    throw new appError_default(httpStatus5.BAD_REQUEST, "User already has this status!");
  }
  const updatedUser = await prisma.users.update({
    where: {
      id: userId,
      isDeleted: false
    },
    data: {
      status: payload.status,
      tokenVersion: {
        increment: 1
      }
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      dateOfBirth: true,
      role: true,
      status: true,
      emailVerifiedAt: true,
      phoneVerifiedAt: true,
      isDeleted: true,
      createdAt: true,
      updatedAt: true
    }
  });
  return updatedUser;
};
var changeUserRoleOnDB = async (performerId, userId, payload) => {
  if (!performerId) {
    throw new appError_default(
      httpStatus5.UNAUTHORIZED,
      "You do not have permission to change this account role!"
    );
  }
  if (!userId || !payload.role || !allowedUserRoles.includes(payload.role)) {
    throw new appError_default(
      httpStatus5.BAD_REQUEST,
      "Please provide valid information to change user role!"
    );
  }
  if (performerId === userId) {
    throw new appError_default(
      httpStatus5.FORBIDDEN,
      "You cannot change your own account role!"
    );
  }
  const performerInfo = await prisma.users.findFirst({
    where: {
      id: performerId,
      isDeleted: false,
      status: "ACTIVE",
      role: {
        in: ["ADMIN", "SUPER_ADMIN"]
      }
    },
    select: {
      role: true
    }
  });
  if (!performerInfo) {
    throw new appError_default(
      httpStatus5.FORBIDDEN,
      "You do not have permission to change this account role!"
    );
  }
  const assignableRoles = allowedRolesByPerformer[performerInfo.role] ?? [];
  if (!assignableRoles.includes(payload.role)) {
    throw new appError_default(
      httpStatus5.FORBIDDEN,
      "You do not have permission to assign this role!"
    );
  }
  const targetUser = await prisma.users.findFirst({
    where: {
      id: userId,
      isDeleted: false
    },
    select: {
      role: true,
      status: true
    }
  });
  if (!targetUser) {
    throw new appError_default(httpStatus5.NOT_FOUND, "User not found!");
  }
  if (targetUser.status !== "ACTIVE") {
    throw new appError_default(
      httpStatus5.FORBIDDEN,
      "Currently you can't change this user role!"
    );
  }
  if (targetUser.role === "SUPER_ADMIN" || targetUser.role === "ADMIN" && performerInfo.role !== "SUPER_ADMIN") {
    throw new appError_default(
      httpStatus5.FORBIDDEN,
      "You do not have permission to change this account role!"
    );
  }
  if (targetUser.role === payload.role) {
    throw new appError_default(httpStatus5.BAD_REQUEST, "User already has this role!");
  }
  const updatedUser = await prisma.$transaction(async (tx) => {
    const result = await tx.users.updateMany({
      where: {
        id: userId,
        isDeleted: false,
        status: "ACTIVE",
        role: targetUser.role
      },
      data: {
        role: payload.role,
        tokenVersion: {
          increment: 1
        }
      }
    });
    if (result.count !== 1) {
      throw new appError_default(
        httpStatus5.CONFLICT,
        "User information changed. Please try again!"
      );
    }
    const updated = await tx.users.findFirst({
      where: {
        id: userId,
        isDeleted: false,
        status: "ACTIVE"
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    });
    if (!updated) {
      throw new appError_default(
        httpStatus5.CONFLICT,
        "Unable to retrieve updated user information!"
      );
    }
    return updated;
  });
  return updatedUser;
};
var deleteUserFromDB = async (performerId, userId) => {
  if (!performerId) {
    throw new appError_default(
      httpStatus5.UNAUTHORIZED,
      "You do not have permission to delete this account!"
    );
  }
  if (!userId) {
    throw new appError_default(
      httpStatus5.BAD_REQUEST,
      "Please provide valid information to delete a user!"
    );
  }
  if (performerId === userId) {
    throw new appError_default(
      httpStatus5.FORBIDDEN,
      "You cannot delete your own account like this!"
    );
  }
  const deletedUser = await prisma.$transaction(async (tx) => {
    const performerInfo = await tx.users.findFirst({
      where: {
        id: performerId,
        isDeleted: false,
        status: "ACTIVE",
        role: {
          in: ["ADMIN", "SUPER_ADMIN"]
        }
      },
      select: {
        role: true
      }
    });
    if (!performerInfo) {
      throw new appError_default(
        httpStatus5.FORBIDDEN,
        "You do not have permission to delete this account!"
      );
    }
    const targetUser = await tx.users.findFirst({
      where: {
        id: userId,
        isDeleted: false
      },
      select: {
        id: true,
        role: true
      }
    });
    if (!targetUser) {
      throw new appError_default(httpStatus5.NOT_FOUND, "User not found!");
    }
    if (targetUser.role === "SUPER_ADMIN" || targetUser.role === "ADMIN" && performerInfo.role !== "SUPER_ADMIN") {
      throw new appError_default(
        httpStatus5.FORBIDDEN,
        "You do not have permission to delete this user!"
      );
    }
    const result = await tx.users.updateMany({
      where: {
        id: userId,
        isDeleted: false,
        role: targetUser.role
      },
      data: {
        isDeleted: true,
        tokenVersion: {
          increment: 1
        }
      }
    });
    if (result.count !== 1) {
      throw new appError_default(
        httpStatus5.CONFLICT,
        "User information changed. Please try again!"
      );
    }
    return {
      id: targetUser.id
    };
  });
  return {
    success: true,
    message: "User account deleted successfully!",
    data: deletedUser
  };
};
var UserServices = {
  getMyUserInfoFromDB,
  updateMyUserInfoOnDB,
  changeMyPasswordFromDB,
  updateProfilePictureOnDB,
  deleteMyAccountFromDB,
  getAllUserFromDB,
  getUserDetailsFromDB,
  changeUserStatusOnDB,
  changeUserRoleOnDB,
  deleteUserFromDB
};

// src/modules/user/user.controller.ts
import httpStatus6 from "http-status";
var getMyUserInfo = catchAsync_default(
  async (req, res, next) => {
    const userInfo = req.user;
    const result = await UserServices.getMyUserInfoFromDB(
      userInfo
    );
    sendResponse(res, {
      success: true,
      message: "User Info Retrieve Successfully!",
      statusCode: httpStatus6.OK,
      data: result
    });
  }
);
var updateMyUserInfo = catchAsync_default(
  async (req, res, next) => {
    const id = req.user?.id;
    const payload = req.body;
    const result = await UserServices.updateMyUserInfoOnDB(
      id,
      payload
    );
    sendResponse(res, {
      success: true,
      message: "User Info Updated Successfully!",
      statusCode: httpStatus6.OK,
      data: result
    });
  }
);
var changeMyPassword = catchAsync_default(
  async (req, res, next) => {
    const id = req.user?.id;
    const payload = req.body;
    const result = await UserServices.changeMyPasswordFromDB(
      id,
      payload
    );
    res.clearCookie("accessToken", clearCookieOptions);
    res.clearCookie("refreshToken", clearCookieOptions);
    sendResponse(res, {
      success: true,
      message: "User password has been changed successfully!",
      statusCode: httpStatus6.OK,
      data: result
    });
  }
);
var updateProfilePicture = catchAsync_default(
  async (req, res, next) => {
    const id = req.user?.id;
    const payload = req.file;
    const result = await UserServices.updateProfilePictureOnDB(
      id,
      payload
    );
    sendResponse(res, {
      success: true,
      message: "User Profile Picture Updated Successfully!",
      statusCode: httpStatus6.OK,
      data: result
    });
  }
);
var deleteMyAccount = catchAsync_default(
  async (req, res, next) => {
    const id = req.user?.id;
    const result = await UserServices.deleteMyAccountFromDB(id);
    res.clearCookie("accessToken", clearCookieOptions);
    res.clearCookie("refreshToken", clearCookieOptions);
    sendResponse(res, {
      success: true,
      message: "User Account deleted successfully!",
      statusCode: httpStatus6.OK,
      data: result
    });
  }
);
var getAllUser = catchAsync_default(
  async (req, res, next) => {
    const id = req.user?.id;
    const queries = req.query;
    const result = await UserServices.getAllUserFromDB(id, queries);
    sendResponse(res, {
      success: true,
      message: "Users data retrieve successfully!",
      statusCode: httpStatus6.OK,
      data: result
    });
  }
);
var getUserDetails = catchAsync_default(
  async (req, res, next) => {
    const id = req.user?.id;
    const payload = req.params.id;
    const result = await UserServices.getUserDetailsFromDB(
      id,
      payload
    );
    sendResponse(res, {
      success: true,
      message: "User details retrieve successfully!",
      statusCode: httpStatus6.OK,
      data: result
    });
  }
);
var changeUserStatus = catchAsync_default(
  async (req, res, next) => {
    const id = req.user?.id;
    const userId = req.params.id;
    const payload = req.body;
    const result = await UserServices.changeUserStatusOnDB(
      id,
      userId,
      payload
    );
    sendResponse(res, {
      success: true,
      message: "User status changed successfully!",
      statusCode: httpStatus6.OK,
      data: result
    });
  }
);
var changeUserRole = catchAsync_default(
  async (req, res, next) => {
    const id = req.user?.id;
    const userId = req.params.id;
    const payload = req.body;
    const result = await UserServices.changeUserRoleOnDB(
      id,
      userId,
      payload
    );
    sendResponse(res, {
      success: true,
      message: "User role changed successfully!",
      statusCode: httpStatus6.OK,
      data: result
    });
  }
);
var deleteUser = catchAsync_default(
  async (req, res, next) => {
    const id = req.user?.id;
    const userId = req.params.id;
    const result = await UserServices.deleteUserFromDB(
      id,
      userId
    );
    sendResponse(res, {
      success: true,
      message: "User deleted successfully!",
      statusCode: httpStatus6.OK,
      data: result
    });
  }
);
var UserControllers = {
  getMyUserInfo,
  updateMyUserInfo,
  changeMyPassword,
  updateProfilePicture,
  deleteMyAccount,
  getAllUser,
  getUserDetails,
  changeUserStatus,
  changeUserRole,
  deleteUser
};

// src/modules/user/user.validation.ts
import z3 from "zod";
var updateMyUserInfoValidationSchema = z3.object({
  name: z3.string().min(2, "Name can't be less than 2 characters").max(50, "Name can't be more than 50 characters").optional(),
  dateOfBirth: z3.coerce.date({ message: "Invalid date of birth format" }).refine((date) => date <= /* @__PURE__ */ new Date(), {
    message: "Date of birth cannot be in the future"
  }).refine(
    (date) => {
      const minAge = /* @__PURE__ */ new Date();
      minAge.setFullYear(minAge.getFullYear() - 13);
      return date <= minAge;
    },
    { message: "You must be at least 13 years old" }
  ).optional(),
  phone: z3.string().regex(/^(?:\+8801|01)[3-9]\d{8}$/, "Invalid Bangladeshi phone number").optional()
});
var updateMyUserPasswordValidationSchema = z3.object({
  oldPassword: z3.string().min(1, "Password is required").max(72, "Invalid credentials"),
  newPassword: z3.string().min(6, "Password Can't be less then 6 Character!").max(50, "Password Can't be more then 50 Characters!").regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    "Password must contain uppercase, lowercase, number, and special character!"
  ),
  confirmPassword: z3.string().min(6, "Password Can't be less then 6 Character!").max(50, "Password Can't be more then 50 Characters!").regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    "Password must contain uppercase, lowercase, number, and special character!"
  )
});
var updateProfilePictureValidationSchema = z3.object({
  image: z3.string().url("Invalid image URL").optional()
});
var changeUserStatusValidationSchema = z3.object({
  status: z3.enum(UserStatus)
});
var changeUserRoleValidationSchema = z3.object({
  role: z3.enum(UserRoles)
});

// src/modules/user/user.routes.ts
var router2 = Router2();
router2.get(
  "/me",
  auth(UserRoles.CUSTOMER, UserRoles.STUFF, UserRoles.ADMIN),
  UserControllers.getMyUserInfo
);
router2.patch(
  "/me",
  auth(UserRoles.CUSTOMER, UserRoles.STUFF, UserRoles.ADMIN),
  uploadTextOnly(),
  validateSchema(updateMyUserInfoValidationSchema),
  UserControllers.updateMyUserInfo
);
router2.patch(
  "/me/update-profile-picture",
  profilePictureUpdateLimiter,
  auth(UserRoles.CUSTOMER, UserRoles.STUFF, UserRoles.ADMIN),
  uploadSingleImage("image"),
  validateSchema(updateProfilePictureValidationSchema),
  UserControllers.updateProfilePicture
);
router2.patch(
  "/me/change-password",
  auth(UserRoles.ADMIN, UserRoles.CUSTOMER, UserRoles.STUFF),
  uploadTextOnly(),
  validateSchema(updateMyUserPasswordValidationSchema),
  UserControllers.changeMyPassword
);
router2.delete(
  "/me",
  auth(UserRoles.ADMIN, UserRoles.CUSTOMER, UserRoles.STUFF),
  UserControllers.deleteMyAccount
);
router2.get(
  "/",
  auth(UserRoles.ADMIN, UserRoles.SUPER_ADMIN),
  UserControllers.getAllUser
);
router2.get(
  "/:id",
  auth(UserRoles.ADMIN, UserRoles.SUPER_ADMIN),
  UserControllers.getUserDetails
);
router2.patch(
  "/:id/change-status",
  auth(UserRoles.ADMIN, UserRoles.SUPER_ADMIN),
  validateSchema(changeUserStatusValidationSchema),
  UserControllers.changeUserStatus
);
router2.patch(
  "/:id/change-role",
  auth(UserRoles.ADMIN, UserRoles.SUPER_ADMIN),
  validateSchema(changeUserRoleValidationSchema),
  UserControllers.changeUserRole
);
router2.delete(
  "/:id/delete",
  auth(UserRoles.ADMIN, UserRoles.SUPER_ADMIN),
  UserControllers.deleteUser
);
var userRoutes = router2;

// src/modules/category/category.routes.ts
import { Router as Router3 } from "express";

// src/modules/category/category.service.ts
import httpStatus7 from "http-status";

// src/modules/category/category.consts.ts
var allowedCategorySortableFields = [
  "name",
  "isFeatured",
  "displayOrder",
  "status",
  "createdAt",
  "updatedAt"
];
var allowedCategorySearchableFields = [
  "name",
  "slug",
  "description",
  "metaTitle",
  "metaDescription"
];

// src/modules/category/category.service.ts
var createCategoryOnDB = async (creatorId, payload, image) => {
  if (!creatorId) {
    throw new appError_default(httpStatus7.UNAUTHORIZED, "Authentication is required!");
  }
  if (!image?.buffer?.length || !payload) {
    throw new appError_default(
      httpStatus7.BAD_REQUEST,
      "Please provide all required information to create a category!"
    );
  }
  const creator = await prisma.users.findUnique({
    where: {
      id: creatorId
    },
    select: {
      id: true,
      role: true,
      status: true
    }
  });
  if (!creator || creator.status !== "ACTIVE") {
    throw new appError_default(
      httpStatus7.FORBIDDEN,
      "You are not authorized to create categories!"
    );
  }
  if (creator.role !== "ADMIN" && creator.role !== "SUPER_ADMIN") {
    throw new appError_default(
      httpStatus7.FORBIDDEN,
      "You are not authorized to create categories!"
    );
  }
  const name = payload.name?.trim();
  if (!name) {
    throw new appError_default(httpStatus7.BAD_REQUEST, "Category name is required!");
  }
  const slug = payload.slug?.trim() || name.toLowerCase().replace(/\s+/g, "-");
  if (payload.parentId) {
    const parentCategory = await prisma.categories.findUnique({
      where: {
        id: payload.parentId
      },
      select: {
        id: true,
        status: true
      }
    });
    if (!parentCategory) {
      throw new appError_default(httpStatus7.NOT_FOUND, "Parent category not found!");
    }
    if (parentCategory.status !== "ACTIVE") {
      throw new appError_default(
        httpStatus7.BAD_REQUEST,
        "Please active parent category first!"
      );
    }
  }
  let uploadedImage;
  let result;
  try {
    uploadedImage = await uploadCloudinary_default(image, "image");
    if (!uploadedImage?.secure_url || !uploadedImage.public_id) {
      throw new appError_default(
        httpStatus7.INTERNAL_SERVER_ERROR,
        "Failed to upload category image!"
      );
    }
    result = await prisma.categories.create({
      data: {
        createdBy: {
          connect: {
            id: creator.id
          }
        },
        name,
        slug,
        image: uploadedImage.secure_url,
        imagePublicId: uploadedImage.public_id,
        ...payload.description !== void 0 && {
          description: payload.description
        },
        ...payload.parentId !== void 0 && {
          parent: {
            connect: {
              id: payload.parentId
            }
          }
        },
        ...payload.isFeatured !== void 0 && {
          isFeatured: payload.isFeatured
        },
        ...payload.displayOrder !== void 0 && {
          displayOrder: payload.displayOrder
        },
        ...payload.metaTitle !== void 0 && {
          metaTitle: payload.metaTitle
        },
        ...payload.metaDescription !== void 0 && {
          metaDescription: payload.metaDescription
        },
        ...payload.status !== void 0 && {
          status: payload.status
        }
      }
    });
  } catch (error) {
    if (uploadedImage?.public_id) {
      try {
        await cloudinary_default.uploader.destroy(uploadedImage.public_id);
      } catch (cleanupError) {
        console.error("Failed to clean up new Cloudinary image:", cleanupError);
      }
    }
    if (error instanceof prismaNamespace_exports.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new appError_default(
        httpStatus7.CONFLICT,
        "A category with this slug already exists!"
      );
    }
    throw error;
  }
  return result;
};
var getAllCategoryFromDB = async (query) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 10));
  const skip = (page - 1) * limit;
  const sortBy = typeof query.sortBy === "string" && allowedCategorySortableFields.includes(query.sortBy) ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder;
  const andConditions = [];
  const orConditions = [];
  if (query.isFeatured) {
    if (typeof query.isFeatured === "string") {
      andConditions.push({
        isFeatured: query.isFeatured === "true" ? true : false
      });
    } else {
      andConditions.push({
        isFeatured: Boolean(query.isFeatured) === true ? true : false
      });
    }
  }
  if (query.status) {
    andConditions.push({
      status: query.status
    });
  }
  if (query.createdAtFrom || query.createdAtTo) {
    andConditions.push({
      createdAt: {
        ...query.createdAtFrom && {
          gte: query.createdAtFrom
        },
        ...query.createdAtTo && {
          lte: query.createdAtTo
        }
      }
    });
  }
  if (query.searchTerm) {
    allowedCategorySearchableFields.forEach((field) => {
      orConditions.push({
        [field]: {
          contains: query.searchTerm.trim(),
          mode: "insensitive"
        }
      });
    });
    andConditions.push({
      OR: orConditions
    });
  }
  const [result, total] = await Promise.all([
    prisma.categories.findMany({
      where: {
        AND: andConditions
      },
      select: {
        name: true,
        slug: true,
        image: true,
        displayOrder: true,
        status: true,
        createdAt: true,
        isFeatured: true,
        parent: {
          select: {
            name: true
          }
        },
        createdBy: {
          select: {
            name: true,
            role: true
          }
        }
      },
      orderBy: {
        [sortBy]: sortOrder
      },
      skip,
      take: limit
    }),
    prisma.categories.count({
      where: {
        AND: andConditions
      }
    })
  ]);
  return {
    result,
    meta: {
      total,
      page,
      limit
    }
  };
};
var getSpecificCategoryFromDB = async (slug) => {
  if (!slug) {
    throw new appError_default(httpStatus7.NOT_FOUND, "Please Provide a valid slug!");
  }
  const result = await prisma.categories.findFirst({
    where: {
      slug
    },
    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
      description: true,
      displayOrder: true,
      status: true,
      isFeatured: true,
      metaTitle: true,
      metaDescription: true,
      parent: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      },
      createdBy: {
        select: {
          id: true,
          name: true,
          role: true,
          email: true
        }
      },
      createdAt: true,
      updatedAt: true
    }
  });
  if (!result) {
    throw new appError_default(httpStatus7.NOT_FOUND, "Category Not Found!");
  }
  return result;
};
var updateCategoryOnDB = async (performerId, categorySlug, payload, image) => {
  if (!performerId) {
    throw new appError_default(
      httpStatus7.UNAUTHORIZED,
      "You do not have access to update a category!"
    );
  }
  if (!categorySlug) {
    throw new appError_default(
      httpStatus7.BAD_REQUEST,
      "Please Provide a valid category url!"
    );
  }
  const performer = await prisma.users.findUnique({
    where: {
      id: performerId
    },
    select: {
      role: true
    }
  });
  if (!performer || performer.role !== "SUPER_ADMIN" && performer.role !== "ADMIN") {
    throw new appError_default(
      httpStatus7.FORBIDDEN,
      "You do not have permission to update this category!"
    );
  }
  const targetedCategory = await prisma.categories.findUnique({
    where: {
      slug: categorySlug
    },
    select: {
      id: true,
      imagePublicId: true
    }
  });
  if (!targetedCategory) {
    throw new appError_default(httpStatus7.NOT_FOUND, "Category not found!");
  }
  if (payload.parentId === targetedCategory.id) {
    throw new appError_default(
      httpStatus7.BAD_REQUEST,
      "A category cannot be its own parent!"
    );
  }
  const updateCategorySafePayload = {};
  if (payload.name !== void 0) {
    updateCategorySafePayload.name = payload.name;
  }
  if (payload.slug !== void 0 && typeof payload.slug === "string") {
    updateCategorySafePayload.slug = payload.slug;
  }
  if (payload.description !== void 0 && typeof payload.description === "string") {
    updateCategorySafePayload.description = payload.description;
  }
  if (payload.isFeatured !== void 0) {
    updateCategorySafePayload.isFeatured = payload.isFeatured === "true" ? true : false;
  }
  if (payload.displayOrder !== void 0 && (typeof payload.displayOrder === "number" || typeof payload.displayOrder === "string")) {
    updateCategorySafePayload.displayOrder = Number(payload.displayOrder);
  }
  if (payload.metaTitle !== void 0 && typeof payload.metaTitle === "string") {
    updateCategorySafePayload.metaTitle = payload.metaTitle;
  }
  if (payload.metaDescription !== void 0 && typeof payload.metaDescription === "string") {
    updateCategorySafePayload.metaDescription = payload.metaDescription;
  }
  if (payload.status !== void 0) {
    updateCategorySafePayload.status = payload.status;
  }
  if (payload.parentId !== void 0 && typeof payload.parentId === "string") {
    const parentCategory = await prisma.categories.findUnique({
      where: {
        id: payload.parentId
      }
    });
    if (!parentCategory) {
      throw new appError_default(
        httpStatus7.NOT_FOUND,
        "Your provided Parent Category doesn't exists!"
      );
    }
    updateCategorySafePayload.parentId = payload.parentId;
  }
  let uploadedImage;
  let result;
  if (image?.buffer.length) {
    uploadedImage = await uploadCloudinary_default(image, "image");
    if (!uploadedImage?.secure_url || !uploadedImage.public_id) {
      throw new appError_default(
        httpStatus7.INTERNAL_SERVER_ERROR,
        "Failed to upload category image!"
      );
    }
    updateCategorySafePayload.image = uploadedImage.secure_url;
    updateCategorySafePayload.imagePublicId = uploadedImage.public_id;
  }
  if (Object.keys(updateCategorySafePayload).length === 0 && !image?.buffer.length) {
    throw new appError_default(
      httpStatus7.BAD_REQUEST,
      "Please provide valid information to update a category!"
    );
  }
  try {
    result = await prisma.categories.update({
      where: {
        id: targetedCategory.id
      },
      data: updateCategorySafePayload,
      select: {
        id: true,
        name: true,
        slug: true,
        status: true,
        image: true,
        description: true,
        displayOrder: true,
        isFeatured: true,
        parent: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        children: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        metaTitle: true,
        metaDescription: true,
        createdBy: {
          select: {
            id: true,
            name: true
          }
        },
        createdAt: true,
        updatedAt: true
      }
    });
  } catch (error) {
    if (uploadedImage?.public_id) {
      try {
        await cloudinary_default.uploader.destroy(uploadedImage.public_id);
      } catch (cleanupError) {
        console.error("Failed to clean up new image:", cleanupError);
      }
    }
    throw error;
  }
  if (uploadedImage?.public_id && targetedCategory.imagePublicId) {
    try {
      await cloudinary_default.uploader.destroy(targetedCategory.imagePublicId);
    } catch (cleanupError) {
      console.error("Failed to delete old image:", cleanupError);
    }
  }
  return result;
};
var deleteCategoryFromDB = async (performerId, categorySlug) => {
  const normalizeSlug = categorySlug.trim();
  if (!performerId) {
    throw new appError_default(
      httpStatus7.UNAUTHORIZED,
      "You do not have permission to delete a category."
    );
  }
  if (!normalizeSlug) {
    throw new appError_default(
      httpStatus7.BAD_REQUEST,
      "Please try to delete a valid category!"
    );
  }
  const user = await prisma.users.findUnique({
    where: {
      id: performerId
    },
    select: {
      status: true,
      isDeleted: true,
      role: true
    }
  });
  if (!user || user.isDeleted || user.status !== "ACTIVE") {
    throw new appError_default(
      httpStatus7.UNAUTHORIZED,
      "You do not have permission to delete category , please try to contact an admin."
    );
  }
  if (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN") {
    throw new appError_default(
      httpStatus7.FORBIDDEN,
      "You do not have permission to delete categories!"
    );
  }
  const category = await prisma.categories.findUnique({
    where: {
      slug: normalizeSlug
    },
    select: {
      id: true,
      isDeleted: true,
      children: {
        select: {
          slug: true
        },
        take: 1
      }
    }
  });
  if (!category || category.isDeleted) {
    throw new appError_default(
      httpStatus7.NOT_FOUND,
      "Category not found or already deleted!"
    );
  }
  if (category.children.length > 0) {
    throw new appError_default(
      httpStatus7.CONFLICT,
      "Please move or delete the child categories before deleting this category!"
    );
  }
  const deletedCategory = await prisma.categories.updateMany({
    where: {
      slug: normalizeSlug,
      isDeleted: false
    },
    data: {
      isDeleted: true
    }
  });
  if (deletedCategory.count === 0) {
    throw new appError_default(
      httpStatus7.NOT_FOUND,
      "Category not found or already deleted!"
    );
  }
  return {
    success: true,
    data: null
  };
};
var CategoryServices = {
  createCategoryOnDB,
  getAllCategoryFromDB,
  getSpecificCategoryFromDB,
  updateCategoryOnDB,
  deleteCategoryFromDB
};

// src/modules/category/category.controller.ts
import httpStatus8 from "http-status";
var createCategory = catchAsync_default(
  async (req, res, next) => {
    const id = req.user?.id;
    const image = req.file;
    const payload = req.body;
    const result = await CategoryServices.createCategoryOnDB(
      id,
      payload,
      image
    );
    sendResponse(res, {
      success: true,
      message: "Category created successfully!",
      statusCode: httpStatus8.CREATED,
      data: result
    });
  }
);
var getAllCategory = catchAsync_default(
  async (req, res, next) => {
    const query = req.query;
    const result = await CategoryServices.getAllCategoryFromDB(query);
    sendResponse(res, {
      success: true,
      message: "Categories retrieve successfully!",
      statusCode: httpStatus8.OK,
      data: result
    });
  }
);
var getSpecificCategory = catchAsync_default(
  async (req, res, next) => {
    const slug = req.params.slug;
    const result = await CategoryServices.getSpecificCategoryFromDB(
      slug
    );
    sendResponse(res, {
      success: true,
      message: "Category retrieve successfully!",
      statusCode: httpStatus8.OK,
      data: result
    });
  }
);
var updateCategory = catchAsync_default(
  async (req, res, next) => {
    const id = req.user?.id;
    const slug = req.params.slug;
    const payload = req.body;
    const image = req.file;
    const result = await CategoryServices.updateCategoryOnDB(
      id,
      slug,
      payload,
      image
    );
    sendResponse(res, {
      success: true,
      message: "Category updated successfully!",
      statusCode: httpStatus8.OK,
      data: result
    });
  }
);
var deleteCategory = catchAsync_default(
  async (req, res, next) => {
    const id = req.user?.id;
    const slug = req.params.slug;
    const result = await CategoryServices.deleteCategoryFromDB(
      id,
      slug
    );
    sendResponse(res, {
      success: true,
      message: "Category deleted successfully!",
      statusCode: httpStatus8.OK,
      data: result
    });
  }
);
var CategoryController = {
  createCategory,
  getAllCategory,
  getSpecificCategory,
  updateCategory,
  deleteCategory
};

// src/modules/category/category.validations.ts
import z4 from "zod";
var createCategoryValidationSchema = z4.object({
  name: z4.string().trim().min(2, "Minimum 2 Characters Requires as category name!").max(30, "Category name can't be more then 30 character long!"),
  slug: z4.string().trim().min(2).max(35).regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must contain lowercase letters, numbers, and hyphens only!"
  ).optional(),
  description: z4.string().trim().min(10, "Minimum 10 Characters Requires as category description!").max(255, "Category Description can't be more then 250 character long!").optional(),
  parentId: z4.string().uuid().optional(),
  isFeatured: z4.boolean().optional(),
  displayOrder: z4.number().int().min(0).max(500).optional(),
  metaTitle: z4.string().trim().max(60).optional(),
  metaDescription: z4.string().trim().max(160).optional(),
  status: z4.enum(CategoryStatus).optional()
}).strict();
var getAllCategoryQueryValidationSchema = z4.object({
  // Search
  searchTerm: z4.string().trim().optional(),
  // Pagination
  page: z4.coerce.number().int().min(1).default(1),
  limit: z4.coerce.number().int().min(1).max(100).default(10),
  // Sorting
  sortBy: z4.enum(allowedCategorySortableFields).default("createdAt"),
  sortOrder: z4.enum(["asc", "desc"]).default("desc"),
  // Filters
  isFeatured: z4.enum(["true", "false"]).transform((value) => value === "true").optional(),
  status: z4.nativeEnum(CategoryStatus).optional(),
  // Date filters
  createdAtFrom: z4.coerce.date().optional(),
  createdAtTo: z4.coerce.date().optional()
}).refine(
  (data) => !data.createdAtFrom || !data.createdAtTo || data.createdAtFrom <= data.createdAtTo,
  {
    message: "createdAtFrom must be earlier than or equal to createdAtTo",
    path: ["createdAtTo"]
  }
);
var UpdateCategoryValidationSchema = z4.object({
  name: z4.string().trim().min(2, "Category name must be at least 2 characters").max(25, "Category name cannot exceed 25 characters").optional(),
  slug: z4.string().trim().min(2, "Slug must be at least 2 characters").max(30, "Slug cannot exceed 30 characters").regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must contain lowercase letters, numbers, and hyphens only"
  ).optional().nullable(),
  description: z4.string().trim().max(255, "Description cannot exceed 255 characters").optional().nullable(),
  image: z4.string().url("Please provide a valid image URL").optional().nullable(),
  parentId: z4.string().uuid("Please provide a valid parent category ID").optional().nullable(),
  isFeatured: z4.enum(["true", "false"]).optional(),
  displayOrder: z4.coerce.number().int("Display order must be an integer").min(0, "Display order is too small").max(32767, "Display order is too large").optional().nullable(),
  metaTitle: z4.string().trim().optional().nullable(),
  metaDescription: z4.string().trim().optional().nullable(),
  status: z4.nativeEnum(CategoryStatus).optional()
}).strict().refine((data) => Object.keys(data).length > 0, {
  message: "At least one field is required to update category"
});

// src/middlewares/validateRequest.ts
import "zod";
var validateRequest = (schemas) => {
  return catchAsync_default(async (req, res, next) => {
    if (schemas.body) {
      req.body = schemas.body.parse(req.body);
    }
    if (schemas.query) {
      const validatedQuery = schemas.query.parse(req.query);
      Object.defineProperty(req, "query", {
        value: validatedQuery,
        writable: true,
        configurable: true
      });
    }
    if (schemas.params) {
      req.params = schemas.params.parse(req.params);
    }
    next();
  });
};
var validateRequest_default = validateRequest;

// src/modules/category/category.routes.ts
var router3 = Router3();
router3.post(
  "/",
  auth(UserRoles.SUPER_ADMIN, UserRoles.ADMIN),
  uploadSingleImage("image"),
  validateSchema(createCategoryValidationSchema),
  CategoryController.createCategory
);
router3.get(
  "/",
  validateRequest_default({
    query: getAllCategoryQueryValidationSchema
  }),
  CategoryController.getAllCategory
);
router3.get("/:slug", CategoryController.getSpecificCategory);
router3.patch(
  "/:slug/update",
  auth(UserRoles.SUPER_ADMIN, UserRoles.ADMIN),
  uploadSingleImage("image"),
  validateSchema(UpdateCategoryValidationSchema),
  CategoryController.updateCategory
);
router3.delete(
  "/:slug/delete",
  auth(UserRoles.SUPER_ADMIN, UserRoles.ADMIN),
  CategoryController.deleteCategory
);
var categoryRoutes = router3;

// src/modules/brand/brand.routes.ts
import { Router as Router4 } from "express";

// src/modules/brand/brand.service.ts
import httpStatus9 from "http-status";
var createBrandOnDB = async (performerId, payload, images) => {
  const logo = images?.logo?.[0];
  const banner = images?.banner?.[0];
  if (!logo) {
    throw new appError_default(httpStatus9.BAD_REQUEST, "Brand logo is required!");
  }
  if (!performerId) {
    throw new appError_default(
      httpStatus9.UNAUTHORIZED,
      "You do not have permission to create a brand!"
    );
  }
  if (!payload) {
    throw new appError_default(
      httpStatus9.BAD_REQUEST,
      "Please provide valid information to create a brand!"
    );
  }
  const performer = await prisma.users.findUnique({
    where: {
      id: performerId,
      isDeleted: false
    },
    select: {
      role: true,
      status: true
    }
  });
  if (!performer || performer.role !== "SUPER_ADMIN" && performer.role !== "ADMIN" || performer.status !== "ACTIVE") {
    throw new appError_default(
      httpStatus9.FORBIDDEN,
      "You do not have permission to create a brand!"
    );
  }
  const brandSlug = (payload.slug?.trim() || payload.name.trim()).toLowerCase().replace(/\s+/g, "-");
  const isFeatured = payload.isFeatured === true || typeof payload.isFeatured === "string" && payload.isFeatured === "true";
  const displayOrder = Number(payload.displayOrder);
  if (!Number.isSafeInteger(displayOrder) || displayOrder < 0) {
    throw new appError_default(
      httpStatus9.BAD_REQUEST,
      "Display order must be a non-negative integer!"
    );
  }
  const description = payload.description?.trim();
  const website = payload.website?.trim();
  const metaTitle = payload.metaTitle?.trim();
  const metaDescription = payload.metaDescription?.trim();
  let logoUpload;
  let bannerUpload;
  let result;
  try {
    logoUpload = await uploadCloudinary_default(logo, "image");
    if (!logoUpload?.secure_url || !logoUpload.public_id) {
      throw new appError_default(
        httpStatus9.INTERNAL_SERVER_ERROR,
        "Failed to upload brand logo!"
      );
    }
    bannerUpload = banner && await uploadCloudinary_default(banner, "image");
    if (banner && (!bannerUpload?.secure_url || !bannerUpload?.public_id)) {
      throw new appError_default(
        httpStatus9.INTERNAL_SERVER_ERROR,
        "Failed to upload brand banner!"
      );
    }
    result = await prisma.brands.create({
      data: {
        name: payload.name.trim(),
        slug: brandSlug,
        displayOrder,
        logo: logoUpload.secure_url,
        logoPublicId: logoUpload.public_id,
        isFeatured,
        ...banner && bannerUpload && {
          banner: bannerUpload?.secure_url,
          bannerPublicId: bannerUpload?.public_id
        },
        ...description && { description },
        ...website && { website },
        ...metaTitle && { metaTitle },
        ...metaDescription && { metaDescription },
        ...payload.status && {
          status: payload.status
        }
      }
    });
  } catch (error) {
    const cleanupTasks = [logoUpload?.public_id, bannerUpload?.public_id].filter((publicId) => Boolean(publicId)).map((publicId) => cloudinary_default.uploader.destroy(publicId));
    const cleanupResults = await Promise.allSettled(cleanupTasks);
    cleanupResults.forEach((result2) => {
      if (result2.status === "rejected") {
        console.error("Cloudinary cleanup failed:", result2.reason);
      }
    });
    throw error;
  }
  return result;
};
var updateBrandOnDB = async (performerId, slug, payload, images) => {
  const logo = images?.logo?.[0];
  const banner = images?.banner?.[0];
  if (!performerId) {
    throw new appError_default(
      httpStatus9.UNAUTHORIZED,
      "You do not have permission to update a brand!"
    );
  }
  if (!slug) {
    throw new appError_default(
      httpStatus9.BAD_REQUEST,
      "Please choose a valid brand that you wan't to update!"
    );
  }
  const hasImages = Boolean(logo || banner);
  const hasPayload = Object.values(payload ?? {}).some(
    (value) => value !== void 0
  );
  if (!hasImages && !hasPayload) {
    throw new appError_default(
      httpStatus9.BAD_REQUEST,
      "Please provide at least one field or image to update!"
    );
  }
  const performer = await prisma.users.findUnique({
    where: {
      id: performerId,
      isDeleted: false
    },
    select: {
      role: true,
      status: true
    }
  });
  if (!performer || performer.role !== "SUPER_ADMIN" && performer.role !== "ADMIN" || performer.status !== "ACTIVE") {
    throw new appError_default(
      httpStatus9.FORBIDDEN,
      "You do not have permission to update a brand!"
    );
  }
  const targetedBrand = await prisma.brands.findUnique({
    where: {
      slug
    },
    select: {
      id: true,
      logoPublicId: true,
      bannerPublicId: true
    }
  });
  if (!targetedBrand) {
    throw new appError_default(
      httpStatus9.NOT_FOUND,
      "Please try to update a valid brand!"
    );
  }
  const name = payload.name && payload.name.trim();
  const brandSlug = payload.slug !== void 0 ? payload.slug.trim().toLowerCase().replace(/\s+/g, "-") : name?.toLowerCase().replace(/\s+/g, "-");
  const description = payload.description?.trim();
  const website = payload.website?.trim();
  const isFeatured = payload.isFeatured !== void 0 && (typeof payload.isFeatured === "string" && payload.isFeatured === "true" || payload.isFeatured === true);
  const displayOrder = payload.displayOrder !== void 0 ? Number(payload.displayOrder) : void 0;
  if (displayOrder !== void 0 && (!Number.isSafeInteger(displayOrder) || displayOrder < 0)) {
    throw new appError_default(
      httpStatus9.BAD_REQUEST,
      "Display order must be a non-negative integer!"
    );
  }
  const metaTitle = payload.metaTitle?.trim();
  const metaDescription = payload.metaDescription?.trim();
  const status = payload.status;
  const oldLogoPublicId = targetedBrand.logoPublicId;
  const oldBannerPublicId = targetedBrand.bannerPublicId;
  let logoUpload;
  let bannerUpload;
  let result;
  try {
    logoUpload = logo && await uploadCloudinary_default(logo, "image");
    if (logo && (!logoUpload?.secure_url || !logoUpload.public_id)) {
      throw new appError_default(
        httpStatus9.INTERNAL_SERVER_ERROR,
        "Failed to upload brand logo!"
      );
    }
    bannerUpload = banner && await uploadCloudinary_default(banner, "image");
    if (banner && (!bannerUpload?.secure_url || !bannerUpload?.public_id)) {
      throw new appError_default(
        httpStatus9.INTERNAL_SERVER_ERROR,
        "Failed to upload brand banner!"
      );
    }
    result = await prisma.brands.update({
      where: {
        id: targetedBrand.id
      },
      data: {
        ...name !== void 0 && { name },
        ...brandSlug !== void 0 && { slug: brandSlug },
        ...description !== void 0 && { description },
        ...website !== void 0 && { website },
        ...payload.isFeatured !== void 0 ? { isFeatured } : {},
        ...displayOrder !== void 0 && { displayOrder },
        ...metaTitle !== void 0 && { metaTitle },
        ...metaDescription !== void 0 && { metaDescription },
        ...status !== void 0 && { status },
        ...logoUpload?.secure_url && logoUpload.public_id && {
          logo: logoUpload.secure_url,
          logoPublicId: logoUpload.public_id
        },
        ...bannerUpload?.secure_url && bannerUpload.public_id && {
          banner: bannerUpload.secure_url,
          bannerPublicId: bannerUpload.public_id
        }
      }
    });
  } catch (error) {
    const cleanupTasks = [logoUpload?.public_id, bannerUpload?.public_id].filter((publicId) => Boolean(publicId)).map((publicId) => cloudinary_default.uploader.destroy(publicId));
    const cleanupResults = await Promise.allSettled(cleanupTasks);
    cleanupResults.forEach((result2) => {
      if (result2.status === "rejected") {
        console.error("Cloudinary cleanup failed:", result2.reason);
      }
    });
    throw error;
  }
  const oldPublicIds = [
    logoUpload?.public_id ? oldLogoPublicId : null,
    bannerUpload?.public_id ? oldBannerPublicId : null
  ].filter((id) => Boolean(id));
  const deletionResults = await Promise.allSettled(
    oldPublicIds.map((publicId) => cloudinary_default.uploader.destroy(publicId))
  );
  deletionResults.forEach((item) => {
    if (item.status === "rejected") {
      console.error("Old image deletion failed:", item.reason);
    }
  });
  return result;
};
var BrandServices = {
  createBrandOnDB,
  updateBrandOnDB
};

// src/modules/brand/brand.controller.ts
import httpStatus10 from "http-status";
var createBrand = catchAsync_default(
  async (req, res, next) => {
    const id = req.user?.id;
    const payload = req.body;
    const images = req.files;
    const result = await BrandServices.createBrandOnDB(
      id,
      payload,
      images
    );
    sendResponse(res, {
      success: true,
      message: "Brand Created successfully!",
      statusCode: httpStatus10.CREATED,
      data: result
    });
  }
);
var updateBrand = catchAsync_default(
  async (req, res, next) => {
    const id = req.user?.id;
    const slug = req.params.slug;
    const payload = req.body;
    const images = req.files;
    const result = await BrandServices.updateBrandOnDB(
      id,
      slug,
      payload,
      images
    );
    sendResponse(res, {
      success: true,
      message: "Brand updated successfully!",
      statusCode: httpStatus10.OK,
      data: result
    });
  }
);
var BrandControllers = {
  createBrand,
  updateBrand
};

// src/modules/brand/brand.validation.ts
import { z as z6 } from "zod";
var createBrandValidationSchema = z6.object({
  name: z6.string().trim().min(1, "Brand name is required.").max(50, "Brand name cannot exceed 50 characters."),
  slug: z6.string().trim().min(1, "Brand slug is required.").max(60, "Brand slug cannot exceed 60 characters.").regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must contain lowercase letters, numbers, and hyphens only."
  ),
  description: z6.string().trim().max(255, "Description cannot exceed 255 characters.").optional(),
  logo: z6.string().url("Invalid logo URL").optional().nullable(),
  banner: z6.string().url("Please provide a valid image URL").optional().nullable(),
  website: z6.string().trim().url("Please provide a valid website URL.").optional(),
  isFeatured: z6.enum(["true", "false"]).default("false"),
  displayOrder: z6.coerce.number().int("Display order must be an integer.").min(0).max(32767),
  metaTitle: z6.string().trim().optional(),
  metaDescription: z6.string().trim().optional(),
  status: z6.enum(["ACTIVE", "INACTIVE", "ARCHIVED"]).default("INACTIVE")
});
var updateBrandValidationSchema = createBrandValidationSchema.partial();

// src/modules/brand/brand.routes.ts
var router4 = Router4();
router4.post(
  "/",
  auth(UserRoles.SUPER_ADMIN, UserRoles.ADMIN),
  uploadMultipleFields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 }
  ]),
  validateSchema(createBrandValidationSchema),
  BrandControllers.createBrand
);
router4.patch(
  "/:slug/update",
  auth(UserRoles.SUPER_ADMIN, UserRoles.ADMIN),
  uploadMultipleFields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 }
  ]),
  validateSchema(updateBrandValidationSchema),
  BrandControllers.updateBrand
);
var brandRoutes = router4;

// src/routes/index.ts
var router5 = Router5();
router5.use("/auth", authRoutes);
router5.use("/user", userRoutes);
router5.use("/category", categoryRoutes);
router5.use("/brand", brandRoutes);
var routes_default = router5;

// src/middlewares/globalErrorHandler.ts
import httpStatus11 from "http-status";
import { ZodError } from "zod";
var globalErrorHandler = (error, req, res, next) => {
  let statusCode = httpStatus11.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong!";
  let errorName = "InternalServerError";
  let errors = [];
  if (error instanceof appError_default) {
    statusCode = error.statusCode;
    message = error.message;
    errorName = error.name;
  } else if (error instanceof ZodError) {
    statusCode = httpStatus11.BAD_REQUEST;
    message = "Validation failed!";
    errorName = "ZodError";
    errors = error.issues.map((issue) => ({
      field: issue.path.length ? issue.path.join(".") : "unknown",
      message: issue.message
    }));
  } else if (error instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = httpStatus11.BAD_REQUEST;
    message = "Invalid database query. Please check the provided data.";
    errorName = "PrismaValidationError";
  } else if (error instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    errorName = "PrismaKnownRequestError";
    switch (error.code) {
      case "P2000":
        statusCode = httpStatus11.BAD_REQUEST;
        message = "The provided value is too long for this database column.";
        break;
      case "P2001":
        statusCode = httpStatus11.NOT_FOUND;
        message = "The requested record does not exist.";
        break;
      case "P2002":
        statusCode = httpStatus11.CONFLICT;
        message = "A record with this value already exists.";
        break;
      case "P2003":
        statusCode = httpStatus11.BAD_REQUEST;
        message = "Foreign key constraint failed.";
        break;
      case "P2004":
        statusCode = httpStatus11.BAD_REQUEST;
        message = "A database constraint failed.";
        break;
      case "P2011":
        statusCode = httpStatus11.BAD_REQUEST;
        message = "A required database field cannot be null.";
        break;
      case "P2012":
        statusCode = httpStatus11.BAD_REQUEST;
        message = "A required value is missing.";
        break;
      case "P2014":
        statusCode = httpStatus11.BAD_REQUEST;
        message = "The requested change violates a relation constraint.";
        break;
      case "P2015":
      case "P2018":
        statusCode = httpStatus11.NOT_FOUND;
        message = "A related record could not be found.";
        break;
      case "P2025":
        statusCode = httpStatus11.NOT_FOUND;
        message = "The requested record was not found.";
        break;
      case "P2023":
        statusCode = httpStatus11.BAD_REQUEST;
        message = "Invalid data provided for a database field.";
        break;
      default:
        statusCode = httpStatus11.INTERNAL_SERVER_ERROR;
        message = "A database operation failed.";
    }
  } else if (error instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    errorName = "PrismaInitializationError";
    switch (error.errorCode) {
      case "P1000":
        statusCode = httpStatus11.INTERNAL_SERVER_ERROR;
        message = "Database authentication failed.";
        break;
      case "P1001":
        statusCode = httpStatus11.SERVICE_UNAVAILABLE;
        message = "Unable to connect to the database server.";
        break;
      case "P1002":
        statusCode = httpStatus11.SERVICE_UNAVAILABLE;
        message = "Database connection timed out.";
        break;
      case "P1003":
        statusCode = httpStatus11.INTERNAL_SERVER_ERROR;
        message = "The requested database does not exist.";
        break;
      default:
        statusCode = httpStatus11.INTERNAL_SERVER_ERROR;
        message = "Database initialization failed.";
    }
  } else if (error instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = httpStatus11.INTERNAL_SERVER_ERROR;
    message = "An unknown database query error occurred.";
    errorName = "PrismaUnknownRequestError";
  } else if (error instanceof prismaNamespace_exports.PrismaClientRustPanicError) {
    statusCode = httpStatus11.INTERNAL_SERVER_ERROR;
    message = "A critical database engine error occurred.";
    errorName = "PrismaRustPanicError";
  } else if (error instanceof Error) {
    message = error.message;
    errorName = error.name;
  }
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    name: errorName,
    ...errors.length > 0 && { errors }
  });
};
var globalErrorHandler_default = globalErrorHandler;

// src/app.ts
var app = express();
app.use(helmet());
app.use(
  cors({
    origin: [config.frontend_url_dev]
  })
);
app.use(
  pino({
    redact: [
      "req.headers.authorization",
      "req.headers.cookie",
      "res.headers.set-cookie"
    ]
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Welcome to CCL E-commerce server!");
});
app.get("/api/v1", (req, res) => {
  res.send("Welcome to CCL E-commerce server version 1 is boosted on\u{1F525}\u{1F525}!");
});
app.use("/api/v1", routes_default);
app.use(notFound);
app.use(globalErrorHandler_default);
var app_default = app;

// src/server.ts
var port = config.port || 5e3;
async function main() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
    app_default.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log("Error starting the server :", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
//# sourceMappingURL=server.js.map