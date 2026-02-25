# ADR 0001 — Principes d’architecture V2

- **Statut** : Accepted
- **Date** : 2026-02-25
- **Contexte** : migration de la V1 vers une V2 "architecture entreprise" sur Next.js App Router.

## Décision

Nous adoptons un **modular monolith** avec une **Clean Architecture adaptée à Next.js**.

> Règle d'implémentation : **pas de doublons structurels entre couches globales et features**. Une responsabilité ne doit exister qu'à un seul endroit (single source of truth) pour éviter les miroirs `src/features/*` ↔ `src/{application,domain,infrastructure}/*`.

### Couches cibles

1. **Presentation** (`src/presentation/*`, `src/app/*`)
    - Responsabilité : rendu UI, routing, composition, accessibilité.
    - Interdit : règles métier, appels directs à des providers externes.

2. **Application** (`src/application/*`)
    - Responsabilité : orchestration de use-cases, coordination des ports, transformations orientées flux applicatif.
    - Dépend de : `domain`, `shared`.

3. **Domain** (`src/domain/*`)
    - Responsabilité : règles métier pures, entités, value objects, invariants.
    - Dépend de : `shared` uniquement.

4. **Infrastructure** (`src/infrastructure/*`)
    - Responsabilité : implémentation des adapters techniques (API, email, analytics, stockage, CMS).
    - Dépend de : `application` (ports), `domain`, `shared`.

5. **Shared** (`src/shared/*`)
    - Responsabilité : primitives transverses stables (types, constants, utilitaires purs).

## Frontières et dépendances autorisées

Règle générale : dépendances **vers l’intérieur** et jamais l’inverse.

| From             | Peut importer                             | Ne peut pas importer                                                           |
| ---------------- | ----------------------------------------- | ------------------------------------------------------------------------------ |
| `presentation`   | `application`, `shared`                   | `infrastructure`, `domain` direct (sauf types read-only explicitement exposés) |
| `application`    | `domain`, `shared`                        | `presentation`, `infrastructure` concret                                       |
| `domain`         | `shared`                                  | `application`, `presentation`, `infrastructure`                                |
| `infrastructure` | `application` (ports), `domain`, `shared` | `presentation`                                                                 |
| `shared`         | (aucun module métier)                     | `presentation`, `application`, `domain`, `infrastructure`                      |

> Implémentation attendue : règles d’import strictes via ESLint (phase suivante), avec exception explicite et documentée si nécessaire.

## Style d’organisation des modules

Nous retenons un style **layer-first avec sous-dossiers métier** :

- `src/application/<feature>/...`
- `src/domain/<feature>/...`
- `src/infrastructure/<feature>/...` (ou `content/` si provider local transverse)
- `src/presentation/...`

Les modules exposent une **API publique minimale** via un barrel `index.ts`, sans ré-export en cascade depuis une architecture parallèle.

## Conventions de nommage

- **Feature** : `kebab-case` (`lead-capture`, `project-showcase`)
- **Use-case** : verbe d’action (`createLead.ts`, `qualifyLead.ts`)
- **Service applicatif** : suffixe `Service` (`LeadQualificationService`)
- **Port (interface)** : suffixe `Port` ou `Repository` (`LeadRepositoryPort`)
- **Adapter infra** : préfixe du provider (`ResendLeadRepository`)
- **DTO** : suffixe `Dto` (`CreateLeadInputDto`, `LeadViewDto`)
- **Mapper** : suffixe `Mapper` (`LeadDtoMapper`)

## Conséquences

### Bénéfices

- Réduction du couplage UI ↔ métier.
- Testabilité élevée des couches `domain`/`application`.
- Facilité d’évolution (nouveaux providers sans impacter les use-cases).

### Coûts

- Plus de structure initiale et discipline d’architecture.
- Besoin de règles lint/CI pour éviter les régressions de frontières.

## Plan d’application incrémental

1. Créer l’arborescence cible (`src/presentation`, `src/application`, `src/domain`, `src/infrastructure`, `src/shared`).
2. Migrer une première feature pilote (`lead-capture`) pour valider le modèle.
3. Activer les règles ESLint de dépendances inter-couches.
4. Étendre progressivement aux autres features.
