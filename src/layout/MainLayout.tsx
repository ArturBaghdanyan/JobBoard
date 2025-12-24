import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import style from "./layout.module.scss"

const MainLayout = () => {
  return (
    <div className={style.layout}>
      <Header />
      <main className={style.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
