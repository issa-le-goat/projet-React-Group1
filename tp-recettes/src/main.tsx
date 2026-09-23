import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './store/store'

import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './pages/NotFound'
import HomePage from './pages/HomePage'
import Recipe from './pages/Recipe'
import Favorites from './pages/Favorites'
import UserList from './pages/UserList'
import User from './pages/User'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Blog from './pages/Blog'
import PostDetail from './pages/PostDetail'

import './index.css'

// Routage déclaratif v6 avec createBrowserRouter, comme demandé.
// errorElement gère à la fois les routes inconnues et les erreurs de chargement.
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'recettes/:id', element: <Recipe /> },
      {
        path: 'favorites',
        element: (
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        ),
      },
      { path: 'users', element: <UserList /> },
      { path: 'users/:id', element: <User /> },
      { path: 'login', element: <Login /> },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:id', element: <PostDetail /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
