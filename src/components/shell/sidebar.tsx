import { motion } from 'framer-motion'
import { CalendarClock, MessagesSquare, Share2, Sparkles } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { getRole } from '@/data/roles'
import { cn } from '@/lib/utils'
import { useSessionStore } from '@/store/session-store'

const navItems = [
  {
    to: '/presence',
    label: 'Présence & tâches',
    icon: CalendarClock,
    isVisible: () => true,
  },
  {
    to: '/assistant',
    label: 'Assistance IA',
    icon: Sparkles,
    isVisible: (assistantMode: string | null) => assistantMode !== null,
  },
  {
    to: '/publication',
    label: 'Communication Facebook',
    icon: Share2,
    isVisible: (_: string | null, canAccessPublish?: boolean) => Boolean(canAccessPublish),
  },
]

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const role = useSessionStore((s) => s.role)
  const def = getRole(role)

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2.5 px-5 py-6">
        <div className="flex size-9 items-center justify-center rounded-lg bg-white/10 text-sm font-bold text-white">
          AS
        </div>
        <div>
          <p className="text-sm font-semibold text-white leading-tight">AGC Space</p>
          <p className="text-xs text-sidebar-muted leading-tight">Plateforme interne</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {navItems
          .filter((item) => item.isVisible(def.assistantMode, def.canAccessPublish))
          .map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive ? 'text-white' : 'text-sidebar-muted hover:bg-sidebar-hover-bg hover:text-white',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-lg bg-sidebar-active-bg"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <item.icon className="relative z-10 size-4.5 shrink-0" />
                  <span className="relative z-10">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
      </nav>

      <div className="mx-3 mb-4 rounded-lg bg-white/5 p-3">
        <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-white">
          <MessagesSquare className="size-3.5" />
          Rôle actif
        </div>
        <p className="text-xs text-sidebar-muted leading-snug">{def.description}</p>
      </div>
    </div>
  )
}

/** Sidebar fixe, visible à partir du breakpoint lg. */
export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <SidebarContent />
    </aside>
  )
}

/** Tiroir de navigation pour mobile/tablette, piloté par le bouton menu du topbar. */
export function MobileSidebar() {
  const open = useSessionStore((s) => s.mobileNavOpen)
  const setOpen = useSessionStore((s) => s.setMobileNavOpen)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="left"
        className="w-72 max-w-[85vw] border-r-0 p-0"
        closeClassName="text-white hover:text-white/80"
      >
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SidebarContent onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
