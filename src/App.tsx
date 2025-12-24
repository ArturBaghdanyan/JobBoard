import HomePage from "./pages/Home/HomePage";
import { Routes, Route } from "react-router-dom";
import JobsPage from "./pages/Jobs/JobsPage";
import MainLayout from "./layout/MainLayout";
import { Login } from "./AuthLayout/Login/Login";
import { Register } from "./AuthLayout/Register/Register";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
