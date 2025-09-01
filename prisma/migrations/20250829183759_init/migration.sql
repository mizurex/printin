-- CreateEnum
CREATE TYPE "public"."ServiceType" AS ENUM ('DELIVERY', 'PICKUP');

-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'PAID', 'DELIVERED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT,
    "address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "order_number" SERIAL NOT NULL,
    "service_type" "public"."ServiceType" NOT NULL,
    "total_pages" INTEGER NOT NULL,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "status" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Document" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "file_url" TEXT NOT NULL,
    "mime_type" TEXT,
    "page_count" INTEGER NOT NULL DEFAULT 1,
    "print_settings" JSONB,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DeliveryInfo" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postal" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "DeliveryInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PickupInfo" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "store_id" TEXT NOT NULL,
    "store_name" TEXT NOT NULL,
    "store_addr" TEXT NOT NULL,

    CONSTRAINT "PickupInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Order_order_number_key" ON "public"."Order"("order_number");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryInfo_order_id_key" ON "public"."DeliveryInfo"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "PickupInfo_order_id_key" ON "public"."PickupInfo"("order_id");

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DeliveryInfo" ADD CONSTRAINT "DeliveryInfo_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PickupInfo" ADD CONSTRAINT "PickupInfo_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
