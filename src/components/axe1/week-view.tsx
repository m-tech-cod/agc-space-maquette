import { CalendarRange } from 'lucide-react'
import { EmptyState } from '@/components/shared/empty-state'
import { Badge } from '@/components/ui/badge'
import { TASK_STATUS_META } from '@/lib/status'
import { cn } from '@/lib/utils'
import { TODAY_DAY_INDEX, WEEK_DAYS } from '@/data/mock-tasks'
import type { Task } from '@/types'

const BUSY_THRESHOLD = 4

export function WeekView({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={CalendarRange}
        title="Semaine vide"
        description="Aucune tâche n’est encore planifiée sur cette semaine."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-7">
      {WEEK_DAYS.map((label, index) => {
        const dayTasks = tasks.filter((t) => t.day === index)
        const isToday = index === TODAY_DAY_INDEX
        const isBusy = dayTasks.length >= BUSY_THRESHOLD
        const doneCount = dayTasks.filter((t) => t.status === 'done').length

        return (
          <div
            key={label}
            className={cn(
              'flex flex-col gap-2.5 rounded-xl border p-3',
              isToday ? 'border-primary bg-primary/5' : 'border-border bg-card',
            )}
          >
            <div className="flex items-center justify-between">
              <p className={cn('text-xs font-semibold', isToday ? 'text-primary' : 'text-foreground')}>
                {label}
              </p>
              {isBusy && (
                <Badge variant="warning" className="text-[10px]">
                  Chargée
                </Badge>
              )}
            </div>

            {dayTasks.length === 0 ? (
              <p className="py-4 text-center text-[11px] text-muted-foreground">Aucune tâche</p>
            ) : (
              <>
                <div className="flex flex-col gap-1.5">
                  {dayTasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className="truncate rounded-md bg-muted/60 px-2 py-1.5 text-[11px] text-foreground"
                      title={task.title}
                    >
                      {task.title}
                    </div>
                  ))}
                  {dayTasks.length > 3 && (
                    <p className="text-[11px] text-muted-foreground">
                      +{dayTasks.length - 3} autre(s)
                    </p>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {doneCount}/{dayTasks.length} {TASK_STATUS_META.done.label.toLowerCase()}s
                </p>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}
