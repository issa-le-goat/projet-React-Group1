import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import favoritesReducer from './reducers/favorites';
import blogReducer from './reducers/blogSlice'; // Ajout

export const store = configureStore({
  reducer: {
    auth: userReducer,
    favorites: favoritesReducer,
    blog: blogReducer, // Ajout
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;