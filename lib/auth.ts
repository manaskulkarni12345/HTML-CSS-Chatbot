'use server'

// import { prisma } from './prisma'
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs'

export async function createUser({
  email,
  name,
  password,
}: {
  email: string
  name?: string
  password: string
}) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  })

  return user
}
