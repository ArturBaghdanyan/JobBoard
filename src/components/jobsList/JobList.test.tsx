// 1. Rendering
// List Rendering(when User open page, then show job list)
// List must be show in reverse
// State Mapping: saved and applied

// 2. User Authentication Requirements (The "Guard" Logic)
// Unauthenticated Access: If user is null (not logged in), ensure that clicking "Save," "Apply," "Edit," or "Remove" triggers the setModalType("login") and setShowModal(true) functions instead of the actual action functions.
// Authenticated Access: if user exists, then by clicking the actions triggers the provided callback props (onToggleSave, onApply, etc.) correctly.

// 3. Modal & Interaction Requirements
// Apply Success: Verify that calling handleApply sets the modalType to "success" and opens the modal.
// Modal Visibility: Verify that the ShowModal component is only rendered when showModal is true.

import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { JobList } from "./index";
import { useAuth } from "../../shared/hooks/useAuth";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import type { Job } from "../../types/jobTypes";

vi.mock("../../shared/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

vi.mock("../../shared/hooks/JobCard", () => ({
  JobCard: ({
    job,
    onApply,
    onToggleSave,
    onEdit,
    onRemove,
  }: {
    job: Job;
    onApply: (job: Job) => void;
    onToggleSave: (job: Job) => void;
    onEdit?: (job: Job) => void;
    onRemove?: (job: Job) => void;
  }) => (
    <div data-testid="job-card">
      <span>{job.title}</span>
      <button onClick={() => onApply(job)}>Apply</button>
      <button onClick={() => onToggleSave(job)}>Save</button>
      <button onClick={() => onEdit?.(job)}>Edit</button>
      <button onClick={() => onRemove?.(job)}>Remove</button>
    </div>
  ),
}));

const mockJobs = [
  { id: "1", title: "Dev 1" },
  { id: "2", title: "Dev 2" },
] as Job[];

const renderJobList = (props = {}) => {
  const defaultProps = {
    jobs: mockJobs,
    savedJobs: [],
    appliedJobs: [],
    onToggleSave: vi.fn(),
    onApply: vi.fn(),
    modalType: null,
    setModalType: vi.fn(),
    showModal: false,
    setShowModal: vi.fn(),
    ...props,
  };

  return {
    ...render(
      <MemoryRouter>
        <JobList {...defaultProps} />
      </MemoryRouter>,
    ),
    props: defaultProps,
  };
};

describe("JobList Component", () => {
  it("renders jobs in reverse order", () => {
    (useAuth as any).mockReturnValue({ user: null });
    renderJobList();

    const cards = screen.getAllByTestId("job-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent(/Dev 2/i);
  });

  it("triggers login modal when unauthenticated user clicks apply", async () => {
    (useAuth as any).mockReturnValue({
      user: null,
    });
    const setModalType = vi.fn();
    const setShowModal = vi.fn();
    renderJobList({ setModalType, setShowModal });

    const applyButtons = screen.getAllByText(/Apply/i);
    fireEvent.click(applyButtons[0]);

    expect(setModalType).toHaveBeenCalledWith("login");
    expect(setShowModal).toHaveBeenCalledWith(true);
  });

  it("triggers onApply when authenticated user clicks apply", async () => {
    (useAuth as any).mockReturnValue({ user: { id: "user1" } });

    const user = userEvent.setup();
    const onApply = vi.fn();

    renderJobList({ onApply });

    const applyButtons = screen.getAllByText(/Apply/i);
    await user.click(applyButtons[0]);

    expect(onApply).toHaveBeenCalled();
  });
});
