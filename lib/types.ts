export interface LeaderboardEntry {
  rank: number;
  specialistId: string; // "Specialist 482"
  displayName?: string; // only shown for currentUser row
  earnings: number;     // $ earned this cycle
  casesCompleted: number;
  rankChange: number;   // +3, -2, 0 since last snapshot
  isNew?: boolean;
  lastActive: string;
  isCurrentUser?: boolean;
  isCapped?: boolean;   // hit weekly earning cap
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
  prizePool: string;        // display string e.g. "Up to $50"
  prizeRefreshPeriod: string;
  aiModelCount: number;
  centaurBestScore: string;
  topHumanScore: string;    // accuracy benchmark for overview tab
  prizeCycleDaysLeft: number;
  earnMode: boolean;
  ratePerRead: number;      // $ per qualified read, e.g. 0.02
  earningCap: number;       // weekly per-user cap in $, e.g. 50
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
