import { JobCard } from "../../shared/hooks/JobCard";
import { useJobs } from "../../shared/hooks/useJobs";
import type { UserProfile } from "../../types/auth";

interface Props {
  user: UserProfile | null;
}

const AppliedJobsPage = ({ user }: Props) => {
  const { appliedJobs, savedJobs, toggleSave, onApply } = useJobs(user);

  if (!appliedJobs.length) return <p>No applied jobs yet</p>;

  const reversed = [...appliedJobs].reverse();

  return (
    <div className="jobs container">
      {reversed.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          saved={savedJobs.some((j) => j.id === job.id)}
          applied={true}
          onToggleSave={toggleSave}
          onApply={onApply}
        />
      ))}
    </div>
  );
};

export default AppliedJobsPage;
