import { motion } from 'framer-motion'
import { Download, Sparkles } from 'lucide-react'

const ITEMS = [
  { label: 'Visuel - Angle produit', gradient: 'from-[#2b3a67] to-[#4b5fa5]' },
  { label: 'Visuel - Angle témoignage', gradient: 'from-[#f2790a] to-[#f7a855]' },
  { label: 'Visuel - Angle avant/après', gradient: 'from-[#1d2847] to-[#2b3a67]' },
]

export function CreativeGallery() {
  return (
    <div>
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Sparkles className="size-3.5" />
        Générations récentes
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.06 }}
            whileHover={{ y: -3 }}
            className={`group relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br ${item.gradient} p-3`}
          >
            <button
              type="button"
              className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
              aria-label="Télécharger"
            >
              <Download className="size-3.5" />
            </button>
            <span className="absolute bottom-2 left-2 right-2 text-[11px] font-medium text-white">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
