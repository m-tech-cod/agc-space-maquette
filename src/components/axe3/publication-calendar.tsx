import { CalendarDays } from 'lucide-react'
import { EmptyState } from '@/components/shared/empty-state'
import { PublicationCard } from '@/components/axe3/publication-card'
import type { Publication } from '@/types'

function dayKey(iso: string) {
  return iso.slice(0, 10)
}

function dayLabel(key: string) {
  return new Date(key).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

export function PublicationCalendar({ publications }: { publications: Publication[] }) {
  const scheduled = publications.filter((p) => p.scheduledAt || p.publishedAt)
  const unscheduled = publications.filter((p) => !p.scheduledAt && !p.publishedAt)

  const groups = scheduled.reduce<Record<string, Publication[]>>((acc, p) => {
    const key = dayKey((p.publishedAt ?? p.scheduledAt) as string)
    acc[key] = acc[key] ? [...acc[key], p] : [p]
    return acc
  }, {})

  const sortedKeys = Object.keys(groups).sort()

  if (sortedKeys.length === 0 && unscheduled.length === 0) {
    return (
      <EmptyState
        icon={CalendarDays}
        title="Aucune publication au calendrier"
        description="Crée une nouvelle publication pour commencer à remplir ton calendrier éditorial."
      />
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {unscheduled.length > 0 && (
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Non programmées
          </h3>
          <div className="flex flex-col gap-2.5">
            {unscheduled.map((p) => (
              <PublicationCard key={p.id} publication={p} />
            ))}
          </div>
        </div>
      )}

      {sortedKeys.map((key) => (
        <div key={key}>
          <h3 className="mb-2 text-xs font-semibold capitalize text-muted-foreground">
            {dayLabel(key)}
          </h3>
          <div className="flex flex-col gap-2.5">
            {groups[key].map((p) => (
              <PublicationCard key={p.id} publication={p} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
