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

  return <div className={styles.pageContainer}></div>;
}

export default Homepage;
