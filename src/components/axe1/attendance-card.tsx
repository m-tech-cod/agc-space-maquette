import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Clock, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getAttendanceRecord } from '@/data/mock-attendance'
import { ATTENDANCE_STATUS_META } from '@/lib/status'
import { useSessionStore } from '@/store/session-store'
import type { AttendanceStatus } from '@/types'

const VISUALS: Record<
  AttendanceStatus,
  { icon: typeof Clock; iconBg: string; iconColor: string }
> = {
  none: { icon: Clock, iconBg: 'bg-muted', iconColor: 'text-muted-foreground' },
  present: { icon: CheckCircle2, iconBg: 'bg-success-bg', iconColor: 'text-success' },
  late: { icon: AlertTriangle, iconBg: 'bg-warning-bg', iconColor: 'text-warning' },
  absent: { icon: XCircle, iconBg: 'bg-danger-bg', iconColor: 'text-danger' },
}

export function AttendanceCard() {
  const attendanceScenario = useSessionStore((s) => s.attendanceScenario)
  const setAttendanceScenario = useSessionStore((s) => s.setAttendanceScenario)
  const record = getAttendanceRecord(attendanceScenario)
  const meta = ATTENDANCE_STATUS_META[record.status]
  const visual = VISUALS[record.status]
  const Icon = visual.icon

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={record.status}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex size-12 items-center justify-center rounded-full ${visual.iconBg}`}
            >
              <Icon className={`size-6 ${visual.iconColor}`} />
            </motion.div>
          </AnimatePresence>

          <div>
            <p className="text-sm font-semibold text-foreground">{meta.label}</p>
            {record.status === 'none' && (
              <p className="text-xs text-muted-foreground">
                Arrivée attendue à {record.expectedAt}
              </p>
            )}
            {record.status === 'present' && (
              <p className="text-xs text-muted-foreground">
                Pointage enregistré à {record.checkInAt}
              </p>
            )}
            {record.status === 'late' && (
              <p className="text-xs text-muted-foreground">
                Arrivée à {record.checkInAt} · {record.lateByMinutes} min après l’heure prévue
              </p>
            )}
            {record.status === 'absent' && (
              <p className="text-xs text-muted-foreground">
                Aucune présence enregistrée aujourd’hui
              </p>
            )}
          </div>
        </div>

        {record.status === 'none' ? (
          <Button onClick={() => setAttendanceScenario('present')}>Pointer mon arrivée</Button>
        ) : (
          <Button variant="outline" disabled>
            {record.status === 'absent' ? 'Signaler un retour' : 'Pointage effectué'}
          </Button>
        )}
      </div>
    </Card>
  )
}
