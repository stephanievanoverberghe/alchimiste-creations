# 🌿 Alchimiste Créations

> Transformer les idées sensibles en expériences digitales vivantes.

Alchimiste Créations est un site vitrine conçu pour incarner l’univers de mon activité de développeuse web freelance.

J’y propose des sites sur-mesure pour les artistes, thérapeutes, entrepreneurs du cœur et structures engagées dans le vivant. Chaque projet est une rencontre, un espace digital pensé comme un prolongement de l’âme de la personne qui le porte.

Ce projet n’est pas seulement technique. Il est avant tout humain, sensible, intuitif. Il respecte une charte graphique douce, une voix éditoriale claire et un rythme de création fluide.

---

## ✨ Objectifs

-   Créer un espace digital aligné avec mon identité de créatrice
-   Structurer mes offres (packs, accompagnement)
-   Montrer mes projets avec sensibilité (portfolio vivant)
-   Offrir une expérience de navigation claire, intuitive et rassurante
-   Me connecter à mes futurs clients via une page de contact chaleureuse

---

## 🛠️ Stack technique

-   [Next.js 15 (App Router)](https://nextjs.org/)
-   [Tailwind CSS 4.1](https://tailwindcss.com/)
-   [Google Fonts via `next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
-   JSON local (fichiers dans `src/data/`) pour gérer les contenus dynamiques
-   Déploiement prévu sur [Vercel](https://vercel.com/)

---

## 🧱 Architecture du projet

```bash
src/
├── app/                    # Routage via App Router
│   ├── layout.tsx          # Layout global (Header, Footer)
│   ├── page.tsx            # Accueil
│   ├── a-propos/           # Page À propos
│   ├── offres/             # Offres & packs
│   ├── methode/            # Ma méthode
│   ├── projets/            # Portfolio
│   ├── projets/[slug]/     # Pages projet individuelles
│   └── contact/            # Page de contact
│
├── components/             # Composants réutilisables
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ProjectCard.tsx
│   ├── PackCard.tsx
│   └── ContactForm.tsx
│
├── data/                   # Contenus dynamiques en JSON
│   ├── projets.json
│   ├── packs.json
│   ├── temoignages.json
│   └── methode.json
│
├── lib/                    # Fonctions de lecture et utils
│   ├── getProjets.ts
│   ├── getPacks.ts
│   └── ...
│
└── assets/                 # Images et ressources visuelles
    └── images/
```

---

## 🎨 Identité graphique

-   **Couleurs** : ivoire, terracotta, sauge, or mat, ardoise
-   **Typographies** :
    -   **Titres** : Cormorant Garamond
    -   **Textes** : Raleway
-   **Ton de voix** : chaleureux, clair, incarné, sensible
-   **Charte** : présente dans `globals.css` via CSS variables (`@theme inline`)

---

## 📄 Pages

| Page     | URL               | Contenu principal                              |
| -------- | ----------------- | ---------------------------------------------- |
| Accueil  | `/`               | Slogan, intention, lien vers offres et projets |
| À propos | `/a-propos`       | WHY, vision, parcours, manifeste               |
| Offres   | `/offres`         | Présentation des 3 packs + options             |
| Méthode  | `/methode`        | Étapes de mon accompagnement fluide            |
| Projets  | `/projets`        | Portfolio vivant (données JSON)                |
| Projet   | `/projets/[slug]` | Page projet individuelle (route dynamique)     |
| Contact  | `/contact`        | Formulaire, zone libre, message doux           |

---

## 🚧 Statut actuel

-   ✅ Base technique posée (Next.js + Tailwind 4.1)
-   ✅ Charte graphique et éditoriale intégrée
-   ✅ Architecture fluide et modulaire créée
-   🔄 Contenus JSON en cours d’écriture
-   🔜 Composants dynamiques en développement

---

## 💡 Prochaines étapes

-   Génération dynamique du portfolio à partir de `projets.json`
-   Publication de la version 1 sur Vercel
-   Ajout futur d’un blog (`/carnet`) si besoin

---

## 📬 Contact

Projet créé par [@Alchimiste Créations](mailto:orangestreet@live.fr)  
Tu peux me retrouver sur Instagram ou LinkedIn.

---

## 📜 Licence

Projet personnel – Tous droits réservés.
