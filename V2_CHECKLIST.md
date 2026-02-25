# V2 Enterprise Checklist — Alchimiste Créations

> Objectif : passer d’une V1 “site vitrine performant” à une V2 **architecture entreprise** : maintenable, testable, observable, scalable.

---

## 1) Vision d’architecture (target state)

- [x] Formaliser les principes d’architecture dans un ADR `docs/architecture/0001-principles.md`.
- [x] Définir les frontières : **Presentation / Application / Domain / Infrastructure**.
- [x] Adopter un style cible (modular monolith + clean architecture, adapté à Next.js App Router).
- [x] Définir les conventions de nommage (features, services, adapters, DTO, mappers).
- [x] Documenter les dépendances autorisées entre couches (règles d’import strictes).

---

## 2) Structure de code “entreprise”

- [x] Introduire une arborescence par **feature métier** + couches internes.
- [x] Isoler l’UI dans `src/presentation/*` (components, sections, views).
- [x] Déplacer la logique applicative dans `src/application/*` (use-cases, orchestrations).
- [x] Centraliser le métier dans `src/domain/*` (entités, value objects, règles).
- [x] Encapsuler I/O et providers dans `src/infrastructure/*` (CMS/API/email/analytics).
- [x] Créer `src/shared/*` pour primitives transverses (types, utils, constants).
- [x] Ajouter des “barrels” contrôlés pour exposer une API publique par module.

### Validation 1 & 2 (revue architecture)

- [x] Supprimer les doublons d'architecture (`src/features/catalog/*` miroir) au profit d'une source unique dans `src/application`, `src/domain`, `src/infrastructure`.
- [x] Aligner la structure avec l'audit : une organisation maintenable, lisible et conforme aux pratiques enterprise (single source of truth + dépendances explicites).

---

## 3) Séparation logique / UI (point critique)

- [x] Interdire les règles métier dans les composants React (lint rule + revue code).
- [x] Créer des hooks d’orchestration orientés use-case (`useLeadCapture`, etc.) sans logique d’accès data directe.
- [x] Introduire des services applicatifs purs testables (sans dépendance React).
- [x] Mettre des mappers DTO ↔ domain pour éviter le couplage format API/UI.
- [ ] Externaliser toutes les strings/copies dans un content layer versionné.
- [ ] Normaliser validation/sanitation via schémas (`zod`) côté serveur et client.

---

## 4) Contrats, types et qualité interne

- [ ] Définir des contrats d’interface par port (`LeadRepository`, `ProjectRepository`, etc.).
- [ ] Imposer `strict` TypeScript + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`.
- [ ] Créer un dossier `contracts/` pour DTO d’entrée/sortie par feature.
- [ ] Mettre en place validation runtime pour toutes les entrées externes.
- [ ] Documenter les erreurs métier (codes, messages, comportements attendus).

---

## 5) Data & contenu (scalable)

- [ ] Mettre en place un **content model** unique pour offres/projets/faq (schema-first).
- [ ] Découpler le contenu de l’UI (fichiers de contenu ou CMS headless selon roadmap).
- [ ] Standardiser les slugs, taxonomies, métadonnées SEO et images OG.
- [ ] Ajouter une stratégie de migration de contenu versionnée.
- [ ] Préparer l’internationalisation (même si mono-langue au lancement V2).

---

## 6) Front-end architecture & performance

- [ ] Revoir la stratégie Server Components / Client Components (client only si nécessaire).
- [ ] Créer une librairie interne de composants UI (tokens + variants + états).
- [ ] Introduire une design system doc minimale (`docs/ui-guidelines.md`).
- [ ] Limiter `priority` aux assets LCP critiques et définir une policy images.
- [ ] Mettre en place budgets perf (LCP, INP, CLS + JS bundle max).
- [ ] Ajouter des checks automatiques Lighthouse CI sur routes clés.

---

## 7) Sécurité & conformité (niveau pro)

- [ ] Implémenter headers sécurité (CSP, HSTS, X-Frame-Options, etc.).
- [ ] Ajouter rate-limiting et anti-spam sur formulaires (honeypot + server checks).
- [ ] Vérifier conformité RGPD : consentement, minimisation data, durée de rétention.
- [ ] Sécuriser secrets et variables d’environnement (rotation + scopes).
- [ ] Créer une checklist OWASP top 10 adaptée au projet.

---

## 8) Observabilité & exploitation

- [ ] Ajouter logs structurés corrélables (request-id, user-journey-id).
- [ ] Mettre en place monitoring erreurs (Sentry ou équivalent) par environnement.
- [ ] Exposer des métriques business : clic CTA, lead qualifié, conversion formulaire.
- [ ] Définir SLO simples (disponibilité, temps de réponse, taux erreur).
- [ ] Créer un runbook incidents (`docs/ops/runbook.md`).

---

## 9) CI/CD & gouvernance code

- [ ] Pipeline CI obligatoire : lint, typecheck, tests, build.
- [ ] Ajouter quality gates (coverage minimale sur couches domain/application).
- [ ] Mettre en place checks de dépendances (licences + vulnérabilités).
- [ ] Bloquer merge sans revues + templates PR standardisés.
- [ ] Ajouter conventions de commit (Conventional Commits) et changelog auto.

---

## 10) Stratégie de tests “entreprise”

- [ ] Tests unitaires : domain + application (règles métier et use-cases).
- [ ] Tests d’intégration : adapters infrastructure (email, forms, analytics).
- [ ] Tests E2E : parcours conversion (home → offre → contact/devis).
- [ ] Tests de non-régression visuelle sur composants critiques.
- [ ] Tests accessibilité automatisés (axe) + smoke clavier manuel.

---

## 11) SEO, A11y, CRO (industrialisation)

- [ ] SEO : robots/sitemap/canonicals/metadata standardisés par convention.
- [ ] SEO : templates JSON-LD par type de page (Service, FAQ, Project).
- [ ] A11y : pattern library conforme WCAG 2.2 AA.
- [ ] CRO : framework d’expérimentation (hypothèse, test, résultat, décision).
- [ ] Reporting mensuel : trafic qualifié, leads, taux de transfo, pages top.

---

## 12) Plan d’exécution V2 (roadmap)

### Phase 1 — Foundations (S1–S2)

- [ ] Architecture cible + ADR + structure dossiers.
- [ ] Strict TS + lint rules d’architecture + quality gates.
- [ ] Robots/sitemap/canonical/metadataBase + quick wins perf/a11y.

### Phase 2 — Core Refactor (S3–S5)

- [ ] Extraction logique métier vers application/domain.
- [ ] Mise en place ports/adapters + contrats + mappers.
- [ ] Refonte contenu vers content model unique.

### Phase 3 — Reliability & Growth (S6–S8)

- [ ] Observabilité complète + runbook + SLO.
- [ ] Sécurité renforcée + conformité RGPD outillée.
- [ ] Industrialisation tests (E2E + visuel + perf CI).

### Phase 4 — Scale (S9+)

- [ ] Design system consolidé + doc développeur.
- [ ] Optimisations SEO/CRO continues pilotées par data.
- [ ] Préparation multi-canal / multi-langue / CMS si besoin.

---

## 13) Definition of Done V2 (critères de sortie)

- [ ] Aucune logique métier directement dans les composants UI.
- [ ] Couverture tests domain/application conforme au seuil défini en CI.
- [ ] Pipeline CI vert obligatoire sur toutes les PR.
- [ ] KPI perf et conversion instrumentés et visibles.
- [ ] Documentation architecture + runbook + onboarding à jour.
- [ ] SEO indexable, a11y niveau AA, sécurité baseline validée.
