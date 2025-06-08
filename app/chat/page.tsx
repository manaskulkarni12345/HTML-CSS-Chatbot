// // 'use client'

// // import { useEffect, useState } from 'react'
// // import { Input } from '@/components/ui/input'
// // import { Button } from '@/components/ui/button'

// // export default function ChatPage() {
// //   const [prompt, setPrompt] = useState('')
// //   const [sessionId, setSessionId] = useState<string | null>(null)
// //   const [responses, setResponses] = useState<{ html: string, prompt: string }[]>([])
// //   const [loading, setLoading] = useState(false)

// //   useEffect(() => {
// //     if (sessionId) {
// //       fetchHistory()
// //     }
// //   }, [sessionId])

// //   const fetchHistory = async () => {
// //     const res = await fetch(`/api/chat/${sessionId}`)
// //     const data = await res.json()
// //     const previewRes = await fetch(`/api/preview/${sessionId}`)
// //     const previewData = await previewRes.json()

// //     const htmls = previewData.htmlPages || []
// //     const userPrompts = data.messages.filter((m: any) => m.role === 'user').map((m: any) => m.content)

// //     const combined = htmls.map((html: string, i: number) => ({
// //       html,
// //       prompt: userPrompts[i] || 'Unknown prompt',
// //     }))

// //     setResponses(combined)
// //   }

// //   const handleGenerate = async () => {
// //     if (!prompt.trim()) return
// //     setLoading(true)

// //     const res = await fetch('/api/genai', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ prompt, sessionId }),
// //     })

// //     const data = await res.json()
// //     setSessionId(data.sessionId)
// //     setPrompt('')
// //     setLoading(false)

// //     setResponses((prev) => [...prev, { html: data.code, prompt }])
// //   }

// //   const handleDownload = (html: string, idx: number) => {
// //     const blob = new Blob([html], { type: 'text/html' })
// //     const url = URL.createObjectURL(blob)
// //     const a = document.createElement('a')
// //     a.href = url
// //     a.download = `generated_${idx + 1}.html`
// //     a.click()
// //     URL.revokeObjectURL(url)
// //   }

// //   return (
// //     <div className="flex flex-col h-screen items-center">
// //       {/* <h1 className="text-4xl font-extrabold text-center pt-6 pb-2 text-green-700">
// //         Build a Chatbot for HTML & CSS Generation
// //       </h1> */}

// //       <div className="flex-1 overflow-auto px-6 space-y-6 pb-32 max-w-[1000px] w-full">
// //         {responses.length === 0 ? (
// //           <div className="text-center mt-24 text-gray-800 space-y-6">
// //             <h2 className="text-3xl md:text-4xl font-bold">
// //               👋 Welcome to Your AI-powered UI Builder!
// //             </h2>
// //             <p className="text-xl max-w-2xl mx-auto leading-relaxed">
// //               Describe the UI you want — a login form, landing page, navbar, or anything — and we’ll generate it instantly using HTML & CSS.
// //               <br />
// //               No setup, no styling worries. Just type, generate, and preview live!
// //             </p>
// //             <p className="text-md italic text-gray-500">✨ Let’s start building beautiful interfaces — one prompt at a time.</p>
// //           </div>
// //         ) : (
// //           responses.map((res, idx) => (
// //             <div key={idx} className="flex flex-col gap-2.5 p-2.5 overflow-hidden">
// //               <div className="px-4 py-2 text-lg font-medium max-w-[80%] self-end rounded-lg bg-gray-100 max-h-[500px]">
// //                 {res.prompt}
// //               </div>

// //               <div className="w-full h-screen preview-pane">
// //                 <iframe
// //                   srcDoc={res.html}
// //                   className="w-full h-full bg-white"
// //                   title={`Preview ${idx + 1}`}
// //                 />
// //               </div>

// //               <div className="relative border border-gray-300 rounded bg-gray-50 p-4 text-sm whitespace-pre-wrap font-mono">
// //                 <button
// //                   onClick={() => handleDownload(res.html, idx)}
// //                   className="absolute top-2 right-2 px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
// //                 >
// //                   Download
// //                 </button>
// //                 {res.html}
// //               </div>
// //             </div>
// //           ))
// //         )}
// //       </div>

// //       <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl bg-white border-t px-4 py-3">
// //         <form
// //           onSubmit={(e) => {
// //             e.preventDefault()
// //             handleGenerate()
// //           }}
// //           className="flex items-end gap-3"
// //         >
// //           <textarea
// //             value={prompt}
// //             onChange={(e) => setPrompt(e.target.value)}
// //             onKeyDown={(e) => {
// //               if (e.key === 'Enter' && !e.shiftKey) {
// //                 e.preventDefault()
// //                 handleGenerate()
// //               }
// //             }}
// //             placeholder="Talk to generate a UI layout..."
// //             className="w-full min-h-[44px] max-h-[160px] overflow-y-auto resize-none rounded-md border border-gray-300 px-4 py-2 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
// //             rows={1}
// //           />
// //           <Button
// //             type="submit"
// //             className="px-5 py-2.5 rounded-md text-base font-medium bg-green-600 hover:bg-green-700 text-white"
// //             disabled={loading}
// //           >
// //             {loading ? 'Generating...' : 'Send'}
// //           </Button>
// //         </form>
// //       </div>
// //     </div>
// //   )
// // }
// 'use client'

