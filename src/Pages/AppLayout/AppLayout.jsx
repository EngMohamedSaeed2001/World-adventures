import styles from "./AppLayout.module.css";
import SidebarComp from "../../Components/SidebarComp/SidebarComp";
import MapComp from "../../Components/MapComp/MapComp";
import User from "../../Components/User/User";
function AppLayout() {
  return (
    <div className={styles.app}>
      <SidebarComp />
      <MapComp />
      <User />
    </div>
  );
}

export default AppLayout;
