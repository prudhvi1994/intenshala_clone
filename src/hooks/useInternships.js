import { useState, useEffect, useMemo } from "react";
import { ALL_INTERNSHIPS } from "../data/internships";

const API_URL = "https://internshala.com/hiring/search";

/**
 * Fetches internships from the Internshala API.
 * Falls back to local mock data if the request fails (CORS / network).
 */
async function fetchInternships() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Non-200 response");
    const json = await res.json();

    // The API returns { internships_meta: { [id]: {...} } }
    if (json?.internships_meta) {
      return Object.values(json.internships_meta);
    }
    throw new Error("Unexpected shape");
  } catch {
    // Silently fall back to bundled data (CORS blocks browser access)
    return ALL_INTERNSHIPS;
  }
}

const DEFAULT_FILTERS = {
  profiles: [],
  locations: [],
  durations: [],
  minStipend: 0,
};

export function useInternships() {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  useEffect(() => {
    fetchInternships().then((data) => {
      setAllData(data);
      setLoading(false);
    });
  }, []);

  /** Toggle a value inside a multi-select filter array. */
  const toggleFilter = (key, value) => {
    setFilters((prev) => {
      const arr = prev[key];
      const updated = arr.includes(value)
        ? arr.filter((x) => x !== value)
        : [...arr, value];
      return { ...prev, [key]: updated };
    });
  };

  const setStipend = (value) =>
    setFilters((prev) => ({ ...prev, minStipend: value }));

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSearch("");
  };

  /** All filtering is pure client-side — no additional network requests. */
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    return allData.filter((item) => {
      // Text search across title, company, profile
      if (
        q &&
        !item.title.toLowerCase().includes(q) &&
        !item.company_name.toLowerCase().includes(q) &&
        !item.profile_name.toLowerCase().includes(q)
      )
        return false;

      if (
        filters.profiles.length &&
        !filters.profiles.includes(item.profile_name)
      )
        return false;

      if (
        filters.locations.length &&
        !filters.locations.some((l) => item.location_names.includes(l))
      )
        return false;

      if (filters.durations.length && !filters.durations.includes(item.duration))
        return false;

      if (
        filters.minStipend > 0 &&
        item.stipend.salaryValue1 < filters.minStipend
      )
        return false;

      return true;
    });
  }, [allData, search, filters]);

  /** Build the list of currently active filters for the chip strip. */
  const activeFilterChips = [
    ...filters.profiles.map((v) => ({ type: "profiles", value: v, label: v })),
    ...filters.locations.map((v) => ({ type: "locations", value: v, label: v })),
    ...filters.durations.map((v) => ({ type: "durations", value: v, label: v })),
    ...(filters.minStipend > 0
      ? [
          {
            type: "stipend",
            value: filters.minStipend,
            label: `Min ₹${(filters.minStipend / 1000).toFixed(0)}k/mo`,
          },
        ]
      : []),
  ];

  const removeChip = (chip) => {
    if (chip.type === "stipend") setStipend(0);
    else toggleFilter(chip.type, chip.value);
  };

  return {
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
  };
}
