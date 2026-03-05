export interface LeaderboardEntry {
  rank: number;
  specialistId: string; // "Specialist 482"
  displayName?: string; // only shown for currentUser row
  score: number;
  rankChange: number; // +3, -2, 0 since last snapshot
  isNew?: boolean;
  lastActive: string;
  isCurrentUser?: boolean;
  hasDecayRisk?: boolean;
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
  prizePool: string;
  prizeRefreshPeriod: string;
  aiModelCount: number;
  centaurBestScore: string;
  prizeCycleDaysLeft: number;
  prizeStructure: { rank: string; amount: string }[];
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
