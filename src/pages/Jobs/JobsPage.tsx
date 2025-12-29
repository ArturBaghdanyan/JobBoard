import { useGetJobsQuery, useApplyJobMutation } from "../../api/jobsApi";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { JobList } from "../../components/jobsList";
import { CiSearch } from "react-icons/ci";

import style from "./style.module.scss";

const JobsPage = () => {
  const { data: jobs = [], isLoading } = useGetJobsQuery();
  const [applyJob] = useApplyJobMutation();
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchText.toLowerCase()) ||
      job.company.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleApply = (jobId: string) => {
    if (!user) {
      alert("Please log in to apply for jobs");
      return;
    }
    applyJob({ id: jobId });
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
    <section>
      <form className={style.form}>
        <input
          type="text"
          name="keywords"
          placeholder="All keywords"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select name="categories">
          {selectList.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select name="positions">
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
    </section>
  );
};

export default JobsPage;
