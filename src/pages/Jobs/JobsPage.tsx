import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useGetJobsQuery, useApplyJobMutation } from "../../api/jobsApi";
import { JobList } from "../../components/jobsList";
import Modal from "../../components/Modal/Modal";

import style from "./style.module.scss";

const JobsPage = () => {
  const { data: jobs = [], isLoading } = useGetJobsQuery();
  const [applyJob] = useApplyJobMutation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"login" | "success" | null>(null);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchText.toLowerCase()) ||
      job.company.toLowerCase().includes(searchText.toLowerCase())
  );

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

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {modalType === "login" && (
            <>
              <div className="modal-column">
                <div className="modal-icon">🔒</div>
                <h2 className="modal-title">Login required</h2>
                <p className="modal-text">
                  You need to be logged in to apply for this job.
                </p>
              </div>

              <div className="modal-actions">
                <button
                  className="modal-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="modal-login"
                  onClick={() => navigate("/login")}
                >
                  Go to login
                </button>
              </div>
            </>
          )}

          {modalType === "success" && (
            <>
              <div className="modal-column">
                <div className="modal-icon">✅</div>
                <h2 className="modal-title">Application sent</h2>
                <p className="modal-text">
                  You have successfully applied for this job.
                </p>
              </div>

              <div className="modal-actions">
                <button
                  className="modal-login"
                  onClick={() => setShowModal(false)}
                >
                  OK
                </button>
              </div>
            </>
          )}
        </Modal>
      )}
    </section>
  );
};

export default JobsPage;
