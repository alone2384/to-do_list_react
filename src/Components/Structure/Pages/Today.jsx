import React, { useEffect, useState } from "react";
import styles from "./home/Home.module.scss";
import { SiTicktick } from "react-icons/si";

const STORAGE_KEY = "AllTasks";

const Today = () => {
  const [saved, setSaved] = useState([]);
  const [dateToday, setDateToday] = useState("");

  // Load tasks from localStorage
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setSaved(tasks);
  };

  // Mark task inactive
  const markTaskInactive = (taskId) => {
    const updated = saved.map((task) =>
      task.id === taskId ? { ...task, status: false } : task
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSaved(updated);
    window.dispatchEvent(new Event("AllTasksUpdated"));
  };

  // Get today's date in YYYY-MM-DD format
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setDateToday(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Load tasks on mount and when custom event or localStorage changes
  useEffect(() => {
    loadTasks();
    const updateListener = () => loadTasks();
    const storageListener = (e) => {
      if (e.key === STORAGE_KEY) loadTasks();
    };

    window.addEventListener("AllTasksUpdated", updateListener);
    window.addEventListener("storage", storageListener);
    return () => {
      window.removeEventListener("AllTasksUpdated", updateListener);
      window.removeEventListener("storage", storageListener);
    };
  }, []);

  // Count today's tasks
  const [taskCount, setTaskCount] = useState(0);
  useEffect(() => {
    const activeTasks = saved.filter(
      (task) => task.status !== false && task.dueDate === dateToday
    );
    setTaskCount(activeTasks.length);
  }, [saved, dateToday]);

  // Render tasks due today only
  const renderTasks = () =>
    saved
      .filter((task) => task.status !== false && task.dueDate)
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
            <div className={styles.Todaydate}>{task.dueDate}</div>
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

  return (
    <div className={styles.mainArea}>
      <h1 className={styles.Today}>Today</h1>
      <h5 className={styles.TaskCounter}>
        <SiTicktick className={styles.tickIcn} />
        &nbsp;{taskCount}&nbsp;tasks
      </h5>
      <br />
      {renderTasks()}
    </div>
  );
};

export default Today;
