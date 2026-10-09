import { Check, ChevronDown, UserCircle2 } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getUserForRole } from '@/data/mock-users'
import { ROLES } from '@/data/roles'
import { useSessionStore } from '@/store/session-store'
import type { Role } from '@/types'

export function RoleSwitcher() {
  const role = useSessionStore((s) => s.role)
  const setRole = useSessionStore((s) => s.setRole)
  const user = getUserForRole(role)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-auto gap-0 py-1.5 pl-2 pr-2 sm:gap-2.5 sm:pr-3">
          <Avatar className="size-7">
            <AvatarFallback style={{ backgroundColor: user.avatarColor, color: 'white' }}>
              {getRoleInitials(role)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden text-left leading-tight sm:block">
            <p className="text-xs font-semibold text-foreground">{user.name}</p>
            <p className="text-[11px] text-muted-foreground">{labelFor(role)}</p>
          </div>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel className="flex items-center gap-1.5">
          <UserCircle2 className="size-3.5" />
          Démonstration - se connecter en tant que
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {ROLES.map((r) => (
          <DropdownMenuItem
            key={r.id}
            onSelect={() => setRole(r.id)}
            className="flex-col items-start gap-0.5 py-2"
          >
            <span className="flex w-full items-center justify-between font-medium">
              {r.label}
              {r.id === role && <Check className="size-3.5 text-primary" />}
            </span>
            <span className="text-xs text-muted-foreground">{r.description}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function labelFor(role: Role) {
  return ROLES.find((r) => r.id === role)?.shortLabel ?? role
}

function getRoleInitials(role: Role) {
  return ROLES.find((r) => r.id === role)?.initials ?? '??'
}
