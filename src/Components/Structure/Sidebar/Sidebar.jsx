import React from "react";
import styles from "./Sidebar.module.scss";
import { NavLink,Link } from "react-router-dom";

const Sidebar = () => {
  const activeLink = ({ isActive }) =>
    isActive ? `${styles.navItem} ${styles.active}` : styles.navItem;

  return (
    <div className={styles.sidebar}>
      {/* USER INFO */}
      <div className={styles.userProfile}>
        <img
          src="https://images.unsplash.com/photo-1635107510862-53886e926b74?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Profile"
          className={styles.pfp}
        />
        <span className={styles.userName}>Sampurn</span>
      </div>

      <br />
      <br />
      <hr className={styles.divider} />

      <div className={styles.btmArea}>
        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchBar}
        />

        <hr className={styles.divider} />

        {/* NAVIGATION */}
        <NavLink to="/today" className={activeLink}>⛩️ Today</NavLink>
        <NavLink to="/upcoming" className={activeLink}>📅 Upcoming</NavLink>
        <NavLink to="/backlog" className={activeLink}>📥 Backlog</NavLink>
        <NavLink to="/home" className={activeLink}>🏠 Home</NavLink>

        <hr className={styles.divider} />

        {/* SECONDARY NAV */}
        <NavLink to="/favcards" className={activeLink}>⭐ Fav Cards</NavLink>
        <NavLink to="/stickywall" className={activeLink}>🧱 Stickywall</NavLink>
        <NavLink to="/pomodoro" className={activeLink}>⏱ Pomodoro Timer</NavLink>

        <hr className={styles.divider} />

        {/* PRIORITY LABELS */}
        <div className={styles.sectionTitle}>&emsp;Priority</div>
        <NavLink to="/pri1" className={styles.priorityRow}>
          <span className={`${styles.dot} ${styles.p1}`}></span>
          <span className={styles.priorityLabel}>P1 - Urgent</span>
          <span className={styles.count}>3</span>
        </NavLink>
        <NavLink to="/pri2" className={styles.priorityRow}>
          <span className={`${styles.dot} ${styles.p2}`}></span>
          <span className={styles.priorityLabel}>P2 - Medium</span>
          <span className={styles.count}>6</span>
        </NavLink>
        <NavLink to="/pri3" className={styles.priorityRow}>
          <span className={`${styles.dot} ${styles.p3}`}></span>
          <span className={styles.priorityLabel}>P3 - Low</span>
          <span className={styles.count}>2</span>
        </NavLink>

        {/* SETTINGS + SIGN OUT */}
        <NavLink to="/settings" className={activeLink}>⚙️ Settings</NavLink>
        <NavLink to="/login" className={activeLink}>🚪 Sign Out</NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
