import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axiosInstance'
import type { User as UserType } from '../types'

// Version publique restreinte : contrairement à /profile, on n'affiche
// que l'image et le username, pas les données personnelles complètes.
export default function User() {
  const { id } = useParams<{ id: string }>()
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await api.get<UserType>(`/users/${id}`)
        setUser(response.data)
        setError(null)
      } catch {
        setError('Utilisateur introuvable.')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  if (loading) return <p>Chargement...</p>
  if (error) return <p className="error">{error}</p>
  if (!user) return null

  return (
    <div className="page user-page">
      <img src={user.image} alt={user.username} className="avatar" />
      <h1>{user.username}</h1>
    </div>
  )
}
