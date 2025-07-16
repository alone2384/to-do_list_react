// AddTaskBtn.jsx

import React, { useState } from "react";
import styles from "./AddTaskBtn.module.scss";
import { nanoid } from "nanoid";

// Default structure for a new task form
const defaultForm = {
  title: "",
  description: "",
  priority: "None",
  status: "pending",
  // pinned: false,
  // starred: false,
  project: "",
  dueDate: "",
};

const AddTaskBtn = () => {
  // State to store the list of tasks
  const [todos, setTodos] = useState([]);

  // State to manage current form input values
  const [formData, setFormData] = useState(defaultForm);

  // State to toggle visibility of the due date dropdown
  const [showDateOptions, setShowDateOptions] = useState(false);

  // Handles input changes for text, select, and checkbox fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Sets a due date based on the selected label
  const handleDateSelect = (label) => {
    let date = new Date();

    switch (label) {
      case "Today":
        break; // No change needed
      case "Tomorrow":
        date.setDate(date.getDate() + 1);
        break;
      case "This Weekend":
        // Sets date to Saturday of the current week
        date.setDate(date.getDate() + (6 - date.getDay()));
        break;
      case "Next Week":
        // Sets date to next Monday
        date.setDate(date.getDate() + (8 - date.getDay()));
        break;
      default:
        return;
    }

    // Set ISO date string to dueDate field in form data
    const isoDate = date.toISOString();
    setFormData((prev) => ({ ...prev, dueDate: isoDate }));

    // Hide the dropdown after selection
    setShowDateOptions(false);
  };

  // Handles the form submission and adds the task
  const handleAddTask = (e) => {
    e.preventDefault();

    const newTask = {
      id: nanoid(), // Unique ID for the task
      ...formData,
      createdAt: new Date().toISOString(),
      // updatedAt: new Date().toISOString(),
    };

    // Add new task to the task list and log it
    setTodos((prev) => {
      const updated = [...prev, newTask];
      console.log("Array of task objects:", updated);
      return updated;
    });

    // Reset form to default values
    setFormData(defaultForm);
  };

  return (
    <div className={styles.card}>
      <form onSubmit={handleAddTask} className={styles.form}>
        {/* Task title input */}
        <input
          className={styles.title}
          name="title"
          placeholder="Task title..."
          value={formData.title}
          onChange={handleChange}
        />

        {/* Top action buttons (like setting due date) */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.dateBtn}
            onClick={() => setShowDateOptions(!showDateOptions)}
          >
            Date
          </button>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className={styles.prioritySelect}
          >
            <option value="">None</option>
            <option value="priority-1">Priority-1</option>
            <option value="priority-2">Priority-2</option>
            <option value="priority-3">Priority-3</option>
          </select>

          {/* Dropdown for quick date options */}
          {showDateOptions && (
            <div className={styles.dropdown}>
              <div onClick={() => handleDateSelect("Today")}>Today</div>
              <div onClick={() => handleDateSelect("Tomorrow")}>Tomorrow</div>
              <div onClick={() => handleDateSelect("This Weekend")}>
                This weekend
              </div>
              <div onClick={() => handleDateSelect("Next Week")}>Next week</div>
            </div>
          )}
        </div>
        {/* Priority Preview with Colored Dot */}
        <div className={styles.prioritybox}>
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
            {formData.priority}
          </div>

          {/* Priority Dropdown */}
        </div>

        {/* Description field */}
        <label className={styles.label}>Description</label>
        <textarea
          className={styles.textarea}
          name="description"
          placeholder="Your description..."
          value={formData.description}
          onChange={handleChange}
        />

        {/* Project input field */}
        {/* <input
          name="project"
          placeholder="Project name"
          value={formData.project}
          onChange={handleChange}
        /> */}

        {/* Navigation buttons */}
        <div className={styles.bottomBtns}>
          <button type="button" className={styles.backBtn}>
            ← Back
          </button>
          <button type="submit" className={styles.nextBtn}>
            ADD TASK
          </button>
        </div>
      </form>

      <button
        onClick={() => {
          console.log(todos);
        }}
      >
        {" "}
        logging tasks
      </button>
    </div>
  );
};

export default AddTaskBtn;
