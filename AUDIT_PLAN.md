# Audit & Plan d'optimisation — Alchimiste Créations

_Date : 2026-02-25_

## Hypothèses de travail

- Le repo audité est la version active du site en pré-prod.
- Les performances Core Web Vitals n'ont pas été mesurées sur vraie prod pendant cet audit (audit statique + build/lint).
- La cible business prioritaire est : **demande de devis / prise d'appel découverte** pour des prestations **sites sur mesure**.

---

## 1) Pages actuelles & objectif de conversion

| Route                                                                                     | Rôle principal        | Objectif conversion                         | CTA attendu                                       |
| ----------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------- | ------------------------------------------------- |
| `/`                                                                                       | Home                  | Orienter vers offres + prise de contact     | « Voir offres », « Réserver un appel »            |
| `/offres`                                                                                 | Cataloguer les offres | Faire choisir une offre et déclencher devis | « Demander un devis »                             |
| `/offres/[slug]`                                                                          | Détail offre          | Lever les objections & qualifier le besoin  | « Devis pour cette offre »                        |
| `/methode`                                                                                | Crédibilité process   | Rassurer et réduire le risque perçu         | « Passer à l'appel/devis »                        |
| `/projets`                                                                                | Portfolio             | Preuve sociale + expertise                  | « Voir étude de cas » / « Me confier mon projet » |
| `/projets/[slug]`                                                                         | Étude de cas          | Conversion assistée par preuve concrète     | « Projet similaire » / « Contact »                |
| `/a-propos`                                                                               | Positionnement humain | Créer confiance et alignement               | « Voir offres » / « Contact »                     |
| `/contact`                                                                                | Conversion chaude     | Réserver appel / envoyer message            | Calendly + formulaire                             |
| `/devis`                                                                                  | Qualification rapide  | Capture de lead qualifié                    | Formulaire de devis                               |
| `/faq`                                                                                    | Lever objections      | Réduire friction avant contact              | « Une autre question ? »                          |
| Légal (`/mentions-legales`, `/cgu`, `/politique-confidentialite`, `/preferences-cookies`) | Conformité            | Rassurance & confiance                      | Navigation de retour                              |

---

## 2) Top 10 des problèmes (tech + contenu)

1. **Site globalement noindex** : `<meta name="robots" content="noindex, nofollow"` est injecté dans le layout global, ce qui bloque l'indexation SEO.
2. **SEO technique incomplet** : pas de `robots.ts`, pas de `sitemap.ts`, pas de pages image OG dédiées.
3. **Home et pages importantes en Client Components sans besoin fort** (`'use client'` + `useEffect(scrollTo)`), ce qui augmente JS hydraté.
4. **Surutilisation de `priority` sur `next/image`** (beaucoup de sections décoratives), ce qui peut dégrader LCP et réseau critique.
5. **Twitter image incohérente** : metadata référence `/images/og-default.jpg` alors que l'asset présent est `.png`.
6. **Base URL Vercel par défaut en dur** (`metadataBase`), fragile si domaine custom.
7. **Architecture contenus très couplée UI** : beaucoup de textes “inline” dans composants, maintenance/copywriting difficile à scaler.
8. **Duplication de patterns sections/CTA** (beaucoup de composants très proches), dette de maintenabilité.
9. **A11y perfectible** : pas de skip link global, structure landmarks améliorables, pages décoratives avec images prioritaires inutiles.
10. **Positionnement conversion dispersé** : discours riche mais parfois peu direct sur la promesse business et le "pour qui / pour quel résultat".

---

## 3) Audit technique détaillé

### A. Architecture & codebase

#### Constat

- Arborescence propre App Router (`src/app`, `src/components`, `src/lib`, `src/data`).
- Bonne séparation "sections" par page mais très volumineuse côté composants.
- Data locale JSON (`packs`, `projects`, `faq`) = simple et robuste pour V1.
- Manque une couche "content model" (types Zod/TS stricts + dictionnaire central) pour éviter divergence copy et duplications.
- Styles globalement cohérents via variables CSS (`globals.css`) + Tailwind, mais design tokens peu documentés.

