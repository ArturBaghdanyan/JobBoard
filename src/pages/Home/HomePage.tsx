import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { useJobs } from "../../shared/hooks/useJobs";
import { useAuth } from "../../shared/hooks/useAuth";
import { useGetJobsQuery } from "../../api/jobsApi";
import { JobList } from "../../components/jobsList";
import ShowModal from "../../shared/components/showModal";

import type { Job } from "../../types/jobTypes";

import style from "./home.module.scss";
import {
  getAllJobsFromStorage,
  saveAllJobs,
} from "../../shared/utils/localStorageJobs";

interface HomePageProps {
  darkMode: boolean;
  requireAuth: (action: () => void) => void;
}

const HomePage = ({ darkMode, requireAuth }: HomePageProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: jobs = [], isLoading } = useGetJobsQuery();
  const { savedJobs, toggleSave, appliedJobs, onApply } = useJobs(user);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"login" | "success" | null>(null);
  const [displayJobs, setDisplayJobs] = useState<Job[]>(
    getAllJobsFromStorage()
  );
  const [searchText, setSearchText] = useState("");
  const { openEditModal, openRemoveModal } = useOutletContext<{
    openEditModal: (job: Job) => void;
    openRemoveModal: (job: Job) => void;
  }>();

  const handleToggleSave = (job: Job) => {
    if (!user) {
      setModalType("login");
      setShowModal(true);
      return;
    }
    toggleSave(job);
  };

  const handleSubmit = () => {
    requireAuth(() => {
      if (!searchText.trim()) {
        navigate("/jobs");
      } else {
        navigate(`/jobs?search=${encodeURIComponent(searchText)}`);
      }
    });
  };

  useEffect(() => {
    if (jobs.length > 0) {
      saveAllJobs(jobs);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayJobs(jobs);
    }
  }, [jobs]);

  useEffect(() => {
    const handleSync = () => {
      setDisplayJobs(getAllJobsFromStorage());
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
    <div className={style.home}>
      <div className={style.home_container}>
        <div className={style.home_container_title}>
          <h1>Find Your Dream Job</h1>
          <p>Search thousands of jobs from top companies</p>
        </div>

        <div className={style.home_container_jobs}>
          <input
            type="text"
            name="keywords"
            placeholder="Search by title, position"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSubmit}>Search</button>
        </div>
      </div>

      <JobList
        jobs={displayJobs.slice(0, 3)}
        savedJobs={savedJobs}
        appliedJobs={appliedJobs}
        onToggleSave={handleToggleSave}
        onApply={onApply}
        modalType={modalType}
        setModalType={setModalType}
        showModal={showModal}
        setShowModal={setShowModal}
        onEdit={openEditModal}
        onRemove={openRemoveModal}
      />
      {showModal && (
        <ShowModal
          showModal={showModal}
          setShowModal={setShowModal}
          modalType={modalType}
        />
      )}
      <Link
        to="/jobs"
        className={`${
          darkMode ? style.home_view_dark : style.home_view_light
        } ${style.home_view}`}
      >
        View All Jobs
      </Link>
    </div>
  );
};

export default HomePage;
