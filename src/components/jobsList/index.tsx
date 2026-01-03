import { useAuth } from "../../shared/hooks/useAuth";
import { useJobs } from "../../shared/hooks/useJobs";
import { JobCard } from "../../shared/hooks/JobCard";
import type { Job } from "../../types/jobTypes";
import Modal from "../../shared/components/Modal/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface JobListProps {
  jobs: Job[];
}

export const JobList = ({ jobs }: JobListProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { savedJobs, toggleSave, appliedJobs, onApply } = useJobs(user);

  const reversedJobs = [...jobs].reverse();

  const handleToggleSave = (jobId: Job) => {
    if (!user) {
      setIsModalOpen(true);
      return;
    }
    toggleSave(jobId);
  };
  return (
    <div className="jobs container">
      {reversedJobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          saved={savedJobs.some((j) => j.id === job.id)}
          applied={appliedJobs.some((j) => j.id === job.id)}
          onToggleSave={handleToggleSave}
          onApply={onApply}
        />
      ))}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="modal-content">
            <h2>Please log in to save jobs</h2>
            <button onClick={() => navigate("/login")}>Go to Login</button>
          </div>
        </Modal>
      )}
    </div>
  );
};
