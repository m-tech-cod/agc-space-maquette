import {
  Bug,
  Clapperboard,
  Code2,
  FileCode,
  FileText,
  FolderSearch,
  LayoutGrid,
  Search,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import type { AssistantAction } from '@/types'

const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  Clapperboard,
  LayoutGrid,
  FileCode,
  Bug,
  Code2,
  Search,
  FolderSearch,
  FileText,
}

export function QuickActions({
  actions,
  onPick,
}: {
  actions: AssistantAction[]
  onPick: (label: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => {
        const Icon = ICONS[action.icon] ?? Sparkles
        return (
          <button
            key={action.id}
            type="button"
            onClick={() => onPick(action.label)}
            className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Icon className="size-3.5" />
            {action.label}
          </button>
        )
      })}
    </div>
  )
}
