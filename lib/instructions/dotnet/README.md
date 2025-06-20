## 🎯 Objectifs

- **Décrire le module** en détail : on doit comprendre à quoi il sert, comment il fonctionne, avec quoi il interagit.
- **Lister et décrire** toutes les variables d'environnement utilisées et/ou modifiées dans un tableau avec colonnes `Variable`, `Description`, `Exemple` et `Valeur par défaut`.
- **Fournir des exemples d'utilisation** concrets avec des cas pratiques.
- **Documenter les fonctions et méthodes publiques** avec leur signature, paramètres et valeurs de retour.
- **Conserver les liens hypertextes markdown** sur les autres modules tant que le module cité est encore utilisé dans le projet. Préférer les liens avec référence en bas du document.

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

(Expliquer brièvement l'architecture et les principaux modules, classes, interfaces, etc.)

## Fonctionnement global

(Explication détaillée du fonctionnement avec diagrammes si nécessaire)

## Configuration

(Si des fichiers de configuration existent (appsettings.json, web.config, etc.), présenter leur contenu sous forme de tableau avec colonnes `Option`, `Description`, `Type`, `Valeur par défaut`)

### Variables d'environnement

(Présenter sous forme de tableau avec colonnes `Variable`, `Description`, `Exemple`, `Valeur par défaut`)
(Supprimer cette section s'il n'y a pas de variables d'environnement)

## Exemples d'utilisation

(Montrer quelques cas d'utilisation et préférer la qualité à la quantité)

## Détails des sources

### `NomDeLaClasse.cs`

(Explication du rôle de cette classe, ses responsabilités principales)

#### Propriétés publiques

- **`PropertyName { get; set; }`** — Description de la propriété et de son utilisation.

#### Méthodes publiques

Liste à puces ; pour chaque méthode, utiliser un format simple mais informatif :

- **`MethodName(param1, param2 = default)`** — Description détaillée de la méthode expliquant clairement son but, son fonctionnement et ses cas d'utilisation.

### `Interface.cs`

(Explication du contrat défini par l'interface)

### `Configuration.cs` / `appsettings.json`

(Explication des options de configuration disponibles)
```

## Instructions spéciales pour .NET

### Pour les projets ASP.NET Core

- Documenter les **controllers** et leurs actions
- Expliquer la **configuration des services** (Startup.cs, Program.cs)
- Décrire les **middlewares** utilisés
- Documenter les **modèles de données** et DTOs
- Expliquer l'**injection de dépendances**

### Pour les bibliothèques de classes

- Documenter les **interfaces publiques**
- Expliquer les **patterns d'utilisation** recommandés
- Décrire les **exceptions** potentielles
- Fournir des **exemples d'intégration**

### Pour les applications console

- Documenter les **arguments de ligne de commande**
- Expliquer le **flux d'exécution**
- Décrire les **codes de retour**

### Pour les services Windows/Workers

- Documenter la **configuration du service**
- Expliquer le **cycle de vie**
- Décrire la **gestion des logs**

## Points d'attention particuliers

- **Cohérence technique** : Vérifie que les explications techniques correspondent exactement à ce qui est dans le code source.
- **Profondeur vs Clarté** : Balance la profondeur technique avec la clarté pour des lecteurs de différents niveaux.
- **Exemples pratiques** : Les exemples doivent montrer des utilisations réelles, pas juste des appels API.
- **Documentation des erreurs** : Si le module comporte une gestion d'erreurs spécifique, documente-la.
- **Conventions .NET** : Respecter les conventions de nommage et les bonnes pratiques .NET.

## Optimisation des tableaux pour GitHub

Pour rendre les tableaux plus lisibles sur GitHub :

1. **Éviter les tableaux pour les descriptions complexes** : Au lieu d'utiliser un tableau avec de nombreuses colonnes pour documenter les méthodes, opter pour une structure en liste avec des titres en gras.

2. **Pour les tableaux de configuration** : Limiter la largeur des descriptions en utilisant des phrases concises ou en divisant les longues descriptions sur plusieurs lignes.

3. **Pour les énumérations longues** : Utiliser des listes à puces plutôt que d'énumérer dans une cellule de tableau.

## Règles de style et cohérence

- Utiliser des **termes cohérents** tout au long du document
- **Respecter la casse** des noms de classes, méthodes et propriétés (.NET utilise PascalCase)
- **Utiliser des exemples réalistes** avec des noms de variables significatifs
- **Éviter les répétitions** entre sections
- **Maintenir un ton professionnel** mais accessible
- **Utiliser la terminologie .NET** appropriée (assembly, namespace, etc.)
