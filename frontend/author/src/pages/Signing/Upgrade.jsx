import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUpgradeUser } from "../../hooks/user/useUpgradeUser";
import styles from "./Signing.module.css";

function Upgrade() {
  const { upgradeUser, error, loading } = useUpgradeUser();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    secretPassword: "",
  });

  const togglePassword = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form submitted:", formData);
      await upgradeUser(formData);
    } catch (err) {
      console.error("Upgrade failed:", err);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.upgradeInfo}>
        <h2> To access this website, you must be an author </h2>
        <p> Enter a secret password to become an author </p>
        <p>
          To get the secret password translate this phrase:
          <em> j'aime écrire </em> (no spaces, no capital letters).
        </p>
      </div>
      {error && (
        <div style={{ color: "red" }}>
          {error.map((err, i) => (
            <p key={i}>{err.msg}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className={styles.upgradeForm}>
        <div className={styles.inputForm}>
          <label htmlFor="password">Secret Password: </label>
          <div className={styles.inputIconContainer}>
            <input
              type={passwordVisible ? "text" : "password"}
              name="secretPassword"
              id="password"
              value={formData.secretPassword}
              onChange={handleInputChange}
              required
              minLength="3"
            />
            <span
              className={styles.togglePassword}
              onClick={() => togglePassword("password")}
            >
              {passwordVisible ? "🙈" : "🙉"}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? "Upgrading..." : "Upgrade"}
        </button>
      </form>
    </div>
  );
}

export default Upgrade;
