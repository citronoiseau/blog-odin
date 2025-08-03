import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userAPI from "../../utils/API/userAPI";
import { useAuth } from "../../utils/AuthContext";
import { useToast } from "../../utils/ToastContext";

export function useLoginUser() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useAuth();

  const loginUser = async (userdata) => {
    setError(null);
    try {
      const result = await userAPI.login(userdata);
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
