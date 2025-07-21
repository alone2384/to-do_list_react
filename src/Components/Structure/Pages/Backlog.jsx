import React, { useEffect, useState } from "react";
import styles from "./home/Home.module.scss";
import { SiTicktick } from "react-icons/si";

// Key used for localStorage
const STORAGE_KEY = "AllTasks";

const Backlog = () => {
  const [saved, setSaved] = useState([]);
  const [DateToday, setDateToday] = useState();

  // Load tasks from localStorage
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
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const formatted = `${yyyy}-${mm}-${dd}`;
    setDateToday(formatted);
  }, []);

  const [Taskcount, setTaskcount] = useState(0);
  useEffect(() => {
    const activeTasks = saved.filter(
      (task) =>
        task.status !== false && task.dueDate && task.dueDate < DateToday
    );
    setTaskcount(activeTasks.length);
  }, [saved, DateToday]);

  const renderTasks = () =>
    saved
      .filter(
        (task) =>
          task.status !== false &&
          task.dueDate && // ignore tasks with empty dueDate
          task.dueDate < DateToday // only today or future
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
            <div className={styles.Backlogdate}>{task.dueDate}</div>
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
      <h1 className={styles.Today}>Forgotten tasks</h1>
      <h5 className={styles.TaskCounter}>
        {" "}
        <SiTicktick className={styles.tickIcn} />
        &nbsp;{Taskcount}&nbsp;tasks
      </h5>
      <br />
      {renderTasks()}
    </div>
  );
};

export default Backlog;
