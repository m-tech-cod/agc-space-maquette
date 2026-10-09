import type { Task, TaskPriority, TaskStatus } from '@/types'

export const WEEK_DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

/** Jour de référence pour la démo (Mercredi), indépendant de la date réelle. */
export const TODAY_DAY_INDEX = 2

export type WeekScenario = 'empty' | 'normal' | 'busy'

function t(
  id: string,
  title: string,
  description: string,
  status: TaskStatus,
  priority: TaskPriority,
  day: Task['day'],
  opts: Partial<Task> = {},
): Task {
  return {
    id,
    title,
    description,
    status,
    priority,
    day,
    assigneeId: 'u-com',
    projectLabel: 'Campagne rentrée',
    dueAt: '2026-10-09T18:00:00',
    estimatedHours: 3,
    actualHours: 1.5,
    createdAt: '2026-10-05T09:00:00',
    ...opts,
  }
}

const NORMAL_WEEK: Task[] = [
  t('t1', 'Préparer le brief client Hawa Pâtisserie', 'Cadrer objectifs, cible et ton de la campagne.', 'done', 'normal', 0),
  t('t2', 'Revue des maquettes Motion IA', 'Valider les écrans de l’onboarding avant dev.', 'done', 'high', 0),
  t('t3', 'Script vidéo produit', 'Rédiger le script 30s pour la nouvelle offre.', 'in_progress', 'high', TODAY_DAY_INDEX),
  t('t4', 'Réunion hebdo équipe production', 'Point d’avancement et blocages.', 'todo', 'normal', TODAY_DAY_INDEX, { estimatedHours: 1 }),
  t('t5', 'Corriger bug formulaire contact', 'Le champ téléphone n’applique pas le bon format.', 'to_fix', 'urgent', TODAY_DAY_INDEX),
  t('t6', 'Présentation roadmap Q4', 'Préparer les slides pour le comité de direction.', 'in_review', 'high', 4),
  t('t7', 'Archivage dossier client ICMDA', 'Classer les livrables finaux dans Orbit.', 'todo', 'low', 4),
]

const BUSY_WEEK: Task[] = [
  ...NORMAL_WEEK,
  t('t8', 'Montage teaser réseaux sociaux', 'Version 9:16 et 1:1.', 'in_progress', 'urgent', TODAY_DAY_INDEX),
  t('t9', 'Appel cadrage nouveau client', 'Présentation offre Motion IA.', 'todo', 'high', TODAY_DAY_INDEX, { estimatedHours: 1 }),
  t('t10', 'Relecture contrat prestation', 'Vérifier clauses avant signature.', 'blocked', 'high', TODAY_DAY_INDEX),
  t('t11', 'Design system AGO', 'Finaliser tokens couleurs et composants.', 'in_progress', 'normal', 0),
  t('t12', 'Tests export vidéo multi-format', 'Vérifier 16:9, 9:16, 1:1, 4:5.', 'todo', 'normal', 0),
  t('t13', 'Point hebdomadaire SAV', 'Retour sur les tickets ouverts.', 'done', 'normal', 1),
  t('t14', 'Préparation onboarding stagiaire', 'Checklist et accès.', 'todo', 'low', 4),
  t('t15', 'Audit sécurité multi-tenant Publish', 'Revue des policies RLS.', 'in_progress', 'urgent', 1),
]

export function getWeekTasks(scenario: WeekScenario): Task[] {
  if (scenario === 'empty') return []
  if (scenario === 'busy') return BUSY_WEEK
  return NORMAL_WEEK
}
