-- AlterTable
ALTER TABLE "public"."Order" ALTER COLUMN "service_type" DROP NOT NULL,
ALTER COLUMN "total_pages" DROP NOT NULL,
ALTER COLUMN "total_amount" DROP NOT NULL,
ALTER COLUMN "created_at" DROP NOT NULL;
