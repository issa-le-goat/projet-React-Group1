import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import axios from 'axios';
import './assets/index.css';

// Imports corrigés avec les NOMS EXACTS des fichiers présents dans tes dossiers
import Header from './components/Header';
import HomePage from './pages/HomePage';
import UserList from './pages/UserList';
import User from './pages/User';
import Recipe from './pages/Recipe';
import Login from './pages/Login';
import Profile from './pages/UserProfile'; 
import Favorites from './pages/Favorites'; 
import Blog from './pages/Blog'; // Nouvel import pour la page principale du blog
import Post from './pages/Post'; // Nouvel import pour la page détaillée d'un article
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { setUsers } from './store/reducers/user';
import type { User as UserType } from "./types/user";

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
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/recipe/:id", element: <Recipe /> },
      { path: "/users", element: <UserList /> },
      { path: "/users/:id", element: <User /> },
      
      // Nouvelles routes pour l'espace Blog
      { path: "/posts", element: <Blog /> },
      { path: "/posts/:id", element: <Post /> },
      
      { path: "/login", element: <Login /> },
      
      // Bloc des routes protégées (nécessitent d'être connecté)
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/profile", element: <Profile /> },
          { path: "/favoris", element: <Favorites /> } 
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