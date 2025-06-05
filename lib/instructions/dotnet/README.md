## 🎯 Objectifs

- Décrire le **module** en détail, on doit comprendre à quoi il sert, comment il fonctionne, avec quoi il interagit, etc.
- Lister et décrire toutes les variables d'environnement utilisées et/ou modifiées dans un tableau avec colonnes `Variable`, `Description`, `Exemple` et `Valeur par défaut`.
- Lister et décrire tous les FIXME, TODO, XXX, etc. (qui sont sous la forme de commentaires dans le code) dans un tableau avec colonnes `Fichier`, `Ligne`, `Type` et `Description`.
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

## Sommaire

(Sommaire (liste à puces) de tous les chapitres de second niveau : `##`)

## Structure du module

(Expliquer brièvement l'architecture et les principaux modules, fonctions, etc.)

## Fonctionnement global

(Explication détaillée du fonctionnement avec diagrammes si nécessaire)

## Exemples d'utilisation

(Montrer quelques cas d'utilisation et préférer la qualité à la quantité)

### Variables d'environnement

(Présenter sous forme de tableau avec colonnes `Variable`, `Description`, `Exemple`, `Valeur par défaut`)

## Détails des sources

### `autre.js`

(Explication du rôle de ce fichier pour autant qu'il ne soit pas trivial)

#### Méthodes publiques

Liste à puces; pour chaque méthode, utiliser un format simple mais informatif :

- **`methodName(param1, param2=default)`** — Description détaillée de la méthode expliquant clairement son but, son fonctionnement et ses cas d'utilisation.

### À faire, à corriger, ...

(Présenter les TODO, FIXME, XXX, etc. (trouvés dans le code) sous forme de tableau avec colonnes `Fichier`, `Ligne`, `Type`, `Description`)
(Ne pas insérer cette section si rien n'a été trouvé dans le code)
```

## Points d'attention particuliers

- **Cohérence technique** : Vérifie que les explications techniques correspondent exactement à ce qui est dans le code source.
- **Profondeur vs Clarté** : Balance la profondeur technique avec la clarté pour des lecteurs de différents niveaux.
- **Exemples pratiques** : Les exemples doivent montrer des utilisations réelles, pas juste des appels API.
- **Documentation des erreurs** : Si le module comporte une gestion d'erreurs spécifique, documente-la.

## Optimisation des tableaux pour GitHub

Pour rendre les tableaux plus lisibles sur GitHub:

1. **Éviter les tableaux pour les descriptions complexes** : Au lieu d'utiliser un tableau avec de nombreuses colonnes pour documenter les méthodes, opter pour une structure en liste avec des titres en gras.

2. **Pour les tableaux de configuration**, limiter la largeur des descriptions en utilisant des phrases concises ou en divisant les longues descriptions sur plusieurs lignes.

3. **Pour les énumérations longues**, utiliser des listes à puces plutôt que d'énumérer dans une cellule de tableau.
