# HTML-CSS Chatbot 🚀

A full-stack chatbot application that generates HTML and CSS code snippets based on user prompts. The app features a live preview of generated landing pages and allows users to download the generated HTML code—all built with Next.js, TypeScript, Prisma, Supabase, Gemini API, and styled using Tailwind CSS and ShadcnUI.

## ✨ Features

- ✅ User Authentication with NextAuth.js (Email login)
- 💬 Chat Interface to communicate with the AI
- 🧠 AI-powered HTML & CSS Code Generation using Gemini API
- ⚡ Live Preview of the generated code
- 💾 Download Button to save the generated HTML code
- 💻 Responsive Design using Tailwind CSS
- 🛠️ Built with Next.js App Router and TypeScript
- 🗄️ Database: Supabase with Prisma ORM

## 🛠️ Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **ShadcnUI**
- **NextAuth.js** for authentication
- **Prisma + Supabase** for the database
- **Gemini API** for code generation

## 🔐 Authentication

- Email-based login using **NextAuth.js**

## 💡 Functionality

### Chatbot
- Accepts user prompts
- Generates complete HTML & CSS for landing pages
- Returns structured code in a single file

### Live Preview
- Instantly renders generated code using an iframe or preview pane

### Code Download
- Download the generated code as an `.html` file

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/html-css-chatbot.git
cd html-css-chatbot
````

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env` and `.env.local` files:

```env
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=your_supabase_db_url
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Set up the database

```bash
npx prisma migrate dev --name init
```

### 5. Run the development server

```bash
npm run dev
```

## 📁 Project Structure

```
/app
  ├── api
  ├── auth
  ├── chat
  ├── components
  ├── layout.tsx
  ├── page.tsx
/prisma
  ├── schema.prisma
  └── migrations
/styles
/public
.env, .env.local
```

## ✅ Deliverables

* GitHub repository
* README with setup instructions

## 📄 License

MIT

---

Developed by Manas Kulkarni(https://github.com/manaskulkarni12345)

```

---

