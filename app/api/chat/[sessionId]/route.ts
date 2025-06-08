import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { NextApiRequest } from 'next'
import type { NextRequestWithParams } from 'next/server'

// Fix: Use correct typing
export async function GET(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const { sessionId } = params

  const messages = await prisma.message.findMany({
    where: { chatSessionId: sessionId },
    orderBy: { createdAt: 'asc' },
  })

  return Response.json({ messages })
}
