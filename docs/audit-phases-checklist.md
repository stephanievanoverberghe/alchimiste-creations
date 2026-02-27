# Audit global — Phases & checklist de suivi

> Objectif: avancer étape par étape sans tout corriger d’un coup.
>
> Ordre validé: **Architecture → UX → UI → Performance → Clean code → Responsive**.

## Statut global

- [x] Lancer la phase 1 (architecture)
- [x] Finaliser la phase 1 (architecture)
- [ ] Phase 2 (UX)
- [ ] Phase 3 (UI)
- [ ] Phase 4 (performance)
- [ ] Phase 5 (clean code)
- [ ] Phase 6 (responsive)

---

## Phase 1 — Architecture

### Déjà fait

- [x] Supprimer le faux hook `useHome` et simplifier l’entrée home (`homeContent` direct).
- [x] Corriger le nommage du hook roadmap `use-scroll-progress`.
- [x] Supprimer la dépendance inutilisée `tailwind-merge`.

### À faire (prochaine sous-étape)

#### Sous-phase 1.1 — Découpage de `home-architecture-section`

- [x] Isoler les données statiques (titres, descriptions, labels) dans un module dédié.
- [x] Extraire la logique de calcul (état / mapping / helpers) dans un hook local.
- [x] Garder le composant de section centré sur le rendu JSX.
- [x] Vérifier qu’aucune prop inutile n’est propagée entre sous-composants.

#### Sous-phase 1.2 — Réduction de duplication mobile/desktop

- [x] Créer un composant partagé `pillar-card` (ou équivalent) utilisé par les deux vues.
- [x] Conserver uniquement les variantes de layout dans les wrappers responsive.
- [x] Harmoniser les classes communes pour éviter les divergences futures.
- [x] Valider visuellement que le rendu reste identique avant/après.

#### Sous-phase 1.3 — Structure `features/home/*`

- [x] Introduire une arborescence claire: `features/home/sections`, `features/home/components`, `features/home/hooks`.
- [x] Déplacer progressivement les sections home existantes sans refactor massif en une fois.
- [x] Ajouter un fichier d’index par dossier pour fiabiliser les imports.
- [x] Vérifier les alias et chemins d’import après déplacement

#### Sous-phase 1.4 — Préparation du split CSS

- [x] Identifier dans `globals.css` les blocs relevant de `header`, `home`, `animations`.
- [x] Créer les nouveaux fichiers de style par domaine sans changer le comportement.
- [x] Brancher les imports dans le bon ordre pour conserver la cascade actuelle.
- [x] Laisser `globals.css` comme point d’entrée temporaire pendant la transition.

---

## Phase 2 — UX

- [ ] Réduire la home à 6 blocs max (priorité conversion).
- [ ] Revoir l’ordre narratif des sections.
- [ ] Simplifier la densité texte/infos par section.
- [ ] Clarifier les CTA principaux et secondaires.

---

## Phase 3 — UI

- [ ] Harmoniser la hiérarchie typographique (H1/H2/H3).
- [ ] Uniformiser les espacements verticaux/horizontaux.
- [ ] Réduire les répétitions visuelles (chips, badges, orbs, glow).
- [ ] Vérifier contraste et lisibilité (mobile et desktop).

---

## Phase 4 — Performance

- [ ] Délester/retarder le composant `AtomBackground`.
- [ ] Réduire l’hydration côté client quand possible.
- [ ] Passer les sections statiques en Server Components stricts.
- [ ] Introduire du dynamic import pour les blocs lourds.

---

## Phase 5 — Clean code

- [ ] Factoriser les classes utilitaires longues en constantes.
- [ ] Uniformiser les conventions de nommage (`useXxx` vs `getXxx`).
- [ ] Découper les composants > 150 lignes en sous-composants.
- [ ] Réduire les props trop denses.

---

## Phase 6 — Responsive

- [ ] Vérifier mobile-first section par section.
- [ ] Revalider breakpoints (`sm/md/lg`) sur composants critiques.
- [ ] Corriger les risques de débordement/CLS.
- [ ] Stabiliser grille + spacing sur mobile/tablette/desktop.

---

## Journal d’avancement

- **Sprint architecture #1**: nettoyage de base effectué (hook home, typo roadmap hook, dépendance inutile).
- **Sprint architecture #2**: phase 1.3 réalisée avec migration de la home vers `features/home/*` et sécurisation des imports via fichiers d’index.
- **Sprint architecture #3**: sous-phase 1.4 terminée avec split CSS par domaine (`header`, `home`, `animations`) et `globals.css` conservé comme point d’entrée.
- Prochaine action: démarrer la phase 2 (UX).
