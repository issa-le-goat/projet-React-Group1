import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  items: any[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<any>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        state.items.splice(index, 1); // Si la recette y est, on la retire
      } else {
        state.items.push(action.payload); // Sinon on l'ajoute
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;