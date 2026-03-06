# Specialist Arena — Plan

## Product vision
A specialist-facing web portal for competing in open medical annotation challenges.
Specialists rank against each other and AI models by accuracy, throughput, and recency.
Top performers earn weekly cash prizes. Entry is open to all — no invite required.

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
Footer note: "AI evaluations run weekly" is sufficient.

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
| Merged "Active Competitions" + "Who's Leading" into one paginated section | Pagination arrows were confusing when only attached to contests; leaderboard changed silently below |
| Removed dark gradient strip from home page Arena section | `#290D4D → #201B4E` is appropriate for the arena hero but too dominant as a secondary home section |
| 3-column competition cards on home (no join button) | Snapshot only — direct join CTA belongs in /arena, not home |
| Practice button always visible post-completion | Specialists may want to practice during the competition, not just before entry |
| Instructions behind modal button in "How to Compete" tab | Reduces visual noise; instructions are accessible on demand |
| No "Open Tasks" section on home | "Open Tasks" concept was inspiration for Arena (open to all), not a separate UI section |

---

## Deferred / future work

- **`isCompetition?: boolean` prop on contest page**: Gate prize structure and leaderboard sections for reuse on non-competition task pages
- **Information architecture review**: Task instructions accessibility — should instructions be always reachable without tab navigation?
- **Real data integration**: Replace mock data with API; `CURRENT_USER`, `CONTESTS`, leaderboard entries all need live sources
- **Practice flow**: Currently simulated with `hasPracticed` local state — needs actual practice task routing
- **Pagination persistence**: Page resets on navigation; consider URL param for page state

---

## Copy

### Arena section on home
> "Join hundreds of specialists competing in open-to-all annotation challenges. Complete more, earn more."

### Arena landing page hero
> "Superhuman data, powered by collective intelligence"
> "When humans and AI compete to be the best, we all win."
