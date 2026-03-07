import type { Contest, CurrentUser, LeaderboardEntry, AIModelEntry } from "./types";

export const CURRENT_USER: CurrentUser = {
  id: "874",
  displayName: "Jane Liam",
  initials: "JL",
  email: "jliam@centaurlabs.com",
};

// Leaderboard with user ranked #65 (out of top 20) — earnings in $
export const LEADERBOARD_OUT_OF_TOP: LeaderboardEntry[] = [
  { rank: 1,  specialistId: "Specialist 989", earnings: 48.50, casesCompleted: 2425, rankChange: 0,  lastActive: "1h ago" },
  { rank: 2,  specialistId: "Specialist 111", earnings: 43.20, casesCompleted: 2160, rankChange: 2,  lastActive: "2h ago" },
  { rank: 3,  specialistId: "Specialist 180", earnings: 39.80, casesCompleted: 1990, rankChange: -1, lastActive: "3h ago" },
  { rank: 4,  specialistId: "Specialist 523", earnings: 36.40, casesCompleted: 1820, rankChange: 1,  lastActive: "4h ago" },
  { rank: 5,  specialistId: "Specialist 874", earnings: 33.10, casesCompleted: 1655, rankChange: 0,  lastActive: "5h ago" },
  { rank: 6,  specialistId: "Specialist 312", earnings: 29.80, casesCompleted: 1490, rankChange: -2, lastActive: "6h ago" },
  { rank: 7,  specialistId: "Specialist 456", earnings: 27.20, casesCompleted: 1360, rankChange: 3,  lastActive: "8h ago", isNew: true },
  { rank: 8,  specialistId: "Specialist 789", earnings: 24.60, casesCompleted: 1230, rankChange: 0,  lastActive: "10h ago" },
  { rank: 9,  specialistId: "Specialist 654", earnings: 22.10, casesCompleted: 1105, rankChange: -1, lastActive: "12h ago" },
  { rank: 10, specialistId: "Specialist 234", earnings: 20.40, casesCompleted: 1020, rankChange: 2,  lastActive: "14h ago" },
  { rank: 11, specialistId: "Specialist 901", earnings: 18.20, casesCompleted: 910,  rankChange: 0,  lastActive: "16h ago" },
  { rank: 12, specialistId: "Specialist 445", earnings: 16.80, casesCompleted: 840,  rankChange: 1,  lastActive: "1d ago" },
  { rank: 13, specialistId: "Specialist 067", earnings: 15.40, casesCompleted: 770,  rankChange: -3, lastActive: "1d ago" },
  { rank: 14, specialistId: "Specialist 228", earnings: 14.10, casesCompleted: 705,  rankChange: 0,  lastActive: "1d ago" },
  { rank: 15, specialistId: "Specialist 773", earnings: 13.00, casesCompleted: 650,  rankChange: 2,  lastActive: "2d ago" },
  { rank: 16, specialistId: "Specialist 392", earnings: 12.00, casesCompleted: 600,  rankChange: 0,  lastActive: "2d ago" },
  { rank: 17, specialistId: "Specialist 558", earnings: 11.00, casesCompleted: 550,  rankChange: -1, lastActive: "2d ago" },
  { rank: 18, specialistId: "Specialist 841", earnings: 10.20, casesCompleted: 510,  rankChange: 0,  lastActive: "3d ago" },
  { rank: 19, specialistId: "Specialist 127", earnings:  9.40, casesCompleted: 470,  rankChange: 4,  lastActive: "3d ago" },
  { rank: 20, specialistId: "Specialist 663", earnings:  8.80, casesCompleted: 440,  rankChange: -2, lastActive: "3d ago" },
  // Neighbors around current user at rank 65
  { rank: 64, specialistId: "Specialist 523", earnings:  4.20, casesCompleted: 210,  rankChange: 1,  lastActive: "4h ago" },
  {
    rank: 65,
    specialistId: `Specialist ${CURRENT_USER.id}`,
    displayName: CURRENT_USER.displayName,
    earnings: 4.00,
    casesCompleted: 200,
    rankChange: 2,
    lastActive: "2h ago",
    isCurrentUser: true,
  },
  { rank: 66, specialistId: "Specialist 321", earnings:  3.80, casesCompleted: 190,  rankChange: 0,  lastActive: "6h ago" },
];

