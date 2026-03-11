# Specialist Arena — Progress

## Stack
Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui new-york
Font: Inter · Primary: `#4f46e5` (indigo) · Radius: 14px

## Dev server
Node via fnm. To activate: `eval "$(/Users/kaihara/.local/bin/fnm env --shell zsh)"`
Then: `npm run dev` — serves on port 3000.

## Current branch
`main`

---

## Session — 2026-03-10

### Contest Detail Page — Information Architecture Update
**Plan file:** `~/.claude/plans/contest-cta-steps.md` (CTA), `~/.claude/plans/prancy-splashing-valiant.md` (IA)
**Status:** Implemented · merged to main

#### Contest CTA — Progressive Steps (already in codebase)
Steps to Join sequence already live in stats strip: ① View Instructions → ② Start Practice (if `hasPractice`) → ③ Join Competition. Instructions gate enforced; `hasViewedInstructions` set on modal open.

#### Tab IA Restructure
- "How to Compete" tab renamed to **"Rules & Prizes"** (`rules-prizes`)
- Tab bar now: Overview · Leaderboard · Rules & Prizes

#### Hero descriptions
All 5 contests updated to a single punchy task-action line (no difficulty mention):
- skin-lesion: "Classify dermoscopy images across 8 lesion categories."
- chest-xray: "Segment and interpret pathological findings in chest X-rays."
- retinal-oct: "Grade retinal OCT scans for signs of disease severity."
- pathology-slides: "Classify tissue patterns across digitized pathology slides."
- ecg-rhythm: "Classify cardiac rhythm patterns from 12-lead ECG recordings."

#### About this Competition
All 5 contest `about` values rewritten: 2–3 sentences on stakes, context, real-world impact. No restatement of hero description.

#### Overview tab
- About this Competition + Accuracy Benchmarks + How You Earn (no Prize Pool)
- Prize Pool moved exclusively to Rules & Prizes tab

#### Leaderboard tab
- No structural change
- Score callout: "reads" → "cases"

#### Rules & Prizes tab (full rewrite)
Two-column layout (`grid grid-cols-[3fr_2fr]`):
- **Left**: How Your Score Works (4 numbered cards: Time decay + indigo callout, Volume, Difficulty, Score updates) · Eligibility (2 paragraphs) · Tie Breaking
- **Right (sticky)**: How You Earn card · Prize Pool table (Place / Prize, 10 rows + Total)

#### "reads" → "cases" throughout
All UI copy updated: How You Earn labels, leaderboard callout, personal rank panel sidebar (`personal-rank-panel.tsx`), SCORE_MODE_SCORING in `mock-data.ts`

---

## Pages

### `/home` — `app/home/page.tsx`
Specialist home page with assigned task + arena entry point.

- Welcome header: "Welcome back, {firstName}!"
- **My Task section**: `TaskCard` component, 1 assigned task
- **Arena section**: subtitle "Compete more, rank higher." + 3-column competition snapshot cards (first 3 contests from `CONTESTS`), each linking to `/arena/contest/[id]`
- Prize display on cards: `$100` (`text-xl font-extrabold text-amber-500`) + `PRIZE POOL` (`text-[10px] font-medium text-slate-400 uppercase`)
- No participant count shown on cards
- Sidebar active: `"home"`

### `/arena` — `app/arena/page.tsx`
Arena landing page listing all active competitions.

- Gradient hero banner (`#290D4D → #201B4E` + dot grid overlay)
- Stats pills: active contests count, `$100 weekly prize pool` (specialist count removed)
- Subtitle: "Compete against all specialists. Rank by accuracy, recency & volume. Top performers share the weekly prize."
- Paginated contest grid (PAGE_SIZE=2) — unified section with "Who's Leading" leaderboard snapshot
- Pagination controls appear only when `totalPages > 1`
- `ContestLeaderboardSnapshot` receives `visibleContests` — cross-fades via `key` prop + `animate-fade-in`

### `/arena/contest/[id]` — `app/arena/contest/[id]/page.tsx`
Individual contest detail page.

