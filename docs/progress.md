# Specialist Arena — Progress

## Stack
Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui new-york
Font: Inter · Primary: `#4f46e5` (indigo) · Radius: 14px

---

## Pages

### `/home` — `app/home/page.tsx`
Specialist home page with assigned task + arena entry point.

- Welcome header: "Welcome back, {firstName}!"
- **My Task section**: `TaskCard` component, 1 assigned task
- **Arena section**: description copy + 3-column competition snapshot cards (first 3 contests), each linking to `/arena/contest/[id]`
- Sidebar active: `"home"`

### `/arena` — `app/arena/page.tsx`
Arena landing page listing all active competitions.

- Gradient hero banner (`#290D4D → #201B4E` + dot grid overlay)
- Stats pills: specialists, active contests, weekly prizes
- Paginated contest grid (PAGE_SIZE=2) — unified section with "Who's Leading" leaderboard snapshot
- Pagination controls appear only when `totalPages > 1`
- `ContestLeaderboardSnapshot` receives `visibleContests` — cross-fades via `key` prop + `animate-fade-in`

### `/arena/contest/[id]` — `app/arena/contest/[id]/page.tsx`
Individual contest detail page.

- **Hero strip**: title, taskType pill, participantCount, aiModelCount, activeSince, prizeCycleDaysLeft
- **CTA zone**: practice button (always visible when `hasPractice`) + Join Competition
  - `!hasPracticed`: "Start Practice" (primary indigo) + "Join Competition" (locked, Lock icon, tooltip)
  - `hasPracticed`: "Practice" (secondary outline) + "Join Competition" (primary indigo, unlocked)
- **3 tabs**: Overview · Leaderboard · How to Compete
  - **Overview**: About section, Centaur/Top Human/Top AI performance cards, Prize Structure, Payouts table
  - **Leaderboard**: Humans/AI/All filter tabs, Podium (top 3), LeaderboardTable, PersonalRankPanel (sticky right sidebar)
  - **How to Compete**: Scoring rules accordion, "View Task Instructions" button → centered modal (BookOpen icon, dark backdrop, scrollable, X close + backdrop close)
- **AI leaderboard**: no `lastEvaluated` column; footer note "AI evaluations run weekly"
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
| `contest-card.tsx` | Competition card used on `/arena` page — taskType pill, title, prize, participant count, AI count, CTA |
| `contest-leaderboard-snapshot.tsx` | Cross-contest leaderboard table — rank column + one column per contest, current user highlighted in indigo-50 |
| `leaderboard-rank-badge.tsx` | Gold/silver/bronze badges for ranks 1–3, plain text for others |
| `leaderboard-table.tsx` | Full leaderboard rows with rank change indicators, decay risk badge, isNew badge |
| `personal-rank-panel.tsx` | Sticky right panel showing current user's rank, score, proximity to next rank |
| `podium.tsx` | Visual podium for top 3 entries |
| `inactivity-warning.tsx` | Warning banner shown when `hasDecayRisk` is true for current user |
| `snapshot-timestamp.tsx` | "Last updated X ago · Next refresh ~Yh" footer |

### `components/dashboard/`
| File | Description |
|---|---|
| `sidebar.tsx` | Shared sidebar — Home → `/home`, Arena → `/arena`; active state highlights; user menu popover |

---

## Data Layer — `lib/mock-data.ts`

### Contests (5 total)
| ID | Title | taskType | hasPractice | leaderboard |
|---|---|---|---|---|
| `skin-lesion` | Skin Lesion Classification | Classification | ✅ | OUT_OF_TOP (user #65) |
| `chest-xray` | Chest X-Ray Interpretation | Segmentation | ❌ | IN_TOP (user #6) |
| `retinal-oct` | Retinal OCT Grading | Grading | ❌ | OUT_OF_TOP |
| `pathology-slides` | Pathology Slide Analysis | Classification | ✅ | IN_TOP |
| `ecg-rhythm` | ECG Rhythm Classification | Classification | ❌ | OUT_OF_TOP |

All contests: `$500/wk` prize, 4 days left in cycle, `SHARED_PRIZE_STRUCTURE`, `SHARED_SCORING`.

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

## Types — `lib/types.ts`
- `LeaderboardEntry` — rank, specialistId, displayName?, score, rankChange, isNew?, lastActive, isCurrentUser?, hasDecayRisk?
- `AIModelEntry` — rank, modelName, score, lastEvaluated
- `Contest` — full contest shape including leaderboard, aiLeaderboard, scoring, prizeStructure, instructions, hasPractice
- `CurrentUser` — id, displayName, initials, email
