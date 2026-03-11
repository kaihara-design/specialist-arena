import type { Contest, CurrentUser, LeaderboardEntry, AIModelEntry } from "./types";

export const PRIZE_BREAKDOWN: { rank: number; prize: number }[] = [
  { rank: 1, prize: 30 }, { rank: 2, prize: 20 }, { rank: 3, prize: 15 },
  { rank: 4, prize: 10 }, { rank: 5, prize: 8  }, { rank: 6, prize: 6  },
  { rank: 7, prize: 4  }, { rank: 8, prize: 3  }, { rank: 9, prize: 2  },
  { rank: 10, prize: 2 },
];

export const CURRENT_USER: CurrentUser = {
  id: "874",
  displayName: "Jane Liam",
  initials: "JL",
  email: "jliam@centaurlabs.com",
};

// Leaderboard with user ranked #65 (out of top 20) — scores 0-100
export const LEADERBOARD_OUT_OF_TOP: LeaderboardEntry[] = [
  { rank: 1,  specialistId: "Specialist 989", score: 94.2, readsThisWeek: 98,  casesCompleted: 2425, rankChange: 0,  lastActive: "1h ago" },
  { rank: 2,  specialistId: "Specialist 111", score: 91.7, readsThisWeek: 95,  casesCompleted: 2160, rankChange: 2,  lastActive: "2h ago" },
  { rank: 3,  specialistId: "Specialist 180", score: 89.3, readsThisWeek: 90,  casesCompleted: 1990, rankChange: -1, lastActive: "3h ago" },
  { rank: 4,  specialistId: "Specialist 523", score: 86.8, readsThisWeek: 88,  casesCompleted: 1820, rankChange: 1,  lastActive: "4h ago" },
  { rank: 5,  specialistId: "Specialist 874", score: 84.1, readsThisWeek: 85,  casesCompleted: 1655, rankChange: 0,  lastActive: "5h ago" },
  { rank: 6,  specialistId: "Specialist 312", score: 81.6, readsThisWeek: 82,  casesCompleted: 1490, rankChange: -2, lastActive: "6h ago" },
  { rank: 7,  specialistId: "Specialist 456", score: 79.2, readsThisWeek: 80,  casesCompleted: 1360, rankChange: 3,  lastActive: "8h ago", isNew: true },
  { rank: 8,  specialistId: "Specialist 789", score: 76.8, readsThisWeek: 76,  casesCompleted: 1230, rankChange: 0,  lastActive: "10h ago" },
  { rank: 9,  specialistId: "Specialist 654", score: 74.3, readsThisWeek: 74,  casesCompleted: 1105, rankChange: -1, lastActive: "12h ago" },
  { rank: 10, specialistId: "Specialist 234", score: 71.9, readsThisWeek: 71,  casesCompleted: 1020, rankChange: 2,  lastActive: "14h ago" },
  { rank: 11, specialistId: "Specialist 901", score: 69.4, readsThisWeek: 68,  casesCompleted: 910,  rankChange: 0,  lastActive: "16h ago" },
  { rank: 12, specialistId: "Specialist 445", score: 67.1, readsThisWeek: 65,  casesCompleted: 840,  rankChange: 1,  lastActive: "1d ago" },
  { rank: 13, specialistId: "Specialist 067", score: 64.8, readsThisWeek: 62,  casesCompleted: 770,  rankChange: -3, lastActive: "1d ago" },
  { rank: 14, specialistId: "Specialist 228", score: 62.5, readsThisWeek: 60,  casesCompleted: 705,  rankChange: 0,  lastActive: "1d ago" },
  { rank: 15, specialistId: "Specialist 773", score: 60.2, readsThisWeek: 58,  casesCompleted: 650,  rankChange: 2,  lastActive: "2d ago" },
  { rank: 16, specialistId: "Specialist 392", score: 58.0, readsThisWeek: 55,  casesCompleted: 600,  rankChange: 0,  lastActive: "2d ago" },
  { rank: 17, specialistId: "Specialist 558", score: 55.7, readsThisWeek: 52,  casesCompleted: 550,  rankChange: -1, lastActive: "2d ago" },
  { rank: 18, specialistId: "Specialist 841", score: 53.4, readsThisWeek: 50,  casesCompleted: 510,  rankChange: 0,  lastActive: "3d ago" },
  { rank: 19, specialistId: "Specialist 127", score: 51.2, readsThisWeek: 47,  casesCompleted: 470,  rankChange: 4,  lastActive: "3d ago" },
  { rank: 20, specialistId: "Specialist 663", score: 49.0, readsThisWeek: 44,  casesCompleted: 440,  rankChange: -2, lastActive: "3d ago" },
  // Neighbors around current user at rank 65
  { rank: 64, specialistId: "Specialist 523", score: 28.4, readsThisWeek: 26,  casesCompleted: 210,  rankChange: 1,  lastActive: "4h ago" },
  {
    rank: 65,
    specialistId: `Specialist ${CURRENT_USER.id}`,
    displayName: CURRENT_USER.displayName,
    score: 27.1,
    readsThisWeek: 24,
    casesCompleted: 200,
    rankChange: 2,
    lastActive: "2h ago",
    isCurrentUser: true,
  },
  { rank: 66, specialistId: "Specialist 321", score: 25.8, readsThisWeek: 22,  casesCompleted: 190,  rankChange: 0,  lastActive: "6h ago" },
];

