// 1.user sees update Modal
// 2.user clicks edit button
// 3.Item updated from UI
// 4.Loading state appears(if exist api)
// 5.Error message shows if request fails

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as jobsApi from "../../api/jobsApi";
import UpdateJob from "./UpdateJob";
import type { Job } from "../../types/jobTypes";

vi.mock("../../api/jobsApi", () => ({
  useEditJobMutation: vi.fn(),
}));

describe("UpdateJob Component", () => {
  const mockJob: Job = {
    id: "1",
    title: "Dev",
    position: "Senior",
    company: "Tech",
    location: "Remote",
    salary: "100k",
    about: "Good job",
    requirements: ["React"],
  };
  it("handles the full edit lifecycle", async () => {
    const user = userEvent.setup();
    const mockEditJob = vi.fn().mockReturnValue({
      unwrap: vi.fn().mockResolvedValue({}),
    });
    const mockOnUpdate = vi.fn();
    (jobsApi.useEditJobMutation as any).mockReturnValue([
      mockEditJob,
      { isLoading: false },
    ]);

    render(
      <UpdateJob job={mockJob} onClose={vi.fn()} onUpdate={mockOnUpdate} />,
    );

    const submitBtn = screen.getByRole("button", { name: /update job/i });
    await user.click(submitBtn);

    expect(mockEditJob).toHaveBeenCalled();
    expect(mockOnUpdate).toHaveBeenCalled();
  });

  it("shows loading state, when API pending", async () => {
    (jobsApi.useEditJobMutation as any).mockReturnValue([
      vi.fn(),
      { isLoading: true },
    ]);

    render(<UpdateJob job={mockJob} onClose={vi.fn()} onUpdate={vi.fn()} />);
    screen.debug();
    const submitBtn = screen.getByRole("button", { name: /saving\.\.\./i });

    expect(submitBtn).toBeDisabled();
  });
});
