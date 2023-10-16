-- CreateTable
CREATE TABLE "Profile" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "bio" STRING,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);