// Leaderboard with user ranked #6 (within top 20) — scores 0-100
export const LEADERBOARD_IN_TOP: LeaderboardEntry[] = [
  { rank: 1,  specialistId: "Specialist 989", score: 94.2, readsThisWeek: 100, casesCompleted: 2500, rankChange: 0,  lastActive: "1h ago" },
  { rank: 2,  specialistId: "Specialist 111", score: 90.8, readsThisWeek: 97,  casesCompleted: 2365, rankChange: 2,  lastActive: "2h ago" },
  { rank: 3,  specialistId: "Specialist 180", score: 87.5, readsThisWeek: 93,  casesCompleted: 2230, rankChange: -1, lastActive: "3h ago" },
  { rank: 4,  specialistId: "Specialist 523", score: 84.2, readsThisWeek: 89,  casesCompleted: 2105, rankChange: 1,  lastActive: "4h ago" },
  { rank: 5,  specialistId: "Specialist 874", score: 80.9, readsThisWeek: 85,  casesCompleted: 1940, rankChange: 0,  lastActive: "5h ago" },
  {
    rank: 6,
    specialistId: `Specialist ${CURRENT_USER.id}`,
    displayName: CURRENT_USER.displayName,
    score: 77.6,
    readsThisWeek: 72,
    casesCompleted: 1725,
    rankChange: 3,
    lastActive: "2h ago",
    isCurrentUser: true,
  },
  { rank: 7,  specialistId: "Specialist 456", score: 74.3, readsThisWeek: 68,  casesCompleted: 1560, rankChange: -1, lastActive: "8h ago" },
  { rank: 8,  specialistId: "Specialist 789", score: 71.0, readsThisWeek: 64,  casesCompleted: 1420, rankChange: 0,  lastActive: "10h ago" },
  { rank: 9,  specialistId: "Specialist 654", score: 67.7, readsThisWeek: 60,  casesCompleted: 1280, rankChange: 2,  lastActive: "12h ago" },
  { rank: 10, specialistId: "Specialist 234", score: 64.4, readsThisWeek: 56,  casesCompleted: 1155, rankChange: -2, lastActive: "14h ago" },
  { rank: 11, specialistId: "Specialist 901", score: 61.1, readsThisWeek: 52,  casesCompleted: 1040, rankChange: 0,  lastActive: "16h ago" },
  { rank: 12, specialistId: "Specialist 445", score: 57.8, readsThisWeek: 48,  casesCompleted:  930, rankChange: 1,  lastActive: "1d ago" },
];

// AI model benchmarks (accuracy scores 0-100)
export const AI_MODELS_LEADERBOARD: AIModelEntry[] = [
  { rank: 1, modelName: "GPT-4o",            score: 91.2, lastEvaluated: "1d ago" },
  { rank: 2, modelName: "Gemini 1.5 Pro",    score: 87.8, lastEvaluated: "2d ago" },
  { rank: 3, modelName: "Claude 3.5 Sonnet", score: 85.1, lastEvaluated: "2d ago" },
  { rank: 4, modelName: "Gemini 1.5 Flash",  score: 82.3, lastEvaluated: "3d ago" },
  { rank: 5, modelName: "GPT-4 Turbo",       score: 79.7, lastEvaluated: "3d ago" },
];

