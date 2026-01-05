import { useEffect, useState } from "react";
import {
  getSavedJobs,
  getAppliedJobs,
  saveJob as saveJobStorage,
  removeSavedJob as removeJobStorage,
  applyJob as applyJobStorage,
  editJob as editJobStorage,
} from "../utils/localStorageJobs";

import type { Job } from "../../types/jobTypes";
import type { UserProfile } from "../../types/auth";

export const useJobs = (user: UserProfile | null) => {
  const [savedJobs, setSavedJobs] = useState<Job[]>(getSavedJobs());
  const [appliedJobs, setAppliedJobs] = useState<Job[]>(getAppliedJobs());

  const syncServerData = (serverJobs: Job[]) => {
    localStorage.setItem("all_jobs", JSON.stringify(serverJobs));
    window.dispatchEvent(new Event("storage"));
  };

  const syncStorage = () => {
    setSavedJobs(getSavedJobs());
    setAppliedJobs(getAppliedJobs());
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    const handleStorage = () => {
      setSavedJobs(getSavedJobs());
      setAppliedJobs(getAppliedJobs());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleSave = (job: Job) => {
    const isSaved = savedJobs.some((j) => j.id === job.id);

    if (isSaved) removeJobStorage(job.id);
    else if (user) saveJobStorage(job);
    syncStorage();
  };

  const updateJob = (updatedJob: Job) => {
    if (!user) return;

    editJobStorage(updatedJob);
    syncStorage();
  };
  const onApply = (job: Job) => {
    if (!appliedJobs.some((j) => j.id === job.id)) {
      applyJobStorage(job);
      setAppliedJobs(getAppliedJobs());
    }
  };

  const removeJob = (job: string) => {
    if (!user) return;

    removeJobStorage(job);
    syncStorage();
    window.dispatchEvent(new Event("storage"));
  };

  return {
    savedJobs,
    appliedJobs,
    toggleSave,
    onApply,
    updateJob,
    removeJob,
    syncServerData,
  };
};
