import { useState, useEffect } from "react";
import { useAuth } from "../../utils/AuthContext";
import postAPI from "../../utils/API/postAPI";

export function useAuthorPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchPosts = () => {
    setLoading(true);
    postAPI
      .fetchAuthorPosts(token)
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, [token]);

  return { posts, loading, error, refetch: fetchPosts };
}
