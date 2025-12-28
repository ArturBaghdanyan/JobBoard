import type { Job } from "../../types/jobTypes";
import style from "./style.module.scss";

interface JobListProps {
  jobs: Job[];
  onApply: (id: string) => void;
}

export const JobList = ({ jobs, onApply }: JobListProps) => {
  return (
    <div className={style.jobs}>
      {jobs.map((job) => (
        <div key={job.id} className={style.jobs_container}>
          <h2>{job.title}</h2>
          <p>
            {job.company} | {job.location} | {job.salary}
          </p>
          <p>{job.description}</p>

          <button
            disabled={job.applied}
            onClick={() => onApply(job.id)}
          >
            {job.applied ? "Applied" : "Apply"}
          </button>
        </div>
      ))}
    </div>
  );
};
