# TP Recettes — React + TypeScript + Redux Toolkit

## Installation

```bash
npm install
npm run dev
```

## Stack

- React (Vite) + TypeScript
- React Router DOM v6 (`createBrowserRouter`)
- Redux Toolkit (`store`, `authSlice`, `favoritesSlice`, `blogSlice`)
- Axios, toutes les données viennent de https://dummyjson.com

## Points d'attention

- **Auth** : le token et l'utilisateur sont persistés dans `localStorage` pour survivre à un F5.
  Identifiants de test dummyjson : `emilys` / `emilyspass`.
- **Optimistic UI** : dans `Blog.tsx` et `PostDetail.tsx`, les nouveaux posts/commentaires
  sont ajoutés au state Redux avant la réponse du serveur (dummyjson ne persiste pas
  réellement les POST, donc les valeurs affichées viennent du client).
- **QuoteWidget** : `/quotes/:id` où `id` = jour du mois (1-30) ; ID aléatoire si on est le 31.
- **Routes protégées** : `/profile` et `/favorites` redirigent vers `/login` sans token.
