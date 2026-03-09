# Specialist Arena — Plan

## Product vision
A specialist-facing web portal for competing in open medical annotation challenges.
Specialists rank against each other and AI models by time-decayed accuracy score.
Top performers share a $100 weekly prize pool proportionally by score. Entry is open to all — no invite required.

---

## Competition model

Specialists earn rank by competing, not by direct pay-per-read. The model:

- **Score**: Time-decayed accuracy score. Halves in value after one week — recency matters.
- **Min reads (20/week)**: Must complete at least 20 reads in the current cycle to appear on the leaderboard.
- **Max reads (100/week)**: Hard cap. No further reads accepted after 100. Resets each Monday.
- **Prize pool**: $100/week, split proportionally among top performers by score.
- **Tie-breaking**: Higher `readsThisWeek` breaks ties at equal scores.
- **Score visibility**: Score is revealed when a specialist views the leaderboard or exits a labeling session — not shown live during labeling.

---

## Mobile vs web firewall

Contests with the same dataset can run simultaneously on mobile and web. Scoring differs by platform, so a firewall prevents mobile users from seeing web competitions for the same dataset (and vice versa). Mobile users may still appear on the web leaderboard but are prize-ineligible. This is a backend/routing concern — no structural leaderboard changes needed in the web UI.

---

## Design principles

### Hierarchy: task first, arena second
My Task (assigned, income-linked) is always the primary action on the home page.
Arena is surfaced as ambient awareness — informational, not demanding.

### Home page = orientation, not destination
Home shows what's running. It doesn't replace /arena.
One CTA per section. Arena section: "View Arena →" in header only.

### Snapshot, not launch pad
The Arena section on home shows live competitions as a read-only snapshot.
Clicking a card navigates to the contest detail — no per-card join button from home.

### Practice gates competition, not the other way around
Practice button is always visible on contest pages with `hasPractice: true`.
Before completing: "Start Practice" (primary) gates Join Competition.
After completing: "Practice" (secondary) — specialist can return any time.

### AI leaderboard is static
AI models are evaluated weekly, not in real-time. No `lastEvaluated` column in rows.
Footer note: "AI evaluations run weekly — more models coming soon."

### Leaderboard refresh is periodic, not per-read
Leaderboard refreshes every few hours. "Last Active" column was removed — it implies per-read freshness and is misleading when mobile users populate the same leaderboard.

### Reduce info redundancy
Min/max reads and prize details appear in How You Earn and How to Compete tabs. They are not repeated in the stats strip. Stats strip: Prize Pool · Participants · Resets In (3 cols only).

---

## Information architecture

```
/home
  My Task (assigned)
  Arena (snapshot — 3 cards)

/arena
  Hero banner
  Active Competitions (paginated, 2/page)
  Who's Leading (leaderboard snapshot, synced to visible contests)

/arena/contest/[id]
  Hero strip
  CTA zone (Practice + Join)
  Overview tab
  Leaderboard tab
  How to Compete tab

/arena/empty
  First-time locked state
```

---

## Key design decisions

| Decision | Rationale |
|---|---|
| Score-based model, not pay-per-read | Earn mode created incentives to rush reads for per-read pay rather than compete for accuracy. Score model aligns incentives with quality and recency. |
| Merged "Active Competitions" + "Who's Leading" into one paginated section | Pagination arrows were confusing when only attached to contests; leaderboard changed silently below |
| Removed dark gradient strip from home page Arena section | `#290D4D → #201B4E` is appropriate for the arena hero but too dominant as a secondary home section |
| 3-column competition cards on home (no join button) | Snapshot only — direct join CTA belongs in /arena, not home |
| Practice button always visible post-completion | Specialists may want to practice during the competition, not just before entry |
| Instructions behind modal button in "How to Compete" tab | Reduces visual noise; instructions are accessible on demand |
| No "Open Tasks" section on home | "Open Tasks" concept was inspiration for Arena (open to all), not a separate UI section |
| Stats strip: 3 cols (Prize Pool, Participants, Resets In) | Min/max reads appeared in too many places. Kept in How You Earn and How to Compete only. |
| "Last Active" column removed from leaderboard | Leaderboard refreshes every few hours — per-row "last active" implies real-time freshness. Misleading when mobile users appear. |
| $100 prize amount as visual hero | Amber, extrabold, larger size — "PRIZE POOL" label is small and subordinate. |

---

## Deferred / future work

- **`isCompetition?: boolean` prop on contest page**: Gate prize structure and leaderboard sections for reuse on non-competition task pages
- **Information architecture review**: Task instructions accessibility — should instructions be always reachable without tab navigation?
- **Real data integration**: Replace mock data with API; `CURRENT_USER`, `CONTESTS`, leaderboard entries all need live sources
- **Practice flow**: Currently simulated with `hasPracticed` local state — needs actual practice task routing
- **Pagination persistence**: Page resets on navigation; consider URL param for page state
- **Prize eligibility display**: Mobile users on web leaderboard are prize-ineligible — consider a subtle badge when that data is available from the API

---

## Copy (confirmed)

### Arena section on home (subtitle)
> "Compete more, rank higher."

### Home snapshot card (full text)
> "Join hundreds of specialists competing in open-to-all annotation challenges. Compete more, rank higher."

### Arena landing page hero
> "Superhuman data, powered by collective intelligence"
> "When humans and AI compete to be the best, we all win."

### Arena landing page subtitle
> "Compete against all specialists. Rank by accuracy, recency & volume. Top performers share the weekly prize."

### Leaderboard callout (contest page)
> "Your score is based on accuracy, weighted by recency. Complete at least 20 reads this week to appear on the leaderboard. The top 10 ranked specialists share the $100 weekly prize."

### Prize Pool panel headline (contest page)
> "Top performers share the prize each week"

### Prize Pool panel body (contest page)
> "Each week, the top 10 specialists split $100. The higher you rank, the bigger your share. Climb by labeling accurately and staying active. If you finish in the top 10, you'll receive an **email** with prize details."
*(Note: "email" rendered `font-semibold text-indigo-900` in the UI)*
