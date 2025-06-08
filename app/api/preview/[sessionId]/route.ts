// // // pages/api/preview/[sessionId].ts
// // import { prisma } from '@/lib/prisma'
// // import { NextRequest } from 'next/server'

// // export async function GET(req: NextRequest, { params }: { params: { sessionId: string } }) {
// //   const { sessionId } = params

// //   const previews = await prisma.previewPage.findMany({
// //     where: { sessionId },
// //     orderBy: { createdAt: 'asc' },
// //   })

// //   return Response.json({
// //     htmlPages: previews.map((p) => p.htmlContent),
// //   })
// // }
// // app/api/preview/[sessionId]/route.ts

// import { prisma } from '@/lib/prisma'
// import { NextRequest, NextResponse } from 'next/server'

// export async function GET(
//   req: NextRequest,
//   context
// ) {
//   const sessionId = context.params.sessionId

//   if (!sessionId) {
//     return NextResponse.json({ error: 'Missing session ID' }, { status: 400 })
//   }

//   const messages = await prisma.message.findMany({
//     where: { chatSessionId: sessionId },
//     orderBy: { createdAt: 'asc' },
//   })

//   return NextResponse.json({ messages })
// }
// app/api/preview/[sessionId]/route.ts
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// Define the params type explicitly for Next.js 15
type RouteParams = {
  params: Promise<{ sessionId: string }>
}

export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  // Await the params object in Next.js 15
  const { sessionId } = await params

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session ID' }, { status: 400 })
  }

  try {
    const messages = await prisma.message.findMany({
      where: { chatSessionId: sessionId },
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json({ messages })
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}