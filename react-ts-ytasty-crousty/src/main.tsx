import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import axios from 'axios';
import './index.css';

// Importation des composants et pages
import Header from './components/Header';
import HomePage from './pages/HomePage'; // Page d'accueil avec les recettes
import UserList from './pages/UserList';
import User from './pages/User';
import Recipe from './pages/Recipe';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import type { User as UserType } from "./types/user";
import { setUsers } from './store/reducers/user';

// Pré-chargement des utilisateurs dans le store Redux au démarrage
const prefetchUsers = async () => {
  try {
    const response = await axios.get<{ users: UserType[] }>("https://dummyjson.com/users");
    store.dispatch(setUsers(response.data.users));
  } catch (error) {
    console.error("Erreur lors du pré-chargement des utilisateurs", error);
  }
};
prefetchUsers();

// Layout principal avec le Header persistant
const Layout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
  </>
);

// Configuration des routes
const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound />, // Gère les pages 404
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/recipe/:id", element: <Recipe /> },
      { path: "/users", element: <UserList /> }, // Modifié en /users selon le TP[cite: 4]
      { path: "/users/:id", element: <User /> }, // Modifié pour cohérence[cite: 4]
      { path: "/login", element: <Login /> },
      
      // Bloc des routes protégées (nécessitent d'être connecté)
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/profile", element: <Profile /> },
          // La route /favoris viendra ici plus tard[cite: 4]
        ]
      }
    ]
  }
]);

// Rendu de l'application
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);