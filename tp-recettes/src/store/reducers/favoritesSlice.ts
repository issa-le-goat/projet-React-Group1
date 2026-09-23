import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface FavoritesState {
  ids: number[]
}

const initialState: FavoritesState = {
  ids: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<number>) => {
      // On évite les doublons si le bouton est cliqué plusieurs fois
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload)
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.ids = state.ids.filter((id) => id !== action.payload)
    },
  },
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
