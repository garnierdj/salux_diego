import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error", "warn"],
    });

// Always use singleton pattern to prevent multiple instances in serverless environments
// This is critical for Vercel serverless functions to avoid connection limit issues
if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = prisma;
}

export default prisma;
