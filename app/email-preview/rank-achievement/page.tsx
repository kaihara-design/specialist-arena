import { Trophy, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RankAchievementEmail() {
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

        {/* Hero */}
        <div className="px-8 pt-10 pb-8 text-center border-b border-slate-100">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-b from-[#ffd230] to-[#fe9a00] shadow-[0_4px_20px_rgba(254,154,0,0.4)] mb-6">
            <Trophy className="h-8 w-8 text-white" />
          </div>

          <h1 className="text-[28px] font-bold text-[#1e293b] leading-tight mb-3">
            You've climbed to{" "}
            <span className="text-indigo-600">#14</span>{" "}
            on the Arena leaderboard!
          </h1>
          <p className="text-slate-500 text-[15px] leading-relaxed max-w-md mx-auto">
            Your hard work is paying off. You've moved up <strong className="text-slate-700">6 spots</strong> since last week — keep it up to stay in the top 10.
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1">
            <TrendingUp className="h-4 w-4" />
            Up 6 ranks since last update
          </div>
        </div>

        {/* Stats */}
        <div className="px-8 py-6 border-b border-slate-100">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
            Your Score Breakdown
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Accuracy", value: "84%", color: "indigo" },
              { label: "Throughput", value: "71%", color: "indigo" },
              { label: "Recency", value: "91%", color: "indigo" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-slate-50 rounded-[10px] px-4 py-3 text-center"
              >
                <p className="text-[22px] font-extrabold text-slate-800">
                  {value}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 mt-3 text-center">
            Score formula is a weighted composite — final weights pending confirmation
          </p>
        </div>

        {/* Rank preview */}
        <div className="px-8 py-6 border-b border-slate-100">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
            Leaderboard Snapshot
          </p>
          <div className="space-y-1">
            {[
              { rank: 13, name: "Specialist 773", score: 649 },
              { rank: 14, name: "Jane Liam", score: 641, isYou: true },
              { rank: 15, name: "Specialist 392", score: 631 },
            ].map(({ rank, name, score, isYou }) => (
              <div
                key={rank}
                className={`flex items-center gap-3 h-[44px] px-3 rounded-[8px] ${
                  isYou
                    ? "bg-[#eef2ff] border border-[#e0e7ff]"
                    : ""
                }`}
              >
                <span
                  className={`w-6 text-center text-sm font-semibold ${
                    isYou ? "text-indigo-600" : "text-slate-400"
                  }`}
                >
                  {rank}
                </span>
                <span
                  className={`flex-1 text-sm ${
                    isYou
                      ? "font-extrabold text-slate-800"
                      : "font-normal text-slate-600"
                  }`}
                >
                  {name}
                  {isYou && (
                    <span className="ml-1.5 text-indigo-600 font-extrabold">
                      (You)
                    </span>
                  )}
                </span>
                <span
                  className={`text-sm font-semibold ${
                    isYou ? "text-slate-800" : "text-slate-500"
                  }`}
                >
                  {score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="px-8 py-8 text-center">
          <p className="text-sm text-slate-500 mb-4">
            Keep completing Arena tasks to climb higher and stay competitive.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 h-[44px] px-8 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-[8px] transition-colors"
          >
            View Your Rank
            <ArrowRight className="h-4 w-4" />
          </a>
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
