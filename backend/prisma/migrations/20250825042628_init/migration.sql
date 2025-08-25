-- CreateTable
CREATE TABLE "Processo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" TEXT NOT NULL,
    "dataAbertura" DATETIME NOT NULL,
    "descricao" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "advogado" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Andamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "descricao" TEXT NOT NULL,
    "processoId" INTEGER NOT NULL,
    CONSTRAINT "Andamento_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES "Processo" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Processo_numero_key" ON "Processo"("numero");

-- CreateIndex
CREATE INDEX "Processo_numero_idx" ON "Processo"("numero");

-- CreateIndex
CREATE INDEX "Andamento_processoId_idx" ON "Andamento"("processoId");
