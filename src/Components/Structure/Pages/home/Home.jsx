import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";

// Key used for localStorage
const STORAGE_KEY = "AllTasks";

const Home = () => {
  // State to store tasks from localStorage
  const [saved, setSaved] = useState([]);

  // Load tasks from localStorage into state
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setSaved(tasks);
  };

  // Function to mark a task inactive (set status = false) using task.id
  const markTaskInactive = (taskId) => {
    const updated = saved.map((task) =>
      task.id === taskId ? { ...task, status: false } : task
    );

    // Save back to localStorage and state
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSaved(updated);

    // Notify other components
    window.dispatchEvent(new Event("AllTasksUpdated"));
  };

  // Runs only once: load tasks + set up event listeners
  useEffect(() => {
    loadTasks();

    const updateListener = () => loadTasks();

    const storageListener = (e) => {
      if (e.key === STORAGE_KEY) loadTasks();
    };

    // Attach listeners
    window.addEventListener("AllTasksUpdated", updateListener);
    window.addEventListener("storage", storageListener);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener("AllTasksUpdated", updateListener);
      window.removeEventListener("storage", storageListener);
    };
  }, []);

  // Render active tasks only
  const renderTasks = () =>
    saved
      .filter(
        (task) => task.status !== false // ignore tasks with empty dueDate
        // only today or future
      )
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate)) // optional: sort by nearest date
      .map((task) => (
        <div
          key={task.id}
          className={`${styles.card} ${styles[task.priority || "priority-4"]}`}
        >
          <div className={styles.info}>
            <div className={styles.title}>{task.title}</div>
            <div className={styles.desc}>
              {task.description.length > 20
                ? task.description.slice(0, 20) + "..."
                : task.description}
            </div>
            <div
              className={
                styles[
                  task.dueDate === new Date().toISOString().split("T")[0]
                    ? "Todaydate"
                    : new Date(task.dueDate) > new Date()
                    ? "Upcomingdate"
                    : "Backlogdate"
                ]
              }
            >
              {task.dueDate}
            </div>
          </div>

          <div
            className={styles.close}
            onClick={() => markTaskInactive(task.id)}
            title="Mark as Inactive"
            style={{ cursor: "pointer" }}
          >
            ✕
          </div>
        </div>
      ));

  // Final render
  return (
    <div className={styles.mainArea}>
      <h1 className={styles.Today}>Home </h1>
      {renderTasks()}
    </div>
  );
};

export default Home;
