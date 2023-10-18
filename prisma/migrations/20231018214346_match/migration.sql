-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "dt_created" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Profile" ALTER COLUMN "dt_updated" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Profile" ALTER COLUMN "role" SET DEFAULT E'VOLUNTEER';

-- AlterTable
ALTER TABLE "Profile_Interest" ALTER COLUMN "dt_created" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Match" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "volunteer_passage_id" STRING NOT NULL,
    "participant_passage_id" STRING NOT NULL,
    "status" STRING NOT NULL DEFAULT E'ACTIVE',
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Match_volunteer_passage_id_key" ON "Match"("volunteer_passage_id");

-- CreateIndex
CREATE UNIQUE INDEX "Match_participant_passage_id_key" ON "Match"("participant_passage_id");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_volunteer_passage_id_fkey" FOREIGN KEY ("volunteer_passage_id") REFERENCES "Profile"("passage_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_participant_passage_id_fkey" FOREIGN KEY ("participant_passage_id") REFERENCES "Profile"("passage_id") ON DELETE RESTRICT ON UPDATE CASCADE;
