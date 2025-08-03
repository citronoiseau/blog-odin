const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

class blogAPI {
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
}

export default new blogAPI();
