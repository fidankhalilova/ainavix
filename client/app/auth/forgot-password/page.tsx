'use client';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire up to backend when password reset endpoint is added
    setSent(true);
    toast.success('If that email exists, a reset link has been sent.');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Link href="/auth/login" className="flex items-center gap-2 text-[#1B1464]/60 hover:text-[#2E4BC6] mb-8"><ArrowLeft size={18}/> Back to Sign In</Link>
        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#2E4BC6] to-[#00C2CB] flex items-center justify-center mb-6"><Mail size={28} className="text-white"/></div>
        <h1 className="text-3xl font-bold text-[#1B1464] mb-2">Forgot Password?</h1>
        <p className="text-[#1B1464]/60 mb-8">Enter your email and we&apos;ll send you a reset link.</p>
        {sent ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
            <p className="text-emerald-700 font-medium">Check your inbox for a reset link.</p>
            <Link href="/auth/login" className="text-[#2E4BC6] text-sm font-semibold mt-4 inline-block hover:underline">Return to Sign In</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1B1464]/70 mb-2">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full px-5 py-3.5 border border-[#E8EAFF] rounded-2xl focus:outline-none focus:border-[#2E4BC6] transition-all"/>
            </div>
            <button type="submit" className="w-full bg-linear-to-r from-[#2E4BC6] to-[#00C2CB] text-white font-semibold py-4 rounded-2xl hover:brightness-105 transition-all">Send Reset Link</button>
          </form>
        )}
      </div>
    </div>
  );
}
