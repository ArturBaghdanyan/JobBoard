import { JobList } from "../../components/jobsList";

import style from "./style.module.scss";

const JobsPage = () => {
  return (
    <main>
      <div className={style.jobs}>
        <input type="text" placeholder="Search by title, position" />
        <button>Search</button>
      </div>
      <JobList />
    </main>
  );
};

export default JobsPage;
