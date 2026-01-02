import { useAuth } from "../../shared/hooks/useAuth";
import { useJobs } from "../../shared/hooks/useJobs";
import { JobCard } from "../../shared/hooks/JobCard";
import type { Job } from "../../types/jobTypes";

interface JobListProps {
  jobs: Job[];
}

export const JobList = ({ jobs }: JobListProps) => {
  const { user } = useAuth();
  const { savedJobs, toggleSave, appliedJobs, onApply } = useJobs(user);

  const reversedJobs = [...jobs].reverse();

  return (
    <div className="jobs container">
      {reversedJobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          saved={savedJobs.some((j) => j.id === job.id)}
          applied={appliedJobs.some((j) => j.id === job.id)}
          onToggleSave={toggleSave}
          onApply={onApply}
        />
      ))}
    </div>
  );
};
