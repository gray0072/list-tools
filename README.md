# List Tools

**Live: [gray0072.github.io/list-tools](https://gray0072.github.io/list-tools/)**

A fast, browser-based utility for working with text lists — no backend, no sign-up, no tracking.

Paste your lists, pick an operation, get results instantly.

---

## Features

| Operation | Description |
|---|---|
| **Union** | Merge two lists, keep only unique values |
| **Intersection** | Keep only values present in both lists |
| **Difference (A − B)** | Remove from A everything that appears in B |
| **Symmetric Difference** | Values that exist in only one of the two lists |
| **Deduplicate** | Remove duplicates within a single list |
| **Count Occurrences** | Show how many times each value appears |
| **Sort** | Sort a list A→Z, Z→A, by length, or shuffle |
| **Filter** | Keep or exclude lines matching a substring or regex |

Every operation shows detailed stats: items added, removed, duplicates found, and a collapsible panel listing exactly what was dropped.

---

## How it works

1. Paste your list(s) — one item per line
2. Choose an operation from the sidebar
3. See the result instantly (live mode) or click **Apply**
4. Copy the result to clipboard or download as `.txt`

---

## Comparison settings

Customize how values are compared across all operations:

| Setting | Description |
|---|---|
| **Ignore case** | Treat `Apple` and `apple` as equal |
| **Trim whitespace** | Strip leading/trailing spaces before comparing |
| **Ignore empty lines** | Skip blank lines entirely |
| **Separator** | Auto-detect, newline, comma, or semicolon |

Settings are saved automatically between sessions.

---

## Tech stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [MUI v6](https://mui.com/) — UI components & theming
- [Zustand](https://zustand-demo.pmnd.rs/) — state management (persisted to `localStorage`)
- [React Hook Form](https://react-hook-form.com/) — form handling
- [Vite](https://vitejs.dev/) — build tool
- Hosted on [GitHub Pages](https://pages.github.com/)

---

## Getting started

```bash
# Clone the repo
git clone https://github.com/gray0072/list-tools.git
cd list-tools

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Build & deploy

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

Before deploying, set the correct `base` in `vite.config.ts`:

```ts
export default defineConfig({
  base: '/list-tools/', // replace with your repo name
})
```

---

## Project structure

```
src/
  components/     # Reusable UI: ListInput, ResultPanel, SettingsPanel
  operations/     # Pure functions: union, intersection, difference, etc.
  pages/          # One page component per operation
  store/          # Zustand store
  utils/          # parseList, clipboard helpers
```

---

## Roadmap

- [ ] Operation history (restore last 10 results)
- [ ] Named list templates
- [ ] Multi-list operations (3+ lists)
- [ ] Regex matching mode
- [ ] CSV / Excel column import
- [ ] Git-style diff view
- [ ] Session statistics

---

## License

MIT
