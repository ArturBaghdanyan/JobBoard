import type { Job } from "../../types/jobTypes";

export const getAppliedJobs = (): Job[] =>
  JSON.parse(localStorage.getItem("applied-job") || "[]");

export const saveAppliedJobs = (jobs: Job[]): void =>
  localStorage.setItem("applied-job", JSON.stringify(jobs));

export const saveJob = (job: Job): void => {
  const saved = getSavedJobs();
  if (!saved.some((j) => j.id === job.id)) {
    saved.push(job);
    localStorage.setItem("saved-job", JSON.stringify(saved));
  }
};

export const applyJob = (job: Job): void => {
  const applied = getAppliedJobs();
  if (!applied.some((j) => j.id === job.id)) {
    applied.push(job);
    localStorage.setItem("applied-job", JSON.stringify(applied));
  }
};

export const getSavedJobs = (): Job[] => {
  const saved = localStorage.getItem("saved-job");
  return saved ? JSON.parse(saved) : [];
};


export const removeSavedJob = (jobId: string): void => {
  const saved = getSavedJobs();
  const filtered = saved.filter((job) => job.id !== jobId);
  localStorage.setItem("saved-job", JSON.stringify(filtered));
};
