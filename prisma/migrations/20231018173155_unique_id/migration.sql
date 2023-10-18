/*
  Warnings:

  - A unique constraint covering the columns `[passage_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "dt_created" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Profile" ALTER COLUMN "dt_updated" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Profile" ALTER COLUMN "role" SET DEFAULT E'VOLUNTEER';

-- CreateIndex
CREATE UNIQUE INDEX "Profile_passage_id_key" ON "Profile"("passage_id");
