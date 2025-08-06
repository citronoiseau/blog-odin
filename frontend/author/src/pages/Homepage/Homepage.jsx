import PostCard from "../../components/PostCard/PostCard";
import { useAuthorPosts } from "../../hooks/posts/useAuthorPosts";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import styles from "./Homepage.module.css";

function Homepage() {
  const { posts, loading, error } = useAuthorPosts();
  const { user } = useAuth();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.userContainer}>
        {user && (
          <div>
            <h2>
              Welcome, {user.firstName} {user.lastName}
            </h2>
            <div>Below you can see all your posts, edit and delete them</div>
          </div>
        )}
      </div>
      {error && (
        <div className={styles.pageContainer} style={{ color: "red" }}>
          Error: {error}
        </div>
      )}
      <div className={styles.postsContainer}>
        {loading && (
          <div className={styles.pageContainer}>Loading posts...</div>
        )}
        {!loading && posts.length === 0 && (
          <div className={styles.noPosts}> You have no posts yet </div>
        )}
        {!loading &&
          posts.length > 0 &&
          posts.map((post) => <PostCard post={post} key={post.id} />)}
      </div>
      <div className={styles.controls}>
        <NavLink to="/new-post" className={styles.navLink}>
          Create new post
        </NavLink>
      </div>
    </div>
  );
}

export default Homepage;
