import { SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { ATTENDANCE_STATUS_META } from '@/lib/status'
import { cn } from '@/lib/utils'
import { useSessionStore } from '@/store/session-store'
import type { AttendanceStatus } from '@/types'
import type { WeekScenario } from '@/data/mock-tasks'

const ATTENDANCE_OPTIONS: AttendanceStatus[] = ['none', 'present', 'late', 'absent']
const WEEK_OPTIONS: { value: WeekScenario; label: string; desc: string }[] = [
  { value: 'empty', label: 'Semaine vide', desc: 'Aucune tâche planifiée' },
  { value: 'normal', label: 'Semaine normale', desc: 'Charge de travail standard' },
  { value: 'busy', label: 'Semaine chargée', desc: 'Nombreuses tâches, dont urgentes' },
]

function OptionPill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-lg border px-3 py-2 text-left text-sm transition-colors',
        active
          ? 'border-primary bg-primary/5 text-primary font-medium'
          : 'border-border text-foreground hover:bg-muted',
      )}
    >
      {children}
    </button>
  )
}

export function DemoPanel() {
  const open = useSessionStore((s) => s.demoPanelOpen)
  const toggle = useSessionStore((s) => s.toggleDemoPanel)
  const attendanceScenario = useSessionStore((s) => s.attendanceScenario)
  const setAttendanceScenario = useSessionStore((s) => s.setAttendanceScenario)
  const weekScenario = useSessionStore((s) => s.weekScenario)
  const setWeekScenario = useSessionStore((s) => s.setWeekScenario)

  return (
    <>
      <Button
        onClick={toggle}
        variant="accent"
        size="icon"
        className="fixed bottom-6 right-6 z-40 rounded-full shadow-lg"
        aria-label="Ouvrir le panneau de démonstration"
      >
        <SlidersHorizontal className="size-4.5" />
      </Button>

      <Sheet open={open} onOpenChange={toggle}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Panneau de démonstration</SheetTitle>
            <SheetDescription>
              Simule différents états de l’application pour la présentation - aucune donnée
              réelle n’est modifiée.
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-6 overflow-y-auto p-5">
            <section>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                État de pointage du jour
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {ATTENDANCE_OPTIONS.map((status) => (
                  <OptionPill
                    key={status}
                    active={attendanceScenario === status}
                    onClick={() => setAttendanceScenario(status)}
                  >
                    {ATTENDANCE_STATUS_META[status].label}
                  </OptionPill>
                ))}
              </div>
            </section>

            <section>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Scénario de la semaine de tâches
              </h3>
              <div className="flex flex-col gap-2">
                {WEEK_OPTIONS.map((opt) => (
                  <OptionPill
                    key={opt.value}
                    active={weekScenario === opt.value}
                    onClick={() => setWeekScenario(opt.value)}
                  >
                    <span className="block font-medium">{opt.label}</span>
                    <span className="block text-xs font-normal text-muted-foreground">
                      {opt.desc}
                    </span>
                  </OptionPill>
                ))}
              </div>
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
