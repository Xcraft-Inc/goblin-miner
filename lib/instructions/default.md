## 🎯 Objectifs

- Décrire chaque **acteur** (Elf) et son rôle dans l’application.
- Décrire chaque **widget** (React) avec des exemples basé sur leurs propriétés.
- Pour un **acteur** :
  - Analyser en détail le fonctionnement du **module** (par ex. flux d'information, orchestration entre les acteurs etc.)
  - Décrire le modèle du **state** à l'aide des classes de finissant par "State" et "Shape"
  - Générer une **vue d’ensemble** du module et son fonctionnement global.
- Fournir des **exemples d’utilisation** si pertinent.
- Conserver les liens hypertextes markdown sur les autres modules tant que le module cité est encore utilisé dans le projet. Préférer les liens avec référence en bas du document.
- Si le contexte contient un **README précédent** "## README précédent"
  - Mettre à jour le contenu markdown en effectuant une adaptation de la dernière génération.
  - Ajouter ce qui manque.
  - Supprimer ce qui n'existe plus.
  - Corriger ce qui a changé par rapport au code source.
  - Indiquer au bas du document qu'il s'agit d'une mise à jour et sans spécifier de date.

## 📑 Format attendu

La documentation générée doit être en **Markdown** et suivre cette structure :

```markdown
# 📘 Documentation du module

## Structure du (module ou widget)

(Expliquer brièvement l’architecture et les principaux modules, fonctions et acteurs du projet)

## Fonctionnement global

(Expliquer en plusieurs paragraphes et en détail le fonctionnement du module)

## Exemples d'utilisation

(Montrer quelques cas d'utilisation avec les acteurs)

## Détails des sources

### `widget.js`

(Explication sur le comportement UI/UX du composant React)

### `styles.js`

(Explication sur le style graphique du composant React)

### `actorName.js`

- **Description** : (Explication du rôle de ce fichier ou de l'acteur)
- **State** : (Décris les propriété du "State" en te basant sur le "Shape" correspondant)
- **Quêtes** : (Lister et décrire l'API de l'acteur au format JSDoc)
- **Dépendances** : (Lister les modules, acteurs ou fichiers utilisés)

### `shape.js`

(Explication des différents modèles de données exposés)

### `utils/helpers.js`

- **Description** : ...
- **Principales fonctions** : ...

### `test/func.spec.js`

(Explication sur la couverture des tests unitaire)
```
