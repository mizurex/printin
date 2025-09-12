/*
  Warnings:

  - You are about to drop the column `order_id` on the `DeliveryInfo` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `PickupInfo` table. All the data in the column will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `DeliveryInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId]` on the table `PickupInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `DeliveryInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `orderId` to the `PickupInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."DeliveryInfo" DROP CONSTRAINT "DeliveryInfo_order_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Document" DROP CONSTRAINT "Document_order_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."PickupInfo" DROP CONSTRAINT "PickupInfo_order_id_fkey";

-- DropIndex
DROP INDEX "public"."DeliveryInfo_order_id_key";

-- DropIndex
DROP INDEX "public"."Order_user_id_key";

-- DropIndex
DROP INDEX "public"."PickupInfo_order_id_key";

-- AlterTable
ALTER TABLE "public"."DeliveryInfo" DROP COLUMN "order_id",
ADD COLUMN     "orderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Document" DROP COLUMN "order_id",
ADD COLUMN     "orderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "user_id",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."PickupInfo" DROP COLUMN "order_id",
ADD COLUMN     "orderId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."Test";

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryInfo_orderId_key" ON "public"."DeliveryInfo"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "PickupInfo_orderId_key" ON "public"."PickupInfo"("orderId");

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DeliveryInfo" ADD CONSTRAINT "DeliveryInfo_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PickupInfo" ADD CONSTRAINT "PickupInfo_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
