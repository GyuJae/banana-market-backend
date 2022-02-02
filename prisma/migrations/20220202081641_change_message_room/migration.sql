/*
  Warnings:

  - You are about to drop the column `userId` on the `MessageRoom` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MessageRoom" DROP CONSTRAINT "MessageRoom_userId_fkey";

-- AlterTable
ALTER TABLE "MessageRoom" DROP COLUMN "userId";
