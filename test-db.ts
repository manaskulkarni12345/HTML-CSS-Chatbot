// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function test() {
//   try {
//     const result = await prisma.$queryRaw`SELECT 1`;
//     console.log('DB connected:', result);
//   } catch (error) {
//     console.error('DB connection error:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// test();
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test() {
  try {
    const count = await prisma.user.count();
    console.log("✅ Connected. Users count:", count);
  } catch (e) {
    console.error("❌ DB connect failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
