import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import blogAPI from "../utils/blogAPI";
import { useToast } from "../utils/ToastContext";
import { useAuth } from "../utils/AuthContext";
import { isTokenExpired } from "../utils/jwt";

// getting posts

//getting user
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

export function useLoginUser() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useAuth();

  const loginUser = async (userdata) => {
    setError(null);
    try {
      const result = await blogAPI.login(userdata);
      login(result.token, result.user);
      showToast("Logged in successfully", false, 3000);
      navigate("/");
    } catch (err) {
      if (err.errors) {
        setError(err.errors);
      } else {
        setError([{ msg: err.message || "Login failed" }]);
      }
      throw err;
    }
  };

  return { loginUser, error };
}

export function useLoginUser() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useAuth();

  const loginUser = async (userdata) => {
    setError(null);
    try {
      const result = await blogAPI.login(userdata);
      login(result.token, result.user);
      showToast("Logged in successfully", false, 3000);
      navigate("/");
    } catch (err) {
      if (err.errors) {
        setError(err.errors);
      } else {
        setError([{ msg: err.message || "Login failed" }]);
      }
      throw err;
    }
  };

  return { loginUser, error };
}
