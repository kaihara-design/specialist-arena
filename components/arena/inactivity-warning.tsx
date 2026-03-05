"use client";

import { useState } from "react";
import { AlertTriangle, X, ArrowRight } from "lucide-react";
import Link from "next/link";

interface InactivityWarningProps {
  daysInactive: number;
  contestId: string;
}

export function InactivityWarning({
  daysInactive,
  contestId,
}: InactivityWarningProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="flex items-start gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-[10px] animate-fade-in">
      <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-amber-800">
          You haven&apos;t competed in {daysInactive} days —
          your score may drop soon
        </p>
        <Link
          href={`/arena/contest/${contestId}`}
          className="inline-flex items-center gap-1 mt-1 text-xs font-medium text-amber-700 hover:text-amber-900 transition-colors"
        >
          Compete now
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-amber-400 hover:text-amber-600 transition-colors flex-shrink-0"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
