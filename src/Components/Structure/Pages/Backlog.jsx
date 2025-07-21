import React, { useEffect, useState } from "react";
import styles from "./home/Home.module.scss";
import { SiTicktick } from "react-icons/si";

// Key used for localStorage
const STORAGE_KEY = "AllTasks";

const Backlog = () => {
  const [saved, setSaved] = useState([]);
  const [DateToday, setDateToday] = useState("");
  const [Taskcount, setTaskcount] = useState(0);

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

  // Get today's date in YYYY-MM-DD format
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setDateToday(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Load tasks on mount and on event/localStorage update
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

  // Update task count
  useEffect(() => {
    const today = new Date(DateToday);

    const overdue = saved.filter((task) => {
      if (!task.dueDate || task.status === false) return false;

      const taskDate = new Date(task.dueDate);
      return taskDate < today;
    });

    setTaskcount(overdue.length);
  }, [saved, DateToday]);

  // Render overdue tasks only
  const renderTasks = () => {
    const today = new Date(DateToday);

    return saved
      .filter((task) => {
        if (!task.dueDate || task.status === false) return false;

        const taskDate = new Date(task.dueDate);
        return taskDate < today;
      })
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)) // oldest first
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
  };

  return (
    <div className={styles.mainArea}>
      <h1 className={styles.Today}>Forgotten tasks</h1>
      <h5 className={styles.TaskCounter}>
        <SiTicktick className={styles.tickIcn} />
        &nbsp;{Taskcount}&nbsp;tasks
      </h5>
      <br />
      {Taskcount === 0 ? (
        <p className={styles.noTasks}>You're all caught up! 🥳</p>
      ) : (
        renderTasks()
      )}
    </div>
  );
};

export default Backlog;
