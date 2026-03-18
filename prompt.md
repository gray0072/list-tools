# Prompt: List Tools — text list utility app

## Stack

- **React 18** + **TypeScript**
- **MUI v6** (Material UI) — UI components
- **Zustand** — global state management
- **React Hook Form** — form handling
- **GitHub Pages** — hosting (deploy via `gh-pages` + `vite`)

---

## Overview

A web app for working with text lists. The user pastes lists (one value per line) into text areas and applies operations. Results appear instantly with detailed statistics. The interface is clean, minimal, and requires no unnecessary steps.

---

## Operations

### 1. Union
Merges two lists into one, removing duplicates.
- Input: List A + List B
- Output: all unique values from A and B combined
- Stats: total in A, total in B, total in result, duplicates removed

### 2. Intersection
Shows only elements that exist **in both** lists.
- Input: List A + List B
- Output: values present in both A and B
- Stats: matches found / unmatched in A / unmatched in B

### 3. Difference (A − B)
Removes from List A all values that appear in List B.
- Input: List A + List B
- Output: elements of A that are not in B
- Stats: removed N values, M remaining
- Extra: show the removed values with their count

### 4. Symmetric Difference
Elements that exist in **only one** of the two lists (not both).
- Output: (A − B) ∪ (B − A) — unique to each list
- Color-coded: what's only in A vs. only in B

### 5. Deduplicate (Distinct)
Removes duplicates within a single list.
- Input: one list
- Output: unique values only
- Stats: was N lines → now M (removed K duplicates)
- Extra: show list of removed duplicates and how many times each appeared

### 6. Count Occurrences
Analyzes a single list and shows the frequency of each value.
- Output: table of "value → count", sorted descending
- Visualization: progress bars or chips with numbers
- Useful before Deduplicate — understand what will be lost

### 7. Sort
Sorts a list.
- Options: A→Z, Z→A, by length (shortest/longest first), shuffle
- Setting: case-sensitive or case-insensitive

### 8. Filter / Search
Filters a list by substring or regular expression.
- Input: list + pattern
- Output: matching lines / non-matching lines (include/exclude toggle)

---

## Global Comparison Settings

Apply to all operations:

| Setting | Description |
|---|---|
| Ignore case | "Apple" = "apple" |
| Trim whitespace | " foo " = "foo" |
| Ignore empty lines | empty lines are not counted as items |
| Separator | auto / newline only / comma / semicolon |

---

## UX & Interface

### Layout structure
```
[Header: List Tools]
[Tabs or side menu: Union | Intersection | Difference | Symmetric | Deduplicate | Count | Sort | Filter]
[Workspace for the selected operation]
```

### Workspace layout
- Two-list operations: two TextAreas side by side (stacked on mobile) → "Apply" button → result
- Single-list operations: one TextArea → result on the right or below
- Live mode: result updates as you type (no button needed), can be disabled

### Convenience features
- **"Paste from clipboard"** button next to each TextArea
- **"Copy result"** button with "Copied!" toast notification
- **"Download .txt"** button for the result
- **"Clear"** button for each input field
- **"Swap A and B"** button for two-list operations
- Line counter below each TextArea (`12 lines`)
- "Removed / Duplicates" section is collapsible
- Light / dark theme toggle in the header
- Fully responsive (mobile + desktop)

### Result presentation
- Green chip: "Result: 42 lines"
- Yellow chip (if applicable): "Duplicates removed: 7"
- Red chip (if applicable): "Removed from A: 15"
- Expandable "Details" panel — list of removed values

---

## State (Zustand)

```ts
interface AppStore {
  listA: string;
  listB: string;
  settings: {
    ignoreCase: boolean;
    trimWhitespace: boolean;
    ignoreEmpty: boolean;
    separator: 'auto' | 'newline' | 'comma' | 'semicolon';
  };
  liveMode: boolean;
  theme: 'light' | 'dark';
  // actions
  setListA: (v: string) => void;
  setListB: (v: string) => void;
  updateSettings: (patch: Partial<Settings>) => void;
}
```

State is persisted to `localStorage` via `zustand/middleware/persist`.

---

## Project structure

```
src/
  components/
    Layout/         # Header, Sidebar/Tabs
    ListInput/      # TextArea with paste, clear, line counter
    ResultPanel/    # Result + stats + copy/download
    SettingsPanel/  # Global comparison settings
  operations/
    union.ts
    intersection.ts
    difference.ts
    symmetric.ts
    deduplicate.ts
    count.ts
    sort.ts
    filter.ts
  store/
    useAppStore.ts
  pages/
    UnionPage.tsx
    IntersectionPage.tsx
    DifferencePage.tsx
    SymmetricPage.tsx
    DeduplicatePage.tsx
    CountPage.tsx
    SortPage.tsx
    FilterPage.tsx
  utils/
    parseList.ts    # splits a string into array respecting settings
    clipboard.ts
  App.tsx
  main.tsx
  theme.ts         # MUI theme (light/dark)
```

---

## GitHub Pages deployment

- Bundler: **Vite**
- In `vite.config.ts`: `base: '/list-tools/'` (or your repo name)
- Deploy package: `gh-pages`
- `package.json`:
  ```json
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
  ```
- GitHub Actions (optional): auto-deploy on push to `main`

---

## Backlog ideas

- **Operation history** — last 10 results with restore option
- **Named templates** — save List A/B as a reusable named template
- **Multi-list mode** — operations over 3+ lists at once
- **Regex matching mode** — compare by pattern, not exact value
- **CSV/Excel import** — pick a column from a file as a list
- **Diff view** — side-by-side display with git-diff-style highlighting
- **Session statistics** — how many operations run, how many lines processed
