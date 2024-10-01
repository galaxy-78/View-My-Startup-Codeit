import { Link, NavLink } from "react-router-dom";
import styles from "./GNB.module.css";

function getLinkStyle({ isActive }) {
  return {
    color: isActive ? "var(--gray-900)" : "var(--gray-700)",
  };
}

function Nav() {
  return (
    <header className={styles.gnb}>
      <div className={styles.gnbContainer}>
        <Link to={"/"}>
          <img className="/images/site-logo.png" src={siteLogo} alt="logo" />
        </Link>
        <div className={styles.navMenus}>
          <NavLink
            className={styles.navLinkStyle}
            to={"/user/:userId/companies"}
            style={getLinkStyle}
          >
            <p className={styles.menu}>전체 기업 리스트</p>
          </NavLink>
          <NavLink
            className={styles.navLinkStyle}
            to={"/user/:userId/my-comparison"}
            style={getLinkStyle}
          >
            <p className={styles.menu}>나의 기업 비교</p>
          </NavLink>
          <NavLink
            className={styles.navLinkStyle}
            to={"/user/:userId/comparison-status"}
            style={getLinkStyle}
          >
            <p className={styles.menu}>비교 현황</p>
          </NavLink>
          <NavLink
            className={styles.navLinkStyle}
            to={"/user/:userId/investment-status"}
            style={getLinkStyle}
          >
            <p className={styles.menu}>투자 현황</p>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Nav;
