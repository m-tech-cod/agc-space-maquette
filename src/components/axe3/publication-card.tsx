import { motion } from 'framer-motion'
import { Clapperboard, FileText, Image as ImageIcon, LayoutGrid } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { PUBLICATION_STATUS_META } from '@/lib/status'
import type { Publication } from '@/types'

const MEDIA_ICON = {
  image: ImageIcon,
  video: Clapperboard,
  carousel: LayoutGrid,
  text: FileText,
}

function formatDate(iso: string | null) {
  if (!iso) return null
  return new Date(iso).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function PublicationCard({ publication }: { publication: Publication }) {
  const meta = PUBLICATION_STATUS_META[publication.status]
  const Icon = MEDIA_ICON[publication.mediaType]
  const dateLabel = publication.publishedAt
    ? `Publiée le ${formatDate(publication.publishedAt)}`
    : publication.scheduledAt
      ? `Programmée le ${formatDate(publication.scheduledAt)}`
      : 'Non programmée'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
        <Icon className="size-4.5 text-primary" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-foreground">{publication.title}</p>
          <Badge variant={meta.variant} className="shrink-0">
            {meta.label}
          </Badge>
        </div>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{publication.content}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className="text-[11px] text-muted-foreground">{dateLabel}</span>
          {publication.metrics && (
            <span className="text-[11px] text-muted-foreground">
              {publication.metrics.reach.toLocaleString('fr-FR')} vues ·{' '}
              {publication.metrics.likes} likes · {publication.metrics.comments} commentaires
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
