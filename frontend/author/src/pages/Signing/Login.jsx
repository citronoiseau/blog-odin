import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLoginUser } from "../../hooks/user/useLoginUser";
import styles from "./Signing.module.css";

function Login() {
  const { loginUser, error, loading } = useLoginUser();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      await loginUser(formData);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className={styles.formContainer}>
      {error && (
        <div style={{ color: "red" }}>
          {error.map((err, i) => (
            <p key={i}>{err.msg}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2> Login</h2>
        <div className={styles.inputForm}>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputForm}>
          <label htmlFor="password">Password: </label>
          <div className={styles.inputIconContainer}>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength="3"
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$"
              title="Password must be at least 3 characters and contain at least one letter and one number"
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className={styles.linksContainer}>
        <p>
          Not registered?{" "}
          <NavLink to="/sign-up" className={styles.navLink}>
            Sign-up now
          </NavLink>
        </p>
        <NavLink to="/" className={styles.navLink}>
          Homepage
        </NavLink>
      </div>
    </div>
  );
}

export default Login;
