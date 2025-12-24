import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Login } from "../AuthLayout/Login/Login";
import { Register } from "../AuthLayout/Register/Register";
import Modal from "../components/Modal/Modal";
import style from "./layout.module.scss";

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginOpen = location.pathname === "/login";
  const isRegisterOpen = location.pathname === "/register";

  const handleClose = () => navigate("/");

  return (
    <div className={style.layout}>
      <Header
        onSignIn={() => navigate("/login")} 
        onSignUp={() => navigate("/register")}
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

      <main className={style.content}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout