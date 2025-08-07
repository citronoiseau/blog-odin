import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSignUser } from "../../hooks/user/useSignUser";
import styles from "./Signing.module.css";

function Signup() {
  const { signUser, error, loading } = useSignUser();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const togglePassword = (field) => {
    if (field === "password") {
      setPasswordVisible((prev) => !prev);
    } else {
      setConfirmPasswordVisible((prev) => !prev);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "passwordConfirmation" || name === "password") {
      setPasswordError(
        name === "passwordConfirmation" && value !== formData.password
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirmation) {
      setPasswordError(true);
      return;
    }
    try {
      console.log("Form submitted:", formData);
      await signUser(formData);
    } catch (err) {
      console.error("Sign-up failed:", err);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <div className={styles.signupInfo}>
          <h2> Sign-up</h2>
          <p>
            Please note: the first login or sign-up may take longer than usual,
            as the free backend hosting needs some time to wake up.
          </p>
        </div>
        {error && (
          <div style={{ color: "red" }}>
            {error.map((err, i) => (
              <p key={i}>{err.msg}</p>
            ))}
          </div>
        )}
        <div className={styles.inputs}>
          <div className={styles.firstColumn}>
            <div className={styles.inputForm}>
              <label htmlFor="first_name">First name: </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.inputForm}>
              <label htmlFor="last_name">Last name: </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
            </div>
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
          </div>
          <div className={styles.secondColumn}>
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

            <div className={styles.inputForm}>
              <label htmlFor="passwordConfirmation">Confirm Password: </label>
              <div className={styles.inputIconContainer}>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  value={formData.passwordConfirmation}
                  onChange={handleInputChange}
                  required
                />
                <span
                  className={styles.togglePassword}
                  onClick={() => togglePassword("passwordConfirmation")}
                >
                  {confirmPasswordVisible ? "🙈" : "🙉"}
                </span>
              </div>
            </div>

            {passwordError && (
              <p style={{ color: "red" }}>Passwords do not match.</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </form>
      <div className={styles.linksContainer}>
        <p>
          Already registered?{" "}
          <NavLink to="/login" className={styles.navLink}>
            Login now
          </NavLink>
        </p>
        <NavLink to="/" className={styles.navLink}>
          Homepage
        </NavLink>
      </div>
    </div>
  );
}

export default Signup;
