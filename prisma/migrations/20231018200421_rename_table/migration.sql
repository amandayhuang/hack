/*
  Warnings:

  - You are about to drop the `ProfileInterests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProfileInterests" DROP CONSTRAINT "ProfileInterests_passage_id_fkey";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "dt_created" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Profile" ALTER COLUMN "dt_updated" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Profile" ALTER COLUMN "role" SET DEFAULT E'VOLUNTEER';

-- DropTable
DROP TABLE "ProfileInterests";

-- CreateTable
CREATE TABLE "Profile_Interest" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "passage_id" STRING NOT NULL,
    "interest_id" INT4 NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_Interest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Profile_Interest" ADD CONSTRAINT "Profile_Interest_passage_id_fkey" FOREIGN KEY ("passage_id") REFERENCES "Profile"("passage_id") ON DELETE RESTRICT ON UPDATE CASCADE;
