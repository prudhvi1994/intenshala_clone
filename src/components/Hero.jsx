import React from "react";
import styles from "./Hero.module.css";

export default function Hero({ search, onSearch }) {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>Find your dream internship</h1>
        <p className={styles.sub}>
          Explore thousands of internships across profiles, cities and top companies
        </p>

        <div className={styles.searchBar}>
          <i className={`ti ti-search ${styles.searchIcon}`} aria-hidden="true" />
          <input
            className={styles.input}
            type="text"
            placeholder="Search by profile, company or location…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search internships"
          />
          {search && (
            <button
              className={styles.clearBtn}
              onClick={() => onSearch("")}
              aria-label="Clear search"
            >
              <i className="ti ti-x" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className={styles.stats}>
          <span><strong>10,000+</strong> active internships</span>
          <span className={styles.dot}>·</span>
          <span><strong>5,000+</strong> companies</span>
          <span className={styles.dot}>·</span>
          <span><strong>100+</strong> profiles</span>
        </div>
      </div>
    </section>
  );
}
