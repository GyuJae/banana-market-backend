-- CreateTable
CREATE TABLE "_MessageRoomToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MessageRoomToUser_AB_unique" ON "_MessageRoomToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MessageRoomToUser_B_index" ON "_MessageRoomToUser"("B");

-- AddForeignKey
ALTER TABLE "_MessageRoomToUser" ADD FOREIGN KEY ("A") REFERENCES "MessageRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MessageRoomToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
