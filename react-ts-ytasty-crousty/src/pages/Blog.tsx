import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import type { RootState } from '../store/store';
import { setPosts, addPost } from '../store/reducers/blogSlice';
import PostCard from '../components/PostCard'; // Nouvel import

export default function Blog() {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.blog.posts);
  const user = useSelector((state: RootState) => state.auth.user);
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (posts.length === 0) {
      axios.get('https://dummyjson.com/posts')
        .then(res => dispatch(setPosts(res.data.posts)))
        .catch(err => console.error(err));
    }
  }, [dispatch, posts.length]);

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://dummyjson.com/posts/add', {
        title, body, userId: user ? user.id : 1,
      });
      dispatch(addPost(response.data));
      setTitle(''); setBody('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-container page-container-sm">
      <h1 className="text-center">Espace Blog</h1>

      <form onSubmit={handleAddPost} className="form-box">
        {/* ... (Garde le contenu de ton formulaire identique) ... */}
        <h3>Publier un nouvel article</h3>
        <input type="text" placeholder="Titre de l'article" value={title} onChange={(e) => setTitle(e.target.value)} required className="form-input" />
        <textarea placeholder="Contenu..." value={body} onChange={(e) => setBody(e.target.value)} required className="form-input" rows={4} />
        <button type="submit" className="btn btn-fav-inactive">Publier</button>
      </form>

      <div>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}