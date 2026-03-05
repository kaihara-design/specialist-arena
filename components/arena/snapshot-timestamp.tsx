import { Clock } from "lucide-react";

interface SnapshotTimestampProps {
  lastUpdated: string;
  nextRefresh: string;
}

export function SnapshotTimestamp({
  lastUpdated,
  nextRefresh,
}: SnapshotTimestampProps) {
  return (
    <div className="flex items-center justify-center gap-1.5 py-4">
      <Clock className="h-3 w-3 text-[#90a1b9]" />
      <p className="text-xs font-medium text-[#90a1b9]">
        Last updated {lastUpdated} · Next refresh in {nextRefresh}
      </p>
    </div>
  );
}
