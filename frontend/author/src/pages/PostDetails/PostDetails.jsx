import { useParams } from "react-router-dom";
import { usePost } from "../../hooks/posts/usePost";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import Comment from "../../components/Comment/Comment";
import styles from "./PostDetails.module.css";
import DOMPurify from "dompurify";

function PostDetails() {
  const { user } = useAuth();
  const { postId } = useParams();
  const { post, loading, error, refetch } = usePost(postId);

  if (loading) return <div>Loading post...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div className={styles.postContainer}>
      <NavLink to="/" className={styles.navLink}>
        Go back
      </NavLink>
      <div className={styles.postInfo}>
        <h1>{post.title}</h1>
        <div
          className={styles.contentInfo}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        ></div>
        <p className={styles.authorInfo}>
          Author: {post.author.firstName} {post.author.lastName}
        </p>
      </div>

      <div className={styles.postComments}>
        <div className={styles.commentsContainer}>
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
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
