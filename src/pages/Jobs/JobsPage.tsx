import { useGetJobsQuery, useApplyJobMutation } from "../../api/jobsApi";
import { useAuth } from "../../hooks/useAuth";
import { JobList } from "../../components/jobsList";
import { useState } from "react";

import style from "./style.module.scss";

const JobsPage = () => {
  const { data: jobs = [], isLoading } = useGetJobsQuery();
  const [applyJob] = useApplyJobMutation();
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchText);
    console.log("search job", searchQuery);
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchText.toLowerCase()) ||
      job.company.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleApply = (jobId: string) => {
    if (!user) {
      alert("Please log in to apply for jobs");
      return;
    }
    applyJob({ id: jobId });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <main>
      <div className={style.jobs}>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by title, position"
        />
        <button onClick={(e) => handleSubmit(e)}>Search</button>
      </div>

      <JobList jobs={filteredJobs} onApply={handleApply} />
    </main>
  );
};

export default JobsPage;
