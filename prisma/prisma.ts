import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}
  
const prisma = globalForPrisma.prisma ?? new PrismaClient()
  
if (process.env.NODE_ENV !== 'prod') {
  globalForPrisma.prisma = prisma;
}

export default prisma;

// This file enables us to start sending queries via the generated Prisma Client API