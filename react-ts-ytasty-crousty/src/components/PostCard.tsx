import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePost } from '../store/reducers/blogSlice';

interface PostCardProps {
  post: any;
}

export default function PostCard({ post }: PostCardProps) {
  const dispatch = useDispatch();
  const likes = typeof post.reactions === 'object' ? post.reactions.likes : post.reactions;

  return (
    <div className="post-item">
      <Link to={`/posts/${post.id}`} className="post-link">
        <h2>{post.title}</h2>
      </Link>
      <div className="post-meta">
        <span>👁 {post.views} vues</span>
        <span>👍 {likes} likes</span>
        <span>🏷 {post.tags?.join(', ')}</span>
      </div>
      <button onClick={() => dispatch(deletePost(post.id))} className="btn-delete">
        Supprimer
      </button>
    </div>
  );
}