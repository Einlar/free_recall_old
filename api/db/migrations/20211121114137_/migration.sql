-- CreateEnum
CREATE TYPE "ListType" AS ENUM ('RANDOM', 'CATEGORIZED');

-- CreateTable
CREATE TABLE "WordList" (
    "id" SERIAL NOT NULL,
    "length" INTEGER NOT NULL,
    "type" "ListType" NOT NULL,
    "categories" TEXT[],
    "words" JSONB[],

    CONSTRAINT "WordList_pkey" PRIMARY KEY ("id")
);
