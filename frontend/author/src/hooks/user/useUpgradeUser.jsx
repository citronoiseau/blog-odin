import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userAPI from "../../utils/API/userAPI";
import { useToast } from "../../utils/ToastContext";

export function useUpgradeUser() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const upgradeUser = async (secretPassword) => {
    setError(null);
    setLoading(true);
    try {
      const result = await userAPI.upgrade(secretPassword);
      showToast(result.message, false, 3000);
      navigate("/");
    } catch (err) {
      if (err.errors) {
        setError(err.errors);
      } else {
        setError([{ msg: err.message || "Upgrade failed" }]);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { upgradeUser, error, loading };
}
