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
import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const sessionId = url.pathname.split('/').pop() // Get sessionId from URL

  if (!sessionId) {
    return new Response('Session ID not found', { status: 400 })
  }

  const messages = await prisma?.message?.findMany({
    where: { chatSessionId: sessionId },
    orderBy: { createdAt: 'asc' },
  })

  return Response.json({ messages })
}
