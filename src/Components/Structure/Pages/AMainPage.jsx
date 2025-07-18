import React from "react";

import Home from "./home/Home";
import Today from "./Today";
import Upcoming from "./Upcoming";
import Backlog from "./Backlog";
import FavCards from "./FavCards";
import Stickywall from "./Stickywall";
import Pomodoro from "./Pomodoro";
import Settings from "./Settings";
import Pri1 from "./Pri1";
import Pri2 from "./Pri2";
import Pri3 from "./Pri3";

import styles from "./AMainPage.module.scss"
import { Routes, Route } from "react-router-dom";

const MainPage = () => {
  return (
    <div className={styles.WorkingArea}>
      <Routes>
         {/* Default page */}
        <Route index element={<Home />} />

        <Route path="/Today" element={<Today />} />
        <Route path="Home" element={<Home />} />
        <Route path="/Upcoming" element={<Upcoming />} />
        <Route path="/Backlog" element={<Backlog />} />
        <Route path="/FavCards" element={<FavCards />} />
        <Route path="/Stickywall" element={<Stickywall />} />
        <Route path="/Pomodoro" element={<Pomodoro />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Pri1" element={<Pri1 />} />
        <Route path="/Pri2" element={<Pri2 />} />
        <Route path="/Pri3" element={<Pri3 />} />
       
      </Routes>
    </div>
  );
};

export default MainPage;
