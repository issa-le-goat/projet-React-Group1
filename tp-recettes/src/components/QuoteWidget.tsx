import { useEffect, useState } from 'react'
import api from '../api/axiosInstance'
import type { Quote } from '../types'

// Calcule l'ID de citation à afficher : le quantième du mois (1-30).
// L'API dummyjson ne propose que 30 citations, donc le 31 du mois
// est traité comme un cas particulier avec un ID aléatoire dans la même plage.
function getQuoteIdForToday(): number {
  const dayOfMonth = new Date().getDate()
  if (dayOfMonth > 30) {
    return Math.floor(Math.random() * 30) + 1
  }
  return dayOfMonth
}

export default function QuoteWidget() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setLoading(true)
        const id = getQuoteIdForToday()
        const response = await api.get<Quote>(`/quotes/${id}`)
        setQuote(response.data)
        setError(null)
      } catch {
        setError("Impossible de charger la citation du jour.")
      } finally {
        setLoading(false)
      }
    }

    fetchQuote()
  }, [])

  if (loading) return <div className="quote-widget">Chargement de la citation...</div>
  if (error) return <div className="quote-widget error">{error}</div>
  if (!quote) return null

  return (
    <blockquote className="quote-widget">
      <p>"{quote.quote}"</p>
      <footer>— {quote.author}</footer>
    </blockquote>
  )
}
