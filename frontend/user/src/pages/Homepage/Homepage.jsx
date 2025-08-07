import PostCard from "../../components/PostCard/PostCard";
import { usePosts } from "../../hooks/posts/usePosts";
import { useAuth } from "../../utils/AuthContext";
import styles from "./Homepage.module.css";

function Homepage() {
  const { posts, loading, error } = usePosts();
  const { user } = useAuth();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.userContainer}>
        {user ? (
          <div>
            <h2>
              Welcome, {user.firstName} {user.lastName}
            </h2>
            {user.role !== "AUTHOR" ? (
              <div>
                Do you want to become an author?{" "}
                <a
                  href="https://typpo-blog-authors.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sign up here
                </a>
              </div>
            ) : (
              <div>
                You can edit your posts here:{" "}
                <a
                  href="https://typpo-blog-authors.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Author Dashboard
                </a>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2>Welcome to Typpo!</h2>
            <h3>
              You can read the posts below, but to leave comments you have to
              log in.
            </h3>
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
          <div className={styles.noPosts}>No posts found</div>
        )}
        {!loading &&
          posts.length > 0 &&
          posts.map((post) => <PostCard post={post} key={post.id} />)}
      </div>
    </div>
  );
}

export default Homepage;
