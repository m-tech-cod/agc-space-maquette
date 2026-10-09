import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatTileProps {
  label: string
  value: string
  delta?: { value: string; direction: 'up' | 'down'; isPositive: boolean }
}

export function StatTile({ label, value, delta }: StatTileProps) {
  return (
    <Card className="p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-1.5 flex items-end justify-between">
        <p className="text-2xl font-semibold text-foreground">{value}</p>
        {delta && (
          <span
            className={cn(
              'flex items-center gap-0.5 text-xs font-medium',
              delta.isPositive ? 'text-success' : 'text-danger',
            )}
          >
            {delta.direction === 'up' ? (
              <ArrowUpRight className="size-3.5" />
            ) : (
              <ArrowDownRight className="size-3.5" />
            )}
            {delta.value}
          </span>
        )}
      </div>
    </Card>
  )
}
