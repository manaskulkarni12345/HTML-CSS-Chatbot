
// import { prisma } from '@/lib/prisma'
// import { NextRequest } from 'next/server'

// export async function POST(req: Request | NextRequest) {
//     const { prompt, sessionId } = await req.json()

//     let session = sessionId && sessionId.length > 0
//         ? await prisma.chatSession.findUnique({ where: { id: sessionId } })
//         : null

//     if (!session) {
//         session = await prisma.chatSession.create({ data: {} })
//     }

//     // Store the user's prompt
//     await prisma.message.create({
//         data: {
//             content: prompt,
//             role: 'user',
//             chatSessionId: session.id,
//         },
//     })

//     // Call the Gemini API with the prompt
//     const geminiResponse = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//         {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             //   body: JSON.stringify({
//             //     contents: [
//             //       {
//             //         parts: [
//             //           {
//             //             text: `Generate a complete HTML page with CSS in <style> tags for the following: ${prompt}. Return only the HTML code.`,
//             //           },
//             //         ],
//             //       },
//             //     ],
//             //   }),
//             body: JSON.stringify({
//                 contents: [
//                     {
//                         parts: [
//                             {
//                                 text: `You are a professional web developer. Create a complete, clean, responsive HTML landing page for the following request: "${prompt}".

// Requirements:
// - Use semantic HTML5: header, section, main, footer.
// - Include basic sections like hero, features, about, CTA, contact if relevant.
// - Style using internal <style> tags with clean CSS.
// - Mobile responsive layout using flex/grid.
// - Do not use JavaScript or external libraries.
// - Output only the full HTML code inside <!DOCTYPE html> ... no extra explanation or markdown.`,
//                             },
//                         ],
//                     },
//                 ],
//             }),

//         }
//     )

//     const data = await geminiResponse.json()

//     // Extract HTML code from the Gemini response
//     let code = data?.candidates?.[0]?.content?.parts?.[0]?.text || '<!-- Error generating code -->'

//     // Remove markdown wrapping if any (e.g. ```html ... ```)
//     code = code.replace(/```html|```/g, '').trim()

//     // Store the assistant's message
//     await prisma.message.create({
//         data: {
//             content: code,
//             role: 'assistant',
//             chatSessionId: session.id,
//         },
//     })

//     // Store HTML preview for live previewing
//     await prisma.previewPage.create({
//         data: {
//             htmlContent: code,
//             sessionId: session.id,
//         },
//     })

//     // Respond with the code and sessionId so frontend can continue the session
//     return Response.json({ code, sessionId: session.id })
// }
import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const { prompt, sessionId } = await req.json()

        let session = sessionId && sessionId.length > 0
            ? await prisma.chatSession.findUnique({ where: { id: sessionId } })
            : null

        if (!session) {
            session = await prisma.chatSession.create({ data: {} })
        }

        // Store the user's prompt
        await prisma.message.create({
            data: {
                content: prompt,
                role: 'user',
                chatSessionId: session.id,
            },
        })

        // Call the Gemini API with the prompt
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

        if (!geminiResponse.ok) {
            throw new Error(`Gemini API error: ${geminiResponse.status}`)
        }

        const data = await geminiResponse.json()

        // Extract HTML code from the Gemini response
        let code = data?.candidates?.[0]?.content?.parts?.[0]?.text || '<!-- Error generating code -->'

        // Remove markdown wrapping if any (e.g. ```html ... ```)
        code = code.replace(/```html|```/g, '').trim()

        // Store the assistant's message
        await prisma.message.create({
            data: {
                content: code,
                role: 'assistant',
                chatSessionId: session.id,
            },
        })

        // Store HTML preview for live previewing
        await prisma.previewPage.create({
            data: {
                htmlContent: code,
                sessionId: session.id,
            },
        })

        // Respond with the code and sessionId so frontend can continue the session
        return Response.json({ code, sessionId: session.id })

    } catch (error) {
        console.error('Error in /api/genai:', error)
        return Response.json(
            { error: 'Failed to generate content' }, 
            { status: 500 }
        )
    } finally {
        // Disconnect Prisma to prevent connection leaks
        await prisma.$disconnect()
    }
}