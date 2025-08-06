import { useNavigate } from "react-router-dom";
import styles from "./PostCard.module.css";

function PostCard({ post }) {
  console.log(post);
  const navigate = useNavigate();
  const handleClick = () => navigate(`posts/${post.id}`);

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/posts/${post.id}/edit`);
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    console.log("Delete post:", post.id);
  };

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
      <div className={styles.postInfo}>
        <div className={styles.status}>
          {post.isPublished ? "Published" : "Not published"}
        </div>
        <div className={styles.postControls}>
          <button className={styles.iconBtn} onClick={handleEdit}>
            ✎
          </button>
          <button className={styles.iconBtn} onClick={handleDelete}>
            🗑
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
