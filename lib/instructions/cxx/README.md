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

(Expliquer brièvement l'architecture et les principaux modules/classes/namespaces/headers, etc.)

## Fonctionnement global

(Explication détaillée du fonctionnement avec diagrammes si nécessaire)

## Compilation et dépendances

(Informations sur les dépendances requises, les standards C++ utilisés, les options de compilation)

### Prérequis

(Compilateurs supportés, versions de C++, bibliothèques système, etc.)

### Instructions de compilation

(Makefile, CMake, options de compilation, flags spécifiques)

## Configuration

(Si des fichiers de configuration existent, présenter leur contenu sous forme de tableau avec colonnes `Option`, `Description`, `Type`, `Valeur par défaut`)

### Variables d'environnement

(Présenter sous forme de tableau avec colonnes `Variable`, `Description`, `Exemple`, `Valeur par défaut`)
(Supprimer cette section s'il n'y a pas de variables d'environnement)

## Exemples d'utilisation

(Montrer quelques cas d'utilisation et préférer la qualité à la quantité)

## Détails des sources

### `NomDeLaClasse.h` / `NomDeLaClasse.cpp`

(Explication du rôle de cette classe, ses responsabilités principales)

#### Membres publics

- **`member_name`** — Description du membre et de son utilisation.

#### Méthodes publiques

Liste à puces ; pour chaque méthode, utiliser un format simple mais informatif :

- **`method_name(param1, param2 = default_value)`** — Description détaillée de la méthode expliquant clairement son but, son fonctionnement et ses cas d'utilisation.

#### Constructeurs/Destructeurs

- **`ClassName()`** — Description du constructeur par défaut.
- **`~ClassName()`** — Description du destructeur et de la gestion des ressources.

### `interface.h`

(Explication de l'interface ou de la classe abstraite)

### `config.h` / fichiers de configuration

(Explication des options de configuration disponibles)
```

## Instructions spéciales pour C++

### Pour les applications avec interface graphique

- Documenter les **frameworks utilisés** (Qt, GTK+, etc.)
- Expliquer la **gestion des événements**
- Décrire les **threads** et la synchronisation
- Documenter les **ressources** (images, fichiers, etc.)

### Pour les bibliothèques statiques/dynamiques

- Documenter les **headers publics**
- Expliquer les **patterns d'utilisation** recommandés
- Décrire les **exceptions** et la gestion d'erreurs
- Fournir des **exemples d'intégration**
- Documenter l'**ABI** (Application Binary Interface) si pertinent

### Pour les applications console

- Documenter les **arguments de ligne de commande**
- Expliquer le **flux d'exécution**
- Décrire les **codes de retour**
- Documenter les **signaux** gérés (SIGINT, SIGTERM, etc.)

### Pour les applications système/services

- Documenter la **configuration système**
- Expliquer la **gestion des processus**
- Décrire la **gestion des logs**
- Documenter les **permissions** requises

### Pour les modules avec gestion mémoire spécifique

- Documenter les **stratégies d'allocation**
- Expliquer la **gestion des ressources** (RAII)
- Décrire les **smart pointers** utilisés
- Documenter les **fuites mémoire** potentielles

## Points d'attention particuliers

- **Cohérence technique** : Vérifie que les explications techniques correspondent exactement à ce qui est dans le code source.
- **Standard C++** : Indiquer le standard C++ utilisé (C++11, C++14, C++17, C++20, etc.).
- **Portabilité** : Mentionner les spécificités plateforme (Windows, Linux, macOS).
- **Gestion d'erreurs** : Documenter les exceptions, codes d'erreur et assertions.
- **Performance** : Mentionner les optimisations et considérations de performance.
- **Thread safety** : Indiquer si les classes/fonctions sont thread-safe.
- **Conventions C++** : Respecter les conventions de nommage et les bonnes pratiques C++.

## Optimisation des tableaux pour GitHub

Pour rendre les tableaux plus lisibles sur GitHub :

1. **Éviter les tableaux pour les descriptions complexes** : Au lieu d'utiliser un tableau avec de nombreuses colonnes pour documenter les méthodes, opter pour une structure en liste avec des titres en gras.

2. **Pour les tableaux de configuration** : Limiter la largeur des descriptions en utilisant des phrases concises ou en divisant les longues descriptions sur plusieurs lignes.

3. **Pour les énumérations longues** : Utiliser des listes à puces plutôt que d'énumérer dans une cellule de tableau.

## Règles de style et cohérence

- Utiliser des **termes cohérents** tout au long du document
- **Respecter la casse** des noms de classes, fonctions et variables (C++ utilise snake_case ou camelCase selon les conventions)
- **Utiliser des exemples réalistes** avec des noms de variables significatifs
- **Éviter les répétitions** entre sections
- **Maintenir un ton professionnel** mais accessible
- **Utiliser la terminologie C++** appropriée (namespace, template, header, etc.)
- **Documenter les includes** nécessaires pour utiliser le module
- **Mentionner les linkages** requis (bibliothèques à lier)

## Spécificités C++ à documenter

### Templates

- **Paramètres de template** : Expliquer les contraintes et les types attendus
- **Spécialisations** : Documenter les spécialisations partielles ou complètes
- **Instantiation** : Fournir des exemples d'utilisation avec différents types

### Namespaces

- **Organisation** : Expliquer l'organisation logique des namespaces
- **Using directives** : Recommandations sur l'utilisation des `using`
- **Conflits** : Mentionner les conflits potentiels avec d'autres bibliothèques

### Héritage et Polymorphisme

- **Hiérarchie de classes** : Schématiser les relations d'héritage
- **Fonctions virtuelles** : Expliquer le comportement polymorphe
- **Classes abstraites** : Documenter les interfaces pures

### Gestion des ressources

- **RAII** : Expliquer l'utilisation du Resource Acquisition Is Initialization
- **Smart pointers** : Documenter l'usage de `unique_ptr`, `shared_ptr`, `weak_ptr`
- **Move semantics** : Expliquer les constructeurs et opérateurs de déplacement
