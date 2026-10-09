import { CalendarX2 } from 'lucide-react'
import { EmptyState } from '@/components/shared/empty-state'
import { TaskCard } from '@/components/axe1/task-card'
import type { Task, TaskStatus } from '@/types'

const UPCOMING: TaskStatus[] = ['todo']
const IN_PROGRESS: TaskStatus[] = ['in_progress', 'paused', 'blocked', 'in_review', 'to_fix']
const DONE: TaskStatus[] = ['done', 'cancelled']

function Column({ title, tasks, accent }: { title: string; tasks: Task[]; accent: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className={`size-2 rounded-full ${accent}`} />
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </h3>
        <span className="text-xs text-muted-foreground">({tasks.length})</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {tasks.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">
            Aucune tâche
          </p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  )
}

export function DayView({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={CalendarX2}
        title="Aucune tâche aujourd’hui"
        description="Rien n’est planifié pour vous sur cette journée. Profitez-en pour avancer sur vos tâches à venir."
      />
    )
  }

  const upcoming = tasks.filter((t) => UPCOMING.includes(t.status))
  const inProgress = tasks.filter((t) => IN_PROGRESS.includes(t.status))
  const done = tasks.filter((t) => DONE.includes(t.status))

  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      <Column title="À venir" tasks={upcoming} accent="bg-muted-foreground" />
      <Column title="En cours" tasks={inProgress} accent="bg-info" />
      <Column title="Terminées" tasks={done} accent="bg-success" />
    </div>
  )
}
