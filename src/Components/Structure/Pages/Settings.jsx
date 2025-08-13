import React from "react";
import ThemeToggle from "./ThemeToggle";
import styles from "./settings.module.scss";

const Settings = () => {
  return (
    <div>
      <ThemeToggle />
      <div className={styles.themeBox}>
        <h1>🌈 Theme Switcher Working!</h1>
        <p>This color updates live based on your selected theme.</p>
      </div>
    </div>
  );
};

export default Settings;
