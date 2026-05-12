"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, CreditCard, Check } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    card: "",
    expiry: "",
    cvc: "",
  });

  const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/checkout/success"), 1800);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] pt-24 pb-16 px-4">
      <div className="max-w-lg mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#1B1464]/50 hover:text-[#2E4BC6] mb-8 transition-colors"
        >
          <ArrowLeft size={15} /> Back to home
        </Link>

        <div className="bg-white rounded-3xl border border-[#E8EAFF] shadow-[0_8px_40px_rgba(27,20,100,0.08)] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1B1464] to-[#2E4BC6] px-8 py-6">
            <h1 className="text-white font-bold text-2xl">
              Complete your order
            </h1>
            <p className="text-white/60 text-sm mt-1">
              AINavix Pro · Monthly Plan
            </p>
          </div>

          {/* Order summary */}
          <div className="px-8 py-5 border-b border-[#E8EAFF] bg-[#F8F9FF]">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#1B1464]">AINavix Pro</p>
                <p className="text-[#1B1464]/50 text-sm">
                  Monthly subscription
                </p>
              </div>
              <p className="text-2xl font-extrabold text-[#2E4BC6]">
                $4.49
                <span className="text-sm font-normal text-[#1B1464]/40">
                  /mo
                </span>
              </p>
            </div>
            <ul className="mt-3 space-y-1">
              {[
                "Unlimited comparisons",
                "Priority reviews",
                "Ad-free",
                "Cancel anytime",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-xs text-[#1B1464]/60"
                >
                  <Check
                    size={12}
                    className="text-[#00C2CB]"
                    strokeWidth={2.5}
                  />{" "}
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="px-8 py-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1B1464]/60 mb-1.5 uppercase tracking-wide">
                Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handle}
                required
                placeholder="Jane Smith"
                className="w-full px-4 py-3 rounded-xl border border-[#E8EAFF] text-sm text-[#1B1464] placeholder-[#1B1464]/30 focus:outline-none focus:border-[#2E4BC6] focus:ring-2 focus:ring-[#2E4BC6]/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1B1464]/60 mb-1.5 uppercase tracking-wide">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handle}
                required
                placeholder="you@email.com"
                className="w-full px-4 py-3 rounded-xl border border-[#E8EAFF] text-sm text-[#1B1464] placeholder-[#1B1464]/30 focus:outline-none focus:border-[#2E4BC6] focus:ring-2 focus:ring-[#2E4BC6]/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1B1464]/60 mb-1.5 uppercase tracking-wide">
                Card Number
              </label>
              <div className="relative">
                <CreditCard
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1B1464]/30"
                />
                <input
                  name="card"
                  value={form.card}
                  onChange={handle}
                  required
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E8EAFF] text-sm text-[#1B1464] placeholder-[#1B1464]/30 focus:outline-none focus:border-[#2E4BC6] focus:ring-2 focus:ring-[#2E4BC6]/10 transition-all"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1B1464]/60 mb-1.5 uppercase tracking-wide">
                  Expiry
                </label>
                <input
                  name="expiry"
                  value={form.expiry}
                  onChange={handle}
                  required
                  placeholder="MM / YY"
                  maxLength={7}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8EAFF] text-sm text-[#1B1464] placeholder-[#1B1464]/30 focus:outline-none focus:border-[#2E4BC6] focus:ring-2 focus:ring-[#2E4BC6]/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1B1464]/60 mb-1.5 uppercase tracking-wide">
                  CVC
                </label>
                <input
                  name="cvc"
                  value={form.cvc}
                  onChange={handle}
                  required
                  placeholder="123"
                  maxLength={4}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8EAFF] text-sm text-[#1B1464] placeholder-[#1B1464]/30 focus:outline-none focus:border-[#2E4BC6] focus:ring-2 focus:ring-[#2E4BC6]/10 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 bg-gradient-to-r from-[#2E4BC6] to-[#00C2CB] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(46,75,198,0.3)] hover:shadow-[0_0_30px_rgba(0,194,203,0.4)] disabled:opacity-60 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />{" "}
                  Processing...
                </>
              ) : (
                <>
                  <Lock size={15} /> Pay $4.49.00
                </>
              )}
            </button>

            <p className="text-center text-[#1B1464]/40 text-xs flex items-center justify-center gap-1">
              <Lock size={11} /> Secured · No real payment processed (demo)
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
