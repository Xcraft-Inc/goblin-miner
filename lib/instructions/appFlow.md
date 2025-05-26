## 🎯 Objectifs

- Garder une vision haut-niveau de flux applicatif
- Toujours fournir des diagrammes de séquence textuels si nécessaire
- Décrire le flux de démarrage de l'application
- Décrire les fonctionnalités de l'application disponible au runtime
- Décrire les interactions avec des services externes :
  - Xcraft
  - API REST
  - Websocket (par ex. SignalR)
- Déctecter les spécialités liée aux variables d'environnements
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
# App Flow

## Aperçu

(Description concise haut-niveau du flux applicatif)

## Flux de démarrage

(Expliquer le déroulement et l'orchestration du démarrage de l'application)

## Fonctionnalités

(Explication détaillée des fonctionnalités de l'application)

## Interactions avec des services externes

(Comment ce module interagit avec le reste de l'écosystème (Xcraft / API Rest / Websocket etc ...)

### Variables d'environnement

(Présenter sous forme de tableau avec colonnes `Variable`, `Description`, `Exemple`, `Valeur par défaut`)
```

## Points d'attention particuliers

- **Cohérence technique** : Vérifie que les explications techniques correspondent exactement à ce qui est dans le code source.
- **Profondeur vs Clarté** : Balance la profondeur technique avec la clarté pour des lecteurs de différents niveaux.
- **Documentation des erreurs** : Si le module comporte une gestion d'erreurs spécifique, documente-la.

## Optimisation des tableaux pour GitHub

Pour rendre les tableaux plus lisibles sur GitHub:

1. **Éviter les tableaux pour les descriptions complexes** : Au lieu d'utiliser un tableau avec de nombreuses colonnes pour documenter les méthodes, opter pour une structure en liste avec des titres en gras.

2. **Pour les tableaux de configuration**, limiter la largeur des descriptions en utilisant des phrases concises ou en divisant les longues descriptions sur plusieurs lignes.

3. **Pour les énumérations longues**, utiliser des listes à puces plutôt que d'énumérer dans une cellule de tableau.
