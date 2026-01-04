import { useAuth } from "../../shared/hooks/useAuth";
import { JobCard } from "../../shared/hooks/JobCard";
import type { Job } from "../../types/jobTypes";
import ShowModal from "../../shared/components/showModal";

import "./jobs.css";
import type React from "react";

interface JobListProps {
  jobs: Job[];
  savedJobs: Job[];
  appliedJobs: Job[];
  onToggleSave: (job: Job) => void;
  onApply: (job: Job) => void;
  modalType: "login" | "success" | null;
  setModalType: (type: "login" | "success" | null) => void;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onEdit?: (job: Job) => void;
  onRemove?: (job: Job) => void;
}

export const JobList = ({
  jobs,
  savedJobs,
  appliedJobs,
  onToggleSave,
  onApply,
  modalType,
  setModalType,
  showModal,
  setShowModal,
  onEdit,
  onRemove,
}: JobListProps) => {
  const { user } = useAuth();

  const handleToggleSave = (job: Job) => {
    if (!user) {
      setModalType("login");
      setShowModal(true);
      return;
    }
    onToggleSave(job);
  };

  const handleEdit = (job: Job) => {
    if (!user) {
      setModalType("login");
      setShowModal(true);
      return;
    }
    onEdit?.(job);
  };
  const handleApply = (job: Job) => {
    if (!user) {
      setModalType("login");
      setShowModal(true);
      return;
    }
    onApply(job);
    setModalType("success");
    setShowModal(true);
  };

  const handleRemoveJob = (job: Job) => {
    onRemove?.(job);
  }

  const reversedJobs = [...jobs].reverse();

  return (
    <div className="jobs container">
      {reversedJobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          saved={savedJobs.some((j) => j.id === job.id)}
          applied={appliedJobs.some((j) => j.id === job.id)}
          onToggleSave={handleToggleSave}
          onApply={handleApply}
          onEdit={() => handleEdit(job)}
          onRemove={() => handleRemoveJob(job)}
        />
      ))}

      {showModal && (
        <ShowModal
          showModal={showModal}
          setShowModal={setShowModal}
          modalType={modalType}
        />
      )}
    </div>
  );
};
