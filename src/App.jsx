import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FilterSidebar from "./components/FilterSidebar";
import ResultsPanel from "./components/ResultsPanel";
import { useInternships } from "./hooks/useInternships";
import styles from "./App.module.css";

export default function App() {
  const {
    loading,
    filtered,
    search,
    setSearch,
    filters,
    toggleFilter,
    setStipend,
    clearFilters,
    activeFilterChips,
    removeChip,
  } = useInternships();

  return (
    <div className={styles.app}>
      <Navbar />

      <Hero search={search} onSearch={setSearch} />

      <main className={styles.main}>
        <FilterSidebar
          filters={filters}
          toggleFilter={toggleFilter}
          setStipend={setStipend}
        />

        <ResultsPanel
          loading={loading}
          results={filtered}
          activeFilterChips={activeFilterChips}
          removeChip={removeChip}
          clearFilters={clearFilters}
        />
      </main>
    </div>
  );
}
