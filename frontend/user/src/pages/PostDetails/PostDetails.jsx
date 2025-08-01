import { useParams } from "react-router-dom";
import { usePost } from "../../hooks/useAPI";
import CommentForm from "../../components/CommentForm";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import Comment from "../../components/Comment";
import styles from "./PostDetails.module.css";

function PostDetails() {
  const { user } = useAuth();
  const { postId } = useParams();
  const { post, loading, error, refetch } = usePost(postId);

  if (loading) return <div>Loading post...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div className={styles["post-container"]}>
      <NavLink to="/" className={styles.navLink}>
        Go back
      </NavLink>
      <div className={styles["post-info"]}>
        <h1>{post.title}</h1>
        <p className={styles["content-info"]}>{post.content}</p>
        <p className={styles["author-info"]}>
          Author: {post.author.firstName} {post.author.lastName}
        </p>
      </div>

      <div className={styles["post-comments"]}>
        <div className={styles["user-comment"]}>
          {user ? (
            <CommentForm postId={postId} onCommentCreated={refetch} />
          ) : (
            <div className={styles["login-form"]}>
              <div>You have to login to leave comments</div>
              <NavLink to="/login" className={styles.navLink}>
                Login now
              </NavLink>
            </div>
          )}
        </div>
        <div className={styles["comments-container"]}>
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                currentUserId={user?.id}
                onCommentUpdate={refetch}
                postId={postId}
              />
            ))
          ) : (
            <p>No comments yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
