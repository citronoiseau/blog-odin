import PostCard from "../../components/PostCard/PostCard";
import { usePosts } from "../../hooks/useAPI";
import { useAuth } from "../../utils/AuthContext";
import styles from "./Homepage.module.css";

function Homepage() {
  const { posts, loading, error } = usePosts();
  const { user } = useAuth();

  if (loading)
    return <div className={styles.pageContainer}>Loading posts...</div>;
  if (error)
    return (
      <div className={styles.pageContainer} style={{ color: "red" }}>
        Error: {error}
      </div>
    );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.userContainer}>
        {user ? (
          <div>
            <h2>
              Welcome, {user.firstName} {user.lastName}
            </h2>
            <div>Do you want to become an author? Sign up here:</div>
          </div>
        ) : (
          <div>
            <h2>
              {" "}
              Welcome to Typpo! You can read the posts below, but to leave
              comments you have to login.
            </h2>
          </div>
        )}
      </div>
      <div className={styles.postsContainer}>
        {posts.length === 0 ? (
          <div className={styles.noPosts}>No posts found</div>
        ) : (
          posts.map((post) => <PostCard post={post} key={post.id} />)
        )}
      </div>
    </div>
  );
}

export default Homepage;
