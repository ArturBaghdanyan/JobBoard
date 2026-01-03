import { AiFillHeart } from "react-icons/ai";
import type { Job } from "../../types/jobTypes";
import { useState } from "react";

interface JobCardProps {
  job: Job;
  saved?: boolean;
  applied?: boolean;
  onApply?: (job: Job) => void;
  onToggleSave?: (job: Job) => void;
}

export const JobCard = ({
  job,
  saved = false,
  applied = false,
  onApply,
  onToggleSave,
}: JobCardProps) => {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <div className="jobs_container">
      <h2>{job.title}</h2>
      <p>
        {job.company} | {job.location} | {job.salary}
      </p>
      <p>{job.position}</p>

      <div className="jobs-right">
        <div className="jobs-left">
          <AiFillHeart
            className="jobs_container_save"
            onClick={() => onToggleSave?.(job)}
            style={{
              fill: saved ? "red" : "white",
              stroke: "red",
              strokeWidth: "50px",
              cursor: "pointer",
            }}
          />

          <button
            disabled={applied}
            onClick={() => onApply?.(job)}
            className="jobs_container_apply"
          >
            {applied ? "Applied" : "Apply"}
          </button>

          <button
            className="jobs_container_more"
            onClick={() => setShowDescription((prev) => !prev)}
          >
            {showDescription ? "Hide" : "View more"}
          </button>
        </div>
        {showDescription && job.requirements && (
          <div className="jobs_container_description">
            <h3>About the Job</h3>
            <p>{job.about}</p>

            <h3>Requirements</h3>
            <ul>
              {job.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
