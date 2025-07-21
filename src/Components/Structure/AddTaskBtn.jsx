/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styles from "./AddTaskBtn.module.scss";
import { nanoid } from "nanoid";

const LOCAL_STORAGE_KEY = "AllTasks";

const defaultForm = {
  title: "",
  description: "",
  priority: "",
  status: null,
  project: "",
  dueDate: "",
};

const AddTaskBtn = () => {
  const [formData, setFormData] = useState(defaultForm);
  const [dateLabel, setDateLabel] = useState(""); // NEW: store display label
  const [showDateOptions, setShowDateOptions] = useState(false);
  const [showPriorityOptions, setShowPriorityOptions] = useState(false);
  const [btnClick, setBtnClick] = useState(false);

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addtask = () => setBtnClick(true);
  const close = () => setBtnClick(false);

  const cardStyle = {
    display: btnClick ? "block" : "none",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Converts label to real date string
  const getDateFromLabel = (label) => {
    const today = new Date();

    switch (label) {
      case "Today":
        return today.toLocaleDateString("en-CA"); // ✅ Local, correct

      case "Tomorrow":
        today.setDate(today.getDate() + 1); // ✅ Only +1
        return today.toLocaleDateString("en-CA");

      case "This Weekend": {
        const day = today.getDay(); // 0 = Sunday
        const daysUntilSaturday = (6 - day + 7) % 7 || 7;
        today.setDate(today.getDate() + daysUntilSaturday);
        return today.toLocaleDateString("en-CA");
      }

      case "Next Week":
        today.setDate(today.getDate() + 7);
        return today.toLocaleDateString("en-CA");

      default:
        return "";
    }
  };

  // ✅ Save date & label
  const handleDateSelect = (label) => {
    const actualDate = getDateFromLabel(label);
    setFormData((prev) => ({ ...prev, dueDate: actualDate }));
    setDateLabel(label); // show friendly label
    setShowDateOptions(false);
  };

  const handlePrioritySelect = (label) => {
    setFormData((prev) => ({ ...prev, priority: label }));
    setShowPriorityOptions(false);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (formData.title.trim() === "") return;

    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const currentTasks = stored ? JSON.parse(stored) : [];

    const newTask = {
      id: nanoid(),
      ...formData,
      status: true,
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = [...currentTasks, newTask];

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
    window.dispatchEvent(new Event("AllTasksUpdated"));

    setFormData(defaultForm);
    setDateLabel("");
  };

  return (
    <>
      <div className={styles.card} style={cardStyle}>
        <form onSubmit={handleAddTask} className={styles.form}>
          <input
            className={styles.title}
            name="title"
            placeholder="Task title..."
            value={formData.title}
            onChange={handleChange}
          />

          <div className={styles.actions}>
            {/* Due Date Dropdown */}
            <div className={styles.dropdownWrapper}>
              <button
                type="button"
                className={styles.dateBtn}
                onClick={() => setShowDateOptions(!showDateOptions)}
              >
                {dateLabel || "Set Due Date"}
              </button>
              {showDateOptions && (
                <div className={styles.dropdown}>
                  <div onClick={() => handleDateSelect("Today")}>Today</div>
                  <div onClick={() => handleDateSelect("Tomorrow")}>
                    Tomorrow
                  </div>
                  <div onClick={() => handleDateSelect("This Weekend")}>
                    This Weekend
                  </div>
                  <div onClick={() => handleDateSelect("Next Week")}>
                    Next Week
                  </div>
                  <div onClick={() => handleDateSelect("")}>No Due Date</div>
                </div>
              )}
            </div>

            {/* Priority Dropdown */}
            <div className={styles.dropdownWrapper}>
              <button
                type="button"
                className={styles.dateBtn}
                onClick={() => setShowPriorityOptions(!showPriorityOptions)}
              >
                {formData.priority || "Set Priority"}
              </button>
              {showPriorityOptions && (
                <div className={styles.dropdown}>
                  <div onClick={() => handlePrioritySelect("priority-1")}>
                    Priority-1
                  </div>
                  <div onClick={() => handlePrioritySelect("priority-2")}>
                    Priority-2
                  </div>
                  <div onClick={() => handlePrioritySelect("priority-3")}>
                    Priority-3
                  </div>
                  <div onClick={() => handlePrioritySelect("")}>
                    No Priority
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={styles.priorityPreview}>
            <span
              className={`${styles.dot} ${
                formData.priority === "priority-1"
                  ? styles.red
                  : formData.priority === "priority-2"
                  ? styles.orange
                  : formData.priority === "priority-3"
                  ? styles.blue
                  : styles.green
              }`}
            ></span>
            {formData.priority || "No Priority"}
          </div>

          <label className={styles.label}>Description</label>
          <textarea
            className={styles.textarea}
            name="description"
            placeholder="Your description..."
            value={formData.description}
            maxLength={50}
            onChange={handleChange}
          />

          <div className={styles.bottomBtns}>
            <button onClick={close} type="button" className={styles.backBtn}>
              Cancel
            </button>

            <button type="submit" className={styles.nextBtn}>
              Add task
            </button>
          </div>
        </form>
      </div>

      <button onClick={addtask} className={styles.addTask}>
        +
      </button>
    </>
  );
};

export default AddTaskBtn;