// Leaderboard with user ranked #6 (within top 20) — earnings in $
export const LEADERBOARD_IN_TOP: LeaderboardEntry[] = [
  { rank: 1,  specialistId: "Specialist 989", earnings: 50.00, casesCompleted: 2500, rankChange: 0,  lastActive: "1h ago", isCapped: true },
  { rank: 2,  specialistId: "Specialist 111", earnings: 47.30, casesCompleted: 2365, rankChange: 2,  lastActive: "2h ago" },
  { rank: 3,  specialistId: "Specialist 180", earnings: 44.60, casesCompleted: 2230, rankChange: -1, lastActive: "3h ago" },
  { rank: 4,  specialistId: "Specialist 523", earnings: 42.10, casesCompleted: 2105, rankChange: 1,  lastActive: "4h ago" },
  { rank: 5,  specialistId: "Specialist 874", earnings: 38.80, casesCompleted: 1940, rankChange: 0,  lastActive: "5h ago" },
  {
    rank: 6,
    specialistId: `Specialist ${CURRENT_USER.id}`,
    displayName: CURRENT_USER.displayName,
    earnings: 34.50,
    casesCompleted: 1725,
    rankChange: 3,
    lastActive: "2h ago",
    isCurrentUser: true,
  },
  { rank: 7,  specialistId: "Specialist 456", earnings: 31.20, casesCompleted: 1560, rankChange: -1, lastActive: "8h ago" },
  { rank: 8,  specialistId: "Specialist 789", earnings: 28.40, casesCompleted: 1420, rankChange: 0,  lastActive: "10h ago" },
  { rank: 9,  specialistId: "Specialist 654", earnings: 25.60, casesCompleted: 1280, rankChange: 2,  lastActive: "12h ago" },
  { rank: 10, specialistId: "Specialist 234", earnings: 23.10, casesCompleted: 1155, rankChange: -2, lastActive: "14h ago" },
  { rank: 11, specialistId: "Specialist 901", earnings: 20.80, casesCompleted: 1040, rankChange: 0,  lastActive: "16h ago" },
  { rank: 12, specialistId: "Specialist 445", earnings: 18.60, casesCompleted:  930, rankChange: 1,  lastActive: "1d ago" },
];

// AI model benchmarks (accuracy scores 0-100)
export const AI_MODELS_LEADERBOARD: AIModelEntry[] = [
  { rank: 1, modelName: "GPT-4o",            score: 91.2, lastEvaluated: "1d ago" },
  { rank: 2, modelName: "Gemini 1.5 Pro",    score: 87.8, lastEvaluated: "2d ago" },
  { rank: 3, modelName: "Claude 3.5 Sonnet", score: 85.1, lastEvaluated: "2d ago" },
  { rank: 4, modelName: "Gemini 1.5 Flash",  score: 82.3, lastEvaluated: "3d ago" },
  { rank: 5, modelName: "GPT-4 Turbo",       score: 79.7, lastEvaluated: "3d ago" },
];

