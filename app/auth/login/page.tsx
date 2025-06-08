'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/actions/loginUser';

type Props = {
  onSwitchToSignup: () => void;
};

export default function LoginForm({ onSwitchToSignup }: Props) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const success = await loginUser(formData);
      if (success) {
        router.push('/chat');
      } else {
        setError('Invalid credentials');
      }
    } catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError('Signup failed');
  }
}

  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg w-full bg-white p-10 rounded-xl shadow-lg space-y-6 mt-6"
    >
      <h2 className="text-3xl font-bold text-center">Login</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
      >
        Log In
      </button>
      {error && <p className="text-red-600 text-center mt-2">{error}</p>}

      <p className="text-center mt-4 text-gray-700">
     
        Don&apos;t have an account?{' '}
      

        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-blue-600 hover:underline"
        >
          Sign Up
        </button>
      </p>
    </form>
  );
}
