import React from "react";

const Backlog = () => {
  return (
    <div>
      {" "}
      <button
        onClick={() => {
          const saved = localStorage.getItem("AllTasks ");
          if (saved) {
            const tasks = JSON.parse(saved);
            const TASKS = tasks.map((task) => task);
            console.log("All Task TASKS:", TASKS);
          }
        }}
      >
        Show Saved Tasks
      </button>
    </div>
  );
};

export default Backlog;
