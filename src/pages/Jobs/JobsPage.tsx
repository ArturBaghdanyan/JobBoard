import { useEffect, useState } from "react";
import { useAuth } from "../../shared/hooks/useAuth";
import { useJobs } from "../../shared/hooks/useJobs";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { useJobFilters } from "../../shared/hooks/useFilterJob";
import { useGetJobsQuery } from "../../api/jobsApi";
import { JobList } from "../../components/jobsList";
import { CiSearch } from "react-icons/ci";
import type { Job } from "../../types/jobTypes";

import style from "./style.module.scss";
import RemoveJobItem from "../../components/remove-job/RemoveJobItem";

const JobsPage = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const { data: jobs = [], isLoading } = useGetJobsQuery();
  const { savedJobs, appliedJobs, toggleSave, onApply, syncServerData } =
    useJobs(user);
  const { openEditModal, openRemoveModal } = useOutletContext<{
    openEditModal: (job: Job) => void;
    openRemoveModal: (job: Job) => void;
  }>();
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"login" | "success" | null>(null);
  const searchTerm = searchParams.get("search") || "";
  const [displayJobs, setDisplayJobs] = useState<Job[]>(() => {
    const stored = localStorage.getItem("jobs_list");
    return stored ? JSON.parse(stored) : [];
  });
  const {
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    selectedPosition,
    setSelectedPosition,
  } = useJobFilters(jobs, searchTerm);

  const selectList = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "React Developer",
    "Node.js Developer",
    "UI/UX Designer",
    "QA Engineer",
    "DevOps Engineer",
    "Flutter Developer",
    "Project Manager",
    "Data Analyst",
    "Python Developer",
    "PHP Developer",
  ];
  const positions = ["Intern", "Junior", "Middle", "Senior", "Team Lead"];

  const handleConfirmDelete = () => {
    if (jobToDelete) {
      setIsDeleteModalOpen(false);
      setJobToDelete(null);
      setModalType("success");
      setShowModal(true);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("jobs_list");

    if (!stored && jobs.length > 0) {
      localStorage.setItem("jobs_list", JSON.stringify(jobs));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayJobs(jobs);
      syncServerData(jobs);
    } else if (stored) {
      setDisplayJobs(JSON.parse(stored));
    }
  }, [jobs]);
  useEffect(() => {
    const handleSync = () => {
      const stored = localStorage.getItem("jobs_list");
      if (stored) {
        setDisplayJobs(JSON.parse(stored));
      }
    };

    window.addEventListener("storage", handleSync);
    window.addEventListener("local-jobs-updated", handleSync);

    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("local-jobs-updated", handleSync);
    };
  }, []);
  if (isLoading) return <p>Loading...</p>;

  return (
    <section className={style.section}>
      <form className={style.form} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="keywords"
          placeholder="All keywords"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="select category">All Categories</option>
          {selectList.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          name="positions"
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
        >
          <option value="select position">All Positions</option>

          {positions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button type="submit">
          <CiSearch />
        </button>
      </form>

      <JobList
        jobs={displayJobs}
        savedJobs={savedJobs}
        appliedJobs={appliedJobs}
        onToggleSave={toggleSave}
        onApply={onApply}
        onEdit={openEditModal}
        modalType={modalType}
        setModalType={setModalType}
        showModal={showModal}
        setShowModal={setShowModal}
        onRemove={openRemoveModal}
      />
      {isDeleteModalOpen && jobToDelete && (
        <RemoveJobItem
          selectedJob={jobToDelete}
          closeModal={() => setIsDeleteModalOpen(false)}
          handleConfirmDelete={handleConfirmDelete}
        />
      )}
    </section>
  );
};

export default JobsPage;
