import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import person from "../../assets/person.jpg";
import { IoPerson } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { BsBriefcaseFill } from "react-icons/bs";

import style from "./style.module.scss";


const ProfilePage = () => {
  const { user } = useAuth();
  
  return (
    <div className={style.profile}>
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
            to="/reserved"
            className={({ isActive }) =>
              `${style.menu_link} ${isActive ? style.active : ""}`
            }
          >
            <BsBriefcaseFill />
            Reserved Jobs
          </NavLink>

          <NavLink
            to="/savedJobs"
            className={({ isActive }) =>
              `${style.menu_link} ${isActive ? style.active : ""}`
            }
          >
            <CiHeart />
            Saved Jobs
          </NavLink>
        </div>
      </menu>

      <main className="container">
        <div className={style.profile_header}>
          <div className={style.profile_avatar}>
            <img src={person} alt="avatar" />
          </div>

          {user && (
            <div className={style.profile_info}>
              <h2>{user.username}</h2>
              <p>{user.email}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