const SCORE_MODE_SCORING = [
  {
    title: "Time-weighted score",
    body: "Your score is based on accuracy, weighted by recency. Cases decay over time — a case labeled last week contributes roughly half as much as one labeled today. Your score determines your rank, and your rank determines your share of the weekly prize.",
  },
  {
    title: "Min 20 cases per week",
    body: "You must complete at least 20 cases in a week to appear on the leaderboard and be eligible for prizes. Specialists below this threshold are not shown in rankings.",
  },
  {
    title: "Max 100 cases per week",
    body: "You can submit up to 100 cases per week. Once you reach the limit, no further cases are accepted until the weekly cycle resets. Make your cases count.",
  },
  {
    title: "Weekly prize pool",
    body: "Each week, the top 10 ranked specialists share $100. Rank #1 earns the most, with each position below receiving a smaller share. Your rank is determined by your score.",
  },
  {
    title: "Tie-breaking",
    body: "When two specialists have the same score, the one with more cases completed that week ranks higher.",
  },
];

export const CONTESTS: Contest[] = [
  {
    id: "skin-lesion",
    title: "Skin Lesion Classification",
    description:
      "Classify dermoscopy images across 8 lesion categories.",
    about:
      "Skin cancer is the most common cancer worldwide, yet early diagnosis dramatically improves outcomes. Your labels contribute directly to a gold-standard dataset that trains AI screening tools deployed in clinical settings. Difficult cases earn more when labeled correctly — and the collective consensus of top specialists consistently outperforms any individual or AI model.",
    taskType: "Classification",
    participantCount: 150,
    activeSince: "Jan 15, 2025",
    prizePool: "$100 Prize Pool",
    prizeRefreshPeriod: "weekly",
    prizePoolAmount: 100,
    minReads: 20,
    maxReads: 100,
    aiModelCount: 5,
    centaurBestScore: "94.7",
    topHumanScore: "91.3",
    prizeCycleDaysLeft: 4,
    scoring: SCORE_MODE_SCORING,
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
      "Segment and interpret pathological findings in chest X-rays.",
    about:
      "Missed findings in chest radiographs cost lives; over-reads waste clinical resources. Your annotations help build AI models that flag abnormalities in resource-limited settings where radiologists are scarce. Cases with high annotator disagreement carry more weight — where human judgment matters most, your precision makes the biggest difference.",
    taskType: "Segmentation",
    participantCount: 98,
    activeSince: "Feb 3, 2025",
    prizePool: "$100 Prize Pool",
    prizeRefreshPeriod: "weekly",
    prizePoolAmount: 100,
    minReads: 20,
    maxReads: 100,
    aiModelCount: 5,
    centaurBestScore: "91.3",
    topHumanScore: "88.9",
    prizeCycleDaysLeft: 4,
    scoring: SCORE_MODE_SCORING,
    instructions:
      "For each chest X-ray, identify the primary finding from the options provided.\n\nStructured review approach:\n1. Assess lung fields — look for consolidation, haziness, or nodules\n2. Check the costophrenic angles — blunting suggests effusion\n3. Review the hilum and mediastinum — widening may indicate lymphadenopathy or vascular enlargement\n4. Examine the heart size — cardiomegaly is defined as cardiothoracic ratio > 0.5 on PA view\n5. Inspect the bones and soft tissues for incidental findings\n\nSelect 'No acute finding' only if the radiograph is clearly normal. If multiple findings are present, choose the most clinically significant one.",
    hasPractice: false,
    leaderboard: LEADERBOARD_IN_TOP,
    aiLeaderboard: AI_MODELS_LEADERBOARD,
  },
  {
    id: "retinal-oct",
    title: "Retinal OCT Grading",
    description:
      "Grade retinal OCT scans for signs of disease severity.",
    about:
      "OCT is the standard of care for retinal imaging, but grading thousands of scans for AI training requires specialist time that is in short supply. Your annotations directly accelerate the development of screening tools for diabetic retinopathy and AMD — two of the leading causes of preventable blindness worldwide. Cases where annotators disagree are weighted more heavily, making expert judgment the most valuable input.",
    taskType: "Grading",
    participantCount: 74,
    activeSince: "Feb 20, 2025",
    prizePool: "$100 Prize Pool",
    prizeRefreshPeriod: "weekly",
    prizePoolAmount: 100,
    minReads: 20,
    maxReads: 100,
    aiModelCount: 5,
    centaurBestScore: "93.2",
    topHumanScore: "86.1",
    prizeCycleDaysLeft: 4,
    scoring: SCORE_MODE_SCORING,
    instructions:
      "For each OCT B-scan, assign a severity grade from 0 (no pathology) to 4 (severe) based on the presence and extent of fluid, drusen, and photoreceptor layer disruption.\n\nKey features to assess:\n• Subretinal fluid — hyporeflective space beneath the neurosensory retina\n• Intraretinal fluid — cystoid spaces within the retinal layers\n• Drusen — hyperreflective deposits above the RPE\n• Ellipsoid zone integrity — disruption indicates photoreceptor loss\n\nFocus on the central 3mm region when assigning your grade.",
    hasPractice: false,
    leaderboard: LEADERBOARD_OUT_OF_TOP,
    aiLeaderboard: AI_MODELS_LEADERBOARD,
  },
  {
    id: "pathology-slides",
    title: "Pathology Slide Analysis",
    description:
      "Classify tissue patterns across digitized pathology slides.",
    about:
      "AI-assisted pathology tools are transforming cancer diagnosis pipelines, but they require expert-labeled training data at scale. Your labels advance the accuracy of models used in clinical diagnosis — from early detection of pre-malignant changes to grading invasive carcinoma. Every case you complete contributes to a dataset that pathologists across the network help refine.",
    taskType: "Classification",
    participantCount: 61,
    activeSince: "Mar 1, 2025",
    prizePool: "$100 Prize Pool",
    prizeRefreshPeriod: "weekly",
    prizePoolAmount: 100,
    minReads: 20,
    maxReads: 100,
    aiModelCount: 5,
    centaurBestScore: "92.8",
    topHumanScore: "84.6",
    prizeCycleDaysLeft: 4,
    scoring: SCORE_MODE_SCORING,
    instructions:
      "For each histopathology image patch, select the tissue classification that best describes the predominant finding.\n\nClassification categories:\n• Normal — healthy tissue architecture, no atypia\n• Benign — abnormal but non-malignant (e.g. hyperplasia, adenoma)\n• Pre-malignant — dysplasia or in-situ changes\n• Malignant — invasive carcinoma or sarcoma\n\nWhen the image contains mixed tissue types, classify based on the most clinically significant region. Annotate the subtype when prompted.",
    hasPractice: true,
    leaderboard: LEADERBOARD_IN_TOP,
    aiLeaderboard: AI_MODELS_LEADERBOARD,
  },
  {
    id: "ecg-rhythm",
    title: "ECG Rhythm Classification",
    description:
      "Classify cardiac rhythm patterns from 12-lead ECG recordings.",
    about:
      "Cardiac arrhythmias are among the most time-sensitive diagnoses in medicine, yet automated ECG interpretation still misses clinically important findings. Your labels contribute to training models that flag abnormal rhythms in remote monitoring and wearable devices — extending specialist-level reading to populations without access to cardiologists. Contested cases carry more weight, rewarding the precise judgment that distinguishes expert from algorithmic interpretation.",
    taskType: "Classification",
    participantCount: 88,
    activeSince: "Mar 5, 2025",
    prizePool: "$100 Prize Pool",
    prizeRefreshPeriod: "weekly",
    prizePoolAmount: 100,
    minReads: 20,
    maxReads: 100,
    aiModelCount: 5,
    centaurBestScore: "92.1",
    topHumanScore: "89.8",
    prizeCycleDaysLeft: 4,
    scoring: SCORE_MODE_SCORING,
    instructions:
      "For each ECG strip, select the primary rhythm from the classification list.\n\nSystematic review approach:\n1. Rate — calculate ventricular rate (normal: 60–100 bpm)\n2. Rhythm — regular or irregular? If irregular, is it regularly irregular or chaotically irregular?\n3. P waves — present, morphology, relationship to QRS\n4. PR interval — normal (120–200ms), short, or prolonged\n5. QRS duration — narrow (<120ms) or wide (≥120ms)\n\nIf multiple abnormalities are present, classify the dominant rhythm. Note: do not classify based on ST/T wave changes alone unless they define the rhythm.",
    hasPractice: false,
    leaderboard: LEADERBOARD_OUT_OF_TOP,
    aiLeaderboard: AI_MODELS_LEADERBOARD,
  },
];

export const SNAPSHOT_INFO = {
  lastUpdated: "2h ago",
  nextRefresh: "~4h",
};
