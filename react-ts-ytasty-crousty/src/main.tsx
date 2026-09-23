import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './index.css'
import Header from './components/Header.tsx';
import App from './App.tsx'
import UserList from './pages/UserList.tsx';
import User from './pages/User.tsx';
import { Outlet } from 'react-router';
import Login from './pages/Login.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import axios from 'axios';
import type { User as UserType } from "./types/user";
import { setUsers } from './store/reducers/user.ts';

interface UsersResponse {
  users: UserType[];
}

const getUsers = async () => {
  const url = "https://dummyjson.com/users";
  const response = await axios.get<UsersResponse>(url);
  store.dispatch(setUsers(response.data.users))
}

getUsers();

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
)

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/userList",
        element: <UserList />,
      },
      {
        path: "/user/:userId",
        element: <User />,
      },
      {
        path: "/login",
        element: <Login />,
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

