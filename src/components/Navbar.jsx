import React from "react";
import styles from "./Navbar.module.css";

const NAV_LINKS = ["Internships", "Jobs", "Courses", "Fresher Jobs"];

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          intern<span className={styles.logoAccent}>shala</span>
        </div>

        <nav className={styles.links}>
          {NAV_LINKS.map((label) => (
            <a key={label} className={styles.link} href="#" aria-label={label}>
              {label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button className={styles.btnOutline}>Login</button>
          <button className={styles.btnPrimary}>Register</button>
        </div>
      </div>
    </header>
  );
}
