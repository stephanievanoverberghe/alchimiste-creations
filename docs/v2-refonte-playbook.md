# Alchimiste Créations — Plan V2 (UX, UI, conversion, architecture)

## 0) À supprimer / remplacer en priorité

### Doublons et patterns à nettoyer

- **Sections CTA dupliquées** (`home/CallToAction`, `offers/CallToAction`, `projects/CallToAction`, `about/CallToAction`, `contact/CallToAction`, `devis/CallToAction`) → remplacer par une primitive **`CtaBand`** unique paramétrable.
- **Variantes de listes FAQ dispersées** (`FaqBareList` + FAQ par page) → centraliser sur un composant `Accordion` accessible + data filtrée.
- **Hero non homogènes** (plusieurs implémentations avec styles hardcodés) → remplacer par `HeroShell` + variantes (`home`, `inner`, `offer`).
- **Copies dispersées entre `infrastructure/content/*.ts` et JSON** → migrer vers `src/content/*` + schémas Zod runtime.
- **Mise en page répétitive** (`PageWrapper`, paddings hardcodés page par page) → remplacer par primitives layout (`Section`, `Container`, `Stack`, `Grid`, `Cluster`, `Prose`).
- **Composants métier mélangés à la présentation** dans certaines pages → isoler les assemblages dans `src/presentation/pages/*` et use-cases dans `src/application/*`.

---

## A) Nouveau plan IA + wireframes textuels (objectif + CTA)

## Sitemap V2

- `/` Home
- `/offres`
- `/methode`
- `/projets`
- `/projets/[slug]`
- `/a-propos`
- `/contact`
- `/faq`
- `/mentions-legales`, `/politique-confidentialite`, `/cgu`, `/preferences-cookies`

## Wireframes (résumé)

### Home (7 blocs max)

1. **Hero** — promesse claire + CTA primaire `Réserver un appel`, secondaire `Demander un devis`.
2. **Problèmes fréquents** — frictions clients (site flou, message confus, manque de confiance).
3. **Offres (3 cards)** — Essentiel / Croissance / Signature avec “à partir de”.
4. **Méthode en 4 étapes** — découverte → direction → production → transmission.
5. **Preuves** — 2 projets + 2 citations.
6. **FAQ courte** — 4 questions conversion.
7. **CTA final** — rassurance + délais.

### Offres

- Intro + comparatif clair (prix de départ, délais, inclus).
- Détail des 3 packs (cards détaillées).
- Add-ons utiles (pas de surcharge).
- FAQ pack orientée objections.
- CTA final vers appel/devis.

### Méthode

- TL;DR process.
- Étapes et livrables.
- Rôles (vous / moi).
- Qualité (a11y, perf, SEO) sans jargon.
- CTA final.

### Projets

- Filtres simples par secteur/type.
- Grille bento de cas.
- Résultats concrets (avant/après, métriques).
- CTA vers contact.

### À propos

- Positionnement + valeurs.
- Parcours synthétique.
- “Pour qui / pas pour qui”.
- CTA relationnel.

### Contact

- Deux chemins: appel découverte / devis.
- Formulaire court (microcopy de confiance + RGPD).
- Alternatives de contact.
- FAQ ultra courte.

### FAQ

- Recherche + tags + accordéons accessibles.
- CTA final si question non couverte.

---

## B) Design system V2 + structure dossiers

## Tokens (source unique)

- Couleurs brand: `terracotta #A44B34`, `or #CA9D44`, `sauge #B0B985`, `ivoire #F8F4E9`, `brun #1B0A00`.
- Typo: `Cormorant Garamond` (titres), `Raleway` (texte).
- Radius: `12 / 20 / 28`.
- Ombres: `sm / md` (douces, premium).
- Espacements: échelle 4px.
- Motion: 150–300ms + fallback `prefers-reduced-motion`.

## UI Kit interne (`src/presentation/ui`)

- `Button` (primary/secondary/ghost, sm/md/lg)
- `Badge`
- `Card`
- `Heading`, `Text`
- `Input`, `Textarea`, `Select`
- `Accordion`
- `Tabs`
- `Modal`
- `Toast`
- `primitives/Section`, `Container`, `Stack`, `Cluster`, `Grid`, `Prose`

## Structure proposée

- `src/presentation/ui/*` → primitives + composants atomiques
- `src/presentation/sections/*` → blocs métiers de page
- `src/presentation/pages/*` → assemblage par route
- `src/application/*` → use-cases + orchestration VM
- `src/domain/*` → types métiers, règles invariantes
- `src/infrastructure/*` → providers (analytics, email, content repository)
- `src/shared/*` → utilitaires, constantes, types transverses

---

## C) Content layer + Zod

- Toutes les copies stratégiques dans `src/content/*.ts`.
- Validation runtime systématique via Zod (`packsSchema`, `projectsSchema`, `faqSchema`).
- Exposition via ViewModels dans `application` (ex: `getHomeVM`, `getOffersVM`).
- En cas d’échec parse: throw explicite au build/dev pour éviter publication de contenu cassé.

---

## D) Roadmap PR

1. **PR1 Foundations**
    - Dossiers cibles + primitives layout + Button/Card + content layer + Zod.
    - Risque: faible (peu de wiring).
2. **PR2 Home + Offres + Méthode**
    - Refonte UX/CRO complète de ces pages.
    - Risque: moyen (beaucoup de sections).
3. **PR3 Projets + About + Contact + FAQ**
    - Case study template + parcours conversion.
    - Risque: moyen.
4. **PR4 SEO/Perf/A11y + instrumentation**
    - metadata, JSON-LD, sitemap/robots, events CTA, polish global.
    - Risque: faible à moyen.

## Quick wins immédiats

- CTA primaire unique sur tout le site.
- Harmoniser Hero + spacing.
- Réduire la FAQ home à 4 entrées.
- Ajouter skip link global + focus visible standardisé.

---

## E) Checklist vérification (a11y/perf/seo/cro)

### A11y

- [ ] Skip link présent et visible au focus.
- [ ] Landmarks (`header`, `main`, `footer`) cohérents.
- [ ] Contrastes AA minimum.
- [ ] Accordéons clavier + `aria-expanded`.
- [ ] Champs form avec `label`, erreurs associées (`aria-describedby`).

### Perf

- [ ] Server Components par défaut.
- [ ] `use client` uniquement si nécessaire.
- [ ] Image LCP seule en `priority`.
- [ ] `sizes` défini sur images responsives.
- [ ] Motion légère et désactivable (`prefers-reduced-motion`).

### SEO

- [ ] Metadata page-level unique.
- [ ] OpenGraph/Twitter cohérents.
- [ ] `robots.ts` + `sitemap.ts` actifs.
- [ ] JSON-LD: `Service`, `FAQPage`, `BreadcrumbList`, `Person`/`LocalBusiness`.

### CRO

- [ ] Chaque page = 1 objectif conversion.
- [ ] CTA primaire constant: `Réserver un appel`.
- [ ] Microcopy de réassurance proche des formulaires.
- [ ] Preuves (résultats + témoignages) au-dessus de la ligne de flottaison sur Home/Offres.
