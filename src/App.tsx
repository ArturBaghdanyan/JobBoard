import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/Home/HomePage";
import JobsPage from "./pages/Jobs/JobsPage";
import { Login } from "./AuthLayout/Login/Login";
import { Register } from "./AuthLayout/Register/Register";
import ProfilePage from "./pages/Profile/ProfilePage";
import AppliedJobsPage from "./pages/applied-jobs/ApplyJobsPage";
import SavedJobs from "./pages/saved-jobs/SavedJobs";
import { useAuth } from "./shared/hooks/useAuth";
import { useEffect, useState } from "react";

function App() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  return (
    <Routes>
      <Route
        element={<MainLayout darkMode={darkMode} setDarkMode={setDarkMode} />}
      >
        <Route path="/" element={<HomePage darkMode={darkMode} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/applied-jobs" element={<AppliedJobsPage user={user} />} />
        <Route path="/saved-jobs" element={<SavedJobs user={user} />} />
      </Route>
    </Routes>
  );
}

export default App;
