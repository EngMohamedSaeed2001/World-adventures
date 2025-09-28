import { Outlet } from "react-router-dom";
import styles from "./SidebarComp.module.css";
import NavApp from "../NavApp/NavApp";
import Logo from "../Logo/Logo";
function SidebarComp() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <NavApp />
      <Outlet />
    </div>
  );
}

export default SidebarComp;
