import React from "react";
import "./Structure.scss";

import Sidebar from "./Sidebar/Sidebar";

const structure = () => {
  return (
    <>
      <div id="mainarea">
        <div id="structureleft">
        <Sidebar/>
        </div>
        <div id="structuremid">mid</div>
        <div id="structureright"></div>
      </div>
    </>
  );
};

export default structure;
