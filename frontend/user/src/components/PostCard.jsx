import { useNavigate } from "react-router-dom";

function PostCard({ post }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`posts/${post.id}`);
  };

  return (
    <button className="post-card" onClick={handleClick}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <small>
        Author: {post.author.firstName} {post.author.lastName}
      </small>
    </button>
  );
}

export default PostCard;
