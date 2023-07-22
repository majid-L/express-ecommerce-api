/*
  Warnings:

  - Made the column `username` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "password" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET NOT NULL;
