
import React from 'react';
import styles from './Home.module.scss'
// eslint-disable-next-line no-unused-vars
const TaskCard = ({ title, description, priority = "mid", onDelete }) => {
  return (
    <div className={`${styles.card} ${styles[priority]}`}>
      <div className={styles.info}>
        <div className={styles.title}>hhhh</div>
        <div className={styles.desc}>nothing as such</div>
      </div>
      <div className={styles.close} onClick={onDelete}>✕</div>
    </div>
  );
};

export default TaskCard;
