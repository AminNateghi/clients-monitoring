-- CreateTable
CREATE TABLE "Clients" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "port" INTEGER NOT NULL DEFAULT 80,
    "title" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "isOffline" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clients_url_key" ON "Clients"("url");

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
