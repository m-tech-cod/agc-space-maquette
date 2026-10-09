import { Lock } from 'lucide-react'
import { ArchivePanel } from '@/components/axe2/archive-panel'
import { ChatPanel } from '@/components/axe2/chat-panel'
import { CreativeGallery } from '@/components/axe2/creative-gallery'
import { EmptyState } from '@/components/shared/empty-state'
import { Card } from '@/components/ui/card'
import { ASSISTANT_INTRO, MOCK_CONVERSATIONS } from '@/data/mock-assistant'
import { getRole } from '@/data/roles'
import { useSessionStore } from '@/store/session-store'

export function AssistantPage() {
  const role = useSessionStore((s) => s.role)
  const def = getRole(role)

  if (!def.assistantMode) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Assistance IA</h1>
          <p className="text-sm text-muted-foreground">
            Fonctionnalité dépendante du rôle connecté.
          </p>
        </div>
        <EmptyState
          icon={Lock}
          title="Aucun assistant disponible pour votre rôle"
          description={`Le rôle "${def.label}" n’a pas accès à l’assistant IA interne dans cette version. Change de rôle depuis le menu en haut à droite pour voir les autres expériences.`}
          className="min-h-[50vh]"
        />
      </div>
    )
  }

  const mode = def.assistantMode
  const intro = ASSISTANT_INTRO[mode]
  const conversation = MOCK_CONVERSATIONS[mode]

  return (
    <div className="flex flex-col gap-4 lg:h-[calc(100dvh-7.5rem)] lg:min-h-[32rem]">
      <div>
        <h1 className="text-xl font-semibold text-foreground">{intro.title}</h1>
        <p className="text-sm text-muted-foreground">{intro.subtitle}</p>
      </div>

      {mode === 'archive' ? (
        <div className="grid grid-cols-1 gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="flex h-[32rem] flex-col p-4 lg:h-auto lg:min-h-0">
            <ChatPanel key={mode} conversation={conversation} mode={mode} />
          </Card>
          <Card className="flex flex-col p-4 lg:min-h-0">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Documents &amp; archives
            </p>
            <ArchivePanel role={role} />
          </Card>
        </div>
      ) : (
        <Card className="flex h-[32rem] flex-col gap-4 p-4 lg:h-auto lg:min-h-0 lg:flex-1">
          {mode === 'creative' && <CreativeGallery />}
          <div className="min-h-0 flex-1">
            <ChatPanel key={mode} conversation={conversation} mode={mode} />
          </div>
        </Card>
      )}
    </div>
  )
}
