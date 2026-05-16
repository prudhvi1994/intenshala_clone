import React, { useState } from "react";
import { FILTER_OPTIONS } from "../data/internships";
import styles from "./FilterSidebar.module.css";

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={styles.section}>
      <button
        className={styles.sectionHeader}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className={styles.sectionTitle}>{title}</span>
        <i
          className={`ti ti-chevron-down ${styles.chevron} ${open ? styles.chevronOpen : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && <div className={styles.sectionBody}>{children}</div>}
    </div>
  );
}

function ChipGroup({ options, selected, onToggle }) {
  return (
    <div className={styles.chipGroup}>
      {options.map((opt) => (
        <button
          key={opt}
          className={`${styles.chip} ${selected.includes(opt) ? styles.chipActive : ""}`}
          onClick={() => onToggle(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function FilterSidebar({ filters, toggleFilter, setStipend }) {
  return (
    <aside className={styles.sidebar} aria-label="Filters">
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <i className="ti ti-adjustments-horizontal" aria-hidden="true" />
          <span>Filters</span>
        </div>

        <FilterSection title="Profile">
          <ChipGroup
            options={FILTER_OPTIONS.profiles}
            selected={filters.profiles}
            onToggle={(v) => toggleFilter("profiles", v)}
          />
        </FilterSection>

        <FilterSection title="Location">
          <ChipGroup
            options={FILTER_OPTIONS.locations}
            selected={filters.locations}
            onToggle={(v) => toggleFilter("locations", v)}
          />
        </FilterSection>

        <FilterSection title="Duration">
          <ChipGroup
            options={FILTER_OPTIONS.durations}
            selected={filters.durations}
            onToggle={(v) => toggleFilter("durations", v)}
          />
        </FilterSection>

        <FilterSection title="Minimum Stipend">
          <div className={styles.stipendRow}>
            <input
              type="range"
              min={0}
              max={FILTER_OPTIONS.maxStipend}
              step={1000}
              value={filters.minStipend}
              onChange={(e) => setStipend(Number(e.target.value))}
              className={styles.slider}
              aria-label="Minimum stipend"
            />
            <span className={styles.stipendLabel}>
              {filters.minStipend === 0
                ? "Any"
                : `₹${(filters.minStipend / 1000).toFixed(0)}k+`}
            </span>
          </div>
        </FilterSection>
      </div>
    </aside>
  );
}
