import { useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "../../AuthLayout/Login/Login";
import Register from "../../AuthLayout/Register/Register";

import style from "./header.module.scss";

const Header = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

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
          <button onClick={() => setShowSignInModal(!showSignInModal)}>
            Sign In
          </button>
          {showSignInModal && <Login />}

          <button onClick={() => setShowSignUpModal(!showSignUpModal)}>
            Sign Up
          </button>
          {showSignUpModal && <Register />}
        </div>
      </div>
    </header>
  );
};

export default Header;
