import { useState, useEffect } from "react";
import postAPI from "../../utils/API/postAPI";
import { useAuth } from "../../utils/AuthContext";

export function useAuthorPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    postAPI
      .fetchAuthorPosts(token)
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}
