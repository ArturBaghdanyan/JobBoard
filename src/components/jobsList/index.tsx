import type { Job } from "../../types/jobTypes";
import { AiFillHeart } from "react-icons/ai";

import style from "./style.module.scss";
import { useState } from "react";

interface JobListProps {
  jobs: Job[];
  onApply: (id: string) => void;
}

export const JobList = ({ jobs, onApply }: JobListProps) => {
  const [savedJobsId, setSavedJobIds] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSavedJobIds((prev) =>
      prev.includes(id) ? prev.filter((jobId) => jobId !== id) : [...prev, id]
    );
    console.log('saved job', id)
  };
  
  return (
    <div className={`${style.jobs} container`}>
      {jobs.map((job) => {
        const isCurrentlySaved = savedJobsId.includes(job.id);
        return (
          <div key={job.id} className={style.jobs_container}>
            <h2>{job.title}</h2>
            <p>
              {job.company} | {job.location} | {job.salary}
            </p>
            <p>{job.position}</p>
            <p>{job.description}</p>

            <AiFillHeart
              className={style.jobs_container_save}
              onClick={() => toggleSave(job.id)}
              style={{
                fill: isCurrentlySaved ? "red" : "white",
                stroke: "red",
                strokeWidth: "50px",
                cursor: "pointer",
              }}
            />
            <button
              disabled={job.applied}
              onClick={() => onApply(job.id)}
              className={style.jobs_container_apply}
            >
              {job.applied ? "Applied" : "Apply"}
            </button>

            <button className={style.jobs_container_more}>View more</button>
          </div>
        );
      })}
    </div>
  );
};
