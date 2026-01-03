import { useAuth } from "../../shared/hooks/useAuth";
import { JobCard } from "../../shared/hooks/JobCard";
import type { Job } from "../../types/jobTypes";
import ShowModal from "../../shared/components/showModal";

interface JobListProps {
  jobs: Job[];
  savedJobs: Job[];
  appliedJobs: Job[];
  onToggleSave: (job: Job) => void;
  onApply: (job: Job) => void;
  modalType: "login" | "success" | null;
  setModalType: (type: "login" | "success" | null) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
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
