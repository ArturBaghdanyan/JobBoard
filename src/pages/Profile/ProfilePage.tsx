import { NavLink } from "react-router-dom";

import style from "./style.module.scss";

const ProfilePage = () => {
  return (
    <div className={style.profile}>
      <menu className={`${style.menu}`}>
        <div className={style.menu_pages}>
          <div className={style.menu_item}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? style.active : undefined
              }
            >
              My Profile
            </NavLink>
            <span></span>
          </div>

          <div className={style.menu_item}>
            <NavLink
              to="/reserved"
              className={({ isActive }) =>
                isActive ? style.active : undefined
              }
            >
              Reserved Jobs
            </NavLink>
            <span></span>
          </div>

          <div className={style.menu_item}>
            <NavLink
              to="/savedJobs"
              className={({ isActive }) =>
                isActive ? style.active : undefined
              }
            >
              Saved Jobs
            </NavLink>
            <span></span>
          </div>
        </div>
      </menu>
      <main></main>
    </div>
  );
};

export default ProfilePage;
