import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useGetJobsQuery, useApplyJobMutation } from "../../api/jobsApi";
import { JobList } from "../../components/jobsList";

import style from "./style.module.scss";
import ShowModal from "../../utils/showModal";

const JobsPage = () => {
  const { data: jobs = [], isLoading } = useGetJobsQuery();
  const [applyJob] = useApplyJobMutation();
  const { user } = useAuth();

  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"login" | "success" | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("select category");
  const [selectedPosition, setSelectedPosition] = useState("select position");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchText.toLowerCase()) ||
      job.company.toLowerCase().includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === "select category" || job.title === selectedCategory;

    const matchesPosition =
      selectedPosition === "select position" ||
      job.position === selectedPosition;

    return matchesSearch && matchesCategory && matchesPosition;
  });

  const handleApply = async (jobId: string) => {
    if (!user) {
      setModalType("login");
      setShowModal(true);
      return;
    }

    try {
      await applyJob({ id: jobId }).unwrap();
      setModalType("success");
      setShowModal(true);
    } catch (err) {
      console.error("Apply failed", err);
    }
  };

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

      <JobList jobs={filteredJobs} onApply={handleApply} />

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
