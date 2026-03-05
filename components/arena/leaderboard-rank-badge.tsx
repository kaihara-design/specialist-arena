import { cn } from "@/lib/utils";

interface LeaderboardRankBadgeProps {
  rank: number;
  size?: "sm" | "md";
}

export function LeaderboardRankBadge({
  rank,
  size = "md",
}: LeaderboardRankBadgeProps) {
  const sz = size === "sm" ? "w-5 h-5 text-[10px]" : "w-6 h-6 text-xs";

  if (rank === 1) {
    return (
      <div
        className={cn(
          "rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white",
          sz
        )}
        style={{
          background: "linear-gradient(to bottom, #ffd230, #fe9a00)",
          boxShadow:
            "0px 0px 0px 0px #fef3c6, 0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px 0px rgba(0,0,0,0.1)",
        }}
      >
        1
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div
        className={cn(
          "rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white",
          sz
        )}
        style={{
          background: "linear-gradient(to bottom, #cad5e2, #90a1b9)",
          boxShadow:
            "0px 0px 0px 0px #f1f5f9, 0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px 0px rgba(0,0,0,0.1)",
        }}
      >
        2
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div
        className={cn(
          "rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white",
          sz
        )}
        style={{
          background: "linear-gradient(to bottom, #ffb86a, #ff8904)",
          boxShadow:
            "0px 0px 0px 0px #ffedd4, 0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px 0px rgba(0,0,0,0.1)",
        }}
      >
        3
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center flex-shrink-0 font-semibold text-slate-500",
        sz
      )}
    >
      {rank}
    </div>
  );
}
