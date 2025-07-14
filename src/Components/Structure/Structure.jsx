import React, { useState, useEffect } from "react";
import styles from "./Structure.module.scss";
import { HiOutlineMenu } from "react-icons/hi";


import Sidebar from "./Sidebar/Sidebar";
import MainPage from "./Pages/AMainPage"; // or MainPage if you renamed
import AddTaskBtn from "./AddTaskBtn";

const Structure = () => {
  const [toggling, setToggling] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggle = () => {
    setToggling((prev) => (prev === 0 ? 1 : 0));
  };

  const handleMidClick = () => {
    if (isMobile && toggling === 0) {
      setToggling(1); // Close sidebar
    }
  };

  const Leftstyle = {
    left: toggling === 0 ? "0" : isMobile ? "-65%" : "-17%",
    position: "absolute",
    transition: "left 0.3s ease",
  };

  const menuBtnStyle = {
    position: "absolute",
    left: toggling === 0 ? "80%" : "105%",
    transition: "left 0.3s ease",
  };

  return (
    <div className={styles.mainarea}>
      <div className={styles.structureLeft} style={Leftstyle}>
        <Sidebar />
        <button
          className={styles.menuBtn}
          style={menuBtnStyle}
          onClick={toggle}
        >
          <HiOutlineMenu />
        </button>
      </div>

      <div className={styles.structureMid} onClick={handleMidClick}>
        <AddTaskBtn/>
        <MainPage />
      </div>
    </div>
  );
};

export default Structure;
