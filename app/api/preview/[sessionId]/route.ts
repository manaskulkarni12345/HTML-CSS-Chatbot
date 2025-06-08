// // pages/api/preview/[sessionId].ts
// import { prisma } from '@/lib/prisma'
// import { NextRequest } from 'next/server'

// export async function GET(req: NextRequest, { params }: { params: { sessionId: string } }) {
//   const { sessionId } = params

//   const previews = await prisma.previewPage.findMany({
//     where: { sessionId },
//     orderBy: { createdAt: 'asc' },
//   })

//   return Response.json({
//     htmlPages: previews.map((p) => p.htmlContent),
//   })
// }
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  context: any // ✅ simplest fix
) {
  const sessionId = context.params.sessionId

  if (!sessionId) {
    return new NextResponse('Session ID not found', { status: 400 })
  }

  const messages = await prisma.message.findMany({
    where: { chatSessionId: sessionId },
    orderBy: { createdAt: 'asc' },
  })

  return NextResponse.json({ messages })
}