#### Checklist d'actions

##### Quick wins (1–2h)

1. **Retirer noindex global + contrôler par environnement**

- Pourquoi : empêche le ranking.
- Impact : SEO critique immédiat.
- Fichiers : `src/app/layout.tsx`.
- Risques : indexation de pages non prêtes si pas de garde-fou.

2. **Corriger metadata Twitter image (.png)**

- Pourquoi : éviter preview cassée.
- Impact : SEO social / CTR partage.
- Fichiers : `src/app/layout.tsx`.
- Risques : faible.

3. **Ajouter skip link + `id="main-content"`**

- Pourquoi : navigation clavier rapide.
- Impact : a11y + UX.
- Fichiers : `src/components/PageWrapper.tsx`, `src/app/globals.css`.
- Risques : très faible.

4. **Retirer `priority` des images purement décoratives hors above-the-fold**

- Pourquoi : réduire contention réseau LCP.
- Impact : perf (LCP/TBT indirect).
- Fichiers : sections `src/components/sections/**`.
- Risques : faible (attention à la hero seulement).

##### Mid (1–2 jours)

5. **Passer les pages statiques en Server Components**

- Pourquoi : réduire JS client et hydratation.
- Impact : perf + maintenabilité.
- Fichiers : `src/app/page.tsx`, `src/app/offres/page.tsx`, `src/app/methode/page.tsx`, `src/app/a-propos/page.tsx` + sections dépendantes.
- Risques : moyen (éviter de casser interactions).

6. **Centraliser contenus éditoriaux dans `src/content/`**

- Pourquoi : itération copy/SEO plus rapide, réduction duplications.
- Impact : maintenabilité + cohérence brand.
- Fichiers : nombreux composants sections + nouveaux fichiers `src/content/*.ts`.
- Risques : moyen (refacto transversal).

7. **Créer stratégie metadata par page (title/description/canonical/OG)**

- Pourquoi : meilleure couverture SEO page-level.
- Impact : SEO on-page fort.
- Fichiers : toutes pages `src/app/**/page.tsx`.
- Risques : faible.

##### Bigger refactors (1 semaine)

8. **Refondre architecture en couches `content -> view-model -> ui`**

- Pourquoi : clarifier responsabilités, limiter composants “fourre-tout”.
- Impact : maintenabilité long terme.
- Fichiers : `src/components/sections/**`, `src/lib/**`.
- Risques : moyen/élevé (volume).

9. **Système design tokens + primitives UI**

- Pourquoi : homogénéité et vitesse de prod des nouvelles pages.
- Impact : qualité visuelle + productivité.
- Fichiers : `globals.css`, composants UI partagés.
- Risques : moyen.

10. **Templates contenus scalables (services, case studies, FAQ SEO)**

- Pourquoi : croissance SEO éditoriale.
- Impact : acquisition organique.
- Fichiers : nouvelles routes + modèles de données.
- Risques : moyen (nécessite discipline contenu).

---

### B. Performance (CWV)

#### Suspects LCP / CLS / INP

- **LCP** : hero image full-screen + overlay + multiples images `priority` concurrentes.
- **CLS** : sections riches si dimensions non explicites (à vérifier sur run Lighthouse).
- **INP** : pages très client-side + composants interactifs lourds (filtres, modal, formulaires).

#### Plan perf actionnable

1. **Réduire JS client** : retirer `use client` quand possible.
2. **Hiérarchiser images critiques** : 1 seule image prioritaire par page (hero), le reste lazy.
3. **Vérifier `sizes` partout pour `fill`** : éviter sur-download mobile.
4. **Limiter animations continues** (scan line hero) avec `prefers-reduced-motion` déjà partiel, compléter throttling.
5. **Stabiliser polices** : conserver `next/font`, prévoir fallback local si build offline CI.
6. **Caching/revalidation** : pages data JSON peuvent rester statiques (`dynamic` seulement si nécessaire). Éviter `force-dynamic` hors besoin réel.

