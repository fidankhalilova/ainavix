import Link from "next/link";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FF] pt-24 pb-16 px-4 flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-3xl border border-[#E8EAFF] shadow-[0_8px_40px_rgba(27,20,100,0.08)] px-8 py-12">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2E4BC6] to-[#00C2CB] flex items-center justify-center mx-auto mb-6 shadow-[0_0_32px_rgba(0,194,203,0.4)]">
            <CheckCircle size={36} className="text-white" />
          </div>

          <h1 className="text-2xl font-extrabold text-[#1B1464] mb-2">
            You're all set! 🎉
          </h1>
          <p className="text-[#1B1464]/55 mb-8 leading-relaxed">
            Welcome to{" "}
            <span className="font-semibold text-[#2E4BC6]">AINavix Pro</span>.
            <br />
            Your monthly subscription is now active.
          </p>

          <div className="bg-[#F0F4FF] rounded-2xl px-5 py-4 mb-8 text-left space-y-2">
            {[
              "Unlimited tool comparisons",
              "Priority reviews",
              "Ad-free experience",
              "Early access to new tools",
            ].map((f) => (
              <div
                key={f}
                className="flex items-center gap-2 text-sm text-[#1B1464]/70"
              >
                <Sparkles size={13} className="text-[#2E4BC6] shrink-0" /> {f}
              </div>
            ))}
          </div>

          <Link
            href="/tools"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2E4BC6] to-[#00C2CB] text-white font-bold px-8 py-3.5 rounded-xl shadow-[0_0_20px_rgba(46,75,198,0.3)] hover:shadow-[0_0_30px_rgba(0,194,203,0.4)] transition-all"
          >
            Browse AI Tools <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
