import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppHeader } from "../components/header/AppHeader";
import Footer from "../components/footer/Footer";
import { Login } from "../AuthLayout/Login/Login";
import { Register } from "../AuthLayout/Register/Register";
import Modal from "../shared/components/Modal/Modal";
import CreateJob from "../components/createJob/CreateJob";

import style from "./layout.module.scss";

interface MainLayoutProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainLayout = ({ darkMode, setDarkMode }: MainLayoutProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginOpen = location.pathname === "/login";
  const isRegisterOpen = location.pathname === "/register";

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClose = () => navigate("/");

  return (
    <div className={style.layout}>
      <AppHeader
        onSignIn={() => navigate("/login")}
        onSignUp={() => navigate("/register")}
        onCreateJob={openModal}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {isLoginOpen && (
        <Modal onClose={handleClose}>
          <Login />
        </Modal>
      )}

      {isRegisterOpen && (
        <Modal onClose={handleClose}>
          <Register />
        </Modal>
      )}

      <main className={`${darkMode ? "dark" : "light"} ${style.content}`}>
        <Outlet />
      </main>

      {isModalOpen && <CreateJob onClose={closeModal} />}

      <Footer darkMode={darkMode} />
    </div>
  );
};

export default MainLayout;
