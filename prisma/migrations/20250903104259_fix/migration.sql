/*
  Warnings:

  - You are about to drop the column `mime_type` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `print_settings` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `service_type` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total_pages` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total_amount` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."Document" DROP COLUMN "mime_type",
DROP COLUMN "print_settings",
ADD COLUMN     "binding" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "color" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lamination" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "status",
ADD COLUMN     "order_status" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "service_type" SET NOT NULL,
ALTER COLUMN "total_pages" SET NOT NULL,
ALTER COLUMN "total_amount" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "user_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_user_id_key" ON "public"."Order"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "public"."User"("user_id");

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