#### Mesure recommandée

- Lighthouse : mobile, 3 runs/page prioritaire (`/`, `/offres`, `/contact`, `/projets/[slug]`).
- WebPageTest : TTFB + filmstrip + LCP element.
- DevTools Performance : interaction menu mobile + formulaire contact.
- `next build --analyze` (si besoin plugin) ou comparaison bundle via traces Next.

---

### C. Accessibilité (a11y)

#### Checklist

- [ ] 1 seul H1 par page (OK via Hero) + hiérarchie H2/H3 à valider section par section.
- [ ] Ajouter skip link global vers `<main>`.
- [ ] Vérifier focus visible sur tous les liens CTA (globalement bon mais à tester clavier complet).
- [ ] Vérifier contraste sur fonds images (hero texte blanc sur image).
- [ ] Formulaires contact/devis : labels explicites, erreurs associées (`aria-describedby`) et message succès lisible SR.
- [ ] Landmarking complet : `header`, `main`, `footer`, `nav` (présent mais uniformiser).
- [ ] Éviter ARIA superflue, garder seulement utile.

#### Corrections concrètes

- Ajouter composant `SkipLink`.
- Normaliser pattern champ formulaire (`id`, `htmlFor`, `aria-invalid`, `aria-live="polite"`).
- Tester navigation 100% clavier sur menu mobile + modale succès contact.

---

### D. SEO irréprochable

#### Audit synthétique

- Metadata globale présente mais hétérogène selon pages.
- Canonical partiel (pas partout).
- OG présent globalement, mais pas systématique sur pages clés.
- Pas de `robots`/`sitemap` générés via App Router.
- Pas de schémas structurés complets sur home/services/about/case studies.
- Maillage interne déjà présent, mais peut être mieux orienté autour des pages services intentionnelles.

#### 1) Mots-clés cibles par page

| Page                                       | Primaire                             | Secondaires                                                |
| ------------------------------------------ | ------------------------------------ | ---------------------------------------------------------- |
| `/`                                        | création site web sur mesure         | développeuse web freelance, site vitrine pro, Lille        |
| `/offres`                                  | offres création site web freelance   | landing page premium, site vitrine sur mesure, refonte SEO |
| `/offres/landing-page-premium` (future)    | landing page premium                 | page de vente, conversion, webdesign                       |
| `/offres/site-vitrine-sur-mesure` (future) | site vitrine sur mesure              | site professionnel, visibilité locale                      |
| `/offres/refonte-ui-perf-seo` (future)     | refonte site web SEO performance     | Core Web Vitals, optimisation Next.js                      |
| `/methode`                                 | méthode création site web            | process freelance, accompagnement projet web               |
| `/projets`                                 | portfolio développeuse web freelance | études de cas web, réalisations Next.js                    |
| `/a-propos`                                | développeuse front-end freelance     | freelance Next.js, Lille                                   |
| `/contact`                                 | devis site web freelance             | appel découverte, estimation projet web                    |
| `/faq`                                     | FAQ création site web                | tarifs site internet, délais création site                 |

#### 2) Optimisations techniques (fichiers précis)

- `src/app/layout.tsx` : robots, metadataBase env, OG/Twitter cohérents.
- `src/app/robots.ts` (à créer) : directives indexation + sitemap URL.
- `src/app/sitemap.ts` (à créer) : routes statiques + dynamiques projets/offres.
- `src/app/**/page.tsx` : metadata spécifique + canonical systématique.
- `src/components/sections/**` : internal linking contextuel vers offres/services.
- `src/data/faq.json` + rendu FAQ : JSON-LD FAQPage sur pages pertinentes.

