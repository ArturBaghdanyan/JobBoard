import { useGetJobsQuery, useApplyJobMutation } from "../../api/jobsApi";
import { useAuth } from "../../hooks/useAuth";
import type { Job } from "../../types/jobTypes";

import style from "./style.module.scss";

export const JobList = () => {
  const { data: jobs, isLoading, error } = useGetJobsQuery();
  const [applyJob] = useApplyJobMutation();
  const { user } = useAuth();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading jobs</p>;

  const handleApply = (jobId: string) => {
    if (!user) {
      alert("Please log in to your account. If you don’t have one, register.");

      return;
    }
    applyJob({ id: jobId });
  };

  return (
    <div className={style.jobs}>
      {jobs?.map((job: Job) => {

        return (
          <div
            key={job.id}
            className={style.jobs_container}
            onClick={() => applyJob({ id: job.id })}
          >
            <h2>{job.title}</h2>
            <p>
              {job.company} | {job.location} | {job.salary}
            </p>
            <p>{job.description}</p>

            <button disabled={job.applied} onClick={() => handleApply(job.id)}>
              {job.applied ? "Applied" : "Apply"}
            </button>
          </div>
        );
      })}
    </div>
  );
};
