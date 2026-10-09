import type {
  AttendanceStatus,
  PublicationStatus,
  TaskPriority,
  TaskStatus,
} from '@/types'

type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'accent'
  | 'outline'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'

export const TASK_STATUS_META: Record<TaskStatus, { label: string; variant: BadgeVariant }> = {
  todo: { label: 'À faire', variant: 'neutral' },
  in_progress: { label: 'En cours', variant: 'info' },
  paused: { label: 'En pause', variant: 'warning' },
  blocked: { label: 'Bloquée', variant: 'danger' },
  in_review: { label: 'En validation', variant: 'accent' },
  to_fix: { label: 'À corriger', variant: 'warning' },
  done: { label: 'Terminée', variant: 'success' },
  cancelled: { label: 'Annulée', variant: 'neutral' },
}

export const PRIORITY_META: Record<TaskPriority, { label: string; variant: BadgeVariant }> = {
  low: { label: 'Basse', variant: 'neutral' },
  normal: { label: 'Normale', variant: 'info' },
  high: { label: 'Haute', variant: 'warning' },
  urgent: { label: 'Urgente', variant: 'danger' },
}

export const ATTENDANCE_STATUS_META: Record<
  AttendanceStatus,
  { label: string; variant: BadgeVariant }
> = {
  none: { label: 'Aucun pointage', variant: 'neutral' },
  present: { label: 'Présent', variant: 'success' },
  late: { label: 'Retard', variant: 'warning' },
  absent: { label: 'Absent', variant: 'danger' },
}

export const PUBLICATION_STATUS_META: Record<
  PublicationStatus,
  { label: string; variant: BadgeVariant }
> = {
  draft: { label: 'Brouillon', variant: 'neutral' },
  to_validate: { label: 'À valider', variant: 'info' },
  to_fix: { label: 'À corriger', variant: 'warning' },
  validated: { label: 'Validée', variant: 'accent' },
  scheduled: { label: 'Programmée', variant: 'info' },
  queued: { label: 'En file', variant: 'secondary' },
  publishing: { label: 'En publication', variant: 'warning' },
  published: { label: 'Publiée', variant: 'success' },
  failed: { label: 'Échec', variant: 'danger' },
  manual_action_required: { label: 'Action manuelle requise', variant: 'danger' },
}
