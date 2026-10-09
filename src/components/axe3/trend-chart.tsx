import { useId, useMemo, useState } from 'react'
import type { AnalyticsPoint } from '@/types'

interface TrendChartProps {
  data: AnalyticsPoint[]
  metric: 'reach' | 'engagement'
  color: string
  height?: number
}

const PADDING = { top: 16, right: 12, bottom: 24, left: 12 }

export function TrendChart({ data, metric, color, height = 160 }: TrendChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const gradientId = useId()

  const width = 480
  const values = data.map((d) => d[metric])
  const max = Math.max(...values)
  const min = 0

  const points = useMemo(() => {
    const innerW = width - PADDING.left - PADDING.right
    const innerH = height - PADDING.top - PADDING.bottom
    return data.map((d, i) => {
      const x = PADDING.left + (innerW * i) / (data.length - 1)
      const ratio = (d[metric] - min) / (max - min || 1)
      const y = PADDING.top + innerH * (1 - ratio)
      return { x, y, value: d[metric], date: d.date }
    })
  }, [data, metric, max, height])

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - PADDING.bottom} L ${points[0].x} ${height - PADDING.bottom} Z`

  const gridY = [0, 0.5, 1].map((r) => PADDING.top + (height - PADDING.top - PADDING.bottom) * r)
  const hovered = hoverIndex !== null ? points[hoverIndex] : null

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full overflow-visible"
        role="img"
        aria-label={`Évolution de ${metric === 'reach' ? 'la portée' : 'l’engagement'} sur 7 jours`}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.14} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        {gridY.map((y) => (
          <line
            key={y}
            x1={PADDING.left}
            x2={width - PADDING.right}
            y1={y}
            y2={y}
            stroke="var(--border)"
            strokeWidth={1}
          />
        ))}

        <path d={areaPath} fill={`url(#${gradientId})`} stroke="none" />
        <path d={linePath} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

        {hovered && (
          <line
            x1={hovered.x}
            x2={hovered.x}
            y1={PADDING.top}
            y2={height - PADDING.bottom}
            stroke={color}
            strokeWidth={1}
            strokeOpacity={0.35}
          />
        )}

        {points.map((p, i) => {
          const isLast = i === points.length - 1
          const isHovered = hoverIndex === i
          return (
            <g key={p.date}>
              <circle cx={p.x} cy={p.y} r={12} fill="transparent" onMouseEnter={() => setHoverIndex(i)} />
              {(isLast || isHovered) && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 5 : 4}
                  fill={color}
                  stroke="var(--card)"
                  strokeWidth={2}
                />
              )}
            </g>
          )
        })}

        {points.map((p, i) =>
          i % 2 === 0 || i === points.length - 1 ? (
            <text
              key={`label-${p.date}`}
              x={p.x}
              y={height - 6}
              textAnchor="middle"
              className="fill-muted-foreground"
              fontSize={10}
            >
              {p.date}
            </text>
          ) : null,
        )}
      </svg>

      {hovered && (
        <div
          className="pointer-events-none absolute top-0 -translate-x-1/2 -translate-y-full rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs shadow-md"
          style={{ left: `${(hovered.x / width) * 100}%` }}
        >
          <p className="font-semibold text-foreground">{hovered.value.toLocaleString('fr-FR')}</p>
          <p className="text-[10px] text-muted-foreground">{hovered.date}</p>
        </div>
      )}
    </div>
  )
}