#### 3) Plan de contenu minimal pour rank

- **Pages services dédiées** (3 max, orientées intention).
- **1 page process** (déjà présente, à optimiser mot-clé + preuves).
- **1 page portfolio listing + 3 études de cas détaillées minimum**.
- **FAQ business** (8–12 questions stratégiques).
- **Page À propos crédibilité** (expertise, limites, méthode, stack).

---

## 4) Refonte contenu (copywriting prêt à coller)

### A. Hero — 3 variantes

#### Variante courte

**Titre** : _Des sites web sur mesure, clairs et performants._
**Sous-titre** : _Je conçois des sites vitrines premium accessibles, pensés pour convertir sans surpromesse._
**CTA** : _Demander un devis_

#### Variante story

**Titre** : _Ton activité mérite un site qui inspire confiance dès la première minute._
**Sous-titre** : _Je transforme ton expertise en expérience web fluide : design soigné, structure claire, base SEO solide, accompagnement humain._
**CTA** : _Réserver un appel découverte_

#### Variante directe

**Titre** : _Freelance Next.js / WordPress : je crée ton site sur mesure en 2 à 6 semaines._
**Sous-titre** : _Objectif : plus de demandes qualifiées, avec un site rapide, propre et maintenable._
**CTA** : _Voir les offres_

### B. Structure recommandée par page

#### Accueil

1. Hero (promesse + CTA double)
2. Problèmes clients fréquents (avant/après)
3. 3 offres (cards comparables)
4. Process en 4 étapes
5. Preuves (études de cas + témoignages)
6. FAQ courte
7. CTA final

#### Services

- Intro claire (pour qui / pour quoi)
- 3 offres max (comparateur)
- Inclus / exclus / délais / budget
- FAQ liée aux offres
- CTA devis

#### Process

- Étapes (Cadrage → Design → Dev → QA → Lancement)
- Livrables précis par étape
- Délais type
- Responsabilités client/freelance

#### Portfolio / études de cas

Template :

- Contexte
- Objectifs
- Périmètre
- Solution
- Résultats (métriques si possible)
- Ce qui a été appris
- CTA projet similaire

#### À propos

- Positionnement
- Ce que tu fais / ne fais pas
- Pourquoi cette méthode
- Stack et niveau de maîtrise
- CTA contact

#### Contact

- Promesse de réponse (24–48h)
- Choix appel / formulaire
- Microcopy rassurante (pas de spam)
- FAQ courte de friction

### C. Offres réalistes (junior+ crédible)

#### 1) Landing page premium

- **Inclus** : 1 page, structure conversion, design personnalisé, responsive, SEO on-page de base, formulaire.
- **Exclus** : multilingue complexe, e-commerce complet, tunnel avancé.
- **Fourchette** : **900€–1 600€**.
- **Délai** : **2–3 semaines**.
- **Livrables** : maquette validée, page intégrée, mise en ligne, mini guide prise en main.

#### 2) Site vitrine sur mesure

- **Inclus** : 4–8 pages, architecture contenu, design système léger, SEO technique de base, performances propres.
- **Exclus** : marketplace, fonctionnalités métier complexes.
- **Fourchette** : **1 800€–3 500€**.
- **Délai** : **4–7 semaines**.
- **Livrables** : pages livrées, check QA, documentation, support lancement.

#### 3) Refonte UI + perf + SEO

- **Inclus** : audit, priorisation quick wins, refonte UI ciblée, optimisation CWV, metadata/schema, maillage interne.
- **Exclus** : refonte branding complète si non prévue.
- **Fourchette** : **1 200€–2 800€** selon périmètre.
- **Délai** : **2–5 semaines**.
- **Livrables** : rapport avant/après, backlog appliqué, score Lighthouse amélioré, plan de suite.

### D. FAQ conversion (10 Q/R)

