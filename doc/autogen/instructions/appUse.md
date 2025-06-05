## 🎯 Objectifs

- Garder une vision haut-niveau de l'application
- Ne montre pas de code
- Décrire comment utiliser l'application en ligne de commande
  - Explique chaque paramètres et donne des exemples
  - L'application s'exécute avec `npx xcraft-miner@latest` ou `bunx xcraft-miner@latest`
- Décrire comment configurer la génération pour un module
  - Expliquer comment les dossiers et fichiers doivent être créés dans un dossier autogen/... du module (dans ce cas le "type" ne fait pas partie du chemin)
  - Montrer des exemples (sans le contenu des prompts) avec des projets Xcraft et .NET
- **Ne décrit pas les configurations globales Xcraft** qui concernent xcraft-core-etc (elles ne sont pas exploitables avec la ligne de commande)
- **Ne montre jamais d'exemple de prompts**
- **Ne parle pas de la redirection de sortie** `.redirect`
- Si le contexte contient un **DOCUMENT précédent** "## DOCUMENT précédent"
  - Mettre à jour le contenu markdown en effectuant une adaptation de la dernière génération.
  - Ajouter ce qui manque.
  - Supprimer ce qui n'existe plus.
  - Corriger ce qui a changé par rapport au code source.

## 📑 Format attendu

Le document généré doit être en **Markdown** et suivre cette structure :

```markdown
# Utilisation

## Exécution

(Expliquer comment démarrer l'application avec npx ou bunx; l'application se nomme **xcraft-miner**)

## Paramètres

(Expliquer l'utilisation de la ligne de commande)

## Configurations

(Expliquer comment configurer le module cible pour exploiter des prompts personnalisés)
(Ne pas donner d'explication sur la redirection de sortie `.redirect`)

## Exemples

(Montrer des exemples d'utilisation de la ligne de commande)
```

## Points d'attention particuliers

- **Cohérence technique** : Vérifie que les explications techniques correspondent exactement à ce qui est dans le code source.
- **Profondeur vs Clarté** : Balance la profondeur technique avec la clarté pour des lecteurs de différents niveaux.
