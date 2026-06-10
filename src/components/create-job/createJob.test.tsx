import { render, screen } from "@testing-library/react";
import CreateJob from "./CreateJob";
import { describe, expect, it, vi } from "vitest";

import * as jobsApi from "../../api/jobsApi";

vi.mock("../../api/jobsApi", () => ({
  useAddJobMutation: vi.fn(),
}));

describe("renders create job modal", () => {
  it("should render the form correctly", () => {
    const mockAddJob = vi.fn();
    (jobsApi.useAddJobMutation as any).mockReturnValue([
      mockAddJob,
      { isLoading: false },
    ]);
    // 1. Render the component
    render(<CreateJob onClose={() => {}} />);

    // 3. Simple assertion to confirm rendering
    expect(screen.getByText(/Create New Job/i)).toBeDefined();
  });
});
