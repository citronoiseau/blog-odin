const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

class blogAPI {
  async fetchPosts() {
    const response = await fetch(`${API_BASE}/posts`);
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

  async signUp(userData) {
    const response = await fetch(`${API_BASE}/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        errors: data.errors || [{ msg: data.message || "Unknown error" }],
        message: data.message || "Unknown error",
      };
    }

    return data;
  }

  async login(userData) {
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        errors: data.errors || [{ msg: data.message || "Unknown error" }],
        message: data.message || "Unknown error",
      };
    }

    return data;
  }

  async createComment(commentData, postId) {
    const token = localStorage.getItem("jwt");
    const response = await fetch(`${API_BASE}/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(commentData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        errors: data.errors || [{ msg: data.message || "Unknown error" }],
        message: data.message || "Unknown error",
      };
    }

    return data;
  }
}

export default new blogAPI();