1. **Combien coûte un site sur mesure ?**
    - Réponse : fourchettes transparentes + devis ajusté au périmètre.
2. **Proposes-tu des paiements en plusieurs fois ?**
    - Oui, échéancier simple défini au devis.
3. **Quels sont les délais ?**
    - 2 à 7 semaines selon l'offre et la disponibilité contenus.
4. **Est-ce que le SEO est inclus ?**
    - SEO technique de base inclus, stratégie avancée en option.
5. **Qui rédige les textes ?**
    - Le client fournit la matière, accompagnement à la structuration.
6. **Qui gère l'hébergement et le nom de domaine ?**
    - Accompagnement possible, propriété finale côté client.
7. **Le site m'appartient-il ?**
    - Oui, propriété transférée à paiement final.
8. **Y a-t-il de la maintenance ?**
    - Support lancement inclus puis forfait à la demande.
9. **Combien de retours sont prévus ?**
    - 1 à 3 boucles selon l'offre, définies dès le départ.
10. **Et si mon besoin évolue en cours de projet ?**

- Ajustement via avenant simple (coût/délais transparents).

---

## 5) Plan d'implémentation (mode entreprise)

### Step 0 — Baseline métriques (0,5 j)

- Captures Lighthouse (mobile/desktop) sur pages clés.
- Export Search Console / indexation actuelle.
- Mesure taux conversion actuel (contact/devis).
- Dépendances : aucune.

### Step 1 — SEO technique critique (0,5–1 j)

- Retirer noindex global.
- Ajouter `robots.ts` + `sitemap.ts`.
- Harmoniser metadata/canonical/OG/Twitter.
- Dépendance : Step 0.

### Step 2 — Perf quick wins (1 j)

- Diminuer `priority` images.
- Réduire Client Components inutiles.
- Vérifier `dynamic` (garder uniquement nécessaire).
- Re-mesure Lighthouse.
- Dépendance : Step 1 recommandé.

### Step 3 — Refactor architecture (2–4 j)

- Externaliser copy dans `src/content/`.
- Créer modèles de contenu typés.
- Rationaliser sections CTA/FAQ dupliquées.
- Dépendance : Step 2.

### Step 4 — Contenu + conversion (1–2 j)

- Intégrer nouvelle proposition de valeur.
- Structurer pages services/process/contact.
- Uniformiser microcopy CTA et rassurance.
- Dépendance : Step 3.

### Step 5 — Schema + FAQ + maillage (1 j)

- Ajouter JSON-LD (`LocalBusiness`, `Person`, `Service`, `FAQPage`, `BreadcrumbList`).
- Renforcer maillage vers pages services + cas clients.
- Relecture SEO finale + validation indexabilité.
- Dépendance : Step 4.

---

## 6) Arborescence cible (proposée)

```bash
src/
  app/
    (marketing)/
      page.tsx
      offres/
        page.tsx
        landing-page-premium/page.tsx
        site-vitrine-sur-mesure/page.tsx
        refonte-ui-perf-seo/page.tsx
      methode/page.tsx
      projets/page.tsx
      projets/[slug]/page.tsx
      a-propos/page.tsx
      contact/page.tsx
      devis/page.tsx
      faq/page.tsx
    robots.ts
    sitemap.ts
    layout.tsx
  content/
    home.ts
    offers.ts
    process.ts
    about.ts
    contact.ts
    faq.ts
  lib/
    seo/
      metadata.ts
      schema.ts
    content/
      mappers.ts
  components/
    ui/
    sections/
```

---

## 7) Ordre recommandé des prochaines PR

1. **PR#1 SEO critique** : noindex, robots, sitemap, metadata coherence.
2. **PR#2 Performance rapide** : images priority + server components.
3. **PR#3 Accessibilité globale** : skip link, forms feedback, focus paths.
4. **PR#4 Refonte contenu conversion** : hero + services + contact + FAQ.
5. **PR#5 Schema + maillage + finitions**.
