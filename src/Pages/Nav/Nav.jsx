import { NavLink } from "react-router-dom";
import Logo from "../../Components/Logo/Logo";
import styles from "./Nav.module.css";
import { useAuth } from "../../Contexts/FakeAuthContext";

function Nav() {
  const { isAuthenticated } = useAuth();
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        {isAuthenticated || (
          <li>
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