// import { useEffect, useState, useRef } from 'react'
// import { Button } from '@/components/ui/button'
// import { useRouter } from 'next/navigation'

// export default function ChatPage() {
//   const [prompt, setPrompt] = useState('')
//   const [sessionId, setSessionId] = useState<string | null>(null)
//   const [responses, setResponses] = useState<{ html: string; prompt: string }[]>([])
//   const [loading, setLoading] = useState(false)
//   const [dropdownOpen, setDropdownOpen] = useState(false)
//   const router = useRouter()
//   const dropdownRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     if (sessionId) {
//       fetchHistory()
//     }
//   }, [sessionId])

//   // Close dropdown if clicked outside
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setDropdownOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [])

//   const fetchHistory = async () => {
//     const res = await fetch(`/api/chat/${sessionId}`)
//     const data = await res.json()
//     const previewRes = await fetch(`/api/preview/${sessionId}`)
//     const previewData = await previewRes.json()

//     const htmls = previewData.htmlPages || []
//     const userPrompts = data.messages
//       .filter((m: any) => m.role === 'user')
//       .map((m: any) => m.content)

//     const combined = htmls.map((html: string, i: number) => ({
//       html,
//       prompt: userPrompts[i] || 'Unknown prompt',
//     }))

//     setResponses(combined)
//   }

//   const handleGenerate = async () => {
//     if (!prompt.trim()) return
//     setLoading(true)

//     const res = await fetch('/api/genai', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ prompt, sessionId }),
//     })

//     const data = await res.json()
//     setSessionId(data.sessionId)
//     setPrompt('')
//     setLoading(false)

//     setResponses((prev) => [...prev, { html: data.code, prompt }])
//   }

//   const handleDownload = (html: string, idx: number) => {
//     const blob = new Blob([html], { type: 'text/html' })
//     const url = URL.createObjectURL(blob)
//     const a = document.createElement('a')
//     a.href = url
//     a.download = `generated_${idx + 1}.html`
//     a.click()
//     URL.revokeObjectURL(url)
//   }

//   const handleLogout = () => {
//     // Add real logout logic here
//     router.push('/')
//   }

//   return (
//     <div className="flex flex-col h-screen items-center">
//       {/* Top Bar with Profile Icon */}
//       <div className="w-full max-w-7xl flex justify-end items-center p-4 relative">
//         <div
//           ref={dropdownRef}
//           className="relative"
//         >
//           {/* Profile Icon */}
//           <button
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//             className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg hover:bg-green-700 transition"
//             aria-label="Profile menu"
//           >
//             U
//           </button>

//           {/* Dropdown Menu */}
//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-50">
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white text-red-600 font-semibold rounded-md"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Welcome Message */}
//       {responses.length === 0 ? (
//         <div className="text-center mt-24 text-gray-800 space-y-6 px-4">
//           <p className="text-3xl md:text-4xl font-bold">
//             👋 Welcome to Your AI-powered UI Builder!
//           </p>
//           <p className="text-xl max-w-2xl mx-auto leading-relaxed">
//             Describe the UI you want — a login form, landing page, navbar, or
//             anything — and we’ll generate it instantly using HTML & CSS.
//             <br />
//             No setup, no styling worries. Just type, generate, and preview live!
//           </p>
//           <p className="text-md italic text-gray-500">
//             ✨ Let’s start building beautiful interfaces — one prompt at a time.
//           </p>
//         </div>
//       ) : null}

//       {/* Main Preview Area */}
//       <div className="flex-1 overflow-auto px-6 space-y-6 pb-32 w-full max-w-[1000px]">
//         {responses.map((res, idx) => (
//           <div
//             key={idx}
//             className="flex flex-col gap-2.5 p-2.5 overflow-hidden"
//           >
//             <div className="px-4 py-2 text-lg font-medium max-w-[80%] self-end rounded-lg bg-gray-100">
//               {res.prompt}
//             </div>

//             <div className="w-full h-screen preview-pane">
//               <iframe
//                 srcDoc={res.html}
//                 className="w-full h-full bg-white"
//                 title={`Preview ${idx + 1}`}
//               />
//             </div>

