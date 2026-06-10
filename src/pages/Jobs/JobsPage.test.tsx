import { describe, vi, it, expect } from "vitest";
import React from "react";
import JobsPage from "./JobsPage";
import { fireEvent, waitFor } from "@testing-library/react";
import { render, screen } from "@testing-library/react";
import { TestWrapper } from "../../mocks/testWrapper";
import { useAuth } from "../../shared/hooks/useAuth";

vi.mock("../../shared/hooks/useAuth", () => ({
  useAuth: vi.fn().mockReturnValue({ user: null }),
}));

vi.mock("../../shared/hooks/useJobs", () => ({
  useJobs: vi.fn().mockReturnValue({
    savedJobs: [],
    appliedJobs: [],
    toggleSave: vi.fn(),
    onApply: vi.fn(),
  }),
}));

vi.mock("../../shared/utils/localStorageJobs", () => ({
  getAllJobsFromStorage: vi.fn().mockReturnValue([]),
  saveAllJobs: vi.fn(),
  removeSavedJob: vi.fn(),
}));

vi.mock("../../shared/hooks/JobCard", () => ({
  JobCard: ({ job, onApply, onToggleSave, onEdit, onRemove }: any) => (
    <div data-testid="job-card">
      <span>{job.title}</span>
      <button onClick={() => onApply(job)}>Apply</button>
      <button onClick={() => onToggleSave(job)}>Save</button>
      <button onClick={() => onEdit?.(job)}>Edit</button>
      <button onClick={() => onRemove?.(job)}>Remove</button>
    </div>
  ),
}));

describe("JobsPage", () => {
  it("shows job list after loading", async () => {
    (useAuth as any).mockReturnValue({ user: null });
    render(React.createElement(JobsPage), { wrapper: TestWrapper });

    expect(screen.getByText(/Loading/i)).toBeDefined();

    await waitFor(() => {
      expect(screen.getAllByTestId("job-card")).toHaveLength(2);
    });
  });

  it("filters jobs by search text", async () => {
    (useAuth as any).mockReturnValue({ user: null });
    render(React.createElement(JobsPage), { wrapper: TestWrapper });

    await waitFor(() => screen.getAllByTestId("job-card"));

    fireEvent.change(screen.getByPlaceholderText(/All keywords/i), {
      target: { value: "Dev 1" },
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("job-card")).toHaveLength(1);
    });
  });

  it("removes job from list after confirming delete", async () => {
    // 👈 user must be logged in
    (useAuth as any).mockReturnValue({ user: { id: "user1" } });

    render(React.createElement(JobsPage), { wrapper: TestWrapper });

    await waitFor(() => {
      expect(screen.getAllByTestId("job-card")).toHaveLength(2);
    });

    fireEvent.click(screen.getAllByRole("button", { name: /Remove/i })[0]);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Delete/i })).toBeDefined();
    });

    fireEvent.click(screen.getByRole("button", { name: /Delete/i }));

    await waitFor(() => {
      expect(screen.getAllByTestId("job-card")).toHaveLength(1);
    });
  });
});
