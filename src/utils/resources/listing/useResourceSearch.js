import { useMemo, useState } from "react";
import { applyResourceFilters, countActiveResourceFilters, defaultResourceFilters } from "../../resourceUtils";
import { paginateResources } from "../resourceHelpers";

export default function useResourceSearch(items) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(defaultResourceFilters);
  const [page, setPage] = useState(1);
  const filterCount = countActiveResourceFilters(filters);
  const results = useMemo(() => applyResourceFilters(items, search.trim(), filters), [items, search, filters]);
  const pagination = paginateResources(results, page);

  const changeSearch = (value) => { setSearch(value); setPage(1); };
  const applyFilters = (value) => { setFilters(value); setPage(1); };
  const changePage = (value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const reset = () => {
    setSearch("");
    setFilters(defaultResourceFilters);
    setPage(1);
  };

  return {
    search, filters, filterCount, results, ...pagination,
    isFiltering: search.trim() !== "" || filterCount > 0,
    changeSearch, applyFilters, changePage, reset,
  };
}
