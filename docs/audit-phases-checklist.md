# Audit global — Phases & checklist de suivi

> Objectif: avancer étape par étape sans tout corriger d’un coup.
>
> Ordre validé: **Architecture → UX → UI → Performance → Clean code → Responsive**.

## Statut global

- [x] Lancer la phase 1 (architecture)
- [ ] Finaliser la phase 1 (architecture)
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

- [ ] Isoler les données statiques (titres, descriptions, labels) dans un module dédié.
- [ ] Extraire la logique de calcul (état / mapping / helpers) dans un hook local.
- [ ] Garder le composant de section centré sur le rendu JSX.
- [ ] Vérifier qu’aucune prop inutile n’est propagée entre sous-composants.

#### Sous-phase 1.2 — Réduction de duplication mobile/desktop

- [ ] Créer un composant partagé `pillar-card` (ou équivalent) utilisé par les deux vues.
- [ ] Conserver uniquement les variantes de layout dans les wrappers responsive.
- [ ] Harmoniser les classes communes pour éviter les divergences futures.
- [ ] Valider visuellement que le rendu reste identique avant/après.

#### Sous-phase 1.3 — Structure `features/home/*`

- [ ] Introduire une arborescence claire: `features/home/sections`, `features/home/components`, `features/home/hooks`.
- [ ] Déplacer progressivement les sections home existantes sans refactor massif en une fois.
- [ ] Ajouter un fichier d’index par dossier pour fiabiliser les imports.
- [ ] Vérifier les alias et chemins d’import après déplacement.

#### Sous-phase 1.4 — Préparation du split CSS

- [ ] Identifier dans `globals.css` les blocs relevant de `header`, `home`, `animations`.
- [ ] Créer les nouveaux fichiers de style par domaine sans changer le comportement.
- [ ] Brancher les imports dans le bon ordre pour conserver la cascade actuelle.
- [ ] Laisser `globals.css` comme point d’entrée temporaire pendant la transition.

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
- Prochaine action: découpage de la section architecture et réduction de la duplication mobile/desktop.
