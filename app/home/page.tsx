"use client";

import Link from "next/link";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { TaskCard } from "@/components/home/task-card";
import { CONTESTS, CURRENT_USER } from "@/lib/mock-data";
import { PanelLeft, Users } from "lucide-react";

const FEATURED_TASK = {
  title: "Brain MRI Lesion Detection",
  taskType: "Segmentation",
  stageNote: "This task starts on Mar 10",
  description:
    "Review brain MRI scans and segment lesion regions across T1 and FLAIR sequences. Requires neuroradiology or neurology background.",
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-white">
      <DashboardSidebar active="home" />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="border-b border-[#e5e7eb] flex items-center gap-6 px-6 py-4 flex-shrink-0">
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <PanelLeft className="h-4 w-4" />
          </button>
          <div className="h-5 w-px bg-[#e5e7eb]" />
          <h1 className="text-base font-semibold text-[#1e293b]">Home</h1>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1131px] mx-auto px-6 py-10 flex flex-col gap-10">

            {/* Welcome */}
            <div className="animate-fade-in">
              <h2 className="text-[30px] font-bold text-[#1e293b] leading-[36px]">
                Welcome back, {CURRENT_USER.displayName.split(" ")[0]}!
              </h2>
              <p className="text-base text-slate-500 mt-1">
                Here&apos;s what&apos;s waiting for you today.
              </p>
            </div>

            {/* My Task */}
            <section className="animate-fade-in" style={{ animationDelay: "40ms" }}>
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-xl font-semibold text-slate-800">My Task</h3>
                <span className="text-base font-normal text-slate-500">1 assigned</span>
              </div>
              <TaskCard {...FEATURED_TASK} />
            </section>

            {/* Arena */}
            <section className="animate-fade-in" style={{ animationDelay: "80ms" }}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-semibold text-slate-800">Arena</h3>
                  <span className="text-base font-normal text-slate-500">
                    {CONTESTS.length} active
                  </span>
                </div>
                <Link
                  href="/arena"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  View Arena →
                </Link>
              </div>
              <p className="text-sm text-slate-500 mb-4">
                Join hundreds of specialists competing in open-to-all annotation challenges. Compete more, rank higher.
              </p>

              {/* Contest snapshot — 3 fixed cards */}
              <div className="grid grid-cols-3 gap-4">
                {CONTESTS.slice(0, 3).map((contest) => (
                  <Link
                    key={contest.id}
                    href={`/arena/contest/${contest.id}`}
                    className="border border-slate-100 rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] p-5 flex flex-col gap-3 hover:shadow-md hover:border-slate-200 transition-all"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.7px] text-slate-500 bg-slate-100 px-2 py-1 rounded-[4px]">
                        {contest.taskType}
                      </span>
                      <p className="text-base font-medium text-slate-400 flex-shrink-0">
                        <span className="text-xl font-extrabold text-amber-500">${contest.prizePoolAmount}</span><span className="text-[10px] font-medium uppercase tracking-wide"> pool</span>
                      </p>
                    </div>

                    {/* Title */}
                    <h4 className="text-sm font-bold text-slate-800 leading-snug">
                      {contest.title}
                    </h4>

                    {/* Meta */}
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-auto">
                      <Users className="h-3 w-3" />
                      <span>{contest.participantCount} specialists</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
