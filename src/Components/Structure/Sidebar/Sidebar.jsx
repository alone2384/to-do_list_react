import React, { useRef, useState } from "react";
import styles from "./Sidebar.module.scss";
import { NavLink, Link } from "react-router-dom";

// icons
import { FaToriiGate } from "react-icons/fa";
import { MdOutlineQueuePlayNext } from "react-icons/md";
import { BsListStars } from "react-icons/bs";
import { RiHome4Line } from "react-icons/ri";
import { FaRegNoteSticky } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";

const Sidebar = () => {
  const activeLink = ({ isActive }) =>
    isActive ? `${styles.navItem} ${styles.active}` : styles.navItem;

  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("userImage") ||
      "https://images.unsplash.com/photo-1635107510862-53886e926b74?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );

  // eslint-disable-next-line no-unused-vars
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("userImage", reader.result);
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.sidebar}>
      {/* USER INFO */}
      <NavLink to="/Profile">
        <div className={styles.userProfile}>
          <img
            src={profileImage}
            alt="Profile"
            className={styles.pfp}
            style={{ cursor: "pointer" }}
            title="Click to change profile picture"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <span className={styles.userName}>
            {JSON.parse(localStorage.getItem("userArr") || "[]")?.at(-1)
              ?.username || "Guest"}
          </span>
        </div>
      </NavLink>

      <br />
      <br />
      <hr className={styles.divider} />

      {/* SEARCH BAR */}
      <input type="text" placeholder="Search..." className={styles.searchBar} />

      <div className={styles.btmArea}>
        <hr className={styles.divider} />

        {/* NAVIGATION */}
        <NavLink to="/home" className={activeLink}>
          <RiHome4Line className={styles.iconHome} /> &nbsp; Home
        </NavLink>
        <NavLink to="/today" className={activeLink}>
          <FaToriiGate /> &nbsp; Today
        </NavLink>
        <NavLink to="/upcoming" className={activeLink}>
          <MdOutlineQueuePlayNext className={styles.iconUpcoming} /> &nbsp;
          Upcoming
        </NavLink>
        <NavLink to="/backlog" className={activeLink}>
          <BsListStars className={styles.iconBacklog} /> &nbsp; Backlog
        </NavLink>

        <hr className={styles.divider} />

        {/* SECONDARY NAV */}
        <NavLink to="/favcards" className={activeLink}>
          <span className={styles.iconFav}>⭐</span> &nbsp; Not sure
        </NavLink>
        <NavLink to="/stickywall" className={activeLink}>
          <FaRegNoteSticky className={styles.iconSticky} /> &nbsp; Not sure
        </NavLink>
        <NavLink to="/pomodoro" className={activeLink}>
          <span className={styles.iconPomodoro}> ⏱ </span> &nbsp; Not sure
        </NavLink>
        <hr className={styles.divider} />

        {/* PRIORITY LABELS */}
        <NavLink
          to="/pri1"
          className={({ isActive }) =>
            isActive
              ? `${styles.priorityRow} ${styles.active}`
              : styles.priorityRow
          }
        >
          <span className={`${styles.dot} ${styles.p1}`}></span>
          <span className={styles.priorityLabel}>Priority-1 </span>
          <span className={styles.count}>{Math.floor(Math.random() * 10)}</span>
        </NavLink>
        <NavLink
          to="/pri2"
          className={({ isActive }) =>
            isActive
              ? `${styles.priorityRow} ${styles.active}`
              : styles.priorityRow
          }
        >
          <span className={`${styles.dot} ${styles.p2}`}></span>
          <span className={styles.priorityLabel}>Priority-2 </span>
          <span className={styles.count}>{Math.floor(Math.random() * 10)}</span>
        </NavLink>
        <NavLink
          to="/pri3"
          className={({ isActive }) =>
            isActive
              ? `${styles.priorityRow} ${styles.active}`
              : styles.priorityRow
          }
        >
          <span className={`${styles.dot} ${styles.p3}`}></span>
          <span className={styles.priorityLabel}>Priority-3 </span>
          <span className={styles.count}>{Math.floor(Math.random() * 10)}</span>
        </NavLink>

        <hr className={styles.divider} />

        {/* SETTINGS + SIGN OUT */}
        <div className={styles.logAndSettings}>
          <NavLink to="/settings" className={activeLink}>
            <IoSettingsOutline className={styles.iconSettings} /> &nbsp;
            Settings
          </NavLink>
          {/* logout */}
          {/* <NavLink
            to="/login"
            className={activeLink}
            onClick={() => {
              localStorage.clear();
              localStorage.setItem("loginCheck", "0");
              window.location.reload();
            }}
          >
            <TbLogout className={styles.iconLogout} /> &nbsp; Log Out
          </NavLink> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
