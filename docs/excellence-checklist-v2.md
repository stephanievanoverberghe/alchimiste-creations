# Checklist Excellence V2 — Alchimiste Créations

## Architecture entreprise

- [ ] `src/domain`: entités, value objects, règles métier (sans dépendance framework).
- [ ] `src/application`: use-cases + view models (orchestration uniquement).
- [ ] `src/infrastructure`: repositories contenu, email provider, analytics, APIs externes.
- [ ] `src/presentation`: UI kit, sections, pages d’assemblage App Router.
- [ ] `src/shared`: utilitaires transverses, constantes, helpers typés.
- [ ] Single source of truth pour contenus (`src/content`) + parse runtime Zod.

## UX/CRO

- [ ] 1 objectif conversion par page.
- [ ] CTA primaire unique global: “Réserver un appel”.
- [ ] CTA secondaire cohérent: “Demander un devis”.
- [ ] Home en 7 blocs max, séquence logique problème → preuve → action.
- [ ] Microcopy de réassurance proche de chaque action.

## UI Premium

- [ ] Palette appliquée (terracotta, or, sauge, ivoire, brun).
- [ ] Typographies cohérentes (Cormorant + Raleway).
- [ ] Rythme visuel alterné (clair/sombre/accent).
- [ ] Cards, séparateurs, badges et CTA harmonisés.
- [ ] Motion discrète + respect `prefers-reduced-motion`.

## Accessibilité

- [ ] Skip link fonctionnel.
- [ ] Landmarks (`header`, `main`, `footer`).
- [ ] Focus visible partout.
- [ ] Formulaires avec labels explicites.
- [ ] Accordéons / interactions clavier.

## Performance

- [ ] Server Components par défaut.
- [ ] `use client` seulement quand nécessaire.
- [ ] Images avec `sizes`, `priority` réservé LCP.
- [ ] JS client minimal et découplé.

## SEO

- [ ] Metadata propre par page.
- [ ] OG / Twitter homogènes.
- [ ] `robots.ts` et `sitemap.ts` actifs.
- [ ] JSON-LD principal (Person/Service/FAQ/Breadcrumb).

## Pilotage PR

- [ ] PR1 Foundations (archi + tokens + content + Zod).
- [ ] PR2 Home/Offres/Méthode.
- [ ] PR3 Projets/About/Contact/FAQ.
- [ ] PR4 SEO/Perf/A11y + analytics évènementiel CTA.
