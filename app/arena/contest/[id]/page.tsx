"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { LeaderboardTable } from "@/components/arena/leaderboard-table";
import { PersonalRankPanel } from "@/components/arena/personal-rank-panel";
import { InactivityWarning } from "@/components/arena/inactivity-warning";
import { Podium } from "@/components/arena/podium";
import { CONTESTS, SNAPSHOT_INFO, CURRENT_USER } from "@/lib/mock-data";
import {
  ArrowLeft,
  Users,
  Bot,
  Mail,
  Zap,
  PanelLeft,
  Trophy,
  Infinity,
  Lock,
  BookOpen,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "overview" | "leaderboard" | "how-to-compete";
type LeaderboardFilter = "humans" | "ai" | "all";

export default function ContestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [lbFilter, setLbFilter] = useState<LeaderboardFilter>("humans");
  const [hasPracticed, setHasPracticed] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);

  const contest = CONTESTS.find((c) => c.id === id);
  if (!contest) notFound();

  const currentUserEntry = contest.leaderboard.find((e) => e.isCurrentUser);
  const totalCount = contest.participantCount;
  const currentUserRank = currentUserEntry?.rank ?? 0;
  const entryAbove = contest.leaderboard.find((e) => e.rank === currentUserRank - 1);
  const proximityToNext =
    entryAbove && currentUserEntry ? entryAbove.score - currentUserEntry.score : 3;
  const showInactivity = currentUserEntry?.hasDecayRisk;
  const top3 = contest.leaderboard.filter((e) => e.rank <= 3);
  const topHuman = contest.leaderboard[0];
  const topAI = contest.aiLeaderboard[0];

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "leaderboard", label: "Leaderboard" },
    { id: "how-to-compete", label: "How to Compete" },
  ];

  const needsPractice = contest.hasPractice && !hasPracticed;

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
          <div className="flex items-center gap-2 text-sm">
            <Link href="/arena" className="text-slate-400 hover:text-slate-600 transition-colors">
              Arena
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-[#1e293b] font-medium">{contest.title}</span>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1131px] mx-auto px-6 py-8 flex flex-col gap-0">

            {/* Back nav */}
            <div className="mb-5 animate-fade-in">
              <Link
                href="/arena"
                className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                All Competitions
              </Link>
            </div>

            {/* Hero */}
            <div
              className="rounded-t-[14px] px-8 py-8 relative overflow-hidden animate-fade-in"
              style={{
                animationDelay: "20ms",
                background: contest.id === "skin-lesion"
                  ? `linear-gradient(to right, rgba(26,8,2,0.62), rgba(18,5,3,0.52)), url('/mock-skin-lesion.svg') center/cover no-repeat`
                  : "linear-gradient(to right, #290D4D, #201B4E)",
              }}
            >
              {/* Dot grid overlay */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
                    Live
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.7px] text-indigo-300 bg-indigo-900/40 px-2 py-0.5 rounded-[4px]">
                    {contest.taskType}
                  </span>
                </div>
                <h1 className="text-[32px] font-bold text-white leading-tight mb-2">
                  {contest.title}
                </h1>
                <p className="text-sm text-slate-300 max-w-[560px] leading-relaxed">
                  {contest.description}
                </p>
              </div>
            </div>

            {/* Stats strip */}
            <div
              className="bg-white border border-slate-100 rounded-b-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] animate-fade-in"
              style={{ animationDelay: "40ms" }}
            >
              <div className="grid grid-cols-4 divide-x divide-slate-100">
                {[
                  { label: "Prize Pool", value: contest.prizePool, sub: "per week" },
                  { label: "Participants", value: `${contest.participantCount}`, sub: "specialists" },
                  { label: "Centaur Best", value: contest.centaurBestScore, sub: "current high score" },
                  {
                    label: "Prize Resets In",
                    value: `${contest.prizeCycleDaysLeft}d`,
                    sub: "current cycle",
                    highlight: contest.prizeCycleDaysLeft <= 2,
                  },
                ].map(({ label, value, sub, highlight }) => (
                  <div key={label} className="px-6 py-4">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">
                      {label}
                    </p>
                    <p className={cn("text-xl font-extrabold", highlight ? "text-amber-500" : "text-slate-800")}>
                      {value}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tab bar */}
            <div
              className="flex items-center justify-between border-b border-slate-100 mt-6 animate-fade-in"
              style={{ animationDelay: "60ms" }}
            >
              <div className="flex items-center">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px",
                      activeTab === tab.id
                        ? "text-indigo-600 border-indigo-600"
                        : "text-slate-500 border-transparent hover:text-slate-700"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-1">
                {contest.hasPractice && (
                  <button
                    onClick={() => setHasPracticed(true)}
                    className={cn(
                      "flex items-center h-[34px] px-4 text-sm font-medium rounded-[8px] transition-colors",
                      hasPracticed
                        ? "border border-slate-200 text-slate-600 hover:bg-slate-50"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white btn-shadow"
                    )}
                  >
                    {hasPracticed ? "Practice" : "Start Practice"}
                  </button>
                )}
                {needsPractice ? (
                  <div className="relative group">
                    <button
                      disabled
                      className="flex items-center gap-1.5 h-[34px] px-4 text-slate-400 text-sm font-medium rounded-[8px] border border-slate-200 bg-slate-50 cursor-not-allowed"
                    >
                      <Lock className="h-3.5 w-3.5" />
                      Join Competition
                    </button>
                    <div className="absolute right-0 top-full mt-1.5 w-max max-w-[200px] bg-slate-800 text-white text-xs rounded-[6px] px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      Complete practice first
                    </div>
                  </div>
                ) : (
                  <Link
                    href={`/arena/contest/${contest.id}`}
                    className="flex items-center h-[34px] px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-[8px] transition-colors btn-shadow"
                  >
                    Join Competition
                  </Link>
                )}
              </div>
            </div>

            {/* Tab content */}
            <div className="mt-8 animate-fade-in" style={{ animationDelay: "80ms" }}>

              {/* ── Overview ── */}
              {activeTab === "overview" && (
                <div className="flex flex-col gap-8">

                  {/* About */}
                  <section>
                    <h2 className="text-lg font-semibold text-slate-800 mb-3">
                      About this Competition
                    </h2>
                    <div className="prose prose-sm text-slate-600 max-w-none space-y-3">
                      {contest.about.split("\n\n").map((para, i) => (
                        <p key={i} className="text-sm text-slate-600 leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>
                  </section>

                  {/* Performance standings */}
                  <section>
                    <h2 className="text-lg font-semibold text-slate-800 mb-3">
                      Performance Standings
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                      {/* Centaur card */}
                      <div className="bg-gradient-to-br from-[#290D4D] to-[#201B4E] rounded-[14px] p-5 relative overflow-hidden">
                        <div
                          className="absolute inset-0 opacity-[0.05]"
                          style={{
                            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                          }}
                        />
                        <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center">
                              <Zap className="h-3.5 w-3.5 text-amber-300" />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-wide text-indigo-300">
                                Current Best
                              </p>
                              <p className="text-xs font-semibold text-white">
                                Centaur Collective
                              </p>
                            </div>
                          </div>
                          <p className="text-3xl font-extrabold text-white">
                            {contest.centaurBestScore}
                          </p>
                          <p className="text-[11px] text-indigo-300 mt-1">Collective score</p>
                        </div>
                      </div>

                      {/* Top Human card */}
                      <div className="bg-white border border-slate-100 rounded-[14px] p-5 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-7 w-7 rounded-full bg-indigo-50 flex items-center justify-center">
                            <Users className="h-3.5 w-3.5 text-indigo-500" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                              Top Human
                            </p>
                            <p className="text-xs font-semibold text-slate-700">
                              {topHuman.specialistId}
                            </p>
                          </div>
                        </div>
                        <p className="text-3xl font-extrabold text-slate-800">
                          {topHuman.score.toFixed(1)}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1">Individual score</p>
                      </div>

                      {/* Top AI card */}
                      <div className="bg-white border border-slate-100 rounded-[14px] p-5 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center">
                            <Bot className="h-3.5 w-3.5 text-slate-500" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                              Top AI Model
                            </p>
                            <p className="text-xs font-semibold text-slate-700">
                              {topAI.modelName}
                            </p>
                          </div>
                        </div>
                        <p className="text-3xl font-extrabold text-slate-800">
                          {topAI.score.toFixed(1)}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1">Model score</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                      Centaur&apos;s algorithm consistently surpasses every individual by aggregating top specialists into a consensus answer.
                    </p>
                  </section>

                  {/* Prize structure + reward box — side by side */}
                  <div className="grid grid-cols-2 gap-6 items-start">
                    {/* Prize structure */}
                    <section>
                      <h2 className="text-lg font-semibold text-slate-800 mb-3">
                        Prize Structure
                      </h2>
                      <div className="bg-white border border-slate-100 rounded-[14px] overflow-hidden shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]">
                        {contest.prizeStructure.map(({ rank, amount }, i) => (
                          <div
                            key={rank}
                            className={cn(
                              "flex items-center justify-between px-5 py-3",
                              i < contest.prizeStructure.length - 1 && "border-b border-slate-50"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <Trophy
                                className={cn(
                                  "h-4 w-4",
                                  i === 0 ? "text-amber-400" : i === 1 ? "text-slate-400" : "text-orange-400"
                                )}
                              />
                              <span className="text-sm font-semibold text-slate-700">{rank} place</span>
                            </div>
                            <span className="text-sm font-extrabold text-slate-800">{amount}</span>
                          </div>
                        ))}
                        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50">
                          <p className="text-xs text-slate-400">Prize pool resets weekly · {contest.prizePool} total</p>
                        </div>
                      </div>
                    </section>

                    {/* Reward info box */}
                    <section>
                      <h2 className="text-lg font-semibold text-slate-800 mb-3">
                        Payouts
                      </h2>
                      <div className="bg-indigo-50 border border-indigo-100 rounded-[14px] p-5 flex flex-col gap-3">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Mail className="h-4 w-4 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-indigo-900 mb-1">
                              Prizes are distributed weekly
                            </p>
                            <p className="text-sm text-indigo-700 leading-relaxed">
                              We&apos;ll reach out directly when you win — no action needed on your end.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>

                </div>
              )}

              {/* ── Leaderboard ── */}
              {activeTab === "leaderboard" && (
                <div className="flex gap-6 items-start">
                  {/* Left: leaderboard */}
                  <div className="flex-1 min-w-0 flex flex-col gap-4">
                    {showInactivity && (
                      <InactivityWarning daysInactive={12} contestId={contest.id} />
                    )}

                    {/* Rolling leaderboard callout */}
                    <div className="bg-slate-50 border border-slate-100 rounded-[10px] px-4 py-3 flex items-start gap-2.5">
                      <Infinity className="h-3.5 w-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-500 leading-relaxed">
                        This competition never ends, but prizes refresh weekly! Your score reflects accuracy, throughput, and consistency across recent work. Rankings update every 4 hours. The current prize cycle closes this Monday.
                      </p>
                    </div>

                    {/* Filter pills */}
                    <div className="flex items-center gap-1 bg-slate-100 rounded-[8px] p-1 self-start">
                      {(["humans", "ai", "all"] as LeaderboardFilter[]).map((f) => (
                        <button
                          key={f}
                          onClick={() => setLbFilter(f)}
                          className={cn(
                            "flex items-center gap-1.5 h-[28px] px-3 text-xs font-medium rounded-[6px] transition-colors capitalize",
                            lbFilter === f
                              ? "bg-white text-slate-800 shadow-sm"
                              : "text-slate-500 hover:text-slate-700"
                          )}
                        >
                          {f === "humans" && <Users className="h-3 w-3" />}
                          {f === "ai" && <Bot className="h-3 w-3" />}
                          {f === "humans" ? "Humans" : f === "ai" ? "AI Models" : "All"}
                        </button>
                      ))}
                    </div>

                    {lbFilter === "humans" && (
                      <>
                        {top3.length === 3 && (
                          <div>
                            <Podium top3={top3} />
                          </div>
                        )}
                        <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] overflow-hidden py-1">
                          <LeaderboardTable
                            entries={contest.leaderboard}
                            currentUserId={CURRENT_USER.id}
                            totalCount={totalCount}
                            lastUpdated={SNAPSHOT_INFO.lastUpdated}
                            nextRefresh={SNAPSHOT_INFO.nextRefresh}
                            showLoadMore={true}
                          />
                        </div>
                      </>
                    )}

                    {lbFilter === "ai" && (
                      <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] overflow-hidden">
                        <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
                          <Bot className="h-4 w-4 text-slate-400" />
                          <p className="text-xs font-medium text-slate-500">
                            Can you beat the AI? These models are scored on the same tasks.
                          </p>
                        </div>
                        <div className="divide-y divide-slate-50 py-1">
                          {contest.aiLeaderboard.map((model, i) => (
                            <div
                              key={model.modelName}
                              className="flex items-center gap-4 px-4 h-[52px] mx-2 rounded-[10px] hover:bg-slate-50 transition-colors"
                              style={{ animationDelay: `${i * 20}ms` }}
                            >
                              <div className="w-8 flex justify-center">
                                <span className="text-sm font-semibold text-slate-400">{model.rank}</span>
                              </div>
                              <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                                <Bot className="h-3.5 w-3.5 text-slate-500" />
                              </div>
                              <span className="flex-1 text-sm font-medium text-slate-700">{model.modelName}</span>
                              <span className="text-sm font-extrabold text-slate-800">{model.score.toFixed(1)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="px-4 py-3 border-t border-slate-100 text-center">
                          <p className="text-xs text-slate-400">AI evaluations run weekly — more models coming soon</p>
                        </div>
                      </div>
                    )}

                    {lbFilter === "all" && (
                      <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] overflow-hidden py-1">
                        {/* Column headers */}
                        <div className="flex items-center justify-between px-6 pb-2">
                          <div className="flex items-center gap-4">
                            <div className="w-6 flex-shrink-0" />
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Participant</span>
                          </div>
                          <div className="flex items-center gap-5">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Score</span>
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide w-16 text-right">Type</span>
                          </div>
                        </div>
                        {/* Combined rows — humans + AI, sorted by score desc */}
                        {[
                          ...contest.leaderboard.slice(0, 10).map((e) => ({
                            name: e.specialistId,
                            score: e.score,
                            type: "human" as const,
                            isCurrentUser: e.isCurrentUser,
                          })),
                          ...contest.aiLeaderboard.map((m) => ({
                            name: m.modelName,
                            score: m.score,
                            type: "ai" as const,
                            isCurrentUser: false,
                          })),
                        ]
                          .sort((a, b) => b.score - a.score)
                          .map((row, i) => (
                            <div
                              key={`${row.type}-${row.name}`}
                              className={cn(
                                "flex items-center justify-between px-6 h-[48px] rounded-[10px] transition-colors",
                                row.isCurrentUser
                                  ? "bg-[#eef2ff] border border-[#e0e7ff]"
                                  : "hover:bg-slate-50"
                              )}
                            >
                              <div className="flex items-center gap-4">
                                <span className="w-6 text-center text-xs font-semibold text-slate-400">{i + 1}</span>
                                <span className={cn("text-sm", row.isCurrentUser ? "font-extrabold text-slate-800" : "font-medium text-slate-600")}>
                                  {row.name}
                                </span>
                                {row.isCurrentUser && (
                                  <span className="text-sm font-extrabold text-indigo-600">(You)</span>
                                )}
                              </div>
                              <div className="flex items-center gap-5">
                                <span className="text-sm font-extrabold text-slate-800">{row.score.toFixed(1)}</span>
                                <div className="w-16 flex justify-end">
                                  {row.type === "human" ? (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                                      <Users className="h-2.5 w-2.5" />Human
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                      <Bot className="h-2.5 w-2.5" />AI
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Right: personal rank panel */}
                  <div className="w-[280px] flex-shrink-0 sticky top-6">
                    {currentUserEntry ? (
                      <PersonalRankPanel
                        rank={currentUserEntry.rank}
                        totalParticipants={totalCount}
                        score={currentUserEntry.score}
                        rankChange={currentUserEntry.rankChange}
                        proximityToNext={proximityToNext}
                        lastActive={currentUserEntry.lastActive}
                        hasDecayRisk={currentUserEntry.hasDecayRisk}
                      />
                    ) : (
                      <div className="bg-white border border-slate-100 rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] p-6 flex flex-col items-center gap-4 text-center">
                        <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center">
                          <Users className="h-5 w-5 text-indigo-500" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 mb-1">Not yet ranked</p>
                          <p className="text-xs text-slate-500">Complete your first task to claim your rank</p>
                        </div>
                        <Link
                          href={`/arena/contest/${contest.id}`}
                          className="flex items-center justify-center h-[36px] w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-[8px] transition-colors btn-shadow"
                        >
                          Start Labeling
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── How to Compete ── */}
              {activeTab === "how-to-compete" && (
                <div className="grid grid-cols-2 gap-8">
                  {/* Scoring */}
                  <section>
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Scoring</h2>
                    <div className="flex flex-col gap-3">
                      {contest.scoring.map((item, i) => (
                        <div
                          key={item.title}
                          className="bg-white border border-slate-100 rounded-[12px] px-5 py-4 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.06)]"
                        >
                          <div className="flex items-start gap-3">
                            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold flex items-center justify-center mt-0.5">
                              {i + 1}
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-slate-800 mb-0.5">{item.title}</p>
                              <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Task Instructions */}
                  <section>
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Task Instructions</h2>
                    <button
                      onClick={() => setShowInstructionsModal(true)}
                      className="flex items-center gap-2 h-[38px] px-4 text-sm font-medium text-slate-700 border border-slate-200 rounded-[8px] hover:bg-slate-50 transition-colors"
                    >
                      <BookOpen className="h-4 w-4 text-slate-400" />
                      View Task Instructions
                    </button>
                  </section>
                </div>
              )}


            </div>
          </div>
        </div>
      </div>

      {/* Instructions modal */}
      {showInstructionsModal && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setShowInstructionsModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
            <div className="bg-white rounded-[14px] shadow-2xl w-full max-w-[560px] max-h-[80vh] flex flex-col pointer-events-auto">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-slate-400" />
                  <h3 className="text-sm font-semibold text-slate-800">Task Instructions</h3>
                </div>
                <button
                  onClick={() => setShowInstructionsModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="overflow-y-auto px-6 py-5 flex flex-col gap-3">
                {contest.instructions.split("\n\n").map((para, i) => (
                  <p key={i} className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
