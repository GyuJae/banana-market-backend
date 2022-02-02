/*
  Warnings:

  - You are about to drop the `_MessageRoomToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `buyerId` to the `MessageRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerId` to the `MessageRoom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_MessageRoomToUser" DROP CONSTRAINT "_MessageRoomToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MessageRoomToUser" DROP CONSTRAINT "_MessageRoomToUser_B_fkey";

-- AlterTable
ALTER TABLE "MessageRoom" ADD COLUMN     "buyerId" INTEGER NOT NULL,
ADD COLUMN     "sellerId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER;

-- DropTable
DROP TABLE "_MessageRoomToUser";

-- AddForeignKey
ALTER TABLE "MessageRoom" ADD CONSTRAINT "MessageRoom_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageRoom" ADD CONSTRAINT "MessageRoom_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageRoom" ADD CONSTRAINT "MessageRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
