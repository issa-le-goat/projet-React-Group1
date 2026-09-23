import { useEffect, useState, type FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axiosInstance'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addCommentOptimistic, setComments } from '../store/reducers/blogSlice'
import type { Comment } from '../types'

export default function PostDetail() {
  const { id } = useParams<{ id: string }>()
  const postId = Number(id)

  const dispatch = useAppDispatch()
  // Le post est déjà en mémoire (chargé par la page Blog) : pas besoin d'un
  // second GET, ce qui gère aussi le cas des posts ajoutés en optimistic UI.
  const post = useAppSelector((state) => state.blog.posts.find((p) => p.id === postId))
  const comments = useAppSelector((state) => state.blog.commentsByPost[postId] ?? [])
  const currentUser = useAppSelector((state) => state.auth.user)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [commentBody, setCommentBody] = useState('')

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true)
        const response = await api.get<{ comments: Comment[] }>(
          `/posts/${postId}/comments`
        )
        dispatch(setComments({ postId, comments: response.data.comments }))
        setError(null)
      } catch {
        // Cas normal pour un post ajouté en local (ID temporaire, inconnu du serveur)
        setError(null)
        dispatch(setComments({ postId, comments: [] }))
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [postId, dispatch])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!commentBody.trim()) return

    // Mise à jour optimiste : le commentaire apparaît immédiatement dans le state
    const optimisticComment: Comment = {
      id: Date.now(),
      body: commentBody,
      postId,
      user: {
        id: currentUser?.id ?? 0,
        username: currentUser?.username ?? 'invité',
      },
    }
    dispatch(addCommentOptimistic({ postId, comment: optimisticComment }))
    setCommentBody('')
  }

  if (!post) return <p className="error">Article introuvable.</p>

  return (
    <div className="page post-detail-page">
      <h1>{post.title}</h1>
      <p>{post.body}</p>

      <h2>Commentaires</h2>
      {loading && <p>Chargement des commentaires...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.user.username} :</strong> {comment.body}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Ajouter un commentaire
          <textarea
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            required
          />
        </label>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  )
}
