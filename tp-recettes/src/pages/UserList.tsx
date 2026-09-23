import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axiosInstance'
import type { User } from '../types'

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await api.get<{ users: User[] }>('/users')
        setUsers(response.data.users)
        setError(null)
      } catch {
        setError("Impossible de charger l'annuaire.")
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <p>Chargement de l'annuaire...</p>
  if (error) return <p className="error">{error}</p>

  return (
    <div className="page user-list-page">
      <h1>Annuaire</h1>
      <div className="grid">
        {users.map((user) => (
          <Link key={user.id} to={`/users/${user.id}`} className="user-card">
            <img src={user.image} alt={user.username} />
            <span>{user.username}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
