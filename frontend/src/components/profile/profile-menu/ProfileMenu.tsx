import { NavLink } from "react-router-dom";
import { BsBriefcaseFill } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";

import style from "./style.module.scss";

const ProfileMenu = () => {
  return (
    <menu className={style.menu}>
      <div className={style.menu_pages}>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${style.menu_link} ${isActive ? style.active : ""}`
          }
        >
          <IoPerson />
          My Profile
        </NavLink>

        <NavLink
          to="/applied-jobs"
          className={({ isActive }) =>
            `${style.menu_link} ${isActive ? style.active : ""}`
          }
        >
          <BsBriefcaseFill />
          Applied Jobs
        </NavLink>

        <NavLink
          to="/saved-jobs"
          className={({ isActive }) =>
            `${style.menu_link} ${isActive ? style.active : ""}`
          }
        >
          <CiHeart />
          Saved Jobs
        </NavLink>
      </div>
    </menu>
  );
};

export default ProfileMenu;
