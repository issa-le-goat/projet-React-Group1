import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user'; // Import de ton reducer

export const store = configureStore({
  reducer: {
    auth: userReducer, // "auth" sera le nom utilisé pour accéder à ces données
    // Tu pourras ajouter "favorites" et "blog" ici plus tard
  },
});

// Déduction automatique des types pour TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;