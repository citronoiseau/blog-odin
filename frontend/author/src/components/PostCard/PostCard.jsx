import { useNavigate } from "react-router-dom";
import { useDeletePost } from "../../hooks/posts/useDeletePost";
import styles from "./PostCard.module.css";
import DOMPurify from "dompurify";

function PostCard({ post, onDelete }) {
  const { deletePost, error } = useDeletePost();
  console.log(post);
  const navigate = useNavigate();
  const handleClick = () => navigate(`posts/${post.id}`);

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/posts/${post.id}/edit`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await deletePost(post.id);
      onDelete();
    } catch (err) {
      console.log(err);
    }
    console.log("Delete post:", post.id);
  };
  const preview =
    post.content.length > 150
      ? post.content.slice(0, 150) + "..."
      : post.content;

  return (
    <div className={styles.postCard} onClick={handleClick}>
      {error && (
        <div style={{ color: "red" }}>
          {error.map((err, i) => (
            <p key={i}>{err.msg}</p>
          ))}
        </div>
      )}
      <h2>{post.title}</h2>
      <div
        className={styles.contentInfo}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(preview) }}
      ></div>
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
