/*
  Warnings:

  - You are about to drop the column `dt_of_birth` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "dt_of_birth";
ALTER TABLE "Profile" ADD COLUMN     "description" STRING;
ALTER TABLE "Profile" ALTER COLUMN "dt_created" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Profile" ALTER COLUMN "dt_updated" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Profile" ALTER COLUMN "role" SET DEFAULT E'VOLUNTEER';

-- CreateTable
CREATE TABLE "ProfileInterests" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "passage_id" STRING NOT NULL,
    "interest_id" INT4 NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfileInterests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfileInterests" ADD CONSTRAINT "ProfileInterests_passage_id_fkey" FOREIGN KEY ("passage_id") REFERENCES "Profile"("passage_id") ON DELETE RESTRICT ON UPDATE CASCADE;
