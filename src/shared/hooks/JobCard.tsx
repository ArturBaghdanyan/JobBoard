import { AiFillHeart } from "react-icons/ai";
import type { Job } from "../../types/jobTypes";

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
}: JobCardProps) => (
  <div className="jobs_container">
    <h2>{job.title}</h2>
    <p>
      {job.company} | {job.location} | {job.salary}
    </p>
    <p>{job.position}</p>
    <p>{job.description}</p>

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

    <button className="jobs_container_more">View more</button>
  </div>
);
