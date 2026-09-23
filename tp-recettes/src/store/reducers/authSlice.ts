import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthUser } from '../../types'

interface AuthState {
  token: string | null
  user: AuthUser | null
}

// On relit le localStorage au chargement pour garder l'utilisateur connecté
// après un rafraîchissement de page (le token seul ne suffit pas à afficher le profil,
// donc on stocke aussi l'objet user complet en JSON).
const storedToken = localStorage.getItem('token')
const storedUser = localStorage.getItem('user')

const initialState: AuthState = {
  token: storedToken,
  user: storedUser ? (JSON.parse(storedUser) as AuthUser) : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<AuthUser>) => {
      state.token = action.payload.accessToken
      state.user = action.payload
      // Persistance manuelle : Redux ne survit pas à un F5, localStorage si.
      localStorage.setItem('token', action.payload.accessToken)
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
