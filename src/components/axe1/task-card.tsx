import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { PRIORITY_META, TASK_STATUS_META } from '@/lib/status'
import type { Task } from '@/types'

export function TaskCard({ task }: { task: Task }) {
  const statusMeta = TASK_STATUS_META[task.status]
  const priorityMeta = PRIORITY_META[task.priority]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className="rounded-lg border border-border bg-card p-3.5 transition-shadow hover:shadow-sm"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-foreground">{task.title}</p>
        <Badge variant={statusMeta.variant} className="shrink-0">
          {statusMeta.label}
        </Badge>
      </div>
      <p className="mb-3 text-xs text-muted-foreground line-clamp-2">{task.description}</p>
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-[11px]">
          {task.projectLabel}
        </Badge>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="size-3" />
            {task.estimatedHours}h
          </span>
          <Badge variant={priorityMeta.variant} className="text-[11px]">
            {priorityMeta.label}
          </Badge>
        </div>
      </div>
    </motion.div>
  )
}
