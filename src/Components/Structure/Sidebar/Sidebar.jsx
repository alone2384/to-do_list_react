import React from "react";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2>Menu</h2>
      <input type="text" className={styles.search} placeholder="Search" />

      <div className={styles.section}>
        <h4>Tasks</h4>
        <div className={styles.menuItem}>Upcoming <span>12</span></div>
        <div className={`${styles.menuItem} ${styles.bold}`}>Today <span>5</span></div>
        <div className={styles.menuItem}>Calendar</div>
        <div className={styles.menuItem}>Sticky Wall</div>
      </div>

      <div className={`${styles.section} ${styles.lists}`}>
        <h4>Lists</h4>

        <div className={styles.menuItem}>
          <div className={styles.left}>
            <div className={styles.color} style={{ backgroundColor: "red" }}></div>
            <span>Personal</span>
          </div>
          <span>3</span>
        </div>

        <div className={styles.menuItem}>
          <div className={styles.left}>
            <div className={styles.color} style={{ backgroundColor: "cyan" }}></div>
            <span>Work</span>
          </div>
          <span>6</span>
        </div>

        <div className={styles.menuItem}>
          <div className={styles.left}>
            <div className={styles.color} style={{ backgroundColor: "gold" }}></div>
            <span>List 1</span>
          </div>
          <span>3</span>
        </div>

        <div className={styles.menuItem}>+ Add New List</div>
      </div>

      <div className={styles.section}>
        <h4>Tags</h4>
        <div className={styles.tags}>
          <div className={`${styles.tag} ${styles.tag1}`}>Tag 1</div>
          <div className={`${styles.tag} ${styles.tag2}`}>Tag 2</div>
          <div className={`${styles.tag} ${styles.addTag}`}>+ Add Tag</div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div>⚙️ Settings</div>
        <div>🚪 Sign Out</div>
      </div>
    </div>
  );
};

export default Sidebar;
