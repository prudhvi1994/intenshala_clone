import React from "react";
import { getInitials, getLogoColors, formatLocations } from "../utils/helpers";
import styles from "./InternshipCard.module.css";

function Badge({ label, variant = "gray" }) {
  return (
    <span className={`${styles.badge} ${styles[`badge_${variant}`]}`}>
      {label}
    </span>
  );
}

export default function InternshipCard({ internship }) {
  const {
    id,
    title,
    company_name,
    profile_name,
    work_from_home,
    start_date,
    duration,
    stipend,
    posted_on,
    location_names,
    is_ppo,
    part_time,
  } = internship;

  const { bg, text } = getLogoColors(id);
  const initials = getInitials(company_name);

  return (
    <article className={styles.card}>
      {/* WFH tag */}
      {work_from_home && (
        <div className={styles.wfhTag}>
          <i className="ti ti-home" aria-hidden="true" /> Work from home
        </div>
      )}

      <div className={styles.top}>
        {/* Logo */}
        <div className={styles.logo} style={{ background: bg, color: text }}>
          {initials}
        </div>

        {/* Main info */}
        <div className={styles.info}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.company}>{company_name}</p>

          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <i className="ti ti-map-pin" aria-hidden="true" />
              {formatLocations(location_names)}
            </span>
            <span className={styles.metaItem}>
              <i className="ti ti-clock" aria-hidden="true" />
              {duration}
            </span>
            <span className={styles.metaItem}>
              <i className="ti ti-calendar" aria-hidden="true" />
              {start_date}
            </span>
          </div>
        </div>

        {/* Stipend */}
        <div className={styles.stipendBlock}>
          <div className={styles.stipendValue}>{stipend.salary}</div>
          <div className={styles.stipendSub}>stipend</div>
        </div>
      </div>

      {/* Badges + action row */}
      <div className={styles.bottom}>
        <div className={styles.badges}>
          {is_ppo && <Badge label="PPO" variant="green" />}
          {part_time && <Badge label="Part-time" variant="blue" />}
          {work_from_home && <Badge label="Remote" variant="amber" />}
          <Badge label={profile_name} variant="gray" />
        </div>

        <div className={styles.footerRight}>
          <span className={styles.posted}>Posted: {posted_on}</span>
          <button className={styles.applyBtn}>Apply now</button>
        </div>
      </div>
    </article>
  );
}
