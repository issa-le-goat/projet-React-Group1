import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

interface ProtectedRouteProps {
  children: ReactNode
}

// Wrapper de route : lit le token dans Redux (pas dans localStorage directement,
// pour rester réactif si le state change en mémoire) et redirige vers /login
// si l'utilisateur n'est pas authentifié.
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useAppSelector((state) => state.auth.token)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
