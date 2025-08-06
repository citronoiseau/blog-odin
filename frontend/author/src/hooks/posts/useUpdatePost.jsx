import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postAPI from "../../utils/API/postAPI";
import { useToast } from "../../utils/ToastContext";
import { useAuth } from "../../utils/AuthContext";
import { isTokenExpired } from "../../utils/jwt";

export function useUpdatePost() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { token } = useAuth();

  const updatePost = async (postId, postdata) => {
    if (!token || isTokenExpired(token)) {
      logout();
      navigate("/login");
      return;
    }
    setError(null);
    try {
      const result = await postAPI.updatePost(postId, postdata);
      showToast(result.message, false, 3000);
      navigate("/");
    } catch (err) {
      if (err.errors) {
        setError(err.errors);
      } else {
        setError([{ msg: err.message || "Post creation failed" }]);
      }
      throw err;
    }
  };

  return { updatePost, error };
}
