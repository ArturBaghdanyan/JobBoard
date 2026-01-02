import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetJobsQuery } from "../../api/jobsApi";
import { JobList } from "../../components/jobsList";
import ShowModal from "../../shared/components/showModal";

import style from "./home.module.scss";


const HomePage = () => {
  const navigate = useNavigate();
  const { data: jobs = [], isLoading } = useGetJobsQuery();

  const [showModal, setShowModal] = useState(false);
  const [modalType] = useState<"login" | "success" | null>(null);
  const [searchText, setSearchText] = useState("");

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

        <div className={style.home_container_jobs}>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search by title, position"
          />
          <button onClick={handleSubmit}>Search</button>
        </div>
      </div>

      <JobList jobs={jobs.slice(0, 3)} />
      {showModal && (
        <ShowModal
          showModal={showModal}
          setShowModal={setShowModal}
          modalType={modalType}
        />
      )}

      <Link to="/jobs" className={style.home_view}>
        View All Jobs
      </Link>
    </div>
  );
};

export default HomePage;