- **Hero strip**: title, taskType pill (slate, neutral), participantCount, aiModelCount, activeSince, prizeCycleDaysLeft
- **CTA zone**: practice button (always visible when `hasPractice`) + Join Competition
  - `!hasPracticed`: "Start Practice" (primary indigo) + "Join Competition" (locked, Lock icon, tooltip)
  - `hasPracticed`: "Practice" (secondary outline) + "Join Competition" (primary indigo, unlocked)
- **Stats strip**: 2 columns — Prize Pool · Resets In (participant count removed)
- **3 tabs**: Overview · Leaderboard · How to Compete
  - **Overview**: About section, accuracy benchmark bar chart (see below), How You Earn panel, Prize Pool panel (breakdown table: 10 rows + Total row) + indigo callout below
  - **Leaderboard**: Score mode callout, Humans/AI/All filter tabs, Podium (top 3), LeaderboardTable, PersonalRankPanel (sticky right sidebar, w-280px)
  - **How to Compete**: Scoring rules cards (from `contest.scoring`), "View Task Instructions" button → centered modal (BookOpen icon, dark backdrop, scrollable, X close + backdrop close)
- **AI leaderboard**: footer note "AI evaluations run weekly — more models coming soon"
- Async params: `params: Promise<{ id: string }>`, resolved with `use(params)` (Next.js 16)

### `/arena/empty` — `app/arena/empty/page.tsx`
First-time locked state shown before any contests are available.

---

## Components

### `components/home/`
| File | Description |
|---|---|
| `task-card.tsx` | Assigned task card — OPEN badge (blue), taskType pill, title, description, hours (indigo), Documents/Instructions ghost buttons, disabled Start Labeling + tooltip |

### `components/arena/`
| File | Description |
|---|---|
| `contest-card.tsx` | Competition card on `/arena` — taskType pill (slate), title, prize (`$100` 2xl extrabold amber + `PRIZE POOL` 10px slate-400), AI count (no participant count). Whole card is a `<Link>` (no CTA footer) — hover: shadow-md + border-slate-200 |
| `contest-leaderboard-snapshot.tsx` | Cross-contest leaderboard table — rank column + one column per contest, current user highlighted in indigo-50 |
| `leaderboard-rank-badge.tsx` | Gold/silver/bronze badges for ranks 1–3, plain text for others |
| `leaderboard-table.tsx` | Leaderboard rows with isNew badge. Columns: Specialist / Prize (amber $X for top 10) / Score. No trend column. Shared `ColumnHeaders` component ensures alignment across both layout modes. |
| `personal-rank-panel.tsx` | Sticky right panel: rank, score (2xl extrabold), reads progress bar (indigo/rose/amber), earning potential callout (emerald, shown when rank ≤10 + min reads met), state banners (below min / at max / score gap to next rank) |
| `podium.tsx` | Visual podium — name/score/prize above solid stepped blocks (no card borders), rank number inside block. Heights: 1st 90px · 2nd 68px · 3rd 52px. No trend indicators. |
| `inactivity-warning.tsx` | Warning banner shown when `hasDecayRisk` is true for current user |
| `snapshot-timestamp.tsx` | "Last updated X ago · Next refresh ~Yh" footer |

### `components/dashboard/`
| File | Description |
|---|---|
| `sidebar.tsx` | Shared sidebar — Home → `/home`, Arena → `/arena`; active state highlights; user menu popover |

---

## Data Layer — `lib/mock-data.ts`

### Contests (5 total)
All contests: `prizePoolAmount: 100`, `minReads: 20`, `maxReads: 100`, `prizeCycleDaysLeft: 4`

### PRIZE_BREAKDOWN constant
```ts
[{ rank: 1, prize: 30 }, { rank: 2, prize: 20 }, { rank: 3, prize: 15 },
 { rank: 4, prize: 10 }, { rank: 5, prize: 8  }, { rank: 6, prize: 6  },
 { rank: 7, prize: 4  }, { rank: 8, prize: 3  }, { rank: 9, prize: 2  }, { rank: 10, prize: 2 }]
```

