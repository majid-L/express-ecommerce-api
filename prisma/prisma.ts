import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

// This file enables us to start sending queries via the generated Prisma Client API