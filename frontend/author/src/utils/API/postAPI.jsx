const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

class PostAPI {
  async fetchAuthorPosts(token) {
    const response = await fetch(`${API_BASE}/posts/my-posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    return response.json();
  }

  async fetchPostById(postId) {
    const response = await fetch(`${API_BASE}/posts/${postId}`);
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    return response.json();
  }
}

export default new PostAPI();
