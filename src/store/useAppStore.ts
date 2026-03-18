import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Settings, ThemeMode } from '../types'

interface AppStore {
  listA: string
  listB: string
  settings: Settings
  liveMode: boolean
  themeMode: ThemeMode
  setListA: (v: string) => void
  setListB: (v: string) => void
  swapLists: () => void
  updateSettings: (patch: Partial<Settings>) => void
  setLiveMode: (v: boolean) => void
  cycleTheme: () => void
}

const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      listA: '',
      listB: '',
      settings: {
        ignoreCase: false,
        trimWhitespace: true,
        ignoreEmpty: true,
        separator: 'auto',
      },
      liveMode: true,
      themeMode: 'system',
      setListA: v => set({ listA: v }),
      setListB: v => set({ listB: v }),
      swapLists: () => set(s => ({ listA: s.listB, listB: s.listA })),
      updateSettings: patch => set(s => ({ settings: { ...s.settings, ...patch } })),
      setLiveMode: v => set({ liveMode: v }),
      cycleTheme: () =>
        set(s => {
          const cycle: ThemeMode[] = ['system', 'dark', 'light']
          const next = cycle[(cycle.indexOf(s.themeMode) + 1) % 3]
          return { themeMode: next }
        }),
    }),
    {
      name: 'list-tools-store',
      // Only persist settings and UI preferences, not list content
      partialize: s => ({
        settings: s.settings,
        liveMode: s.liveMode,
        themeMode: s.themeMode,
      }),
    },
  ),
)

export default useAppStore
