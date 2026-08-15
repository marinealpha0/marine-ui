import { useSearchParams } from "react-router-dom";
import { useMemo, useCallback } from "react";

/**
 * Custom hook to manage table filters, pagination, and debouncing via URL Search Params.
 * @param {Object} initialFilters - Initial state for filters (e.g., { searchVal: "", page: 1, limit: 10 }).
 * @returns {Object} { filters, handleFilterChange, handlePageChange, handleRowsPerPageChange, setFilters }
 */
export const useTableFilters = (initialFilters) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Memoize filters by parsing them from URL parameters or falling back to initialFilters
  const filters = useMemo(() => {
    const params = {};
    Object.keys(initialFilters).forEach((key) => {
      const val = searchParams.get(key);
      if (val !== null) {
        if (typeof initialFilters[key] === "number") {
          params[key] = Number(val);
        } else if (typeof initialFilters[key] === "boolean") {
          params[key] = val === "true";
        } else if (Array.isArray(initialFilters[key])) {
          params[key] = val ? val.split(",") : [];
        } else {
          params[key] = val;
        }
      } else {
        params[key] = initialFilters[key];
      }
    });
    return params;
  }, [searchParams, initialFilters]);

  // Update URL search parameters when filters change
  const handleFilterChange = useCallback((newFilters) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(newFilters).forEach(([key, val]) => {
        if (val === "all" || val === "" || val === undefined || val === null) {
          next.delete(key);
        } else if (Array.isArray(val)) {
          if (val.length === 0) {
            next.delete(key);
          } else {
            next.set(key, val.join(","));
          }
        } else {
          next.set(key, String(val));
        }
      });
      // Reset page to initial page when filters change
      if ("page" in initialFilters) {
        next.set("page", String(initialFilters.page));
      }
      return next;
    });
  }, [setSearchParams, initialFilters]);

  // Page index handling: supporting both 0-indexed and 1-indexed tables
  const handlePageChange = useCallback((event, newPage) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const isOneIndexed = initialFilters.page === 1;
      next.set("page", String(isOneIndexed ? newPage + 1 : newPage));
      return next;
    });
  }, [setSearchParams, initialFilters.page]);

  // Limit handling: rows per page
  const handleRowsPerPageChange = useCallback((event) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const limitVal = parseInt(event.target.value, 10);
      next.set("limit", String(limitVal));
      if ("page" in initialFilters) {
        next.set("page", String(initialFilters.page));
      }
      return next;
    });
  }, [setSearchParams, initialFilters.page]);

  // Compatibility helper for setFilters
  const setFilters = useCallback((newFilters) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const resolved = typeof newFilters === "function" ? newFilters(filters) : newFilters;
      Object.entries(resolved).forEach(([key, value]) => {
        if (value === "all" || value === "" || value === undefined || value === null) {
          next.delete(key);
        } else if (Array.isArray(value)) {
          if (value.length === 0) {
            next.delete(key);
          } else {
            next.set(key, value.join(","));
          }
        } else {
          next.set(key, String(value));
        }
      });
      return next;
    });
  }, [setSearchParams, filters]);

  return {
    filters,
    handleFilterChange,
    handlePageChange,
    handleRowsPerPageChange,
    setFilters,
  };
};
