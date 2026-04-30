import { useState, useMemo } from "react";
import type { Job } from "../../types/jobTypes";

export const useJobFilters = (jobs: Job[], initialSearch: string = "") => {
  const [searchText, setSearchText] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState("select category");
  const [selectedPosition, setSelectedPosition] = useState("select position");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const keyword = searchText.trim().toLowerCase();

      const matchesSearch =
        !keyword ||
        job.title.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword);

      const matchesCategory =
        selectedCategory === "select category" ||
        job.title.toLowerCase().includes(selectedCategory.toLowerCase());

      const matchesPosition =
        selectedPosition === "select position" ||
        job.position.toLowerCase() === selectedPosition.toLowerCase();

      return matchesSearch && matchesCategory && matchesPosition;
    });
  }, [jobs, searchText, selectedCategory, selectedPosition]);

  return {
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    selectedPosition,
    setSelectedPosition,
    filteredJobs,
  };
};
