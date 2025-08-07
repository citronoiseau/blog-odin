import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postAPI from "../../utils/API/postAPI";
import { useToast } from "../../utils/ToastContext";
import { useAuth } from "../../utils/AuthContext";
import { isTokenExpired } from "../../utils/jwt";

export function useDeletePost() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { token, logout } = useAuth();

  const deletePost = async (postId) => {
    if (!token || isTokenExpired(token)) {
      logout();
      navigate("/login");
      return;
    }
    setError(null);
    try {
      const result = await postAPI.deletePost(postId);
      showToast(result.message, false, 3000);
    } catch (err) {
      if (err.errors) {
        setError(err.errors);
      } else {
        setError([{ msg: err.message || "Delete failed" }]);
      }
      throw err;
    }
  };

  return { deletePost, error };
}
