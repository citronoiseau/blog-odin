import { useDeleteComment } from "../../hooks/comments/useDeleteComment";
import styles from "./Comment.module.css";

const Comment = ({ comment, onCommentUpdate, postId }) => {
  const { deleteComment, error } = useDeleteComment();

  return (
    <div className={styles.comment}>
      {error && (
        <div style={{ color: "red" }}>
          {error.map((err, i) => (
            <p key={i}>{err.msg}</p>
          ))}
        </div>
      )}
      <p>{comment.content}</p>
      <div className={styles.controls}>
        <button
          className={styles.iconBtn}
          onClick={() => deleteComment(comment.id, postId, onCommentUpdate)}
        >
          🗑
        </button>
      </div>

      <small>
        By {comment.author.firstName} {comment.author.lastName}
      </small>
    </div>
  );
};

export default Comment;
