import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";

const Home = () => {
  const [saved, setSaved] = useState([]);

  const loadTasks = () => {
    const data = localStorage.getItem("AllTasks ");
    setSaved(data ? JSON.parse(data) : []);
  };

  // Toggle status of a task
  const toggleStatus = (index) => {
    const updatedTasks = [...saved];
    updatedTasks[index].status = !updatedTasks[index].status;

    localStorage.setItem("AllTasks ", JSON.stringify(updatedTasks));
    setSaved(updatedTasks);

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("AllTasksUpdated"));
  };

  useEffect(() => {
    loadTasks();

    const handleCustomUpdate = () => {
      loadTasks();
    };

    const handleStorageUpdate = (e) => {
      if (e.key === "AllTasks ") {
        loadTasks();
      }
    };

    const intervalId = setInterval(() => {
      loadTasks();
    }, 200);

    window.addEventListener("AllTasksUpdated", handleCustomUpdate);
    window.addEventListener("storage", handleStorageUpdate);

    return () => {
      window.removeEventListener("AllTasksUpdated", handleCustomUpdate);
      window.removeEventListener("storage", handleStorageUpdate);
      clearInterval(intervalId);
    };
  }, []);

  const renderTasks = () => {
    return saved.map((task, index) =>
      task.status === true ? (
        <div
          key={index}
          className={`${styles.card} ${styles[task.priority || "mid"]}`}
        >
          <div className={styles.info}>
            <div className={styles.title}>{task.title}</div>
            <div className={styles.desc}>{task.description}</div>
          </div>

          {/* Toggle status on click */}
          <div
            className={styles.close}
            onClick={() => toggleStatus(index)}
            title="Toggle Status"
            style={{ cursor: "pointer" }}
          >
            ✕
          </div>
        </div>
      ) : null
    );
  };

  //main returner
  return (
    <>
      <div className={styles.mainArea}>{renderTasks()}</div>
    </>
  );
};

export default Home;
