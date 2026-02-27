# Phase 2.2 — Audit du parcours utilisateur (fil rouge narratif)

## Périmètre audité

- Home complète, dans l’ordre réel de lecture:
    1. Hero
    2. Qualification
    3. Proofs
    4. Architecture
    5. Process
    6. Offers
    7. Projects
    8. FAQ
    9. CTA final
- Objectif: vérifier la logique **problème → solution → preuve → offre → contact** et la continuité entre sections.

## Verdict rapide

- **Sous-phase 2.2: validée (diagnostic réalisé).**
- **Diagnostic “ok ?”**: **partiellement**.
    - La structure globale est bonne.
    - Le fil rouge existe, mais il n’est pas assez explicite dans les transitions de section.
    - Le visiteur comprend l’intention, mais pas toujours la progression en un seul regard.

## Cartographie section par section

| Section       | Intention utilisateur                                 | Action attendue                                | Risque identifié                                               |
| ------------- | ----------------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------- |
| Hero          | Comprendre en 5 secondes “pour qui / quoi / bénéfice” | Cliquer CTA principal ou continuer le scroll   | Densité de messages au-dessus de la ligne de flottaison        |
| Qualification | Se reconnaître dans les douleurs                      | Se dire “c’est mon cas” et poursuivre          | Répétition de promesses proches du hero                        |
| Proofs        | Être rassuré                                          | Valider la crédibilité et continuer            | Peut être perçu comme redondant avec Qualification             |
| Architecture  | Comprendre le “pourquoi ça marche”                    | Mémoriser la logique Attire/Convainc/Convertit | Positionnée tard: valeur stratégique parfois sous-exploitée    |
| Process       | Réduire l’incertitude                                 | Se projeter dans la collaboration              | Bon niveau de clarté, peu de friction                          |
| Offers        | Choisir une entrée adaptée                            | Identifier l’offre pertinente                  | Arrive après plusieurs messages convergents (fatigue possible) |
| Projects      | Vérifier la preuve terrain                            | Confirmer la confiance avant contact           | Placée tard, bénéfice preuve parfois retardé                   |
| FAQ           | Lever les objections finales                          | Dissiper les doutes restants                   | Correcte, rôle défensif bien tenu                              |
| CTA final     | Déclencher la prise de contact                        | Lancer la discussion                           | Dépend fortement de la clarté accumulée en amont               |

## Logique narrative actuelle

### Ce qui fonctionne

- L’ordre général suit la conversion (compréhension → confiance → passage à l’action).
- Les sections Process / Offers / FAQ soutiennent bien la décision finale.

### Ce qui casse le fil rouge

1. **Transitions implicites** entre les blocs (peu de formulations “étape suivante”).
2. **Redondance sémantique** autour de “clarté / confiance / action” dans plusieurs sections.
3. **Promesse du hero trop bavarde** pour un test 5 secondes strict.

## Décision UX

- Le diagnostic 2.2 est prêt et exploitable.
- Le besoin prioritaire est confirmé: **renforcer le fil rouge explicite entre sections**.
- Critère d’acceptation à viser: un visiteur doit pouvoir reformuler le parcours en 1 phrase après 5–8 secondes.

## Actions recommandées (priorisées)

1. **Hero ultra-court**: 1 promesse + 1 cible + 1 CTA au premier regard.
2. **Marquer la progression** avec des eyebrows orientés étapes (ex: “Étape 1”, “Étape 2”, etc.).
3. **Réduire les doublons** Qualification vs Proofs (reconnaissance vs preuve, rôles distincts).
4. **Rendre la continuité visible** dans les titres (chaînage lexical: comprendre → confiance → décision).
5. **Conserver FAQ + CTA final** comme fermeture de décision.

## Micro-copy de transition (proposition)

- Qualification: “Étape 1 — Clarifier votre message”
- Proofs: “Étape 2 — Prouver que ça fonctionne”
- Architecture: “Étape 3 — Structurer le parcours qui convertit”
- Process: “Étape 4 — Avancer simplement, étape par étape”
- Offers: “Étape 5 — Choisir l’accompagnement adapté”
- Projects: “Étape 6 — Voir des cas concrets”
- FAQ: “Dernière étape — Lever les derniers doutes”

## Statut de sortie

- ✅ Cartographie du parcours: faite.
- ✅ Logique narrative: évaluée.
- ✅ Ruptures de rythme: identifiées.
- ✅ Progression CTA principal/secondaire: vérifiée.
