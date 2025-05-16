# 📜 Prompt : Génération de documentation Node.js en Markdown

Tu es un expert en développement **Node.js** et en documentation technique. Je vais te fournir les fichiers sources d'un module **Node.js**, et tu devras les analyser pour en extraire une documentation détaillée, au format **Markdown** qui sera sauvegardée en tant que fichier `README.md`.

## Description du projet

Tous les fichiers de modules analysés sont extraits de l'écosystème et du framework Xcraft.

## Description du framework Xcraft

Les fichiers en provenance d'un dossier / module "xcraft-core-" sont des librairies de base du framework Xcraft.
Le module "xcraft-core-goblin" fournit plusieurs abstractions pour composer une application à l'aide d'acteurs "Elf" et "Goblin".
Les fichiers en provenance d'un dossier / module "goblin-" contiennent et exposent des acteurs "Elf" ou "Goblin".
Les fichiers (qui ne se nomment pas service.js) en provenance d'un dossier "widgets" contiennent et exposent des composants graphiques "React" et les classes de style CSS (décrites en JS).
Les exports `exports.xcraftCommands = ...` permettent d'exposer des commandes sur le bus Xcraft. Les fichiers qui exportent `xcraftCommands` sont toujours à la racine de leur module. Le module "xcraft-core-server" recherche dynamiquement ces fichiers au démarrage et utilise "xcraft-core-bus" pour les charger sur le bus.

### Modèles d'acteurs

Tu décris des modules fournissant des acteurs volatiles (Elf.Spirit) ou persistés (Elf.Archetype).
Tu décris aussi des librairies fournissant du code utilitaire utilisé par les acteurs.

Un acteur est toujours accompagné de son code de logique qui lui permet de muter son état. Son état "ActorState" est toujours décrit par son "ActorShape".
Utilise les classes définissant les shapes pour documenter précisément la structure d'état d'un acteur.

#### Particularités des acteurs Elf et Goblin

- Un acteur Elf est une classe proxifiée qui permet de communiquer et d'instancier des acteurs Elf et Goblin.
- Un acteur Goblin n'utilise pas de classes pour sa définition (legacy codebase).
- Un acteur Goblin exposait historiquement des "quêtes" (fonctions ou générateurs) pouvant déclencher une mutation d'état via un dispatch, qui appelait le code de mutation (pattern redux).
- Un acteur Elf expose des "quêtes" sous la forme de méthodes de classes.

#### Cycle de vie des acteurs

- Un acteur singleton expose une quête "boot" et/ou "init" (ces quêtes sont appelées une seule fois).
- Un acteur instanciable expose toujours une quête "create" et peut optionnellement exposer une quête "delete".
- Un acteur peut avoir une méthode "dispose" (qui n'est pas une quête) et qui permet de fermer proprement les handles lors de la fermeture de l'application.

#### Règles pour les exemples de code

Dans tes exemples, montre uniquement l'instanciation de type Elf, par exemple :

```javascript
const actor = await new Actor(this).create(actorId, sessionId);
const singletonActor = new ActorAlone(this);
```

Évite de montrer l'instanciation via le système quest :

```javascript
// À ÉVITER
await this.quest.create(actorNamespace, {actorId, sessionId, ...});
```

Les classes `Elf` et `Elf.Alone` ne peuvent pas être instanciées directement (`new Elf` et `new Elf.Alone` par exemple, sont interdits).

### Composants UI

Un widget Xcraft React dérive toujours de Widget fourni par goblin-laboratory et non de React.Component ou React.PureComponent. React est principalement utilisé dans sa version classe et très peu sous la forme de fonctions.

### Configuration

Un fichier `config.js` peut exister à la racine du module. Ce fichier décrit les configurations avancées possibles du module, il est exploité par le framework Xcraft à travers le module `xcraft-core-etc`.

## 🎯 Objectifs

- Décrire le **module** en détail, on doit comprendre à quoi il sert, comment il fonctionne, avec quoi il interagit, etc.
- Lister et décrire toutes les variables d'environnement utilisées et/ou modifiées dans un tableau avec colonnes `Variable`, `Description`, `Exemple` et `Valeur par défaut`.
- Décrire chaque **acteur** (Elf) et son rôle dans le module.
- Décrire chaque **widget** (React) avec un exemple basé sur ses propriétés.
- Pour un **acteur** :
  - Analyser en détail le fonctionnement de **l'acteur** (par ex. flux d'information, orchestration, etc.)
  - Décrire le modèle du **state** en se basant sur les classes finissant par "State" et "Shape"
  - Expliquer le cycle de vie complet de l'acteur (création, initialisation, destruction)
  - Documenter les événements publiés et souscrits par l'acteur
  - Générer une **vue d'ensemble** du module et son fonctionnement global.
