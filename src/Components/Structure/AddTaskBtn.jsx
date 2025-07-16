import React, { useState } from "react";
import styles from "./AddTaskBtn.module.scss";
import { nanoid } from "nanoid";

const defaultForm = {
  title: "",
  description: "",
  priority: "",
  status: "pending",
  project: "",
  dueDate: "",
};

const AddTaskBtn = () => {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState(defaultForm);
  const [showDateOptions, setShowDateOptions] = useState(false);
  const [showPriorityOptions, setShowPriorityOptions] = useState(false);
  const [btnClick, setBtnClick] = useState(false);

  const addtask = () => {
    setBtnClick(true);
  };

  const close = () => {
    setBtnClick(false);
  };

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

  const handleDateSelect = (label) => {
    setFormData((prev) => ({ ...prev, dueDate: label }));
    setShowDateOptions(false);
  };

  const handlePrioritySelect = (label) => {
    setFormData((prev) => ({ ...prev, priority: label }));
    setShowPriorityOptions(false);
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (formData.title.trim() === "") {
      return;
    }

    const newTask = {
      id: nanoid(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    setTodos((prev) => [...prev, newTask]);
    setFormData(defaultForm);
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
            <div className={styles.dropdownWrapper}>
              <button
                type="button"
                className={styles.dateBtn}
                onClick={() => setShowDateOptions(!showDateOptions)}
              >
                {formData.dueDate || "Set Due Date"}
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

        <button
          type="button"
          onClick={() => {
            console.log("Current todos array:", todos);
          }}
        >
          Log tasks
        </button>
      </div>

      <button onClick={addtask} className={styles.addTask}>
        +
      </button>
    </>
  );
};

export default AddTaskBtn;
