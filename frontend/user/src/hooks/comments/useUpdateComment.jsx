import { useState } from "react";
import { useNavigate } from "react-router-dom";
import commentAPI from "../../utils/API/commentAPI";
import { useToast } from "../../utils/ToastContext";
import { useAuth } from "../../utils/AuthContext";
import { isTokenExpired } from "../../utils/jwt";

export function useUpdateComment() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { token } = useAuth();

  const updateComment = async (
    commentId,
    commentdata,
    postId,
    onCommentUpdated
  ) => {
    if (!token || isTokenExpired(token)) {
      logout();
      navigate("/login");
      return;
    }
    setError(null);
    try {
      const result = await commentAPI.updateComment(
        commentId,
        commentdata,
        postId
      );
      showToast(result.message, false, 3000);
      if (onCommentUpdated) {
        onCommentUpdated();
      }
    } catch (err) {
      if (err.errors) {
        setError(err.errors);
      } else {
        setError([{ msg: err.message || "Update failed" }]);
      }
      throw err;
    }
  };

  return { updateComment, error };
}