//             <div className="relative border border-gray-300 rounded bg-gray-50 p-4 text-sm whitespace-pre-wrap font-mono">
//               <button
//                 onClick={() => handleDownload(res.html, idx)}
//                 className="absolute top-2 right-2 px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
//               >
//                 Download
//               </button>
//               {res.html}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input Area */}
//       <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl bg-white border-t px-4 py-3">
//         <form
//           onSubmit={(e) => {
//             e.preventDefault()
//             handleGenerate()
//           }}
//           className="flex items-end gap-3"
//         >
//           <textarea
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' && !e.shiftKey) {
//                 e.preventDefault()
//                 handleGenerate()
//               }
//             }}
//             placeholder="Talk to generate a UI layout..."
//             className="w-full min-h-[44px] max-h-[160px] overflow-y-auto resize-none rounded-md border border-gray-300 px-4 py-2 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//             rows={1}
//           />
//           <Button
//             type="submit"
//             className="px-5 py-2.5 rounded-md text-base font-medium bg-green-600 hover:bg-green-700 text-white"
//             disabled={loading}
//           >
//             {loading ? 'Generating...' : 'Send'}
//           </Button>
//         </form>
//       </div>
//     </div>
//   )
// }
'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

type Message = {
  role: string
  content: string
}

export default function ChatPage() {
  const [prompt, setPrompt] = useState('')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [responses, setResponses] = useState<{ html: string; prompt: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const fetchHistory = useCallback(async () => {
    if (!sessionId) return

    try {
      const res = await fetch(`/api/chat/${sessionId}`)
      if (!res.ok) throw new Error('Failed to fetch chat history')
      const data = await res.json()

      const previewRes = await fetch(`/api/preview/${sessionId}`)
      if (!previewRes.ok) throw new Error('Failed to fetch preview data')
      const previewData = await previewRes.json()

      const htmls = previewData.htmlPages || []
      const messages: Message[] = data.messages || []

      const userPrompts = messages
        .filter((m) => m.role === 'user')
        .map((m) => m.content)

      const combined = htmls.map((html: string, i: number) => ({
        html,
        prompt: userPrompts[i] || 'Unknown prompt',
      }))

      setResponses(combined)
    } catch (error) {
      console.error('Error fetching history:', error)
    }
  }, [sessionId])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setLoading(true)

    try {
      const res = await fetch('/api/genai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, sessionId }),
      })

      if (!res.ok) throw new Error('Failed to generate UI')

      const data = await res.json()

      setSessionId(data.sessionId)
      setPrompt('')

      setResponses((prev) => [...prev, { html: data.code, prompt }])
    } catch (error) {
      console.error('Error generating UI:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (html: string, idx: number) => {
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `generated_${idx + 1}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleLogout = () => {
    // Add real logout logic here
    router.push('/')
  }

  return (
    <div className="flex flex-col h-screen items-center">
      {/* Top Bar with Profile Icon */}
      <div className="w-full max-w-7xl flex justify-end items-center p-4 relative">
        <div ref={dropdownRef} className="relative">
          {/* Profile Icon */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg hover:bg-green-700 transition"
            aria-label="Profile menu"
          >
            U
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white text-red-600 font-semibold rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Welcome Message */}
      {responses.length === 0 ? (
        <div className="text-center mt-24 text-gray-800 space-y-6 px-4">
          <p className="text-3xl md:text-4xl font-bold">👋 Welcome to Your AI-powered UI Builder!</p>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed">
            Describe the UI you want — a login form, landing page, navbar, or anything — and we’ll generate it instantly
            using HTML & CSS.
            <br />
            No setup, no styling worries. Just type, generate, and preview live!
          </p>
          <p className="text-md italic text-gray-500">✨ Let’s start building beautiful interfaces — one prompt at a time.</p>
        </div>
      ) : null}

      {/* Main Preview Area */}
      <div className="flex-1 overflow-auto px-6 space-y-6 pb-32 w-full max-w-[1000px]">
        {responses.map((res, idx) => (
          <div key={idx} className="flex flex-col gap-2.5 p-2.5 overflow-hidden">
            <div className="px-4 py-2 text-lg font-medium max-w-[80%] self-end rounded-lg bg-gray-100">{res.prompt}</div>

            <div className="w-full h-screen preview-pane">
              <iframe srcDoc={res.html} className="w-full h-full bg-white" title={`Preview ${idx + 1}`} />
            </div>

            <div className="relative border border-gray-300 rounded bg-gray-50 p-4 text-sm whitespace-pre-wrap font-mono">
              <button
                onClick={() => handleDownload(res.html, idx)}
                className="absolute top-2 right-2 px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
              >
                Download
              </button>
              {res.html}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl bg-white border-t px-4 py-3">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleGenerate()
          }}
          className="flex items-end gap-3"
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleGenerate()
              }
            }}
            placeholder="Talk to generate a UI layout..."
            className="w-full min-h-[44px] max-h-[160px] overflow-y-auto resize-none rounded-md border border-gray-300 px-4 py-2 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={1}
          />
          <Button
            type="submit"
            className="px-5 py-2.5 rounded-md text-base font-medium bg-green-600 hover:bg-green-700 text-white"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Send'}
          </Button>
        </form>
      </div>
    </div>
  )
}
