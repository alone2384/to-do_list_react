import React from "react";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      {/* USER INFO */}
      <div className={styles.userProfile}>
        <img
          src=""
          alt="Profile"
          className={styles.pfp}
        />
        <span className={styles.userName}>Sampurn</span>
      </div>

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
        <div className={styles.navItem}>⛩️ Today</div>
        <div className={styles.navItem}>📅 Upcoming</div>
        <div className={styles.navItem}>📥 Backlog</div>
        <div className={styles.navItem}>🏠 Home</div>

        <hr className={styles.divider} />

        {/* SECONDARY NAV */}
        <div className={styles.navItem}>⭐ Fav Cards</div>
        <div className={styles.navItem}>🧱 Stickywall</div>
        <div className={styles.navItem}>⏱ Pomodoro Timer</div>

        <hr className={styles.divider} />

        {/* PRIORITY LABELS */}
        <div className={styles.sectionTitle}>&emsp;Priority</div>
        <div className={styles.priorityRow}>
          <span className={`${styles.dot} ${styles.p1}`}></span>
          <span className={styles.priorityLabel}>P1 - Urgent</span>
          <span className={styles.count}>3</span>
        </div>
        <div className={styles.priorityRow}>
          <span className={`${styles.dot} ${styles.p2}`}></span>
          <span className={styles.priorityLabel}>P2 - Medium</span>
          <span className={styles.count}>6</span>
        </div>
        <div className={styles.priorityRow}>
          <span className={`${styles.dot} ${styles.p3}`}></span>
          <span className={styles.priorityLabel}>P3 - Low</span>
          <span className={styles.count}>2</span>
        </div>

        {/* SETTINGS + SIGN OUT */}
        <div className={styles.navItem}>⚙️ Settings</div>
        <div className={styles.navItem}>🚪 Sign Out</div>
      </div>
    </div>
  );
};

export default Sidebar;
