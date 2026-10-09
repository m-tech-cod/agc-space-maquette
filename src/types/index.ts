// ---------------------------------------------------------------------------
// Rôles et permissions
// ---------------------------------------------------------------------------

export type Role = 'ceo' | 'production_director' | 'tpo' | 'intern' | 'communication'

export interface RoleDefinition {
  id: Role
  label: string
  shortLabel: string
  description: string
  initials: string
  assistantMode: AssistantMode | null
  canAccessPublish: boolean
  canPublishDirectly: boolean
  canValidateTasks: boolean
}

export interface UserProfile {
  id: string
  name: string
  role: Role
  avatarColor: string
}

// ---------------------------------------------------------------------------
// AXE 1 - Présence & tâches
// ---------------------------------------------------------------------------

export type AttendanceStatus = 'none' | 'present' | 'late' | 'absent'

export interface AttendanceRecord {
  status: AttendanceStatus
  checkInAt: string | null
  checkOutAt: string | null
  expectedAt: string
  lateByMinutes?: number
}

export type TaskStatus =
  | 'todo'
  | 'in_progress'
  | 'paused'
  | 'blocked'
  | 'in_review'
  | 'to_fix'
  | 'done'
  | 'cancelled'

export type TaskPriority = 'low' | 'normal' | 'high' | 'urgent'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assigneeId: string
  projectLabel: string
  dueAt: string
  estimatedHours: number
  actualHours: number
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6 // 0 = lundi
  createdAt: string
}

// ---------------------------------------------------------------------------
// AXE 2 - Assistance IA
// ---------------------------------------------------------------------------

export type AssistantMode = 'creative' | 'dev' | 'archive'

export interface AssistantAction {
  id: string
  label: string
  icon: string
}

export interface AssistantMessage {
  id: string
  author: 'user' | 'assistant'
  content: string
  timestamp: string
  attachment?: {
    type: 'image' | 'code' | 'document'
    label: string
    meta?: string
  }
}

export interface AssistantConversation {
  id: string
  mode: AssistantMode
  title: string
  messages: AssistantMessage[]
}

export interface ArchiveDocument {
  id: string
  title: string
  type: 'pdf' | 'doc' | 'sheet' | 'image' | 'archive'
  project: string
  author: string
  updatedAt: string
  summary: string
  restricted?: boolean
}

// ---------------------------------------------------------------------------
// AXE 3 - Communication Facebook
// ---------------------------------------------------------------------------

export type PublicationStatus =
  | 'draft'
  | 'to_validate'
  | 'to_fix'
  | 'validated'
  | 'scheduled'
  | 'queued'
  | 'publishing'
  | 'published'
  | 'failed'
  | 'manual_action_required'

export interface Publication {
  id: string
  title: string
  content: string
  status: PublicationStatus
  mediaType: 'image' | 'video' | 'carousel' | 'text'
  mediaLabel: string
  scheduledAt: string | null
  publishedAt: string | null
  authorId: string
  validatorId?: string
  metrics?: {
    reach: number
    likes: number
    comments: number
    shares: number
  }
}

export interface AnalyticsPoint {
  date: string
  reach: number
  engagement: number
}
