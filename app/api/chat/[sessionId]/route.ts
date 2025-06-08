import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Define the params type explicitly for Next.js 15
type RouteParams = {
  params: Promise<{ sessionId: string }>
}

export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  // Await the params object in Next.js 15
  const { sessionId } = await params;

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
  }

  try {
    const messages = await prisma.message.findMany({
      where: { chatSessionId: sessionId },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

// If you have POST, PUT, DELETE methods, update them similarly
export async function POST(
  req: NextRequest,
  { params }: RouteParams
) {
  const { sessionId } = await params;
  
  // Your POST logic here
  try {
    const body = await req.json();
    
    // Example: Create a new message
    const message = await prisma.message.create({
      data: {
        ...body,
        chatSessionId: sessionId,
      },
    });

    return NextResponse.json({ message });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 });
  }
}