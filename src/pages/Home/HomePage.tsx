import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useApplyJobMutation, useGetJobsQuery } from "../../api/jobsApi";
import { JobList } from "../../components/jobsList";
import { useAuth } from "../../hooks/useAuth";

import style from "./home.module.scss";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: jobs = [], isLoading } = useGetJobsQuery();
  const [applyJob] = useApplyJobMutation();

  const [searchText, setSearchText] = useState("");

  const handleApply = (jobId: string) => {
    if (!user) {
      alert("Please log in to apply for jobs");
      return;
    }
    applyJob({ id: jobId });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchText.trim()) return;
    navigate(`/jobs?search=${encodeURIComponent(searchText)}`);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={style.home}>
      <div className={style.home_container}>
        <div className={style.home_container_title}>
          <h1>Find Your Dream Job</h1>
          <p>Search thousands of jobs from top companies</p>
        </div>

        <div className={style.jobs}>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search by title, position"
          />
          <button onClick={handleSubmit}>Search</button>
        </div>
      </div>

      <JobList jobs={jobs.slice(0, 3)} onApply={handleApply} />
      <Link to="/jobs" className={style.home_view}>
        View All Jobs
      </Link>
    </div>
  );
};

export default HomePage;
