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

export interface Contest {
  id: string;
  title: string;
  description: string;
  taskType: string;
  participantCount: number;
  activeSince: string;
  leaderboard: LeaderboardEntry[];
}

export interface CurrentUser {
  id: string;
  displayName: string;
  initials: string;
  email: string;
}
