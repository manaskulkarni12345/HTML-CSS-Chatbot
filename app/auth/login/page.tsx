'use client';

import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  const handleSwitch = () => {
    // Handle switching to signup if needed
    console.log('Switch to signup');
  };

  return <LoginForm onSwitchToSignup={handleSwitch} />;
}
