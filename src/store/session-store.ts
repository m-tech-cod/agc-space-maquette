import { create } from 'zustand'
import type { AttendanceStatus } from '@/types'
import type { WeekScenario } from '@/data/mock-tasks'
import type { Role } from '@/types'

interface SessionState {
  role: Role
  setRole: (role: Role) => void

  attendanceScenario: AttendanceStatus
  setAttendanceScenario: (status: AttendanceStatus) => void

  weekScenario: WeekScenario
  setWeekScenario: (scenario: WeekScenario) => void

  demoPanelOpen: boolean
  toggleDemoPanel: () => void

  mobileNavOpen: boolean
  setMobileNavOpen: (open: boolean) => void
}

export const useSessionStore = create<SessionState>((set) => ({
  role: 'ceo',
  setRole: (role) => set({ role }),

  attendanceScenario: 'present',
  setAttendanceScenario: (attendanceScenario) => set({ attendanceScenario }),

  weekScenario: 'normal',
  setWeekScenario: (weekScenario) => set({ weekScenario }),

  demoPanelOpen: false,
  toggleDemoPanel: () => set((s) => ({ demoPanelOpen: !s.demoPanelOpen })),

  mobileNavOpen: false,
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
}))
