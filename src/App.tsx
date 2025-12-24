import HomePage from "./pages/Home/HomePage";
import { Routes, Route } from "react-router-dom";
import JobsPage from "./pages/Jobs/JobsPage";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
