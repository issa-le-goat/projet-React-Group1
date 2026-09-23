import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axiosInstance'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setPosts, addPostOptimistic } from '../store/reducers/blogSlice'
import type { Post } from '../types'

export default function Blog() {
  const dispatch = useAppDispatch()
  const posts = useAppSelector((state) => state.blog.posts)
  const currentUser = useAppSelector((state) => state.auth.user)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await api.get<{ posts: Post[] }>('/posts')
        dispatch(setPosts(response.data.posts))
        setError(null)
      } catch {
        setError('Impossible de charger les articles.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [dispatch])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!title.trim() || !body.trim()) return

    setSubmitting(true)

    // Mise à jour optimiste : on construit le post et on l'ajoute au state
    // AVANT la réponse serveur, pour un affichage instantané.
    const optimisticPost: Post = {
      id: Date.now(), // ID temporaire local, dummyjson ne renvoie pas d'ID stable en POST
      title,
      body,
      userId: currentUser?.id ?? 0,
    }
    dispatch(addPostOptimistic(optimisticPost))
    setTitle('')
    setBody('')

    try {
      // Le POST est envoyé pour respecter la consigne, même si dummyjson
      // ne persiste pas réellement la donnée côté serveur.
      await api.post('/posts/add', {
        title: optimisticPost.title,
        body: optimisticPost.body,
        userId: optimisticPost.userId,
      })
    } catch {
      setError("L'article a été ajouté localement mais l'envoi au serveur a échoué.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page blog-page">
      <h1>Blog</h1>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Titre
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Contenu
          <textarea value={body} onChange={(e) => setBody(e.target.value)} required />
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Publication...' : 'Publier'}
        </button>
      </form>

      {loading && <p>Chargement des articles...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
