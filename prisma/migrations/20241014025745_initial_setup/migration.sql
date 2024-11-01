-- CreateTable
CREATE TABLE "Membership" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "features" TEXT[],

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);
