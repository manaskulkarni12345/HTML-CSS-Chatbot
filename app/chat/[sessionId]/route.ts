// import { prisma } from '@/lib/prisma'
// import { NextRequest } from 'next/server'

// export async function GET(req: NextRequest, { params }: { params: { sessionId: string } }) {
//   const { sessionId } = params

//   const messages = await prisma?.message?.findMany({
//     where: { chatSessionId: sessionId },
//     orderBy: { createdAt: 'asc' },
//   })

//   return Response.json({ messages })
// }

import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, context: { params: { sessionId: string } }) {
  const { sessionId } = context.params;

  const messages = await prisma.message.findMany({
    where: { chatSessionId: sessionId },
    orderBy: { createdAt: 'asc' },
  });

  return Response.json({ messages });
}
