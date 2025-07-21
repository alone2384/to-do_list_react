import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { SiTicktick } from "react-icons/si";

const STORAGE_KEY = "AllTasks";

const Home = () => {
  const [saved, setSaved] = useState([]);
  const [Taskcount, setTaskcount] = useState(0);

  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setSaved(tasks);
  };

  const markTaskInactive = (taskId) => {
    const updated = saved.map((task) =>
      task.id === taskId ? { ...task, status: false } : task
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSaved(updated);
    window.dispatchEvent(new Event("AllTasksUpdated"));
  };

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

  useEffect(() => {
    const activetask = saved.filter((task) => task.status !== false);
    setTaskcount(activetask.length);
  }, [saved]);

  const today = new Date().toLocaleDateString("en-CA"); // "YYYY-MM-DD"


  const getDateClass = (dueDate) => {
    if (dueDate === "Today") return styles.Todaydate;
    if (dueDate === "Next Week" || dueDate === "This Weekend")
      return styles.Upcomingdate;

    const isValidISO = /^\d{4}-\d{2}-\d{2}$/.test(dueDate);
    if (isValidISO) {
      if (dueDate === today) return styles.Todaydate;
      if (dueDate > today) return styles.Upcomingdate;
      if (dueDate < today) return styles.Backlogdate;
    }

    return styles.Upcomingdate;
  };

  const renderTasks = () =>
    saved
      .filter((task) => task.status !== false)
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
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
            <div className={getDateClass(task.dueDate)}>{task.dueDate}</div>
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
      <h1 className={styles.Today}>Home</h1>
      <h5 className={styles.TaskCounter}>
        <SiTicktick className={styles.tickIcn} />
        &nbsp;{Taskcount}&nbsp;tasks
      </h5>
      <br />
      {Taskcount === 0 ? (
        <p className={styles.noTasks}>No upcoming tasks 🎉</p>
      ) : (
        renderTasks()
      )}
    </div>
  );
};

export default Home;
