import type { UserProfile } from '@/types'

export const MOCK_USERS: UserProfile[] = [
  { id: 'u-ceo', name: 'Awa Gnonlonfoun', role: 'ceo', avatarColor: '#2b3a67' },
  { id: 'u-dp', name: 'Richard Comlan', role: 'production_director', avatarColor: '#1d2847' },
  { id: 'u-tpo', name: 'Sélom Adjovi', role: 'tpo', avatarColor: '#f2790a' },
  { id: 'u-intern', name: 'Raffath Maloma', role: 'intern', avatarColor: '#2563eb' },
  { id: 'u-com', name: 'Fadel Akpovi', role: 'communication', avatarColor: '#16a34a' },
]

export function getUserForRole(role: string): UserProfile {
  return MOCK_USERS.find((u) => u.role === role) ?? MOCK_USERS[0]
}
