import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import style from "./layout.module.scss";
import { Login } from "../AuthLayout/Login/Login";
import { Register } from "../AuthLayout/Register/Register";
import Modal from "../components/Modal/Modal";

const MainLayout = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className={style.layout}>
      <Header
        onSignIn={() => setShowLogin(true)}
        onSignUp={() => setShowRegister(true)}
      />
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <Login />
        </Modal>
      )}

      {showRegister && (
        <Modal onClose={() => setShowRegister(false)}>
          <Register />
        </Modal>
      )}
      <main className={style.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
