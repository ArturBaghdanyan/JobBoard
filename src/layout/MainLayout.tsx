import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppHeader } from "../components/header/AppHeader";
import Footer from "../components/footer/Footer";
import { Login } from "../AuthLayout/Login/Login";
import { Register } from "../AuthLayout/Register/Register";
import Modal from "../shared/components/Modal/Modal";
import CreateJob from "../components/create-job/CreateJob";

import UpdateJob from "../components/update-job/UpdateJob";
import style from "./layout.module.scss";
import type { Job } from "../types/jobTypes";
import { useJobs } from "../shared/hooks/useJobs";
import { useAuth } from "../shared/hooks/useAuth";
import RemoveJobItem from "../components/remove-job/RemoveJobItem";

interface MainLayoutProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainLayout = ({ darkMode, setDarkMode }: MainLayoutProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { updateJob, removeJob } = useJobs(user);
  const [modalType, setModalType] = useState<
    "create" | "edit" | "remove" | null
  >(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const isLoginOpen = location.pathname === "/login";
  const isRegisterOpen = location.pathname === "/register";

  const openCreateModal = () => {
    setSelectedJob(null);
    setModalType("create");
  };

  const openEditModal = (job: Job) => {
    setSelectedJob(job);
    setModalType("edit");
  };

  const handleConfirmDelete = (job: Job) => {
    // if (selectedJob && selectedJob.id) {
    //   removeJob(selectedJob.id);
    //   closeModal();
    // }
    if (job.id) {
      removeJob(job.id);
      closeModal();
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedJob(null);
  };

  const handleClose = () => navigate("/");

  return (
    <div className={style.layout}>
      <AppHeader
        onSignIn={() => navigate("/login")}
        onSignUp={() => navigate("/register")}
        onCreateJob={openCreateModal}
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
        <Outlet context={{ openEditModal, handleConfirmDelete }} />
      </main>

      {modalType === "create" && <CreateJob onClose={closeModal} />}

      {modalType === "edit" && selectedJob && (
        <UpdateJob
          job={selectedJob}
          onClose={closeModal}
          onUpdate={updateJob}
        />
      )}

      {modalType === "remove" && selectedJob && (
        <RemoveJobItem
          closeModal={closeModal}
          selectedJob={selectedJob}
          handleConfirmDelete={() => handleConfirmDelete(selectedJob)}
        />
      )}
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default MainLayout;
