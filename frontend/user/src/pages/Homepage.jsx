import PostCard from "../components/PostCard";
import { usePosts } from "../hooks/usePosts";

function Homepage() {
  const { posts, loading, error } = usePosts();

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  console.log(posts);
  return (
    <div className="postsContainer">
      {posts.length === 0 ? (
        <div>No posts found</div>
      ) : (
        posts.map((post) => <PostCard post={post} key={post.id} />)
      )}
    </div>
  );
}

export default Homepage;
