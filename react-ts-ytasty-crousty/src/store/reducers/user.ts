import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/user';

// Définition de la structure de notre état
interface AuthState {
  token: string | null;
  user: any | null;
  usersList: User[]; // Nouvel état pour stocker l'annuaire
}

// Initialisation de l'état
const initialState: AuthState = {
  token: localStorage.getItem('token') || null,
  user: null,
  usersList: [], // Initialisé à un tableau vide
};

// Création du slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; user: any }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
    // Nouvelle action pour enregistrer la liste des utilisateurs depuis l'API
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.usersList = action.payload;
    },
  },
});

// Exportation des actions, incluant setUsers
export const { loginSuccess, logout, setUsers } = userSlice.actions;

// Exportation du reducer pour le store
export default userSlice.reducer;