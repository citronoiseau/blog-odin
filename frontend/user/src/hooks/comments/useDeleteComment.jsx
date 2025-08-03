import { useState } from "react";
import { useNavigate } from "react-router-dom";
import commentAPI from "../../utils/API/commentAPI";
import { useToast } from "../../utils/ToastContext";
import { useAuth } from "../../utils/AuthContext";
import { isTokenExpired } from "../../utils/jwt";

export function useDeleteComment() {
  const [deleteError, setError] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { token } = useAuth();

  const deleteComment = async (commentId, postId, onCommentUpdated) => {
    if (!token || isTokenExpired(token)) {
      logout();
      navigate("/login");
      return;
    }
    setError(null);
    try {
      const result = await commentAPI.deleteComment(commentId, postId);
      showToast(result.message, false, 3000);
      if (onCommentUpdated) {
        onCommentUpdated();
      }
    } catch (err) {
      if (err.errors) {
        setError(err.errors);
      } else {
        setError([{ msg: err.message || "Delete failed" }]);
      }
      throw err;
    }
  };

  return { deleteComment, deleteError };
}
