'use client';

import { useState } from 'react';
import LoginForm from '@/app/auth/login/page';
import SignupForm from '@/app/auth/signup/page';

export default function HomePage() {
  const [showSignup, setShowSignup] = useState(false);
  
  console.log('Database URL:', process.env.DATABASE_URL);


  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white text-center px-4">
      <h1 className="text-5xl font-extrabold text-gray-800">
        Welcome to <span className="text-blue-600">HTML CSS Chatbot</span>
      </h1>

      <p className="text-gray-600 max-w-xl">
        Easily generate HTML & CSS snippets using our smart AI chatbot. Sign up
        now or log in to get started!
      </p>

      {showSignup ? (
        <SignupForm onSwitchToLogin={() => setShowSignup(false)} />
      ) : (
        <LoginForm onSwitchToSignup={() => setShowSignup(true)} />
      )}
    </main>
  );
}
