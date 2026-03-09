import Link from "next/link";
import { Users, Bot } from "lucide-react";
import type { Contest } from "@/lib/types";

interface ContestCardProps {
  contest: Contest;
}

export function ContestCard({ contest }: ContestCardProps) {
  return (
    <Link
      href={`/arena/contest/${contest.id}`}
      className="bg-white border border-slate-100 rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] p-6 flex flex-col gap-4 hover:shadow-md hover:border-slate-200 transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-[0.7px] text-slate-500 bg-slate-100 px-2 py-1 rounded-[4px]">
            {contest.taskType}
          </span>
          <h3 className="text-[20px] font-bold text-slate-800 leading-[28px] tracking-[-0.45px] mt-2">
            {contest.title}
          </h3>
        </div>
        {/* Prize pool */}
        <div className="text-right flex-shrink-0 flex flex-col gap-[2px]">
          <p className="text-2xl font-extrabold text-amber-500 leading-none">${contest.prizePoolAmount}</p>
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">prize pool</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm font-medium text-slate-600 leading-[20px]">
        {contest.description}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-slate-400 mt-auto">
        <span className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" />
          {contest.participantCount} specialists
        </span>
        <span className="flex items-center gap-1.5">
          <Bot className="h-3.5 w-3.5" />
          {contest.aiModelCount} AI models competing
        </span>
      </div>
    </Link>
  );
}
