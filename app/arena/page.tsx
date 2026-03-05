"use client";

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ContestCard } from "@/components/arena/contest-card";
import { ContestLeaderboardSnapshot } from "@/components/arena/contest-leaderboard-snapshot";
import { CONTESTS, SNAPSHOT_INFO, CURRENT_USER } from "@/lib/mock-data";
import { PanelLeft } from "lucide-react";

export default function ArenaPage() {
  const totalPrize = CONTESTS.reduce((sum, c) => {
    const amount = parseInt(c.prizePool.replace(/\D/g, ""), 10);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const totalSpecialists = Math.max(...CONTESTS.map((c) => c.participantCount));

  return (
    <div className="flex min-h-screen bg-white">
      <DashboardSidebar active="arena" />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="border-b border-[#e5e7eb] flex items-center gap-6 px-6 py-4 flex-shrink-0">
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <PanelLeft className="h-4 w-4" />
          </button>
          <div className="h-5 w-px bg-[#e5e7eb]" />
          <h1 className="text-base font-semibold text-[#1e293b]">Arena</h1>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1131px] mx-auto px-6 py-10 flex flex-col gap-10">

            {/* Page header */}
            <div className="animate-fade-in">
              <h2 className="text-[30px] font-bold text-[#1e293b] leading-[36px]">
                Specialist Arena
              </h2>
              <p className="text-base text-slate-500 mt-1">
                Compete against all specialists. Rank by accuracy, throughput &amp; recency.
              </p>
            </div>

            {/* Mission banner */}
            <div
              className="bg-gradient-to-r from-[#290D4D] to-[#201B4E] rounded-[14px] px-8 py-7 flex items-center justify-between gap-6 animate-fade-in overflow-hidden relative"
              style={{ animationDelay: "40ms" }}
            >
              {/* Subtle dot grid overlay */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="relative z-10">
                <h3 className="text-[22px] font-bold text-white leading-tight max-w-[460px]">
                  Superhuman data, powered by collective intelligence
                </h3>
                <p className="text-sm text-slate-400 mt-2">
                  When humans and AI compete to be the best, we all win.
                </p>
              </div>
              <div className="relative z-10 flex flex-col gap-2 flex-shrink-0">
                {[
                  { value: `${totalSpecialists}+`, label: "specialists" },
                  { value: `${CONTESTS.length}`, label: "active contests" },
                  { value: `$${totalPrize}+`, label: "in weekly prizes" },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 border border-white/15 rounded-full px-3 py-1.5"
                  >
                    <span className="text-sm font-bold text-white">{value}</span>
                    <span className="text-xs text-slate-400">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Competitions */}
            <section
              className="animate-fade-in"
              style={{ animationDelay: "80ms" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-semibold text-slate-800">
                  Active Competitions
                </h3>
                <span className="text-base font-normal text-slate-500">
                  {CONTESTS.length} open now
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {CONTESTS.map((contest) => (
                  <ContestCard key={contest.id} contest={contest} />
                ))}
              </div>
            </section>

            {/* Who's Leading — cross-contest snapshot */}
            <section
              className="animate-fade-in"
              style={{ animationDelay: "120ms" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-semibold text-slate-800">
                  Who&apos;s Leading
                </h3>
                <div className="flex items-center gap-1.5 bg-white border border-[rgba(0,0,0,0.1)] px-2.5 py-0.5 rounded-[8px]">
                  <span className="text-xs font-medium text-slate-500">
                    {CONTESTS.length} contests
                  </span>
                </div>
              </div>

              <ContestLeaderboardSnapshot
                contests={CONTESTS}
                currentUserId={CURRENT_USER.id}
                lastUpdated={SNAPSHOT_INFO.lastUpdated}
                nextRefresh={SNAPSHOT_INFO.nextRefresh}
                topN={5}
              />
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