| ID | Title | taskType | hasPractice | leaderboard |
|---|---|---|---|---|
| `skin-lesion` | Skin Lesion Classification | Classification | ✅ | OUT_OF_TOP (user #65) |
| `chest-xray` | Chest X-Ray Interpretation | Segmentation | ❌ | IN_TOP (user #6) |
| `retinal-oct` | Retinal OCT Grading | Grading | ❌ | OUT_OF_TOP |
| `pathology-slides` | Pathology Slide Analysis | Classification | ✅ | IN_TOP |
| `ecg-rhythm` | ECG Rhythm Classification | Classification | ❌ | OUT_OF_TOP |

### Scoring constant
`SCORE_MODE_SCORING` — 5 cards used on How to Compete tab:
1. Time-weighted score (accuracy decays; halves after one week)
2. Min 20 reads/week (must complete to appear on leaderboard)
3. Max 100 reads/week (hard cap; resets each Monday)
4. Weekly prize pool (top 10 ranked specialists share $100; rank #1 earns most; rank-based, not raw-score proportional)
5. Tie-breaking (higher `readsThisWeek` breaks ties)

### Leaderboard sets
- `LEADERBOARD_OUT_OF_TOP` — ranks 1–20 + user at rank 65 (with neighbors 64, 66)
- `LEADERBOARD_IN_TOP` — ranks 1–12, user at rank 6
- `AI_MODELS_LEADERBOARD` — 5 AI models (GPT-4o, Gemini 1.5 Pro, Claude 3.5 Sonnet, Gemini 1.5 Flash, GPT-4 Turbo)

### Current user
```ts
CURRENT_USER = { id: "874", displayName: "Jane Liam", initials: "JL", email: "jliam@centaurlabs.com" }
```

### Snapshot info
```ts
SNAPSHOT_INFO = { lastUpdated: "2h ago", nextRefresh: "~4h" }
```

---

## Accuracy Benchmark Section — `app/arena/contest/[id]/page.tsx`

Replaced the old 3-card grid (Centaur / Top Human / Top AI score cards) with a horizontal bar chart in the contest Overview tab.

### Design decisions
- **Headline framing**: Specialist-motivation angle — "Every case you label makes the collective smarter" (shifted from performance boast to contribution framing)
- **Bar scale**: 0–100 (true scale, not zoomed baseline) — decided to keep honest scale over exaggerated gap
- **Bar colors**: Centaur = indigo→purple gradient (brand primary) · Human = `rose-300` (warm, organic) · AI = `blue-300` (cool, mechanical) — warm/cool contrast communicates human vs algorithm
- **"Best" badge**: Zap icon + indigo-50 bg, indigo text — consistent with design system badge patterns
- **Delta callout**: Removed — replaced bar chart stands alone without explicit delta comparison
- **Label column**: `whitespace-nowrap` on "Centaur Collective" to prevent wrapping

### Current state (branch: `feature/accuracy-benchmark`)
```
Heading:  "Every case you label makes the collective smarter"
Subtitle: "Centaur's algorithm consistently surpasses every individual by aggregating top specialists into a consensus answer."
Bar cols: [w-44 label] [flex-1 h-4 track] [w-12 score]
Callout:  (removed)
```

---

## Types — `lib/types.ts`

### `LeaderboardEntry`
```ts
{
  rank: number;
  specialistId: string;
  displayName?: string;
  score: number;            // time-decayed accuracy score, e.g. 87.4
  readsThisWeek: number;    // toward min (20) / max (100)
  casesCompleted: number;
  rankChange: number;
  isNew?: boolean;
  lastActive: string;
  isCurrentUser?: boolean;
  isBelowMinReads?: boolean;
}
```

### `Contest`
```ts
{
  // ...core fields...
  prizePoolAmount: number;  // 100
  minReads: number;         // 20
  maxReads: number;         // 100
  prizeCycleDaysLeft: number;
  // removed: earnMode, ratePerRead, earningCap
}
```

### Other types
- `AIModelEntry` — rank, modelName, score, lastEvaluated
- `CurrentUser` — id, displayName, initials, email
