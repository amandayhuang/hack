/*
  Warnings:

  - You are about to drop the column `bio` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `passage_id` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "bio";
ALTER TABLE "Profile" ADD COLUMN     "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Profile" ADD COLUMN     "dt_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Profile" ADD COLUMN     "email" STRING;
ALTER TABLE "Profile" ADD COLUMN     "passage_id" STRING NOT NULL;
ALTER TABLE "Profile" ADD COLUMN     "phone" STRING;
