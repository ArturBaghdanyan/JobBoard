import { useApplyJobMutation, useGetJobsQuery } from "../../api/jobsApi";
import { JobList } from "../../components/jobsList";
import { useAuth } from "../../hooks/useAuth";
import { CiSearch } from "react-icons/ci";

import style from "./home.module.scss";

const HomePage = () => {
  const { data: jobs = [], isLoading } = useGetJobsQuery();
  const [applyJob] = useApplyJobMutation();
  const { user } = useAuth();

  const handleApply = (jobId: string) => {
    if (!user) {
      alert("Please log in to apply for jobs");
      return;
    }
    applyJob({ id: jobId });
  };

  if (isLoading) return <p>Loading...</p>;

  const selectList = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "React Developer",
    "Node.js Developer",
    "UI/UX Designer",
    "QA Engineer",
    "DevOps Engineer",
    "Flutter Developer",
    "Project Manager",
    "Data Analyst",
    "Python Developer",
    "PHP Developer",
  ];

  return (
    <div className={style.home}>
      <div className={style.home_container}>
        <h1>Find Your Dream Job</h1>
        <p>Search thousands of jobs from top companies</p>

        <form>
          <input name="keywords" placeholder="All keywords" required />

          <select name="categories">
            {selectList.map((item, index) => (
              <option value={index}>{item}</option>
            ))}
          </select>
          <button type="submit">
            <CiSearch />
          </button>
        </form>
      </div>

      <JobList jobs={jobs.slice(0, 3)} onApply={handleApply} />
    </div>
  );
};

export default HomePage;
