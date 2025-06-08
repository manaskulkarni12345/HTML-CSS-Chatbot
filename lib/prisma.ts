
// // import { PrismaClient } from '@prisma/client';

// // const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// // export const prisma =
// //   globalForPrisma.prisma || new PrismaClient();

// // if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// // lib/prisma.ts
// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma = globalForPrisma.prisma ?? new PrismaClient();
// globalForPrisma.prisma = prisma; // ✅ Always set it, no if block
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // optional: logs queries to terminal
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
