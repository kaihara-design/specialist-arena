export interface LeaderboardEntry {
  rank: number;
  specialistId: string;     // "Specialist 482"
  displayName?: string;     // only shown for currentUser row
  score: number;            // time-decayed accuracy score, e.g. 87.4
  readsThisWeek: number;    // toward min (20) / max (100)
  casesCompleted: number;
  rankChange: number;       // +3, -2, 0 since last snapshot
  isNew?: boolean;
  lastActive: string;
  isCurrentUser?: boolean;
  isBelowMinReads?: boolean; // not shown on leaderboard; shown only to self
}

export interface AIModelEntry {
  rank: number;
  modelName: string;
  score: number;
  lastEvaluated: string;
}

export interface Contest {
  id: string;
  title: string;
  description: string;
  about: string;
  taskType: string;
  participantCount: number;
  activeSince: string;
  prizePool: string;            // display string e.g. "$100 Prize Pool"
  prizeRefreshPeriod: string;
  prizePoolAmount: number;      // 100
  minReads: number;             // 20 — min reads/week to appear on leaderboard
  maxReads: number;             // 100 — hard weekly read cap
  aiModelCount: number;
  centaurBestScore: string;
  topHumanScore: string;
  prizeCycleDaysLeft: number;
  scoring: { title: string; body: string }[];
  instructions: string;
  hasPractice: boolean;
  leaderboard: LeaderboardEntry[];
  aiLeaderboard: AIModelEntry[];
}

export interface CurrentUser {
  id: string;
  displayName: string;
  initials: string;
  email: string;
}
