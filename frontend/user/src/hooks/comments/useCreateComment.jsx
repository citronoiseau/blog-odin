import { useState } from "react";
import { useNavigate } from "react-router-dom";
import commentAPI from "../../utils/API/commentAPI";
import { useToast } from "../../utils/ToastContext";
import { useAuth } from "../../utils/AuthContext";
import { isTokenExpired } from "../../utils/jwt";

export function useCreateComment() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { token } = useAuth();

  const createComment = async (commentdata, postId, onCommentCreated) => {
    if (!token || isTokenExpired(token)) {
      logout();
      navigate("/login");
      return;
    }
    setError(null);
    try {
      const result = await commentAPI.createComment(commentdata, postId);
      showToast(result.message, false, 3000);
      if (onCommentCreated) {
        onCommentCreated();
      }
    } catch (err) {
      if (err.errors) {
        setError(err.errors);
      } else {
        setError([{ msg: err.message || "Comment creation failed" }]);
      }
      throw err;
    }
  };

  return { createComment, error };
}
