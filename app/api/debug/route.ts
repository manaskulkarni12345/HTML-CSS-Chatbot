// app/api/debug-env/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const databaseUrl = process.env.DATABASE_URL;

  return NextResponse.json({
    hasDbUrl: !!databaseUrl,
    urlStart: databaseUrl?.substring(0, 20) + '...' // Don't expose full URL
  });
}