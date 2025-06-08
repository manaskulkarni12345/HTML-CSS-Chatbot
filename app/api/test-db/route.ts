// // import { NextResponse } from 'next/server';
// // import { PrismaClient } from '@prisma/client';

// // const prisma = new PrismaClient();

// // export async function GET() {
// //   try {
// //     // Just fetch one user or count users
// //     const usersCount = await prisma.user.count();
// //     return NextResponse.json({ message: 'DB connected!', usersCount });
// //   } catch (error) {
// //     return NextResponse.json({ error: 'DB connection failed', details: error.message }, { status: 500 });
// //   }
// // }
// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET() {
//   try {
//     const usersCount = await prisma.user.count();
//     return NextResponse.json({ message: 'DB connected!', usersCount });
//   } catch (error: unknown) {
//     let errorMessage = 'Unknown error';

//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }

//     return NextResponse.json(
//       { error: 'DB connection failed', details: errorMessage },
//       { status: 500 }
//     );
//   }
// }

import { PrismaClient } from '@prisma/client';


async function testConnection() {
  const prisma = new PrismaClient();

  try {
    const usersCount = await prisma.user.count();
    console.log('✅ Database connected! Users count:', usersCount);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
