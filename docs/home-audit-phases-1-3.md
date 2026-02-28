# Audit Home — Phases 1, 2, 3

## 1) Résumé

- La Home respecte globalement la structure technique attendue (entrée simple, sections dédiées, import CSS par domaines).
- Le parcours principal est lisible (Hero → diagnostic → méthode → offres → preuves/projets → FAQ → CTA final), avec des CTA présents dès le Hero et en bas de page.
- L’axe de conversion est cohérent dans le wording: clarté du message, réassurance, prise de contact.
- En revanche, la phase 3 n’est pas considérée “OK” au sens checklist: plusieurs critères de sortie UI ne sont pas encore stabilisés.
- Les écarts majeurs observés concernent surtout la rationalisation visuelle (surcouche décorative répétée), l’hétérogénéité typographique intra-cartes, et des contrastes potentiellement limites sur petits textes.
- Côté architecture (phase 1), un écart reste visible: la structure `features/home/components` et `features/home/hooks` n’est pas matérialisée.
- Côté UX (phase 2), le fil narratif est solide mais la densité d’informations dans certaines sections peut ralentir la décision.
- Aucun blocage P0 technique critique identifié.
- Mais comme la checklist 3 n’est pas validée et que plusieurs P1 persistent, la décision est **NOGO phase 4**.
- Recommandation: finaliser les actions P1 UI/UX ci-dessous avant d’ouvrir la phase performance.

## 2) Phase 1 — Audit (Architecture)

### ✅ Points conformes

- Entrée Home simplifiée avec `homeContent` direct, sans faux hook intermédiaire.
- Nommage du hook roadmap cohérent (`use-scroll-progress`).
- Split CSS par domaines avec ordre d’import explicite dans `globals.css`.
- Les sections Home sont regroupées sous `features/home/sections` avec un index d’exports.

### ⚠️ Problèmes / écarts

- **Écart A1**: arborescence `features/home/components` et `features/home/hooks` non matérialisée (seul `sections/` existe).

### 🧩 Impact UX / conversion

- Faible impact direct conversion, mais impact moyen sur la vitesse d’itération UI (plus de friction pour maintenir la cohérence des sections).

### 🔧 Fix recommandé

- Créer `src/features/home/components` et `src/features/home/hooks` puis déplacer progressivement les sous-blocs/hook locaux réutilisables (sans refactor massif).

### 🧱 Priorité

- **P1**

### ⏱️ Estimation

- **M**

## 3) Phase 2 — Audit (UX)

### ✅ Points conformes

- Le Hero communique clairement cible + promesse + bénéfice + CTA dès le premier écran.
- Le parcours suit une logique convaincante: problème (diagnostic) → méthode (3 étapes) → offre → preuve (projets) → réassurance (FAQ) → CTA final.
- Plusieurs points de contact conversion sont présents (Hero, section diagnostic, offres, bloc contact projet, CTA final).
- La micro-copy est orientée action et rassurante (“Sans jargon”, “Appel découverte 20 min”, etc.).

### ⚠️ Problèmes / écarts

- **Écart U1**: surcharge informationnelle dans certaines cartes (diagnostic/méthode/projets) avec cumul titre + description + bullets + labels.
- **Écart U2**: redondance de promesse/CTA sur plusieurs blocs (clarifier message / prendre contact), ce qui peut lisser l’effet de progression.
- **Écart U3**: section projets mêle preuve + pré-CTA + ticker, ce qui concurrence légèrement l’attention portée aux cas clients.

### 🧩 Impact UX / conversion

- U1: augmente la charge cognitive et peut retarder la décision de cliquer sur un CTA.
- U2: réduit l’effet “montée en conviction” en donnant une impression de répétition.
- U3: diminue la lisibilité de la preuve principale, donc le pouvoir de réassurance avant conversion.

### 🔧 Fix recommandé

- U1: limiter à 1 idée forte + 2 bullets max par carte au-dessus de la ligne de flottaison de chaque bloc.
- U2: différencier le rôle de chaque CTA (découverte, qualification, passage à l’action final) avec micro-copy spécifique.
- U3: séparer visuellement le cas client (preuve) du pré-CTA contact (ou alléger ticker + bénéfices).

### 🧱 Priorité

- **P1**

### ⏱️ Estimation

- **M**

## 4) Phase 3 — Audit (UI)

### ✅ Points conformes

- Base typographique centralisée via tokens (`typography-h1/h2/h3/h4`, `typography-body-lg`).
- Rythme vertical global cadré par `Section` avec variable `--space-section-y`.
- États interactifs présents (hover/focus) sur cartes et éléments de navigation.

### ⚠️ Problèmes / écarts

- **Écart UI1 (hiérarchie typo)**: certains titres/labels de cartes utilisent des tailles utilitaires ad hoc (`text-lg`, `text-xl`, `text-xs`) au lieu d’une échelle stricte homogène.
- **Écart UI2 (espacements)**: nombreux espacements locaux (`mt-6`, `mt-7`, `p-5`, `p-6`, `p-8`, `md:p-10`) sans grille explicite unifiée par type de bloc.
- **Écart UI3 (rationalisation visuelle)**: répétition importante de décors (mesh/orb/glow/chips/ticker) sur presque chaque section.
- **Écart UI4 (lisibilité/contraste)**: plusieurs textes très petits (`~0.7rem`) en couleur mutée sur fonds translucides, potentiellement limites surtout mobile.

### 🧩 Impact UX / conversion

- UI1: brouille la lecture des niveaux d’importance et peut réduire la compréhension rapide.
- UI2: crée une sensation d’irrégularité visuelle qui affecte la perception de qualité.
- UI3: concurrence l’information clé, donc baisse possible de focalisation CTA.
- UI4: fatigue de lecture et risque d’abandon sur utilisateurs à vision/écrans contraints.

### 🔧 Fix recommandé

- UI1: imposer une matrice typographique unique par niveau (Hero/section/cartes/meta) et retirer les exceptions non justifiées.
- UI2: formaliser une grille d’espacement (ex. 4/6/8/12/16) et mapper chaque composant à un token.
- UI3: limiter à **1 effet décoratif dominant par écran** + standardiser badges/chips.
- UI4: augmenter taille minimale et contraste des textes critiques; valider les écrans Hero/Offres/CTA final en priorité.

### 🧱 Priorité

- **P1**

### ⏱️ Estimation

- **M**

## 5) Décision : GO/NOGO Phase 4

- **Décision: NOGO Phase 4**.
- Motif: bien qu’aucun P0 bloquant n’ait été identifié, la phase 3 n’est pas encore “OK” selon les critères de sortie checklist (hiérarchie stable, espacements homogènes, décor non dominant, lisibilité validée).

## 6) Todo list ordonnée + estimations

### P0

- Aucun.

### P1

1. Finaliser la sous-phase 3.1 (matrice typo unifiée Hero/Sections/Cartes) — **M**
2. Finaliser la sous-phase 3.2 (grille spacing + mapping tokens) — **M**
3. Finaliser la sous-phase 3.3 (réduction décors + normalisation badges/chips) — **M**
4. Finaliser la sous-phase 3.4 (contraste + lisibilité mobile sur écrans critiques) — **M**
5. Matérialiser `features/home/components` et `features/home/hooks` (cleanup architecture) — **M**
6. Réduire la densité informationnelle des cartes à fort volume (diagnostic, méthode, projets) — **M**

### P2

1. Ajustements fins de micro-copy CTA par section pour différencier chaque étape du funnel — **S**
2. Harmonisation secondaire des micro-interactions hover pour réduire l’effet “sur-animation” — **S**
