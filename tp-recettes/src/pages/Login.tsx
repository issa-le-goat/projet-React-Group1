import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosInstance'
import { useAppDispatch } from '../store/hooks'
import { loginSuccess } from '../store/reducers/authSlice'
import type { AuthUser } from '../types'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await api.post<AuthUser>('/auth/login', {
        username,
        password,
      })
      dispatch(loginSuccess(response.data))
      navigate('/profile')
    } catch {
      setError('Identifiants incorrects. Vérifie ton username et mot de passe.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page login-page">
      <h1>Connexion</h1>
      <p className="hint">
        Utilise un compte de test dummyjson, ex : username <code>emilys</code>, password{' '}
        <code>emilyspass</code>.
      </p>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}
