-- CreateTable
CREATE TABLE "Session" (
    "sessionId" TEXT NOT NULL,
    "session" JSONB NOT NULL,
    "expiry" TIMESTAMP(6) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionId_key" ON "Session"("sessionId");
