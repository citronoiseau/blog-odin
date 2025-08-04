import { useNavigate } from "react-router-dom";
import styles from "./PostCard.module.css";

function PostCard({ post }) {
  const navigate = useNavigate();
  const handleClick = () => navigate(`posts/${post.id}`);

  const preview =
    post.content.length > 150
      ? post.content.slice(0, 150) + "..."
      : post.content;

  return (
    <div className={styles.postCard} onClick={handleClick}>
      <h2>{post.title}</h2>
      <p>{preview}</p>
      <small>
        Author: {post.author.firstName} {post.author.lastName}
      </small>
    </div>
  );
}

export default PostCard;
