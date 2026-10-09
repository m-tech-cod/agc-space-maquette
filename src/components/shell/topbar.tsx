import { Bell, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RoleSwitcher } from '@/components/shell/role-switcher'
import { useSessionStore } from '@/store/session-store'

const TODAY_LABEL = 'Mercredi 7 octobre 2026'

export function Topbar() {
  const setMobileNavOpen = useSessionStore((s) => s.setMobileNavOpen)

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-card px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 lg:hidden"
          aria-label="Ouvrir le menu de navigation"
          onClick={() => setMobileNavOpen(true)}
        >
          <Menu className="size-4.5" />
        </Button>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{TODAY_LABEL}</p>
          <p className="hidden truncate text-xs text-muted-foreground sm:block">
            Maquette de démonstration - données fictives
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <Button variant="ghost" size="icon" aria-label="Notifications" className="hidden sm:inline-flex">
          <Bell className="size-4.5 text-muted-foreground" />
        </Button>
        <RoleSwitcher />
      </div>
    </header>
  )
}
