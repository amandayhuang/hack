-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "status" SET DEFAULT E'ACTIVE';
ALTER TABLE "Match" ALTER COLUMN "dt_created" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Match" ALTER COLUMN "dt_updated" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "image" STRING;
ALTER TABLE "Profile" ALTER COLUMN "dt_created" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Profile" ALTER COLUMN "dt_updated" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Profile" ALTER COLUMN "role" SET DEFAULT E'VOLUNTEER';

-- AlterTable
ALTER TABLE "Profile_Interest" ALTER COLUMN "dt_created" SET DEFAULT CURRENT_TIMESTAMP;
