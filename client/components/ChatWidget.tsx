"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, X, Sparkles, Check } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-linear-to-br from-[#2E4BC6] to-[#00C2CB] text-white shadow-[0_4px_24px_rgba(46,75,198,0.4)] hover:shadow-[0_8px_32px_rgba(0,194,203,0.5)] hover:scale-110 transition-all duration-300 flex items-center justify-center"
        aria-label="Open subscription"
      >
        <MessageCircle size={24} />
      </button>

      {/* Widget panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-3xl shadow-[0_20px_60px_rgba(27,20,100,0.18)] border border-[#E8EAFF] overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-[#1B1464] to-[#2E4BC6] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">AINavix Pro</p>
                <p className="text-white/60 text-xs">Unlock all features</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-5">
            <p className="text-[#1B1464]/70 text-sm mb-4 leading-relaxed">
              Get unlimited access to all AI tools, reviews, and comparisons.
            </p>

            {/* Monthly plan card */}
            <div className="border-2 border-[#2E4BC6] bg-[#F0F4FF] rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[#1B1464] text-base">
                  Monthly
                </span>
                <span className="text-xs font-semibold bg-[#2E4BC6] text-white px-2.5 py-0.5 rounded-full">
                  Most Popular
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-3xl font-extrabold text-[#2E4BC6]">
                  $4.49
                </span>
                <span className="text-[#1B1464]/50 text-sm">/month</span>
              </div>
              <ul className="space-y-1.5 mb-4">
                {[
                  "Unlimited tool comparisons",
                  "Priority reviews",
                  "Early access to new tools",
                  "Ad-free experience",
                ].map((feat) => (
                  <li
                    key={feat}
                    className="flex items-center gap-2 text-xs text-[#1B1464]/70"
                  >
                    <Check
                      size={13}
                      className="text-[#00C2CB] shrink-0"
                      strokeWidth={2.5}
                    />
                    {feat}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  setOpen(false);
                  router.push("/checkout");
                }}
                className="w-full py-2.5 bg-linear-to-r from-[#2E4BC6] to-[#00C2CB] text-white text-sm font-bold rounded-xl shadow-[0_0_16px_rgba(46,75,198,0.3)] hover:shadow-[0_0_24px_rgba(0,194,203,0.4)] transition-all"
              >
                Subscribe Now
              </button>
            </div>

            <p className="text-center text-[#1B1464]/40 text-xs">
              Cancel anytime · No hidden fees
            </p>
          </div>
        </div>
      )}
    </>
  );
}
