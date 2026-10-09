# AGC Space - Maquette plateforme interne

Maquette frontend navigable (données mockées, aucun backend réel) couvrant les 3 axes :
présence & tâches, assistance IA par rôle, communication Facebook.

🔗 **Démo en ligne** : https://m-tech-cod.github.io/agc-space-maquette/

## Lancer en local

```bash
npm install
npm run dev
```

Ouvre l'URL affichée dans le terminal (`http://localhost:5173` par défaut).

## Vérifier le build de production en local

C'est la meilleure façon de vérifier **avant** de déployer, car c'est exactement ce que
GitHub Pages servira :

```bash
npm run build
npm run preview
```

## Déployer sur GitHub Pages

Le projet est déjà configuré pour ça :
- `vite.config.ts` utilise `base: './'` (chemins relatifs) - fonctionne quel que soit le nom du dépôt.
- Le routing utilise `HashRouter` (URLs en `#/...`) - évite les erreurs 404 de GitHub Pages
  sur les routes internes (`/presence`, `/assistant`, `/publication`), aucune configuration
  serveur supplémentaire n'est nécessaire.
- Un workflow GitHub Actions est déjà présent dans `.github/workflows/deploy.yml` : il construit
  le projet (`npm ci && npm run build`) et publie `dist/` automatiquement à chaque push sur `main`.
  **Tu n'as rien à builder toi-même** - GitHub Pages ne sait pas exécuter `npm run build` tout
  seul, c'est justement ce que ce workflow fait à ta place.

Étapes :

1. Pousse le code sur GitHub (dépôt classique, pas besoin d'être à la racine `username.github.io`).
2. Dans les paramètres du dépôt → **Pages** → Source : choisis **"GitHub Actions"**
   (pas "Deploy from a branch", sinon le workflow ci-dessus n'est pas utilisé).
3. Pousse sur `main` (ou relance le workflow manuellement depuis l'onglet Actions) : le site se
   construit et se publie tout seul en 1-2 minutes. L'URL est donnée dans l'onglet **Pages** des
   paramètres du dépôt une fois le premier déploiement terminé.

## Structure

- `src/pages/` - une page par axe (présence, assistant, publication)
- `src/components/axe1|axe2|axe3/` - composants spécifiques à chaque axe
- `src/components/shell/` - sidebar, topbar, panneau de démonstration
- `src/components/ui/` - composants UI de base (style shadcn/ui)
- `src/data/` - données mockées et définitions des rôles
- `src/store/` - état global (rôle actif, scénarios de démo)
