import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userAPI from "../../utils/API/userAPI";
import { useToast } from "../../utils/ToastContext";

export function useSignUser() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const signUser = async (userdata) => {
    setError(null);
    setLoading(true);
    try {
      const result = await userAPI.signUp(userdata);
      showToast(result.message, false, 3000);
      navigate("/login");
    } catch (err) {
      if (err.errors) {
        setError(err.errors);
      } else {
        setError([{ msg: err.message || "Sign up failed" }]);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { signUser, error };
}
