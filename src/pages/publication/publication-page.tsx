import { Plus } from 'lucide-react'
import { useState } from 'react'
import { AnalyticsPanel } from '@/components/axe3/analytics-panel'
import { ComposerSheet } from '@/components/axe3/composer-sheet'
import { PublicationCalendar } from '@/components/axe3/publication-calendar'
import { PublicationCard } from '@/components/axe3/publication-card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MOCK_PUBLICATIONS } from '@/data/mock-publications'
import type { Publication } from '@/types'

export function PublicationPage() {
  const [publications, setPublications] = useState<Publication[]>(MOCK_PUBLICATIONS)
  const [composerOpen, setComposerOpen] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Communication Facebook</h1>
          <p className="text-sm text-muted-foreground">
            Création, programmation, publication et suivi des performances.
          </p>
        </div>
        <Button onClick={() => setComposerOpen(true)} className="sm:shrink-0">
          <Plus className="size-4" />
          Nouvelle publication
        </Button>
      </div>

      <Tabs defaultValue="calendar">
        <TabsList>
          <TabsTrigger value="calendar">Calendrier</TabsTrigger>
          <TabsTrigger value="list">Publications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <PublicationCalendar publications={publications} />
        </TabsContent>

        <TabsContent value="list">
          {publications.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucune publication pour le moment.</p>
          ) : (
            <div className="flex flex-col gap-2.5">
              {publications.map((p) => (
                <PublicationCard key={p.id} publication={p} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsPanel />
        </TabsContent>
      </Tabs>

      <ComposerSheet
        open={composerOpen}
        onOpenChange={setComposerOpen}
        onCreate={(pub) => setPublications((prev) => [pub, ...prev])}
      />
    </div>
  )
}
