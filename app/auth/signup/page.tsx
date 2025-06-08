'use client';

import { useState } from 'react';
import { createUser } from '@/lib/actions/createUser';

type Props = {
  onSwitchToLogin: () => void;
};

export default function SignupForm({ onSwitchToLogin }: Props) {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await createUser(formData);
      // Show success and switch to login form
      alert('Signup successful! Please log in.');
      onSwitchToLogin();
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg w-full bg-white p-10 rounded-xl shadow-lg space-y-6 mt-6"
    >
      <h2 className="text-3xl font-bold text-center">Create Your Account</h2>
      <input
        name="name"
        type="text"
        placeholder="Name"
        className="w-full p-3 border rounded-md"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="w-full p-3 border rounded-md"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="w-full p-3 border rounded-md"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
      >
        Sign Up
      </button>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <p className="text-center mt-4 text-gray-700">
        Already have an account?{' '}
        
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-green-600 hover:underline"
        >
          Log In
        </button>
      </p>
    </form>
  );
}
