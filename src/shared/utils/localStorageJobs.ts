import type { Job } from "../../types/jobTypes";

const ALL_JOBS = "all-jobs";
const SAVED = "saved-job";
const APPLIED = "applied-job";

export const getAppliedJobs = (): Job[] =>
  JSON.parse(localStorage.getItem(APPLIED) || "[]");

export const saveAllJobs = (jobs: Job[]): void => {
  localStorage.setItem(ALL_JOBS, JSON.stringify(jobs));
  window.dispatchEvent(new Event("local-jobs-updated"));
};

export const getSavedJobs = (): Job[] => {
  const saved = localStorage.getItem(SAVED);
  return saved ? JSON.parse(saved) : [];
};

export const getAllJobsFromStorage = (): Job[] => {
  const stored = localStorage.getItem(ALL_JOBS);
  return stored ? JSON.parse(stored) : [];
};

export const saveAppliedJobs = (jobs: Job[]): void =>
  localStorage.setItem(APPLIED, JSON.stringify(jobs));

export const saveJob = (job: Job): void => {
  const saved = getSavedJobs();
  if (!saved.some((j) => j.id === job.id)) {
    saved.push(job);
    localStorage.setItem(SAVED, JSON.stringify(saved));
  }
};

export const editJob = (job: Job): void => {
  const saved = getSavedJobs();
  const index = saved.findIndex((j) => j.id === job.id);
  if (index !== -1) {
    saved[index] = job;
    localStorage.setItem(SAVED, JSON.stringify(saved));
  }
};

export const applyJob = (job: Job): void => {
  const applied = getAppliedJobs();
  if (!applied.some((j) => j.id === job.id)) {
    applied.push(job);
    localStorage.setItem(APPLIED, JSON.stringify(applied));
  }
};

export const removeJobFromAllJobs = (jobId: string): void => {
  const stored = localStorage.getItem(ALL_JOBS);
  if (!stored) return;

  const jobs = JSON.parse(stored);
  const updated = jobs.filter((job: Job) => job.id !== jobId);

  localStorage.setItem(ALL_JOBS, JSON.stringify(updated));
  window.dispatchEvent(new Event("local-jobs-updated"));
};

export const removeAppliedJob = (jobId: string) => {
    const applied = getAppliedJobs();
    const updated = applied.filter((job: Job) => job.id !== jobId);
    localStorage.setItem(APPLIED, JSON.stringify(updated));
}

export const removeSavedJob = (jobId: string): void => {
  const saved = getSavedJobs();
  const filtered = saved.filter((job) => job.id !== jobId);
  localStorage.setItem(SAVED, JSON.stringify(filtered));
};