const EARN_MODE_SCORING = [
  {
    title: "Earn per read",
    body: "You earn $0.02 for each qualified read you submit. The more you complete, the more you earn — every read counts.",
  },
  {
    title: "Quality matters",
    body: "Each read is assessed individually for accuracy. Only reads that meet the quality bar earn. There's no single account-level score — it's judged per read.",
  },
  {
    title: "Weekly earning cap",
    body: "You can earn up to $50 per week. Once you reach the cap, you stop earning until it resets the following week. You can still submit reads, but they won't earn.",
  },
  {
    title: "Complete more",
    body: "Higher earnings = higher rank on the leaderboard. Once a specialist hits their cap, others can catch up — fresh race every week.",
  },
  {
    title: "Tie-breaking",
    body: "When two specialists have the same earnings, the one who submitted more total reads ranks higher.",
  },
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
    prizePool: "Up to $50",
    prizeRefreshPeriod: "weekly",
    aiModelCount: 5,
    centaurBestScore: "94.7",
    topHumanScore: "91.3",
    prizeCycleDaysLeft: 4,
    earnMode: true,
    ratePerRead: 0.02,
    earningCap: 50,
    scoring: EARN_MODE_SCORING,
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
    prizePool: "Up to $50",
    prizeRefreshPeriod: "weekly",
    aiModelCount: 5,
    centaurBestScore: "91.3",
    topHumanScore: "88.9",
    prizeCycleDaysLeft: 4,
    earnMode: true,
    ratePerRead: 0.02,
    earningCap: 50,
    scoring: EARN_MODE_SCORING,
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
      "Grade optical coherence tomography scans for diabetic macular edema and age-related macular degeneration severity.",
    about:
      "Optical coherence tomography (OCT) is the standard of care for retinal imaging, yet grading thousands of scans for clinical trials and AI training requires specialist time that is in short supply. In this competition, ophthalmologists and optometrists review OCT cross-sections and grade disease severity on a structured scale.\n\nYour annotations directly accelerate the development of AI screening tools for diabetic retinopathy and AMD — two of the leading causes of preventable blindness worldwide.",
    taskType: "Grading",
    participantCount: 74,
    activeSince: "Feb 20, 2025",
    prizePool: "Up to $50",
    prizeRefreshPeriod: "weekly",
    aiModelCount: 5,
    centaurBestScore: "89.4",
    topHumanScore: "86.1",
    prizeCycleDaysLeft: 4,
    earnMode: true,
    ratePerRead: 0.02,
    earningCap: 50,
    scoring: EARN_MODE_SCORING,
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
      "Review digitized histopathology slides and identify tumor margins, grade malignancy, and annotate tissue subtypes.",
    about:
      "Digital pathology is transforming how tissue samples are analyzed, but AI models require expert-labeled training data at scale. In this competition, pathologists review whole-slide images cropped to regions of interest and classify tissue as benign, pre-malignant, or malignant — with additional subtype annotation where applicable.\n\nEvery case you label advances the accuracy of AI-assisted pathology tools used in cancer diagnosis pipelines.",
    taskType: "Classification",
    participantCount: 61,
    activeSince: "Mar 1, 2025",
    prizePool: "Up to $50",
    prizeRefreshPeriod: "weekly",
    aiModelCount: 5,
    centaurBestScore: "87.9",
    topHumanScore: "84.6",
    prizeCycleDaysLeft: 4,
    earnMode: true,
    ratePerRead: 0.02,
    earningCap: 50,
    scoring: EARN_MODE_SCORING,
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
      "Classify 12-lead ECG recordings across arrhythmia categories. Requires cardiology or emergency medicine background.",
    about:
      "Cardiac arrhythmias are among the most time-sensitive diagnoses in medicine, yet automated ECG interpretation still misses clinically important findings. In this competition, cardiologists and emergency physicians review 10-second 12-lead ECG strips and assign the primary rhythm classification.\n\nYour labels contribute to training models that will flag abnormal rhythms in remote monitoring and wearable devices — extending specialist-level ECG reading to populations without access to cardiologists.",
    taskType: "Classification",
    participantCount: 88,
    activeSince: "Mar 5, 2025",
    prizePool: "Up to $50",
    prizeRefreshPeriod: "weekly",
    aiModelCount: 5,
    centaurBestScore: "92.1",
    topHumanScore: "89.8",
    prizeCycleDaysLeft: 4,
    earnMode: true,
    ratePerRead: 0.02,
    earningCap: 50,
    scoring: EARN_MODE_SCORING,
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
