# 📘 Documentation du module goblin-miner

## Aperçu

Le module `goblin-miner` est un outil d'analyse et de génération automatique de documentation pour les projets Xcraft. Il utilise des modèles d'intelligence artificielle pour analyser le code source et produire une documentation technique détaillée au format Markdown pour les modules du projet.

## Sommaire

- [Structure du module](#structure-du-module)
- [Fonctionnement global](#fonctionnement-global)
- [Exemples d'utilisation](#exemples-dutilisation)
- [Interactions avec d'autres modules](#interactions-avec-dautres-modules)
- [Configuration avancée](#configuration-avancée)
- [Détails des sources](#détails-des-sources)

## Structure du module

Le module expose deux acteurs Elf principaux :

- **AppMiner** : Acteur singleton (`Elf.Alone`) qui orchestre le processus de génération de documentation
- **CodeMiner** : Acteur instanciable (`Elf`) qui effectue l'analyse du code source et génère la documentation

## Fonctionnement global

Le module fonctionne en deux étapes principales :

1. **Initialisation** : L'acteur `AppMiner` charge la configuration depuis `xcraft-core-etc` et initialise un `CodeMiner`
2. **Génération** : Le `CodeMiner` analyse les fichiers source des modules spécifiés et génère la documentation en format Markdown

Le processus utilise un agent d'IA (via `goblin-agents`) pour analyser le code et générer la documentation selon des prompts prédéfinis.

### Flux de données

1. **AppMiner.init()** charge la configuration et crée un CodeMiner
2. **CodeMiner.create()** initialise l'agent d'IA avec les paramètres fournis
3. Pour chaque module configuré :
   - **loadModule()** collecte les fichiers source en respectant les exclusions
   - **generate()** combine prompts, instructions et code source
   - L'agent d'IA génère la documentation
   - Le résultat est sauvegardé dans le système de fichiers
4. **AppMiner** déclenche l'arrêt de l'application une fois terminé

## Exemples d'utilisation

### Utilisation via AppMiner (recommandée)

```javascript
// L'AppMiner est généralement démarré automatiquement par le système Xcraft
// selon la configuration dans xcraft-core-etc
const appMiner = new AppMiner(this);
await appMiner.init();
```

### Utilisation directe du CodeMiner

```javascript
const {CodeMiner} = require('goblin-miner/lib/codeMiner.js');

// Création d'une instance de CodeMiner
const codeMiner = await new CodeMiner(this).create(
  'codeMiner@myApp',
  feedId,
  '/path/to/project',
  'xcraft', // type de projet
  'openai', // provider
  'gpt-4', // model
  'https://api.openai.com/v1', // host
  'sk-your-api-key', // authKey
  0.7, // temperature
  42 // seed
);

// Génération de documentation pour un module spécifique
await codeMiner.generate('goblin-workshop', 'README.md');
```

### Utilisation avec arguments en ligne de commande

Le module supporte des arguments spéciaux via `xcraft-core-host` :

- `-t` : Type de projet (par défaut 'xcraft')
- `-k` : Clé d'authentification
- `-i` : Chemin vers un module spécifique
- `-o` : Chemin vers un fichier d'instruction spécifique

## Interactions avec d'autres modules

- **[goblin-agents]** : Utilise `AiAgent` pour communiquer avec les modèles d'IA
- **[xcraft-core-etc]** : Charge la configuration du module
- **[xcraft-core-goblin]** : Fournit l'infrastructure des acteurs Elf
- **[xcraft-core-host]** : Récupère le chemin du projet et des ressources, ainsi que les arguments d'application
- **[goblin-warehouse]** : Dépendance pour la gestion des données
- **fs-extra** : Manipulation des fichiers et répertoires
- **[xcraft-core-stones]** : Définition des types pour les shapes d'état

## Configuration avancée

| Option                | Description                                                    | Type   | Valeur par défaut |
| --------------------- | -------------------------------------------------------------- | ------ | ----------------- |
| agent.provider        | Fournisseur d'IA (ex: 'openai', 'anthropic')                   | string | null              |
| agent.model           | Modèle d'IA à utiliser (ex: 'gpt-4', 'claude-3')               | string | null              |
| agent.host            | URL de l'API du fournisseur                                    | string | null              |
| agent.authKey         | Clé d'authentification pour l'API                              | string | null              |
| inference.temperature | Température pour l'inférence (contrôle la créativité, 0.0-1.0) | number | null              |
| inference.seed        | Graine pour la reproductibilité des résultats                  | number | null              |
| modules.doc           | Liste des modules à analyser                                   | array  | []                |
| instructs.doc         | Noms des fichiers d'instructions spécifiques                   | array  | []                |

### Variables d'environnement

Aucune variable d'environnement n'est directement utilisée par ce module. La configuration se fait via `xcraft-core-etc`.

## Détails des sources

### `appMiner.js`

Point d'entrée principal qui expose les commandes Xcraft pour l'acteur `AppMiner`. Ce fichier utilise `Elf.birth()` pour enregistrer l'acteur et sa logique sur le bus Xcraft.

### `codeMiner.js`

Point d'entrée qui expose les commandes Xcraft pour l'acteur `CodeMiner`. Similaire à `appMiner.js`, il utilise `Elf.birth()` pour l'enregistrement.

### `lib/appMiner.js`

Acteur singleton responsable de l'orchestration du processus de génération de documentation. Il charge la configuration, initialise le CodeMiner et traite tous les modules configurés selon une matrice modules × fichiers d'instructions.

#### État et modèle de données

**AppMinerShape** : Modèle de données simple contenant uniquement un identifiant fixe.

```javascript
class AppMinerShape {
  id = string; // Identifiant fixe : 'appMiner'
}
```

**AppMinerState** : État de l'acteur basé sur `AppMinerShape`, sculpté avec `Elf.Sculpt()`.

#### Méthodes publiques

- **`init()`** — Méthode d'initialisation principale qui orchestre tout le processus de génération de documentation. Elle charge la configuration depuis `xcraft-core-etc`, traite les arguments d'application via `xcraft-core-host`, crée une instance de `CodeMiner`, lance la génération pour tous les modules configurés en combinaison avec tous les fichiers d'instructions spécifiés, puis déclenche l'arrêt de l'application via `this.quest.cmd('shutdown')`.

- **`main()`** — Méthode principale qui contient la logique de traitement. Elle gère la configuration, les arguments en ligne de commande, l'instanciation du CodeMiner et l'exécution de la génération de documentation pour chaque combinaison module/fichier d'instruction.

### `lib/codeMiner.js`

Acteur principal responsable de l'analyse du code source et de la génération de documentation. Il gère l'interaction avec l'agent d'IA et le traitement des fichiers source.

#### État et modèle de données

**CodeMinerShape** : Modèle de données simple pour l'identifiant de l'instance.

```javascript
class CodeMinerShape {
  id = string; // Identifiant de l'instance
}
```

**CodeMinerState** : État de l'acteur basé sur `CodeMinerShape`.

#### Propriétés privées

- `_projectPath` : Chemin vers le projet à analyser
- `_agentDef` : Configuration de l'agent d'IA (provider, model, host, headers, options)
- `_type` : Type de projet ('xcraft', 'dotnet', etc.)

#### Méthodes publiques

- **`create(id, desktopId, projectPath, type, provider, model, host, authKey, temperature, seed)`** — Initialise l'instance avec les paramètres d'IA et le chemin du projet. Configure l'agent d'IA avec les paramètres fournis et prépare l'instance pour la génération de documentation.

- **`loadModule(module, instructFileName)`** — Charge et filtre les fichiers source d'un module selon les règles d'exclusion définies dans `.mignore`. Retourne la liste des fichiers à analyser en excluant automatiquement les `node_modules`, fichiers `eslint.*`, et autres fichiers non pertinents. Supporte les sections conditionnelles dans `.mignore` basées sur le fichier d'instruction.

- **`generate(module, instructFile = 'README.md')`** — Génère la documentation pour un module spécifique. Combine les prompts de base, les instructions spécifiques, le code source et la documentation précédente (si elle existe) pour créer un prompt complet envoyé à l'agent d'IA.

#### Fonctions utilitaires

**`loadPrompt(fileName)`** — Charge un prompt de base depuis le répertoire `lib/prompts/`.

**`loadInstruction(libPath, type, fileName)`** — Charge les instructions spécifiques selon une hiérarchie de priorité :

1. Module cible : `lib/[module]/doc/autogen/instructions/[fileName]`
2. Ressources de l'application : `resources/[fileName]`
3. Module miner : `lib/goblin-miner/lib/instructions/[type]/[fileName]`

**`typeFilter(type, file)`** — Filtre les fichiers selon le type de projet :

- **xcraft** : Exclut les fichiers non-JS, non-package.json, les node_modules et fichiers eslint
- **dotnet** : Inclut uniquement les fichiers .cs, .csproj et .sln

### Processus de génération

#### 1. Chargement des fichiers source

Le `CodeMiner` analyse récursivement le répertoire du module et collecte les fichiers selon le type de projet :

**Pour les projets Xcraft** :
- Tous les fichiers `.js`
- Le fichier `package.json`
- Les fichiers dans les dossiers `bin/`

**Pour les projets .NET** :
- Fichiers `.cs`
- Fichiers `.csproj`
- Fichiers `.sln`

**Exclusions automatiques** :
- Dossiers `node_modules`
- Fichiers commençant par `eslint.`
- Fichiers listés dans `.mignore` (si présent)

#### 2. Gestion des exclusions (.mignore)

Chaque module peut contenir un fichier `.mignore` à sa racine pour exclure certains fichiers de l'analyse. Le format supporte :

```
# Exclure des fichiers spécifiques
config.local.js
test.js

# Exclure des dossiers entiers (avec slash final)
temp/
build/

# Sections conditionnelles pour des fichiers d'instructions spécifiques
[README.md]
service.js

# Les commentaires commencent par #
```

**Règles d'exclusion** :
- Les lignes vides et les commentaires (commençant par `#`) sont ignorés
- Les entrées sans slash final excluent des fichiers spécifiques
- Les entrées avec slash final excluent des répertoires entiers
- Les sections entre crochets `[filename]` permettent des exclusions conditionnelles selon le fichier d'instruction

#### 3. Préparation du prompt

Le système combine :
- Un prompt de base (depuis `prompts/[type].md`)
- Des instructions spécifiques (depuis `instructions/[type]/[instructFile]`)
- Le code source de tous les fichiers du module
- La documentation précédente (si elle existe)

#### 4. Génération via IA

Un agent d'IA (`AiAgent` de `goblin-agents`) analyse le prompt et génère la documentation en Markdown.

#### 5. Sauvegarde

La documentation générée est sauvegardée dans :
- `doc/autogen/[module]/[instructFile]` (par défaut)
- Ou `lib/[module]/[instructFile]` (si un fichier `.redirect` existe)
- Ou le chemin absolu spécifié si `instructFile` est un chemin absolu

### Gestion des chemins de sauvegarde

Le module utilise un système de redirection pour déterminer où sauvegarder la documentation :

1. **Chemin absolu** : Si `instructFile` est un chemin absolu, utilise ce chemin directement
2. **Par défaut** : `doc/autogen/[module]/[instructFile]`
3. **Avec redirection** : Si un fichier `[name].redirect` existe dans `doc/autogen/[module]/`, la documentation est sauvegardée directement dans le module source :
   - Pour `README.*` : `lib/[module]/[instructFile]`
   - Pour les autres fichiers : `lib/[module]/doc/[instructFile]`

Cette fonctionnalité permet de maintenir la documentation directement dans le module source si souhaité.

### Limitations et considérations

- Le module nécessite une connexion internet pour accéder aux APIs d'IA
- La qualité de la documentation dépend du modèle d'IA utilisé et des prompts fournis
- Les coûts d'utilisation dépendent du fournisseur d'IA et du volume de code analysé
- Le processus peut être long pour de gros modules
- La gestion des erreurs d'API d'IA n'est pas explicitement implémentée dans le code fourni
- Le module dépend de `xcraft-core-host` pour obtenir le chemin du projet, ce qui le lie à l'environnement Xcraft

---

_Cette documentation a été mise à jour automatiquement par goblin-miner._

[goblin-agents]: https://github.com/Xcraft-Inc/goblin-agents
[goblin-warehouse]: https://github.com/Xcraft-Inc/goblin-warehouse
[xcraft-core-etc]: https://github.com/Xcraft-Inc/xcraft-core-etc
[xcraft-core-goblin]: https://github.com/Xcraft-Inc/xcraft-core-goblin
[xcraft-core-host]: https://github.com/Xcraft-Inc/xcraft-core-host
[xcraft-core-stones]: https://github.com/Xcraft-Inc/xcraft-core-stones