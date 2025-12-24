import { NavLink } from "react-router-dom";

import style from "./header.module.scss";

interface PropsHeader {
  onSignIn: () => void;
  onSignUp: () => void;
}
const Header = ({ onSignIn, onSignUp }: PropsHeader) => {
  return (
    <header>
      <div className={style.header}>
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
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : style.notActive}`
            }
          >
            Create Jobs
          </NavLink>
        </nav>

        <div className={style.header_buttons}>
          <button onClick={onSignIn}>Sign In</button>
          <button onClick={onSignUp}>Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
