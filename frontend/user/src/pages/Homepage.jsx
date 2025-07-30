import PostCard from "../components/PostCard";
import { usePosts } from "../hooks/useAPI";
import { useAuth } from "../utils/AuthContext";

function Homepage() {
  const { posts, loading, error } = usePosts();
  const { user } = useAuth();

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  console.log(posts);
  return (
    <div>
      {user && (
        <div className="userContainer">
          <h2>
            Welcome {user.firstName} {user.lastName}
          </h2>
        </div>
      )}
      <div className="postsContainer">
        {posts.length === 0 ? (
          <div>No posts found</div>
        ) : (
          posts.map((post) => <PostCard post={post} key={post.id} />)
        )}
      </div>
    </div>
  );
}

export default Homepage;
