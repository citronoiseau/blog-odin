import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

function PostDetails() {
  const { postId } = useParams(); // get :postId from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/posts/${postId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setPost(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) return <div>Loading post...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  console.log(post);
  return (
    <div className="post-container">
      <div className="post-info">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <p>
          Author: {post.author.firstName} {post.author.lastName}
        </p>
      </div>
      <div className="post-comments">
        {post.comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.content}</p>
            <small>
              By {comment.author.firstName} {comment.author.lastName}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostDetails;
