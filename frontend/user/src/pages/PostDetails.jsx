import { useParams } from "react-router-dom";
import { usePost } from "../hooks/useAPI";
import CommentForm from "../components/CommentForm";
import { NavLink } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

function PostDetails() {
  const { user } = useAuth();
  const { postId } = useParams(); // get :postId from URL
  const { post, loading, error, refetch } = usePost(postId);

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
        <div className="user-comment">
          {user ? (
            <CommentForm postId={postId} onCommentCreated={refetch} />
          ) : (
            <>
              <div>You have to login to leave comments</div>
              <NavLink to="/login" className="navLink">
                Login now
              </NavLink>
            </>
          )}
        </div>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.content}</p>
              <small>
                By {comment.author.firstName} {comment.author.lastName}
              </small>
            </div>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </div>
  );
}

export default PostDetails;
