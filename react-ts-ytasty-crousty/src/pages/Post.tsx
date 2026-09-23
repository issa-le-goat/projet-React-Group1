import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import type { RootState } from '../store/store';
import { setComments, addComment, deleteComment } from '../store/reducers/blogSlice';

export default function Post() {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const posts = useSelector((state: RootState) => state.blog.posts);
  const comments = useSelector((state: RootState) => state.blog.comments);
  const user = useSelector((state: RootState) => state.auth.user);
  
  const [commentBody, setCommentBody] = useState('');
  const post = posts.find(p => p.id === Number(id));

  useEffect(() => {
    axios.get(`https://dummyjson.com/posts/${id}/comments`)
      .then(res => dispatch(setComments(res.data.comments)))
      .catch(err => console.error(err));
  }, [id, dispatch]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://dummyjson.com/comments/add', {
        body: commentBody, postId: Number(id), userId: user ? user.id : 1,
      });
      dispatch(addComment(response.data));
      setCommentBody('');
    } catch (error) {
      console.error(error);
    }
  };

  if (!post) return <div className="text-center mt-4">Article introuvable. <Link to="/posts">Retour au blog</Link></div>;

  return (
    <div className="page-container page-container-sm">
      <Link to="/posts">&larr; Retour au blog</Link>
      <h1 className="mt-4">{post.title}</h1>
      <p>{post.body}</p>
      
      <hr className="mt-4" />
      
      <h3>Commentaires ({comments.length})</h3>
      
      <form onSubmit={handleAddComment} className="comment-form">
        <input 
          type="text" placeholder="Ajouter un commentaire..." value={commentBody} onChange={(e) => setCommentBody(e.target.value)} required 
          className="comment-input"
        />
        <button type="submit" className="btn btn-fav-inactive">Envoyer</button>
      </form>

      <ul className="list-unstyled">
        {comments.map(c => (
          <li key={c.id} className="comment-item">
            <strong>{c.user.username}</strong> : {c.body}
            <button onClick={() => dispatch(deleteComment(c.id))} className="btn-text-danger">
              Supprimer le commentaire
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}