import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { IoPerson } from "react-icons/io5";

import style from "./header.module.scss";

interface PropsHeader {
  onSignIn: () => void;
  onSignUp: () => void;
  onCreateJob: () => void;
}
const Header = ({ onSignIn, onSignUp, onCreateJob }: PropsHeader) => {
  const { user, logout } = useAuth();

  return (
    <header>
      <div className={`${style.header} container`}>
        <h2>Job Board</h2>

        <nav>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : style.notActive}`
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
            <IoPerson />
            <button onClick={logout} className={style.header_account_log}>
              Logout
            </button>
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
