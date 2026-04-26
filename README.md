# MesRecettes

Petite application Angular pour gérer mes recettes de cuisine. Une recette est composée d'un titre, d'une liste d'ingrédients (quantité + unité + nom) et d'étapes de préparation.

Construit avec Angular 18 (NgModules) sur Node 20. Les recettes sont stockées en mémoire — elles ne sont pas persistées entre les rechargements.

## Prérequis

- Node 20+
- npm 10+

## Installation

```
npm install
```

## Développement

```
npm start
```

Lance le serveur de développement sur `http://localhost:4200/`. Le rechargement à chaud est activé.

## Build de production

```
npm run build
```

Les artefacts sont générés dans `dist/mes-recettes/`.

## Tests

```
npm test
```

Lance Karma + Jasmine. Le projet n'embarque actuellement aucun spec — les boilerplates auto-générés ont été supprimés.

## État du projet

Quelques pages sont des placeholders qui n'ont jamais été implémentés :

- `auth/signin` et `auth/signup` (formulaires vides)
- `AuthService` et `AuthGuardService` (services vides, le guard n'est rattaché à aucune route)
