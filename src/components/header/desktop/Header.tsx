import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/useAuth";
import { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

import style from "./header.module.scss";
import { CiDark, CiLight } from "react-icons/ci";

interface PropsHeader {
  onSignIn: () => void;
  onSignUp: () => void;
  onCreateJob: () => void;
  darkMode: boolean;
}
const Header = ({ onSignIn, onSignUp, onCreateJob, darkMode }: PropsHeader) => {
  const { user, logout } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <header>
      <div className={`${style.header} container`}>
        <h2>Job Board</h2>
        <nav className={style.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : style.notActive} `
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : style.notActive}`
            }
          >
            Jobs
          </NavLink>
          <button onClick={onCreateJob} className={style.link}>
            Create Jobs
          </button>
        </nav>
        {user ? (
          <div className={style.header_account}>
            <div className={style.header_account_title}>
              <div className={style.header_account_user}>
                <IoPerson />
              </div>
              <button onClick={() => setShowPopup((prev) => !prev)}>
                {showPopup ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
              </button>
              {showPopup && (
                <div className={`${style.popup}`}>
                  <Link to="/profile" onClick={() => setShowPopup(false)}>
                    Profile
                  </Link>
                  <Link to="/applied-jobs" onClick={() => setShowPopup(false)}>
                    Applied Jobs
                  </Link>
                  <Link to="/saved-jobs" onClick={() => setShowPopup(false)}>
                    Saved Jobs
                  </Link>
                  <button onClick={logout} className={style.header_account_log}>
                    Logout
                  </button>
                </div>
              )}
            </div>
            {darkMode ? (
              <div className={style.darkOverlay}>
                <CiDark />
              </div>
            ) : (
              <div>
                <CiLight />
              </div>
            )}
          </div>
        ) : (
          <div className={style.header_buttons}>
            <button onClick={onSignIn}>Sign In</button>
            <button onClick={onSignUp}>Sign Up</button>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
