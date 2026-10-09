import { AnimatePresence, motion } from 'framer-motion'
import { Send, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { MessageBubble } from '@/components/axe2/message-bubble'
import { QuickActions } from '@/components/axe2/quick-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ASSISTANT_QUICK_ACTIONS } from '@/data/mock-assistant'
import type { AssistantConversation, AssistantMode } from '@/types'

const CANNED_REPLIES: Record<AssistantMode, string> = {
  creative:
    'Démonstration - dans la version finale, je générerais ici une proposition créative adaptée à ta demande (visuel, script ou déclinaison).',
  dev: 'Démonstration - dans la version finale, j’analyserais le code concerné pour t’apporter une explication ou une piste de correction de premier niveau.',
  archive:
    'Démonstration - dans la version finale, je chercherais dans les archives auxquelles tu as accès pour te répondre précisément.',
}

export function ChatPanel({ conversation, mode }: { conversation: AssistantConversation; mode: AssistantMode }) {
  const [messages, setMessages] = useState(conversation.messages)
  const [draft, setDraft] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  function sendMessage(content: string) {
    if (!content.trim()) return
    const now = new Date()
    const timestamp = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

    setMessages((prev) => [
      ...prev,
      { id: `local-${Date.now()}`, author: 'user', content, timestamp },
    ])
    setDraft('')
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: `local-reply-${Date.now()}`,
          author: 'assistant',
          content: CANNED_REPLIES[mode],
          timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    }, 1100)
  }

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-1 py-2">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <Sparkles className="size-3.5 animate-pulse text-primary" />
                L’assistant rédige une réponse…
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-3 border-t border-border pt-3">
        <QuickActions actions={ASSISTANT_QUICK_ACTIONS[mode]} onPick={sendMessage} />
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage(draft)
          }}
        >
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Écris ta demande…"
            className="flex-1"
          />
          <Button type="submit" size="icon" aria-label="Envoyer">
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
