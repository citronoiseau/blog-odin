const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

class PostAPI {
  async fetchAuthorPosts(token) {
    const response = await fetch(`${API_BASE}/my-posts`, {
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

  async createPost(postdata) {
    const token = localStorage.getItem("jwt");
    const response = await fetch(`${API_BASE}/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postdata),
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

  async updatePost(postId, postdata) {
    const token = localStorage.getItem("jwt");
    const response = await fetch(`${API_BASE}/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postdata),
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

  async deletePost(postId) {
    const token = localStorage.getItem("jwt");
    const response = await fetch(`${API_BASE}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

export default new PostAPI();
