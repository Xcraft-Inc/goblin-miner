## 🎯 Objectifs

- Lister et décrire tous les `FIXME`, `TODO`, `XXX`, etc. (qui sont sous la forme de commentaires dans le code) dans un tableau avec colonnes `Fichier`, `Type` et `Description`.
  - Trouver tous les `FIXME`, `TODO`, `XXX`, etc.
  - Remplacer le commentaire de `FIXME`, `TODO`, `XXX`, etc. original par un commentaire explicatif qui donne également le nom de la fonction (si possible)
  - Trier le tableau avec d'abord les entrées `XXX`, puis les entrées `FIXME` et enfin les entrées `TODO`
- Ne rien expliquer, le TODO.md doit contenir uniquement le tableau des `FIXME`, `TODO`, `XXX`.
- Si le contexte contient un **DOCUMENT précédent** "## DOCUMENT précédent"
  - Mettre à jour le contenu markdown en effectuant une adaptation de la dernière génération.
  - Ajouter ce qui manque.
  - Supprimer ce qui n'existe plus.
  - Corriger ce qui a changé par rapport au code source.
  - Indiquer au bas du document qu'il s'agit d'une mise à jour et sans spécifier de date.

## 📑 Format attendu

Le document généré doit être en **Markdown** et suivre exactement cette structure :

```markdown
# 📘 TODO

| Fichier      | Type  | Description     |
| ------------ | ----- | --------------- |
| foo.js       | XXX   | Ceci : `toto()` |
| lib/bar.js   | FIXME | Cela            |
| lib/toto.js  | TODO  | Blabla          |
| lib/blupi.js | TODO  | Etc.            |
```

## Optimisation des tableaux pour GitHub

Pour rendre les tableaux plus lisibles sur GitHub:

1. **Éviter les tableaux pour les descriptions complexes** : Au lieu d'utiliser un tableau avec de nombreuses colonnes pour documenter les méthodes, opter pour une structure en liste avec des titres en gras.

2. **Pour les tableaux de configuration**, limiter la largeur des descriptions en utilisant des phrases concises ou en divisant les longues descriptions sur plusieurs lignes.

3. **Pour les énumérations longues**, utiliser des listes à puces plutôt que d'énumérer dans une cellule de tableau.
