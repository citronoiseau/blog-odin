import { useState, useEffect } from "react";
import postAPI from "../../utils/API/postAPI";

export function useAuthorPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    postAPI
      .fetchAuthorPosts(user.id)
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}
