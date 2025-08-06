import { NavLink } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import styles from "./Navbar.module.css";

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.primary}>
        <NavLink to="/" end className={styles.navLink}>
          Typpo for Authors
        </NavLink>
      </div>

      <div className={styles.secondary}>
        {user ? (
          <button
            className={`${styles.logoutButton} ${styles.navLink}`}
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/login" className={styles.navLink}>
              Login
            </NavLink>
            <NavLink to="/sign-up" className={styles.navLink}>
              Sign-up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