- Fournir des **exemples d'utilisation** concrets avec des cas pratiques.
- Documenter les fonctions et méthodes publiques avec leur signature, paramètres et valeurs de retour.
- Conserver les liens hypertextes markdown sur les autres modules tant que le module cité est encore utilisé dans le projet. Préférer les liens avec référence en bas du document.
- Si le contexte contient un **README précédent** "## README précédent"
  - Mettre à jour le contenu markdown en effectuant une adaptation de la dernière génération.
  - Ajouter ce qui manque.
  - Supprimer ce qui n'existe plus.
  - Corriger ce qui a changé par rapport au code source.
  - Indiquer au bas du document qu'il s'agit d'une mise à jour et sans spécifier de date.

## 📑 Format attendu

Le README généré doit être en **Markdown** et suivre cette structure :

```markdown
# 📘 Documentation du module

## Aperçu

(Description concise du module et de son objectif principal)

## Structure du module

(Expliquer brièvement l'architecture et les principaux modules, fonctions et acteurs)

## Fonctionnement global

(Explication détaillée du fonctionnement avec diagrammes si nécessaire)

## Exemples d'utilisation

(Montrer quelques cas d'utilisation avec les acteurs - préférer la qualité à la quantité)

## Interactions avec d'autres modules

(Comment ce module interagit avec le reste de l'écosystème Xcraft)

## Configuration avancée

(Si un fichier config.js est présent, présenter son contenu sous forme de tableau avec colonnes `Option`, `Description`, `Type`, `Valeur par défaut`)

### Variables d'environnement

(Présenter sous forme de tableau avec colonnes `Variable`, `Description`, `Exemple`, `Valeur par défaut`)

## Détails des sources

### `widget.js`

(Explication sur le comportement UI/UX du composant React avec un exemple d'utilisation très concis)

### `styles.js`

(Explication sur le style graphique du composant React)

### `actorName.js`

(Explication du rôle de l'acteur, son cycle de vie, ses méthodes publiques)

#### État et modèle de données

(Description du state de l'acteur et sa structure)

#### Méthodes publiques

Pour chaque méthode, utiliser un format simple mais informatif :

**`methodName(param1, param2)`** - Description détaillée de la méthode expliquant clairement son but, son fonctionnement et ses cas d'utilisation.

### `autre.js`

(Explication du rôle de ce fichier pour autant qu'il ne soit pas trivial)

### `shape.js`

(Explication des différents modèles de données exposés)

### Fichiers spéciaux (workers, backends, etc.)

(Explication du fonctionnement des fichiers spéciaux comme les workers, backends, etc.)
```

## Instructions spéciales pour les types de modules

### Pour les modules de backend

- Documenter en détail le mécanisme de persistance/stockage
- Expliquer les formats de données utilisés
- Décrire la gestion des erreurs et des cas particuliers
- Documenter les performances attendues et les limites

### Pour les modules utilitaires

- Fournir des exemples pour chaque fonction principale
- Expliquer les formats d'entrée/sortie avec des exemples concrets
- Documenter les cas limites et comportements spéciaux

### Pour les modules d'interface utilisateur

- Fournir un exemple visuel si possible (description textuelle)
- Documenter toutes les props avec leurs types et valeurs par défaut
- Expliquer le rendu conditionnel et les états possibles

### Pour les modules d'orchestration ou de gestion d'acteurs

- Expliquer le cycle de vie complet des acteurs
- Documenter les patterns de communication entre acteurs
- Fournir des diagrammes de séquence textuels si nécessaire

## Points d'attention particuliers

- **Cohérence technique** : Vérifie que les explications techniques correspondent exactement à ce qui est dans le code source.
- **Profondeur vs Clarté** : Balance la profondeur technique avec la clarté pour des lecteurs de différents niveaux.
- **Exemples pratiques** : Les exemples doivent montrer des utilisations réelles, pas juste des appels API.
- **Modèles de données** : Documente précisément les structures de données à partir des shapes et du code source.
- **Documentation des erreurs** : Si le module comporte une gestion d'erreurs spécifique, documente-la.

## Optimisation des tableaux pour GitHub

Pour rendre les tableaux plus lisibles sur GitHub:

1. **Éviter les tableaux pour les descriptions complexes** : Au lieu d'utiliser un tableau avec de nombreuses colonnes pour documenter les méthodes, opter pour une structure en liste avec des titres en gras.

2. **Formater les méthodes comme suit (liste à puces)**:

```markdown
- **`methodName(param1, [param2=default])`** - Description détaillée de la méthode expliquant clairement son but, son fonctionnement et ses cas d'utilisation.
```

3. **Pour les tableaux de configuration**, limiter la largeur des descriptions en utilisant des phrases concises ou en divisant les longues descriptions sur plusieurs lignes.

4. **Pour les énumérations longues**, utiliser des listes à puces plutôt que d'énumérer dans une cellule de tableau.
