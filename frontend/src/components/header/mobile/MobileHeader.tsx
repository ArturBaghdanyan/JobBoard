import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { IoMenu, IoClose, IoPerson } from "react-icons/io5";
import { useAuth } from "../../../shared/hooks/useAuth";

import styles from "./mobile.module.scss";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

interface MobileHeaderProps {
  onSignIn: () => void;
  onSignUp: () => void;
  onCreateJob: () => void;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileHeader = ({
  onSignIn,
  onSignUp,
  onCreateJob,
  darkMode,
  setDarkMode,
}: MobileHeaderProps) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const logoutUser = () => {
    logout();
    setOpen(false);
  };

  return (
    <header className={`${darkMode ? styles.headerDark : styles.headerLight}`}>
      <div className={styles.mobileHeader}>
        <div className={styles.top}>
          <h2>Job Board</h2>

          <button onClick={() => setOpen(!open)} className={`${darkMode ? styles.darkIcon : styles.lightIcon}`}>
            {open ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </div>

      {open && (
        <>
          <nav className={`${darkMode ? styles.headerDark : styles.headerLight} ${styles.menu}`}>
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className={styles.menu_mode}
            >
              {darkMode ? (
                <MdOutlineLightMode color="white" />
              ) : (
                <MdDarkMode color="black" />
              )}
            </button>
            <NavLink to="/" onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/jobs" onClick={() => setOpen(false)}>
              Jobs
            </NavLink>

            <button
              onClick={() => {
                onCreateJob();
                setOpen(false);
              }}
            >
              Create Job
            </button>

            <div className={styles.divider} />

            {user ? (
              <>
                <Link to="/profile" onClick={() => setOpen(false)}>
                  <IoPerson /> Profile
                </Link>
                <Link to="/applied-jobs" onClick={() => setOpen(false)}>
                  Applied Jobs
                </Link>
                <Link to="/saved-jobs" onClick={() => setOpen(false)}>
                  Saved Jobs
                </Link>
                <button className={styles.logout} onClick={logoutUser}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    onSignIn();
                    setOpen(false);
                  }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    onSignUp();
                    setOpen(false);
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </nav>
        </>
      )}
    </header>
  );
};

export default MobileHeader;
