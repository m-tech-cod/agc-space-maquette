import { Trophy } from 'lucide-react'
import { StatTile } from '@/components/axe3/stat-tile'
import { TrendChart } from '@/components/axe3/trend-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MOCK_ANALYTICS, MOCK_PUBLICATIONS } from '@/data/mock-publications'

export function AnalyticsPanel() {
  const totalReach = MOCK_ANALYTICS.reduce((sum, p) => sum + p.reach, 0)
  const totalEngagement = MOCK_ANALYTICS.reduce((sum, p) => sum + p.engagement, 0)
  const engagementRate = ((totalEngagement / totalReach) * 100).toFixed(1)

  const topPost = [...MOCK_PUBLICATIONS]
    .filter((p) => p.metrics)
    .sort((a, b) => (b.metrics?.reach ?? 0) - (a.metrics?.reach ?? 0))[0]

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatTile
          label="Portée cumulée - 7 jours"
          value={totalReach.toLocaleString('fr-FR')}
          delta={{ value: '+12% vs sem. précédente', direction: 'up', isPositive: true }}
        />
        <StatTile
          label="Engagement cumulé - 7 jours"
          value={totalEngagement.toLocaleString('fr-FR')}
          delta={{ value: '+6% vs sem. précédente', direction: 'up', isPositive: true }}
        />
        <StatTile label="Taux d’engagement moyen" value={`${engagementRate}%`} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Portée - 7 derniers jours</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <TrendChart data={MOCK_ANALYTICS} metric="reach" color="var(--brand-navy)" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Engagement - 7 derniers jours</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <TrendChart data={MOCK_ANALYTICS} metric="engagement" color="var(--brand-orange)" />
          </CardContent>
        </Card>
      </div>

      {topPost && (
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-warning-bg">
              <Trophy className="size-5 text-warning" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">Contenu le plus performant</p>
              <p className="truncate text-sm font-medium text-foreground">{topPost.title}</p>
            </div>
            <div className="flex gap-4 text-right">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {topPost.metrics?.reach.toLocaleString('fr-FR')}
                </p>
                <p className="text-[11px] text-muted-foreground">portée</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{topPost.metrics?.likes}</p>
                <p className="text-[11px] text-muted-foreground">likes</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{topPost.metrics?.shares}</p>
                <p className="text-[11px] text-muted-foreground">partages</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
