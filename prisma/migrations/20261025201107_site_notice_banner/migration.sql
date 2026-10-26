-- AlterTable
ALTER TABLE "SiteSettings" ADD COLUMN     "noticeEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "noticeHref" TEXT,
ADD COLUMN     "noticeText" TEXT;
