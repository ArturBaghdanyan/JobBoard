import type { Job } from "../../types/jobTypes";
import style from "./style.module.scss";

interface JobListProps {
  jobs: Job[];
  onApply: (id: string) => void;
}

export const JobList = ({ jobs, onApply }: JobListProps) => {
  return (
    <div className={`${style.jobs} container`}>
      {jobs.map((job) => (
        <div key={job.id} className={style.jobs_container}>
          <h2>{job.title}</h2>
          <p>
            {job.company} | {job.location} | {job.salary}
          </p>
          <p>{job.position}</p>
          <p>{job.description}</p>

          <button
            disabled={job.applied}
            onClick={() => onApply(job.id)}
            className={style.jobs_container_apply}
          >
            {job.applied ? "Applied" : "Apply"}
          </button>

          <button className={style.jobs_container_more}>View more</button>
        </div>
      ))}
    </div>
  );
};
