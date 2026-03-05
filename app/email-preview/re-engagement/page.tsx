import { AlertTriangle, ArrowRight, TrendingDown } from "lucide-react";

export default function ReEngagementEmail() {
  return (
    <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-[600px] bg-white rounded-[14px] shadow-[0px_10px_30px_rgba(0,0,0,0.08)] overflow-hidden">

        {/* Header */}
        <div className="bg-[#0f172b] px-8 py-6 flex items-center gap-3">
          <div className="h-8 w-8 rounded-[10px] bg-white/10 flex items-center justify-center">
            <span className="text-white text-sm font-bold">C</span>
          </div>
          <div>
            <p className="text-white/60 text-xs font-medium">Centaur.ai</p>
            <p className="text-white text-sm font-semibold">Specialist Arena</p>
          </div>
        </div>

        {/* Warning hero */}
        <div className="bg-amber-50 border-b border-amber-100 px-8 pt-10 pb-8 text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-amber-100 border border-amber-200 mb-5">
            <AlertTriangle className="h-7 w-7 text-amber-600" />
          </div>

          <h1 className="text-[24px] font-bold text-[#1e293b] leading-tight mb-3">
            Your Arena rank may drop soon
          </h1>
          <p className="text-slate-600 text-[15px] leading-relaxed max-w-md mx-auto">
            You haven't completed an Arena task in{" "}
            <strong className="text-amber-700">12 days</strong>. Your recency score is declining — act now to protect your ranking.
          </p>
        </div>

        {/* Rank at risk */}
        <div className="px-8 py-6 border-b border-slate-100">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
            Rank at Risk
          </p>

          <div className="flex items-center gap-4">
            {/* Current rank */}
            <div className="flex-1 bg-slate-50 rounded-[10px] px-4 py-4 text-center">
              <p className="text-xs font-medium text-slate-400 mb-1">Current</p>
              <p className="text-3xl font-extrabold text-slate-800">#65</p>
              <p className="text-xs text-slate-400 mt-0.5">of 150</p>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center gap-1">
              <TrendingDown className="h-6 w-6 text-red-400" />
              <p className="text-xs text-red-400 font-medium">At risk</p>
            </div>

            {/* Projected rank */}
            <div className="flex-1 bg-red-50 border border-red-100 rounded-[10px] px-4 py-4 text-center">
              <p className="text-xs font-medium text-red-400 mb-1">Projected</p>
              <p className="text-3xl font-extrabold text-red-600">#78</p>
              <p className="text-xs text-red-400 mt-0.5">if inactive 7 more days</p>
            </div>
          </div>

          {/* Score decay bar */}
          <div className="mt-5">
            <div className="flex justify-between mb-1.5">
              <span className="text-xs text-slate-500">Recency Score</span>
              <span className="text-xs font-semibold text-amber-600">Declining</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-red-400 transition-all duration-500" style={{ width: "38%" }} />
            </div>
            <p className="text-xs text-slate-400 mt-1.5">
              Recency score drops ~5 pts/day after 7 days of inactivity
            </p>
          </div>
        </div>

        {/* What you can do */}
        <div className="px-8 py-6 border-b border-slate-100">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
            How to Recover
          </p>
          <div className="space-y-3">
            {[
              {
                step: "1",
                text: "Complete at least 1 Arena task today",
                detail: "Any Arena contest counts toward your recency score",
              },
              {
                step: "2",
                text: "Aim for high accuracy to boost your overall score",
                detail: "Accuracy is the highest-weighted component",
              },
              {
                step: "3",
                text: "Check back in 2h — scores refresh regularly",
                detail: "Leaderboard updates every ~2h",
              },
            ].map(({ step, text, detail }) => (
              <div key={step} className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-indigo-600">{step}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">{text}</p>
                  <p className="text-xs text-slate-400">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="px-8 py-8 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 h-[44px] px-8 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-[8px] transition-colors"
          >
            Complete a Task Now
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="text-xs text-slate-400 mt-4">
            Even one task today will reset your recency score and stop the decline.
          </p>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-100 px-8 py-4 text-center">
          <p className="text-xs text-slate-400">
            You received this email because you are a registered Centaur Labs specialist.{" "}
            <a href="#" className="text-indigo-500 hover:underline">
              Unsubscribe
            </a>
          </p>
          <p className="text-xs text-slate-400 mt-1">
            © 2025 Centaur Labs, Inc. · 101 Main St, Boston MA
          </p>
        </div>
      </div>

      {/* Preview label */}
      <div className="fixed top-4 right-4 bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-full opacity-60">
        Email Preview
      </div>
    </div>
  );
}
