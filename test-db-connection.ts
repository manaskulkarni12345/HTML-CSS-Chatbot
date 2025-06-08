import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test() {
  try {
    const result = await prisma.user.findMany();
    console.log('DB Connection OK, users:', result);
  } catch (error) {
    console.error('DB connection error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
