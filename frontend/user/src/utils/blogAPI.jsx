const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export async function fetchPosts() {
  const response = await fetch(`${API_BASE}/posts`);
  if (!response.ok)
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  return response.json();
}

export async function fetchPostById(postId) {
  const response = await fetch(`${API_BASE}/posts/${postId}`);
  if (!response.ok)
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  return response.json();
}
