'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FF] pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <Link href="/profile" className="flex items-center gap-2 text-[#1B1464]/60 hover:text-[#2E4BC6] mb-8"><ArrowLeft size={18}/> Back to Profile</Link>
        <h1 className="text-4xl font-bold text-[#1B1464] mb-2">Account Settings</h1>
        <p className="text-[#1B1464]/60 mb-10">Manage your account preferences.</p>
        <div className="bg-white rounded-3xl shadow-sm border border-[#E8EAFF] p-8">
          <p className="text-[#1B1464]/50 text-center py-12">Settings panel coming soon.</p>
        </div>
      </div>
    </div>
  );
}
