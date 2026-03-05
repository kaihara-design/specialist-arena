import Link from "next/link";
import { Users, Bot } from "lucide-react";
import type { Contest } from "@/lib/types";

interface ContestCardProps {
  contest: Contest;
}

export function ContestCard({ contest }: ContestCardProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-[0.7px] text-indigo-600 bg-indigo-50 px-2 py-1 rounded-[4px]">
            {contest.taskType}
          </span>
          <h3 className="text-[20px] font-bold text-slate-800 leading-[28px] tracking-[-0.45px] mt-2">
            {contest.title}
          </h3>
        </div>
        {/* Prize pool — prominent */}
        <div className="text-right flex-shrink-0">
          <p className="text-xl font-extrabold text-amber-500">{contest.prizePool}</p>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide leading-none mt-0.5">
            {contest.prizeRefreshPeriod} prize
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm font-medium text-slate-600 leading-[20px]">
        {contest.description}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" />
          {contest.participantCount} specialists
        </span>
        <span className="flex items-center gap-1.5">
          <Bot className="h-3.5 w-3.5" />
          {contest.aiModelCount} AI models competing
        </span>
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <Link
          href={`/arena/contest/${contest.id}`}
          className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
        >
          View leaderboard →
        </Link>
        <Link
          href={`/arena/contest/${contest.id}`}
          className="flex items-center h-[32px] px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-[8px] transition-colors btn-shadow"
        >
          Join Competition
        </Link>
      </div>
    </div>
  );
}
