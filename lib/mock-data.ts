import type { Contest, CurrentUser, LeaderboardEntry, AIModelEntry } from "./types";

export const CURRENT_USER: CurrentUser = {
  id: "874",
  displayName: "Jane Liam",
  initials: "JL",
  email: "jliam@centaurlabs.com",
};

// Leaderboard with user ranked #65 (out of top 20) — scores on 0-100 scale
export const LEADERBOARD_OUT_OF_TOP: LeaderboardEntry[] = [
  { rank: 1,  specialistId: "Specialist 989", score: 94.7, rankChange: 0,  lastActive: "1h ago" },
  { rank: 2,  specialistId: "Specialist 111", score: 92.1, rankChange: 2,  lastActive: "2h ago" },
  { rank: 3,  specialistId: "Specialist 180", score: 88.6, rankChange: -1, lastActive: "3h ago" },
  { rank: 4,  specialistId: "Specialist 523", score: 85.4, rankChange: 1,  lastActive: "4h ago" },
  { rank: 5,  specialistId: "Specialist 874", score: 83.1, rankChange: 0,  lastActive: "5h ago" },
  { rank: 6,  specialistId: "Specialist 312", score: 80.7, rankChange: -2, lastActive: "6h ago" },
  { rank: 7,  specialistId: "Specialist 456", score: 79.2, rankChange: 3,  lastActive: "8h ago", isNew: true },
  { rank: 8,  specialistId: "Specialist 789", score: 77.6, rankChange: 0,  lastActive: "10h ago" },
  { rank: 9,  specialistId: "Specialist 654", score: 75.1, rankChange: -1, lastActive: "12h ago" },
  { rank: 10, specialistId: "Specialist 234", score: 73.8, rankChange: 2,  lastActive: "14h ago" },
  { rank: 11, specialistId: "Specialist 901", score: 71.4, rankChange: 0,  lastActive: "16h ago" },
  { rank: 12, specialistId: "Specialist 445", score: 69.8, rankChange: 1,  lastActive: "1d ago" },
  { rank: 13, specialistId: "Specialist 067", score: 68.1, rankChange: -3, lastActive: "1d ago" },
  { rank: 14, specialistId: "Specialist 228", score: 66.5, rankChange: 0,  lastActive: "1d ago" },
  { rank: 15, specialistId: "Specialist 773", score: 64.9, rankChange: 2,  lastActive: "2d ago" },
  { rank: 16, specialistId: "Specialist 392", score: 63.1, rankChange: 0,  lastActive: "2d ago" },
  { rank: 17, specialistId: "Specialist 558", score: 61.4, rankChange: -1, lastActive: "2d ago" },
  { rank: 18, specialistId: "Specialist 841", score: 59.8, rankChange: 0,  lastActive: "3d ago" },
  { rank: 19, specialistId: "Specialist 127", score: 58.1, rankChange: 4,  lastActive: "3d ago" },
  { rank: 20, specialistId: "Specialist 663", score: 56.4, rankChange: -2, lastActive: "3d ago" },
  // Neighbors around current user at rank 65
  { rank: 64, specialistId: "Specialist 523", score: 39.1, rankChange: 1,  lastActive: "4h ago" },
  {
    rank: 65,
    specialistId: `Specialist ${CURRENT_USER.id}`,
    displayName: CURRENT_USER.displayName,
    score: 38.8,
    rankChange: 2,
    lastActive: "2h ago",
    isCurrentUser: true,
  },
  { rank: 66, specialistId: "Specialist 321", score: 38.5, rankChange: 0,  lastActive: "6h ago" },
];

// Leaderboard with user ranked #6 (within top 20) — scores on 0-100 scale
export const LEADERBOARD_IN_TOP: LeaderboardEntry[] = [
  { rank: 1, specialistId: "Specialist 989", score: 94.7, rankChange: 0,  lastActive: "1h ago" },
  { rank: 2, specialistId: "Specialist 111", score: 92.1, rankChange: 2,  lastActive: "2h ago" },
  { rank: 3, specialistId: "Specialist 180", score: 88.6, rankChange: -1, lastActive: "3h ago" },
  { rank: 4, specialistId: "Specialist 523", score: 85.4, rankChange: 1,  lastActive: "4h ago" },
  { rank: 5, specialistId: "Specialist 874", score: 83.1, rankChange: 0,  lastActive: "5h ago" },
  {
    rank: 6,
    specialistId: `Specialist ${CURRENT_USER.id}`,
    displayName: CURRENT_USER.displayName,
    score: 80.7,
    rankChange: 3,
    lastActive: "2h ago",
    isCurrentUser: true,
  },
  { rank: 7,  specialistId: "Specialist 456", score: 79.2, rankChange: -1, lastActive: "8h ago" },
  { rank: 8,  specialistId: "Specialist 789", score: 77.6, rankChange: 0,  lastActive: "10h ago" },
  { rank: 9,  specialistId: "Specialist 654", score: 75.1, rankChange: 2,  lastActive: "12h ago" },
  { rank: 10, specialistId: "Specialist 234", score: 73.8, rankChange: -2, lastActive: "14h ago" },
  { rank: 11, specialistId: "Specialist 901", score: 71.4, rankChange: 0,  lastActive: "16h ago" },
  { rank: 12, specialistId: "Specialist 445", score: 69.8, rankChange: 1,  lastActive: "1d ago", hasDecayRisk: true },
];

