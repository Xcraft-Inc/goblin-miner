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
- Un acteur instanciable expose toujours une quête "create" (qui correspond au constructeur de l'instance) et peut optionnellement exposer une quête "delete" (qui correspond au destructeur de l'instance).
- Un acteur peut avoir une méthode "dispose" (qui n'est pas une quête) et qui permet de fermer proprement les handles lors de la fermeture de l'application.

#### Règles pour les exemples de code

Dans tes exemples, montre uniquement l'instanciation de type Elf, par exemple :

```javascript
const actor = await new Actor(this).create(actorId, desktopId);
const singletonActor = new ActorAlone(this);
```

Évite de montrer l'instanciation via le système quest (sauf si l'acteur concerné est un acteur de type Goblin) :

```javascript
// À ÉVITER
await this.quest.create(actorNamespace, {actorId, desktopId, ...});
```

Les classes `Elf` et `Elf.Alone` ne peuvent pas être instanciées directement (`new Elf` et `new Elf.Alone` par exemple, sont interdits).

Les paramètres `desktopId` et `feedId` sont (en principe) synonymes.

### Composants UI

Un widget Xcraft React dérive toujours de Widget fourni par goblin-laboratory et non de React.Component ou React.PureComponent. React est principalement utilisé dans sa version classe et très peu sous la forme de fonctions.

### Configuration

Un fichier `config.js` peut exister à la racine du module. Ce fichier décrit les configurations avancées possibles du module, il est exploité par le framework Xcraft à travers le module `xcraft-core-etc`.
