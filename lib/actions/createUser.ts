'use server';

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const prisma = new PrismaClient();

export async function createUser(formData: FormData) {
  const email = formData.get('email') as string;
  const name = formData.get('name') as string | null;
  const password = formData.get('password') as string;

  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('A user with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        name: name || null,
        password: hashedPassword,
      },
    });

    return true; // success
  } catch (error) {
    // Optional: log error here for debugging
    throw new Error(`User creation failed: ${(error as Error).message}`);
  } finally {
    await prisma.$disconnect();
  }
}
