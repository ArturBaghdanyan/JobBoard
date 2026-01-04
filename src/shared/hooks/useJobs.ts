import { useEffect, useState } from "react";
import {
  getSavedJobs,
  getAppliedJobs,
  saveJob as saveJobStorage,
  removeSavedJob,
  applyJob as applyJobStorage,
  editJob as editJobStorage,
} from "../utils/localStorageJobs";

import type { Job } from "../../types/jobTypes";
import type { UserProfile } from "../../types/auth";

export const useJobs = (user: UserProfile | null) => {
  const [savedJobs, setSavedJobs] = useState<Job[]>(getSavedJobs());
  const [appliedJobs, setAppliedJobs] = useState<Job[]>(getAppliedJobs());

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

    if (isSaved) removeSavedJob(job.id);
    else if (user) saveJobStorage(job);
    setSavedJobs(getSavedJobs());
  };

  const updateJob = (updatedJob: Job) => {
    if (!user) return;

    editJobStorage(updatedJob);
    setSavedJobs(getSavedJobs());
  };
  const onApply = (job: Job) => {
    if (!appliedJobs.some((j) => j.id === job.id)) {
      applyJobStorage(job);
      setAppliedJobs(getAppliedJobs());
    }
  };

  return { savedJobs, appliedJobs, toggleSave, onApply, updateJob };
};
