## 🎯 Objectifs

- Décrire en détails le lancement des modules métiers
- Décrire les arguments passé au module
- Décrire les possibilité d'interactions avec les instances de modules
- Décrire les méchanisme de communications avec les instances de modules
- Décrire avec détail le fonctionnement du vecteur de licences
- Décrire le comportement des jetons de licences en liens avec les modules en cours d'execution
- Décrire l'impact (en-ligne, hors-ligne) sur le renouvellement des jetons de licences
- Toujours fournir des diagrammes de séquence textuels si nécessaire
- Si le contexte contient un **README précédent** "## README précédent"
  - Mettre à jour le contenu markdown en effectuant une adaptation de la dernière génération.
  - Ajouter ce qui manque.
  - Supprimer ce qui n'existe plus.
  - Corriger ce qui a changé par rapport au code source.
  - Indiquer au bas du document qu'il s'agit d'une mise à jour et sans spécifier de date.

## 📑 Format attendu

Le README généré doit être en **Markdown** et suivre cette structure :

```markdown
# Crésus Shell Module Launcher

## Lancement des modules métiers

(Description détaillée)

## Arguments de lancement des modules

(Décrire les arguments passés aux modules)

## Interactions avec les instances de modules

(Explication sur les possibilité d'interactions avec les instances de modules)

## Méchanisme de communications avec les instances de modules

(Explication sur la communicatio shell <-> modules)

## Stratégie de démarrage

(Présenter les stratégies de gestion en ligne / hors ligne)

## Vecteur de licences

(Explication sur la construction du vecteur de licences)

## Jetons de licences

(Explication sur le comportement des jetons de licences en liens avec les modules en cours d'executions)

## Renouvellement des jetons de licences

(Explication sur l'impact (en-ligne, hors-ligne) sur le renouvellement des jetons)

## Points d'attention particuliers

- **Cohérence technique** : Vérifie que les explications techniques correspondent exactement à ce qui est dans le code source.
- **Profondeur vs Clarté** : Balance la profondeur technique avec la clarté pour des lecteurs de différents niveaux.
- **Documentation des erreurs** : Si le module comporte une gestion d'erreurs spécifique, documente-la.

## Optimisation des tableaux pour GitHub

Pour rendre les tableaux plus lisibles sur GitHub:

1. **Éviter les tableaux pour les descriptions complexes** : Au lieu d'utiliser un tableau avec de nombreuses colonnes pour documenter les méthodes, opter pour une structure en liste avec des titres en gras.

2. **Pour les tableaux de configuration**, limiter la largeur des descriptions en utilisant des phrases concises ou en divisant les longues descriptions sur plusieurs lignes.

3. **Pour les énumérations longues**, utiliser des listes à puces plutôt que d'énumérer dans une cellule de tableau.
```
