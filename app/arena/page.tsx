"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ContestCard } from "@/components/arena/contest-card";
import { ContestLeaderboardSnapshot } from "@/components/arena/contest-leaderboard-snapshot";
import { CONTESTS, SNAPSHOT_INFO, CURRENT_USER } from "@/lib/mock-data";
import { PanelLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 2;

export default function ArenaPage() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(CONTESTS.length / PAGE_SIZE);
  const visibleContests = CONTESTS.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const prizePoolAmount = CONTESTS[0].prizePoolAmount;

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
                Compete against all specialists. Rank by accuracy, recency &amp; volume. Top performers share the weekly prize.
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
                  { value: `${CONTESTS.length}`, label: "active contests" },
                  { value: `$${prizePoolAmount}`, label: "weekly prize pool" },
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

            {/* Active Competitions + Who's Leading — unified paginated block */}
            <section
              className="animate-fade-in"
              style={{ animationDelay: "80ms" }}
            >
              {/* Section header with pagination */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-semibold text-slate-800">
                    Active Competitions
                  </h3>
                  <span className="text-base font-normal text-slate-500">
                    {CONTESTS.length} open now
                  </span>
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">
                      {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, CONTESTS.length)} of {CONTESTS.length}
                    </span>
                    <button
                      onClick={() => setPage((p) => p - 1)}
                      disabled={page === 0}
                      className={cn(
                        "h-7 w-7 flex items-center justify-center rounded-[6px] border border-slate-200 transition-colors",
                        page === 0
                          ? "text-slate-300 cursor-not-allowed"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                      )}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      disabled={(page + 1) * PAGE_SIZE >= CONTESTS.length}
                      className={cn(
                        "h-7 w-7 flex items-center justify-center rounded-[6px] border border-slate-200 transition-colors",
                        (page + 1) * PAGE_SIZE >= CONTESTS.length
                          ? "text-slate-300 cursor-not-allowed"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                      )}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Contest cards */}
              <div className="grid grid-cols-2 gap-4">
                {visibleContests.map((contest) => (
                  <ContestCard key={contest.id} contest={contest} />
                ))}
              </div>

              {/* Who's Leading — inline sub-section */}
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-8 mb-3">
                Who&apos;s Leading
              </p>
              <ContestLeaderboardSnapshot
                contests={visibleContests}
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
