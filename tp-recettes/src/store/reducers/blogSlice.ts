import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Comment, Post } from '../../types'

interface BlogState {
  posts: Post[]
  // Commentaires indexés par postId pour un accès rapide sans filtrer un tableau global
  commentsByPost: Record<number, Comment[]>
}

const initialState: BlogState = {
  posts: [],
  commentsByPost: {},
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    // Remplace la liste des posts après le GET initial
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload
    },
    // Optimistic UI : on ajoute le post au state IMMÉDIATEMENT,
    // sans attendre la réponse du serveur, pour une UX instantanée.
    // dummyjson ne persiste pas réellement les POST, donc on garde
    // le post construit côté client comme source de vérité affichée.
    addPostOptimistic: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload)
    },
    setComments: (
      state,
      action: PayloadAction<{ postId: number; comments: Comment[] }>
    ) => {
      state.commentsByPost[action.payload.postId] = action.payload.comments
    },
    // Même principe pour les commentaires : affiché avant confirmation backend
    addCommentOptimistic: (
      state,
      action: PayloadAction<{ postId: number; comment: Comment }>
    ) => {
      const existing = state.commentsByPost[action.payload.postId] ?? []
      state.commentsByPost[action.payload.postId] = [
        ...existing,
        action.payload.comment,
      ]
    },
  },
})

export const {
  setPosts,
  addPostOptimistic,
  setComments,
  addCommentOptimistic,
} = blogSlice.actions
export default blogSlice.reducer
