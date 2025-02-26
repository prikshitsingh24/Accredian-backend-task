/*
  Warnings:

  - You are about to drop the column `referredEmail` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `referredName` on the `Referral` table. All the data in the column will be lost.
  - Added the required column `refereeEmail` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refereeName` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Referral" DROP COLUMN "referredEmail",
DROP COLUMN "referredName",
ADD COLUMN     "refereeEmail" TEXT NOT NULL,
ADD COLUMN     "refereeName" TEXT NOT NULL;