// AI model benchmarks (same 0-100 scoring scale)
export const AI_MODELS_LEADERBOARD: AIModelEntry[] = [
  { rank: 1, modelName: "GPT-4o",            score: 91.2, lastEvaluated: "1d ago" },
  { rank: 2, modelName: "Gemini 1.5 Pro",    score: 87.8, lastEvaluated: "2d ago" },
  { rank: 3, modelName: "Claude 3.5 Sonnet", score: 85.1, lastEvaluated: "2d ago" },
  { rank: 4, modelName: "Gemini 1.5 Flash",  score: 82.3, lastEvaluated: "3d ago" },
  { rank: 5, modelName: "GPT-4 Turbo",       score: 79.7, lastEvaluated: "3d ago" },
];

const SHARED_SCORING = [
  {
    title: "Accuracy",
    body: "Your agreement rate with the consensus answer, weighted by case difficulty. This is the dominant factor in your score.",
  },
  {
    title: "Throughput",
    body: "The number of cases you complete in the current weekly cycle. Completing more cases raises your score — volume matters.",
  },
  {
    title: "Recency",
    body: "Cases completed recently count more than older work. Staying active keeps your score high; inactivity causes gradual decay.",
  },
  {
    title: "Minimum eligibility",
    body: "You must complete at least 25 cases in the current weekly cycle to qualify for a prize payout.",
  },
  {
    title: "Tie-breaking",
    body: "When scores are equal, more cases completed = higher rank.",
  },
];

const SHARED_PRIZE_STRUCTURE = [
  { rank: "1st", amount: "$250" },
  { rank: "2nd", amount: "$150" },
  { rank: "3rd", amount: "$100" },
];

export const CONTESTS: Contest[] = [
  {
    id: "skin-lesion",
    title: "Skin Lesion Classification",
    description:
      "Analyze dermatological images and classify lesions across 8 categories. High-difficulty task requiring clinical expertise in dermoscopy.",
    about:
      "Skin cancer is the most common cancer worldwide, yet early diagnosis dramatically improves outcomes. In this competition, specialists review dermoscopy images and classify lesions across eight categories — from benign nevi to melanoma. Your labels contribute directly to a gold-standard dataset that trains AI models used in clinical screening tools.\n\nEvery case you complete helps close the gap between expert diagnosis and what automated systems can reliably detect. The task is challenging by design: difficult cases earn more when labeled correctly, and the collective consensus of top specialists consistently outperforms any single annotator or AI model.",
    taskType: "Classification",
    participantCount: 150,
    activeSince: "Jan 15, 2025",
    prizePool: "$500",
    prizeRefreshPeriod: "weekly",
    aiModelCount: 5,
    centaurBestScore: "94.7",
    prizeCycleDaysLeft: 4,
    prizeStructure: SHARED_PRIZE_STRUCTURE,
    scoring: SHARED_SCORING,
    instructions:
      "For each dermoscopy image, select the lesion category that best matches what you observe.\n\nKey features to assess:\n• Asymmetry — is the lesion irregular in shape?\n• Border — are the edges well-defined or irregular?\n• Color — is there variation (multiple shades of brown, black, red, white, or blue)?\n• Dermoscopic structures — look for network patterns, globules, streaks, or regression areas\n\nIf you are genuinely uncertain between two categories, choose the one that best fits the dominant features. Avoid skipping unless the image quality prevents assessment — uncertain answers are weighted less harshly than wrong ones.",
    hasPractice: true,
    leaderboard: LEADERBOARD_OUT_OF_TOP,
    aiLeaderboard: AI_MODELS_LEADERBOARD,
  },
  {
    id: "chest-xray",
    title: "Chest X-Ray Interpretation",
    description:
      "Identify and annotate findings in chest radiographs including pneumonia, effusions, and nodules. Requires radiology knowledge.",
    about:
      "Chest radiograph interpretation is one of the most common — and error-prone — tasks in clinical radiology. Missed findings cost lives; over-reads waste resources. In this competition, specialists review frontal chest X-rays and identify the primary pathological finding from a structured set of options.\n\nYour annotations help build AI models that can flag abnormalities in resource-limited settings where radiologists are scarce. The competition is designed to capture expert-level signal: cases with high annotator agreement receive less weight, while contested cases — where human judgment matters most — are scored more heavily.",
    taskType: "Segmentation",
    participantCount: 98,
    activeSince: "Feb 3, 2025",
    prizePool: "$500",
    prizeRefreshPeriod: "weekly",
    aiModelCount: 5,
    centaurBestScore: "91.3",
    prizeCycleDaysLeft: 4,
    prizeStructure: SHARED_PRIZE_STRUCTURE,
    scoring: SHARED_SCORING,
    instructions:
      "For each chest X-ray, identify the primary finding from the options provided.\n\nStructured review approach:\n1. Assess lung fields — look for consolidation, haziness, or nodules\n2. Check the costophrenic angles — blunting suggests effusion\n3. Review the hilum and mediastinum — widening may indicate lymphadenopathy or vascular enlargement\n4. Examine the heart size — cardiomegaly is defined as cardiothoracic ratio > 0.5 on PA view\n5. Inspect the bones and soft tissues for incidental findings\n\nSelect 'No acute finding' only if the radiograph is clearly normal. If multiple findings are present, choose the most clinically significant one.",
    hasPractice: false,
    leaderboard: LEADERBOARD_IN_TOP,
    aiLeaderboard: AI_MODELS_LEADERBOARD,
  },
];

export const SNAPSHOT_INFO = {
  lastUpdated: "2h ago",
  nextRefresh: "~4h",
};
