import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { IoPerson } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { BsBriefcaseFill } from "react-icons/bs";

import style from "./style.module.scss";
import Personal from "./Personal";
import { useState } from "react";

const ProfilePage = () => {
  const { user } = useAuth();
  const [showUserDetails, setShowUserDetails] = useState(false);
  
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
            Applied Jobs
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
        {user && (
          <Personal
            user={user}
            showUserDetails={showUserDetails}
            setShowUserDetails={setShowUserDetails}
          />
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
