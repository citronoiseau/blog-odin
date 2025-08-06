import { useDeleteComment } from "../../hooks/comments/useDeleteComment";
import styles from "./Comment.module.css";

const Comment = ({ comment, onCommentUpdate, postId }) => {
  const { deleteComment, deleteError } = useDeleteComment();

  return (
    <div className={styles.comment}>
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
