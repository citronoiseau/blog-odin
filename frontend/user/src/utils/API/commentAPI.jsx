const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

class commentAPI {
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

  async updateComment(commentId, commentData, postId) {
    const token = localStorage.getItem("jwt");
    const response = await fetch(
      `${API_BASE}/posts/${postId}/comments/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(commentData),
      }
    );

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

  async deleteComment(commentId, postId) {
    const token = localStorage.getItem("jwt");
    const response = await fetch(
      `${API_BASE}/posts/${postId}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

export default new commentAPI();
