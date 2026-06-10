// src/mocks/testWrapper.tsx
import { configureStore } from "@reduxjs/toolkit";
import { jobsApi } from "../api/jobsApi";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes, Outlet } from "react-router-dom";

const store = configureStore({
  reducer: {
    [jobsApi.reducerPath]: jobsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobsApi.middleware),
});

// JobsPage uses useOutletContext, so we need a parent route that provides it
const MockLayout = () => {
  return (
    <Outlet
      context={{
        openEditModal: () => {},
      }}
    />
  );
};

export const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <MemoryRouter initialEntries={["/jobs"]}>
      <Routes>
        <Route element={<MockLayout />}>
          <Route path="/jobs" element={children} />
        </Route>
      </Routes>
    </MemoryRouter>
  </Provider>
);
