import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: { likes: number; dislikes: number } | number;
  views: number;
}

interface Comment {
  id: number;
  body: string;
  postId: number;
  user: { id: number; username: string };
}

interface BlogState {
  posts: Post[];
  comments: Comment[];
}

const initialState: BlogState = {
  posts: [],
  comments: [],
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload); // Ajout au début de la liste
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(c => c.id !== action.payload);
    },
  },
});

export const { setPosts, addPost, deletePost, setComments, addComment, deleteComment } = blogSlice.actions;
export default blogSlice.reducer;