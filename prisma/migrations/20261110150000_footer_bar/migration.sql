-- AlterTable
ALTER TABLE "SiteSettings"
ADD COLUMN "footerCopyright" TEXT DEFAULT '© 2026 SAF Food & Beverage Ltd.',
ADD COLUMN "footerCertifications" TEXT[] DEFAULT ARRAY[]::TEXT[];
