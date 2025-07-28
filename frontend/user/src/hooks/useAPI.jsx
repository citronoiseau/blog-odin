import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import blogAPI from "../utils/blogAPI";
import { useToast } from "../utils/ToastContext";

export function usePost(postId) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    blogAPI
      .fetchPostById(postId)
      .then(setPost)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [postId]);

  return { post, loading, error };
}

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    blogAPI
      .fetchPosts()
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}

export function useSignUser() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const signUser = async (userdata) => {
    setError(null);
    try {
      const result = await blogAPI.signUp(userdata);
      showToast(result.message, false, 3000);
      navigate("/login");
    } catch (err) {
      if (err.errors) {
        setError(err.errors);
      } else {
        setError([{ msg: err.message || "Sign up failed" }]);
      }
      throw err;
    }
  };

  return { signUser, error };
}
