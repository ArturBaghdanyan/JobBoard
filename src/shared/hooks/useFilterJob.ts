import { useState, useMemo } from "react";
import type { Job } from "../../types/jobTypes";

export const useJobFilters = (jobs: Job[], initialSearch: string = "") => {
  const [searchText, setSearchText] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState("select category");
  const [selectedPosition, setSelectedPosition] = useState("select position");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchText.toLowerCase()) ||
        job.company.toLowerCase().includes(searchText.toLowerCase());

      const matchesCategory =
        selectedCategory === "select category" ||
        job.title === selectedCategory;

      const matchesPosition =
        selectedPosition === "select position" ||
        job.position === selectedPosition;

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
