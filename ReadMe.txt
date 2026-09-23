Enzo Cauchi : Création du Slice d'Authentification via Redux.

Issa : Configuration initiale du Store Redux et mise en place de la connexion à l'API DummyJSON.

Robin : Création du composant ProtectedRoute et implémentation de la sécurisation des routes privées.


Redux Toolkit : Indispensable pour éviter le "prop drilling" complexe entre nos composants. Nous l'avons utilisé pour centraliser les états globaux critiques : la session utilisateur (Auth), la persistance des Favoris, et la manipulation des données du Blog.

React Router DOM v6 : L'utilisation de createBrowserRouter avec un composant Layout racine nous a permis de maintenir un en-tête persistant de manière élégante. L'implémentation de errorElement gère proprement les erreurs 404 globales.

Optimistic UI (Blog) : DummyJSON ne sauvegardant pas réellement les modifications (API mock), nous avons utilisé les reducers de Redux pour injecter immédiatement les nouveaux posts et commentaires dans l'état global. Cela garantit une interface ultra-réactive pour l'utilisateur sans attendre le retour réseau.

Séparation des responsabilités : Le code est strictement découpé (composants UI, pages, slices Redux, types) pour garantir la maintenabilité et la lisibilité du projet.