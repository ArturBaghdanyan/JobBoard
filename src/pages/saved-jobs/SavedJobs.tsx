import { JobCard } from "../../shared/hooks/JobCard";
import { useJobs } from "../../shared/hooks/useJobs";
import type { UserProfile } from "../../types/auth";

interface Props {
  user: UserProfile | null;
}

const SavedJobs = ({ user }: Props) => {
  const { savedJobs, appliedJobs, toggleSave, onApply } = useJobs(user);

  if (!savedJobs.length) return <p>No saved jobs yet</p>;

  const reversed = [...savedJobs].reverse();

  return (
    <div className="jobs container">
      {reversed.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          saved={true}
          applied={appliedJobs.some((j) => j.id === job.id)}
          onToggleSave={toggleSave}
          onApply={onApply}
        />
      ))}
    </div>
  );
};

export default SavedJobs;
