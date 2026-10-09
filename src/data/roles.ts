import type { RoleDefinition } from '@/types'

export const ROLES: RoleDefinition[] = [
  {
    id: 'ceo',
    label: 'CEO',
    shortLabel: 'CEO',
    description: 'Direction - vision globale, création et communication',
    initials: 'CE',
    assistantMode: 'creative',
    canAccessPublish: true,
    canPublishDirectly: true,
    canValidateTasks: true,
  },
  {
    id: 'production_director',
    label: 'Directeur de production',
    shortLabel: 'Dir. Production',
    description: 'Supervision technique et assistance au développement',
    initials: 'DP',
    assistantMode: 'dev',
    canAccessPublish: true,
    canPublishDirectly: false,
    canValidateTasks: true,
  },
  {
    id: 'tpo',
    label: 'Technical Product Owner',
    shortLabel: 'TPO',
    description: 'Pilotage produit, recherche documentaire et archives',
    initials: 'TP',
    assistantMode: 'archive',
    canAccessPublish: false,
    canPublishDirectly: false,
    canValidateTasks: true,
  },
  {
    id: 'intern',
    label: 'Stagiaire',
    shortLabel: 'Stagiaire',
    description: 'Missions encadrées, accès restreint aux archives autorisées',
    initials: 'ST',
    assistantMode: 'archive',
    canAccessPublish: false,
    canPublishDirectly: false,
    canValidateTasks: false,
  },
  {
    id: 'communication',
    label: 'Communication',
    shortLabel: 'Communication',
    description: 'Création et diffusion des contenus Facebook',
    initials: 'CO',
    assistantMode: null,
    canAccessPublish: true,
    canPublishDirectly: true,
    canValidateTasks: false,
  },
]

export function getRole(id: string) {
  return ROLES.find((r) => r.id === id) ?? ROLES[0]
}
