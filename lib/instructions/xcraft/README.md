## 🎯 Objectifs

- **Décrire le module** en détail : on doit comprendre à quoi il sert, comment il fonctionne, avec quoi il interagit.
- **Lister et décrire** toutes les variables d'environnement utilisées et/ou modifiées dans un tableau avec colonnes `Variable`, `Description`, `Exemple` et `Valeur par défaut`.
- **Décrire chaque acteur** (Elf) et son rôle dans le module.
- **Décrire chaque widget** (React) avec un exemple basé sur ses propriétés.

### Pour un acteur :

- Analyser en détail le **fonctionnement de l'acteur** (flux d'information, orchestration, etc.)
- Décrire le **modèle du state** en se basant sur les classes finissant par "State" et "Shape"
- Expliquer le **cycle de vie complet** de l'acteur (création, initialisation, destruction)
- Documenter les **événements publiés et souscrits** par l'acteur
- Générer une **vue d'ensemble** du module et son fonctionnement global

### Autres objectifs :

- Fournir des **exemples d'utilisation** concrets avec des cas pratiques.
- Documenter les **fonctions et méthodes publiques** avec leur signature, paramètres et valeurs de retour.
- Conserver les **liens hypertextes markdown** sur les autres modules tant que le module cité est encore utilisé dans le projet. Préférer les liens avec référence en bas du document.

### Mise à jour de documentation existante :

Si le contexte contient un **DOCUMENT précédent** marqué "## DOCUMENT précédent" :

- **Mettre à jour** le contenu markdown en effectuant une adaptation de la dernière génération
- **Ajouter** ce qui manque
- **Supprimer** ce qui n'existe plus
- **Corriger** ce qui a changé par rapport au code source
- **Indiquer** au bas du document qu'il s'agit d'une mise à jour (sans spécifier de date)

## 📑 Format attendu

Le document généré doit être en **Markdown** et suivre cette structure :

```markdown
# 📘 [nom-du-module]

## Aperçu

(Description concise du module et de son objectif principal)

## Sommaire

(Sommaire (liste à puces) de tous les chapitres de second niveau : `##`)

## Structure du module

(Expliquer brièvement l'architecture et les principaux modules, fonctions et acteurs)

## Fonctionnement global

(Explication détaillée du fonctionnement avec diagrammes si nécessaire)

## Exemples d'utilisation

(Montrer quelques cas d'utilisation avec les acteurs - préférer la qualité à la quantité)
(Faire attention à utiliser la syntaxe Goblin pour la création d'un acteur quand l'acteur n'est pas de type Elf)

## Interactions avec d'autres modules

(Comment ce module interagit avec le reste de l'écosystème Xcraft)

## Configuration avancée

(Si un fichier config.js est présent, présenter son contenu sous forme de tableau avec colonnes `Option`, `Description`, `Type`, `Valeur par défaut`)
(Supprimer cette section s'il n'y a pas de configuration avancée)

### Variables d'environnement

(Présenter sous forme de tableau avec colonnes `Variable`, `Description`, `Exemple`, `Valeur par défaut`)
(Supprimer cette section s'il n'y a pas de variables d'environnement)

## Détails des sources

(Ne pas lister le fichier config.js car il est déjà présenté dans le chapitre "Configuration avancée")

### `widget.js`

(Explication sur le comportement UI/UX du composant React avec un exemple d'utilisation très concis)

### `styles.js`

(Explication sur le style graphique du composant React)

### `actorName.js`

(Explication du rôle de l'acteur, son cycle de vie, ses méthodes publiques)

#### État et modèle de données

(Description du state de l'acteur et sa structure)

#### Méthodes publiques

Liste à puces ; pour chaque méthode, utiliser un format simple mais informatif :

- **`methodNameA(param1, param2=default)`** — Description détaillée de la méthode expliquant clairement son but et ses cas d'utilisation.
- **`methodNameB(param1)`** — Description similaire.

### `autre.js`

(Explication du rôle de ce fichier pour autant qu'il ne soit pas trivial)

### `shape.js`

(Explication des différents modèles de données exposés)

### Fichiers spéciaux (workers, backends, etc.)

(Explication du fonctionnement des fichiers spéciaux comme les workers, backends, etc.)
```

## Instructions spéciales par type de module

### Modules de backend

- Documenter en détail le **mécanisme de persistance/stockage**
- Expliquer les **formats de données** utilisés
- Décrire la **gestion des erreurs** et des cas particuliers
- Documenter les **performances attendues** et les limites

### Modules utilitaires

- Fournir des **exemples** pour chaque fonction principale
- Expliquer les **formats d'entrée/sortie** avec des exemples concrets
- Documenter les **cas limites** et comportements spéciaux

### Modules d'interface utilisateur

- Fournir un **exemple visuel** si possible (description textuelle)
- Documenter toutes les **props** avec leurs types et valeurs par défaut
- Expliquer le **rendu conditionnel** et les états possibles

### Modules d'orchestration ou de gestion d'acteurs

- Expliquer le **cycle de vie complet** des acteurs
- Documenter les **patterns de communication** entre acteurs
- Fournir des **diagrammes de séquence textuels** si nécessaire

## Points d'attention particuliers

- **Cohérence technique** : Vérifie que les explications techniques correspondent exactement à ce qui est dans le code source.
- **Profondeur vs Clarté** : Balance la profondeur technique avec la clarté pour des lecteurs de différents niveaux.
- **Exemples pratiques** : Les exemples doivent montrer des utilisations réelles, pas juste des appels API.
- **Modèles de données** : Documente précisément les structures de données à partir des shapes et du code source.
- **Documentation des erreurs** : Si le module comporte une gestion d'erreurs spécifique, documente-la.

## Optimisation des tableaux pour GitHub

Pour rendre les tableaux plus lisibles sur GitHub :

1. **Éviter les tableaux pour les descriptions complexes** : Au lieu d'utiliser un tableau avec de nombreuses colonnes pour documenter les méthodes, opter pour une structure en liste avec des titres en gras.

2. **Pour les tableaux de configuration** : Limiter la largeur des descriptions en utilisant des phrases concises ou en divisant les longues descriptions sur plusieurs lignes.

3. **Pour les énumérations longues** : Utiliser des listes à puces plutôt que d'énumérer dans une cellule de tableau.

## Règles de style et cohérence

- Utiliser des **termes cohérents** tout au long du document (Actor vs acteur, Widget vs widget)
- **Respecter la casse** des noms de modules, classes et méthodes
- **Utiliser des exemples réalistes** avec des noms de variables significatifs
- **Éviter les répétitions** entre sections
- **Maintenir un ton professionnel** mais accessible
