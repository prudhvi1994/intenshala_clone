import React, { useState } from "react";
import InternshipCard from "./InternshipCard";
import styles from "./ResultsPanel.module.css";

const PER_PAGE = 8;

export default function ResultsPanel({
  loading,
  results,
  activeFilterChips,
  removeChip,
  clearFilters,
}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(results.length / PER_PAGE);
  const paginated = results.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Reset to page 1 whenever results change
  React.useEffect(() => setPage(1), [results.length]);

  return (
    <section className={styles.panel} aria-label="Internship results">
      {/* Active filter chips */}
      {activeFilterChips.length > 0 && (
        <div className={styles.activeFilters}>
          {activeFilterChips.map((chip, i) => (
            <div key={i} className={styles.chip}>
              {chip.label}
              <button
                onClick={() => removeChip(chip)}
                aria-label={`Remove filter: ${chip.label}`}
              >
                <i className="ti ti-x" aria-hidden="true" />
              </button>
            </div>
          ))}
          <button className={styles.clearAll} onClick={clearFilters}>
            Clear all
          </button>
        </div>
      )}

      {/* Header */}
      <div className={styles.header}>
        <p className={styles.count}>
          {loading ? (
            "Loading…"
          ) : (
            <>
              Showing <strong>{results.length}</strong> internship
              {results.length !== 1 ? "s" : ""}
            </>
          )}
        </p>

        <select className={styles.sort} aria-label="Sort internships">
          <option>Relevance</option>
          <option>Stipend: High to Low</option>
          <option>Recently Posted</option>
        </select>
      </div>

      {/* Cards */}
      {loading && (
        <div className={styles.empty}>
          <i className="ti ti-loader-2" aria-hidden="true" />
          <p>Fetching internships…</p>
        </div>
      )}

      {!loading && results.length === 0 && (
        <div className={styles.empty}>
          <i className="ti ti-search-off" aria-hidden="true" />
          <p className={styles.emptyTitle}>No internships found</p>
          <p className={styles.emptySub}>Try adjusting your filters or search query</p>
        </div>
      )}

      {!loading &&
        paginated.map((item) => (
          <InternshipCard key={item.id} internship={item} />
        ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className={styles.pagination} aria-label="Results pages">
          <button
            className={styles.pageBtn}
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            aria-label="Previous page"
          >
            <i className="ti ti-chevron-left" aria-hidden="true" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`${styles.pageBtn} ${page === i + 1 ? styles.pageBtnActive : ""}`}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </button>
          ))}

          <button
            className={styles.pageBtn}
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            aria-label="Next page"
          >
            <i className="ti ti-chevron-right" aria-hidden="true" />
          </button>
        </nav>
      )}
    </section>
  );
}
