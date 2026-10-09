import type { AssistantAction, AssistantConversation, AssistantMode } from '@/types'

export const ASSISTANT_INTRO: Record<AssistantMode, { title: string; subtitle: string }> = {
  creative: {
    title: 'Assistant créatif AGO',
    subtitle: 'Graphisme, préparation de contenus visuels et aide au montage vidéo.',
  },
  dev: {
    title: 'Assistant développement',
    subtitle: 'Lecture de code, explication, génération de premier niveau et aide au débogage.',
  },
  archive: {
    title: 'Assistant archives & recherche',
    subtitle: 'Retrouver un document, une information ou les archives liées à un projet.',
  },
}

export const ASSISTANT_QUICK_ACTIONS: Record<AssistantMode, AssistantAction[]> = {
  creative: [
    { id: 'a1', label: 'Générer 3 concepts de visuel', icon: 'Sparkles' },
    { id: 'a2', label: 'Préparer un script vidéo 30s', icon: 'Clapperboard' },
    { id: 'a3', label: 'Décliner un visuel en 4 formats', icon: 'LayoutGrid' },
  ],
  dev: [
    { id: 'a4', label: 'Expliquer ce fichier', icon: 'FileCode' },
    { id: 'a5', label: 'Aide au débogage', icon: 'Bug' },
    { id: 'a6', label: 'Générer une fonction simple', icon: 'Code2' },
  ],
  archive: [
    { id: 'a7', label: 'Rechercher un document', icon: 'Search' },
    { id: 'a8', label: 'Documents liés à un projet', icon: 'FolderSearch' },
    { id: 'a9', label: 'Résumer une archive', icon: 'FileText' },
  ],
}

export const MOCK_CONVERSATIONS: Record<AssistantMode, AssistantConversation> = {
  creative: {
    id: 'conv-creative',
    mode: 'creative',
    title: 'Campagne rentrée - Hawa Pâtisserie',
    messages: [
      {
        id: 'm1',
        author: 'user',
        content: 'Propose-moi 3 angles créatifs pour une vidéo de lancement produit, format 9:16, ton premium.',
        timestamp: '09:14',
      },
      {
        id: 'm2',
        author: 'assistant',
        content:
          'Voici 3 angles : 1) Démonstration produit en gros plan avec voix off premium. 2) Témoignage client stylisé façon interview courte. 3) Avant/après avec transition rythmée. Je peux préparer le script du premier angle si tu valides.',
        timestamp: '09:14',
      },
      {
        id: 'm3',
        author: 'user',
        content: 'On part sur le premier angle. Prépare le script et une proposition de storyboard.',
        timestamp: '09:16',
      },
      {
        id: 'm4',
        author: 'assistant',
        content: 'Script et storyboard générés. 6 scènes, durée estimée 32 secondes, voix off incluse.',
        timestamp: '09:17',
        attachment: { type: 'image', label: 'Storyboard_v1.png', meta: '6 scènes · 32s' },
      },
    ],
  },
  dev: {
    id: 'conv-dev',
    mode: 'dev',
    title: 'Module tâches - AGC Orbit',
    messages: [
      {
        id: 'm1',
        author: 'user',
        content: 'Peux-tu m’expliquer ce que fait la fonction calculateDueDate dans ce fichier ?',
        timestamp: '14:02',
      },
      {
        id: 'm2',
        author: 'assistant',
        content:
          'Cette fonction calcule une échéance en tenant compte uniquement des heures de travail (09h-18h). Si le temps estimé dépasse la fin de journée, le reste est reporté au prochain jour ouvré.',
        timestamp: '14:02',
        attachment: {
          type: 'code',
          label: 'calculateDueDate.ts',
          meta: 'TypeScript · 18 lignes',
        },
      },
      {
        id: 'm3',
        author: 'user',
        content: 'Il y a un bug : les week-ends sont comptés comme jours ouvrés. Une idée ?',
        timestamp: '14:05',
      },
      {
        id: 'm4',
        author: 'assistant',
        content:
          'Probable cause : la fonction isWorkingDay() ne vérifie pas le jour de la semaine, seulement la plage horaire. Je peux te proposer une correction de premier niveau à faire relire par un développeur avant application.',
        timestamp: '14:05',
      },
    ],
  },
  archive: {
    id: 'conv-archive',
    mode: 'archive',
    title: 'Recherche documentaire',
    messages: [
      {
        id: 'm1',
        author: 'user',
        content: 'Retrouve les documents liés au projet "Campagne rentrée Hawa Pâtisserie".',
        timestamp: '11:30',
      },
      {
        id: 'm2',
        author: 'assistant',
        content: 'J’ai trouvé 3 documents autorisés pour ton rôle, classés par pertinence.',
        timestamp: '11:30',
        attachment: { type: 'document', label: '3 résultats trouvés' },
      },
      {
        id: 'm3',
        author: 'user',
        content: 'Résume le brief client en 3 points.',
        timestamp: '11:32',
      },
      {
        id: 'm4',
        author: 'assistant',
        content:
          '1) Cible familles urbaines 25-45 ans. 2) Mettre en avant le savoir-faire artisanal. 3) Objectif : +20% de commandes en ligne avant fin d’année.',
        timestamp: '11:32',
      },
    ],
  },
}
