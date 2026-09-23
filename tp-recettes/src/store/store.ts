import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice'
import favoritesReducer from './reducers/favoritesSlice'
import blogReducer from './reducers/blogSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
    blog: blogReducer,
  },
})

// Types inférés à partir du store, pour avoir des hooks useSelector/useDispatch typés
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
