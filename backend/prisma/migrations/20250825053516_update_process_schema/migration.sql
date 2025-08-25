/*
  Warnings:

  - You are about to drop the `Andamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Processo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Andamento";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Processo";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Process" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "openingdate" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "advocate" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Progress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "processId" INTEGER NOT NULL,
    CONSTRAINT "Progress_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Process" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Process_number_key" ON "Process"("number");

-- CreateIndex
CREATE INDEX "Process_number_idx" ON "Process"("number");

-- CreateIndex
CREATE INDEX "Progress_processId_idx" ON "Progress"("processId");
