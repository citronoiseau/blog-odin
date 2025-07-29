import { NavLink } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.primary}>
        <NavLink to="/" end className={styles.navLink}>
          Bloggo
        </NavLink>
      </div>

      <div className={styles.secondary}>
        {user ? (
          <button className={styles.logoutButton} onClick={logout}>
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/login" className={styles.navLink}>
              Login
            </NavLink>
            <NavLink to="/sign-up" className={styles.navLink}>
              Signup
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
