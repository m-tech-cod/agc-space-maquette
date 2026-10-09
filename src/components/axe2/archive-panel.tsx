import { FileSpreadsheet, FileText, Folder, Image as ImageIcon, Lock, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { EmptyState } from '@/components/shared/empty-state'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { MOCK_ARCHIVES } from '@/data/mock-archives'
import type { ArchiveDocument, Role } from '@/types'

const TYPE_ICON = {
  pdf: FileText,
  doc: FileText,
  sheet: FileSpreadsheet,
  image: ImageIcon,
  archive: Folder,
}

function DocumentCard({ doc, locked }: { doc: ArchiveDocument; locked: boolean }) {
  const Icon = TYPE_ICON[doc.type]

  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-3.5">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
        <Icon className="size-4 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-sm font-medium text-foreground">{doc.title}</p>
          {locked && (
            <Badge variant="neutral" className="shrink-0 gap-1">
              <Lock className="size-3" />
              Restreint
            </Badge>
          )}
        </div>
        {locked ? (
          <p className="mt-1 text-xs text-muted-foreground">
            Document non accessible avec votre rôle actuel.
          </p>
        ) : (
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{doc.summary}</p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <Badge variant="outline" className="text-[10px]">
            {doc.project}
          </Badge>
          <span className="text-[11px] text-muted-foreground">
            {doc.author} · {doc.updatedAt}
          </span>
        </div>
      </div>
    </div>
  )
}

export function ArchivePanel({ role }: { role: Role }) {
  const [query, setQuery] = useState('')
  const canSeeRestricted = role === 'ceo' || role === 'tpo'

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return MOCK_ARCHIVES
    return MOCK_ARCHIVES.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.project.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="relative">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un document, un projet…"
          className="pl-9"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {results.length === 0 ? (
          <EmptyState icon={Search} title="Aucun résultat" description="Essaie un autre mot-clé." />
        ) : (
          <div className="flex flex-col gap-2.5">
            {results.map((doc) => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                locked={Boolean(doc.restricted) && !canSeeRestricted}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
