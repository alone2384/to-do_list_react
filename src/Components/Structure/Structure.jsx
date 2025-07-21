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
    setMovemid(movemid * -1);
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

  const [movemid, setMovemid] = useState(-1);

  const midMotionStyle = {
    // transform: toggle === 1 ? "translate(-10%)" : "translate(0%)",\
    transform: movemid === 1 ? "translate(-10%)" : "translate(0%)",
  };

const Logincheck = {
  display: JSON.parse(localStorage.getItem("loginCheck") || "0") === 1 ? "flex" : "none",
};


  return (
    <div className={styles.mainarea} style={Logincheck}>
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

      <div
        className={styles.structureMid}
        onClick={handleMidClick}
        style={midMotionStyle}
      >
        <AddTaskBtn />
        <MainPage />
      </div>
    </div>
  );
};

export default Structure;
