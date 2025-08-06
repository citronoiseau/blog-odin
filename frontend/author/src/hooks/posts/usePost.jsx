import { useState, useEffect } from "react";
import postAPI from "../../utils/API/postAPI";

export function usePost(postId) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = () => {
    setLoading(true);
    setError(null);
    return postAPI
      .fetchPostById(postId)
      .then(setPost)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  return { post, loading, error, refetch: fetchPost };
}
