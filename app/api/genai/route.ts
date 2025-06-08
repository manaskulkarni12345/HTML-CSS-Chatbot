import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function POST(req: Request | NextRequest) {
  try {
    const { prompt, sessionId } = await req.json()
   
    console.log('DATABASE_URL:', process.env.DATABASE_URL);

    // Find or create a chat session
    let session = sessionId && sessionId.length > 0
      ? await prisma.chatSession.findUnique({ where: { id: sessionId } })
      : null

    if (!session) {
      session = await prisma.chatSession.create({ data: {} })
    }

    // Save user prompt
    await prisma.message.create({
      data: {
        content: prompt,
        role: 'user',
        chatSessionId: session.id,
      },
    })

    // Call Gemini API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a professional web developer. Create a complete, clean, responsive HTML landing page for the following request: "${prompt}".

Requirements:
- Use semantic HTML5: header, section, main, footer.
- Include basic sections like hero, features, about, CTA, contact if relevant.
- Style using internal <style> tags with clean CSS.
- Mobile responsive layout using flex/grid.
- Do not use JavaScript or external libraries.
- Output only the full HTML code inside <!DOCTYPE html> ... no extra explanation or markdown.`,
                },
              ],
            },
          ],
        }),
      }
    )

    const data = await geminiResponse.json()

    // Parse Gemini response
    let code = data?.candidates?.[0]?.content?.parts?.[0]?.text || '<!-- Error generating code -->'
    code = code.replace(/```html|```/g, '').trim()

    // Save assistant's message
    await prisma.message.create({
      data: {
        content: code,
        role: 'assistant',
        chatSessionId: session.id,
      },
    })

    // Save preview for live view
    await prisma.previewPage.create({
      data: {
        htmlContent: code,
        sessionId: session.id,
      },
    })

    return Response.json({ code, sessionId: session.id })

  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ /api/genai error:', error.message)
      return new Response(
        JSON.stringify({ error: 'Internal Server Error', details: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    } else {
      console.error('❌ /api/genai unknown error:', error)
      return new Response(
        JSON.stringify({ error: 'Internal Server Error', details: 'Unknown error occurred' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }
  }
}
