import { useState } from "react";
import ShowModal from "../../shared/components/showModal";
import { useJobFilters } from "../../shared/hooks/useFilterJob";
import { useGetJobsQuery } from "../../api/jobsApi";
import { JobList } from "../../components/jobsList";
import { CiSearch } from "react-icons/ci";

import style from "./style.module.scss";

const JobsPage = () => {
  const { data: jobs = [], isLoading } = useGetJobsQuery();

  const [showModal, setShowModal] = useState(false);
  const [modalType] = useState<"login" | "success" | null>(null);

    const {
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    selectedPosition,
    setSelectedPosition,
    filteredJobs,
  } = useJobFilters(jobs);

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

      <JobList jobs={filteredJobs} />

      {showModal && (
        <ShowModal
          showModal={showModal}
          setShowModal={setShowModal}
          modalType={modalType}
        />
      )}
    </section>
  );
};

export default JobsPage;
