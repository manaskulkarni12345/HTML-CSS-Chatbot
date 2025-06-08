// import { NextRequest } from 'next/server'
// import { prisma } from '@/lib/prisma'

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { sessionId: string } }
// ) {
//   const { sessionId } = params

//   const messages = await prisma.message.findMany({
//     where: { chatSessionId: sessionId },
//     orderBy: { createdAt: 'asc' },
//   })

//   return Response.json({ messages })
// }
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, context: any) {
  const sessionId = context.params.sessionId;

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
  }

  const messages = await prisma.message.findMany({
    where: { chatSessionId: sessionId },
    orderBy: { createdAt: 'asc' },
  });

  return NextResponse.json({ messages });
}
