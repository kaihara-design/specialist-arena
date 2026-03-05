import type { Contest, CurrentUser, LeaderboardEntry } from "./types";

export const CURRENT_USER: CurrentUser = {
  id: "874",
  displayName: "Jane Liam",
  initials: "JL",
  email: "jliam@centaurlabs.com",
};

// Leaderboard with user ranked #65 (out of top 20)
export const LEADERBOARD_OUT_OF_TOP: LeaderboardEntry[] = [
  { rank: 1,  specialistId: "Specialist 989", score: 947, rankChange: 0,  lastActive: "1h ago" },
  { rank: 2,  specialistId: "Specialist 111", score: 921, rankChange: 2,  lastActive: "2h ago" },
  { rank: 3,  specialistId: "Specialist 180", score: 886, rankChange: -1, lastActive: "3h ago" },
  { rank: 4,  specialistId: "Specialist 523", score: 854, rankChange: 1,  lastActive: "4h ago" },
  { rank: 5,  specialistId: "Specialist 874", score: 831, rankChange: 0,  lastActive: "5h ago" },
  { rank: 6,  specialistId: "Specialist 312", score: 807, rankChange: -2, lastActive: "6h ago" },
  { rank: 7,  specialistId: "Specialist 456", score: 792, rankChange: 3,  lastActive: "8h ago", isNew: true },
  { rank: 8,  specialistId: "Specialist 789", score: 776, rankChange: 0,  lastActive: "10h ago" },
  { rank: 9,  specialistId: "Specialist 654", score: 751, rankChange: -1, lastActive: "12h ago" },
  { rank: 10, specialistId: "Specialist 234", score: 738, rankChange: 2,  lastActive: "14h ago" },
  { rank: 11, specialistId: "Specialist 901", score: 714, rankChange: 0,  lastActive: "16h ago" },
  { rank: 12, specialistId: "Specialist 445", score: 698, rankChange: 1,  lastActive: "1d ago" },
  { rank: 13, specialistId: "Specialist 067", score: 681, rankChange: -3, lastActive: "1d ago" },
  { rank: 14, specialistId: "Specialist 228", score: 665, rankChange: 0,  lastActive: "1d ago" },
  { rank: 15, specialistId: "Specialist 773", score: 649, rankChange: 2,  lastActive: "2d ago" },
  { rank: 16, specialistId: "Specialist 392", score: 631, rankChange: 0,  lastActive: "2d ago" },
  { rank: 17, specialistId: "Specialist 558", score: 614, rankChange: -1, lastActive: "2d ago" },
  { rank: 18, specialistId: "Specialist 841", score: 598, rankChange: 0,  lastActive: "3d ago" },
  { rank: 19, specialistId: "Specialist 127", score: 581, rankChange: 4,  lastActive: "3d ago" },
  { rank: 20, specialistId: "Specialist 663", score: 564, rankChange: -2, lastActive: "3d ago" },
  // Neighbors around current user at rank 65
  { rank: 64, specialistId: "Specialist 523", score: 391, rankChange: 1,  lastActive: "4h ago" },
  {
    rank: 65,
    specialistId: `Specialist ${CURRENT_USER.id}`,
    displayName: CURRENT_USER.displayName,
    score: 388,
    rankChange: 2,
    lastActive: "2h ago",
    isCurrentUser: true,
  },
  { rank: 66, specialistId: "Specialist 321", score: 385, rankChange: 0,  lastActive: "6h ago" },
];

// Leaderboard with user ranked #6 (within top 20)
export const LEADERBOARD_IN_TOP: LeaderboardEntry[] = [
  { rank: 1, specialistId: "Specialist 989", score: 947, rankChange: 0,  lastActive: "1h ago" },
  { rank: 2, specialistId: "Specialist 111", score: 921, rankChange: 2,  lastActive: "2h ago" },
  { rank: 3, specialistId: "Specialist 180", score: 886, rankChange: -1, lastActive: "3h ago" },
  { rank: 4, specialistId: "Specialist 523", score: 854, rankChange: 1,  lastActive: "4h ago" },
  { rank: 5, specialistId: "Specialist 874", score: 831, rankChange: 0,  lastActive: "5h ago" },
  {
    rank: 6,
    specialistId: `Specialist ${CURRENT_USER.id}`,
    displayName: CURRENT_USER.displayName,
    score: 807,
    rankChange: 3,
    lastActive: "2h ago",
    isCurrentUser: true,
  },
  { rank: 7,  specialistId: "Specialist 456", score: 792, rankChange: -1, lastActive: "8h ago" },
  { rank: 8,  specialistId: "Specialist 789", score: 776, rankChange: 0,  lastActive: "10h ago" },
  { rank: 9,  specialistId: "Specialist 654", score: 751, rankChange: 2,  lastActive: "12h ago" },
  { rank: 10, specialistId: "Specialist 234", score: 738, rankChange: -2, lastActive: "14h ago" },
  { rank: 11, specialistId: "Specialist 901", score: 714, rankChange: 0,  lastActive: "16h ago" },
  { rank: 12, specialistId: "Specialist 445", score: 698, rankChange: 1,  lastActive: "1d ago", hasDecayRisk: true },
];

export const CONTESTS: Contest[] = [
  {
    id: "skin-lesion",
    title: "Skin Lesion Classification",
    description:
      "Analyze dermatological images and classify lesions across 8 categories. High-difficulty task requiring clinical expertise in dermoscopy.",
    taskType: "Classification",
    participantCount: 150,
    activeSince: "Jan 15, 2025",
    leaderboard: LEADERBOARD_OUT_OF_TOP,
  },
  {
    id: "chest-xray",
    title: "Chest X-Ray Interpretation",
    description:
      "Identify and annotate findings in chest radiographs including pneumonia, effusions, and nodules. Requires radiology knowledge.",
    taskType: "Detection",
    participantCount: 98,
    activeSince: "Feb 3, 2025",
    leaderboard: LEADERBOARD_IN_TOP,
  },
];

export const SNAPSHOT_INFO = {
  lastUpdated: "2h ago",
  nextRefresh: "~1h",
};
