import { motion } from 'framer-motion'
import { FileText, ImageIcon, SquareCode } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AssistantMessage } from '@/types'

const ATTACHMENT_ICON = {
  image: ImageIcon,
  code: SquareCode,
  document: FileText,
}

export function MessageBubble({ message }: { message: AssistantMessage }) {
  const isUser = message.author === 'user'
  const Icon = message.attachment ? ATTACHMENT_ICON[message.attachment.type] : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn('flex flex-col gap-1', isUser ? 'items-end' : 'items-start')}
    >
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'rounded-br-sm bg-primary text-primary-foreground'
            : 'rounded-bl-sm bg-muted text-foreground',
        )}
      >
        {message.content}
      </div>

      {message.attachment && Icon && (
        <div
          className={cn(
            'flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs',
            isUser ? 'mr-1' : 'ml-1',
          )}
        >
          <Icon className="size-3.5 text-primary" />
          <span className="font-medium text-foreground">{message.attachment.label}</span>
          {message.attachment.meta && (
            <span className="text-muted-foreground">· {message.attachment.meta}</span>
          )}
        </div>
      )}

      <span className="px-1 text-[10px] text-muted-foreground">{message.timestamp}</span>
    </motion.div>
  )
}
