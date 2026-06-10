import { describe, expect, it, vi } from "vitest";
import RemoveJobItem from "./RemoveJobItem";
import { render, screen, fireEvent } from "@testing-library/react";

const defaultProps = {
  closeModal: vi.fn(),
  selectedJob: { id: "1", title: "Test Job" },
  handleConfirmDelete: vi.fn(),
};

describe("RemoveJobItem", () => {
  it("renders job title in confirmation message", () => {
    render(<RemoveJobItem {...defaultProps} />);
    expect(
      screen.getByText(/Are you sure you want to delete the job "Test Job"/i),
    ).toBeDefined();
  });

  it("calls handleCorfirmModalDelete when delete button is clicked", () => {
    const mockHandleConfirmDelete = vi.fn();
    render(
      <RemoveJobItem
        {...defaultProps}
        handleConfirmDelete={mockHandleConfirmDelete}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Delete/i }));
    expect(mockHandleConfirmDelete).toHaveBeenCalledTimes(1);
  });

  it("Click to cancel button should call closeModal", () => {
    const mockCloseModal = vi.fn();
    render(<RemoveJobItem {...defaultProps} closeModal={mockCloseModal} />);
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it("calls closeModal when overlay is clicked", () => {
    const mockCloseModal = vi.fn();
    render(<RemoveJobItem {...defaultProps} closeModal={mockCloseModal} />);

    fireEvent.click(screen.getByTestId("modal-overlay"));
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it("does not call closeModal when clicking inside modal content", () => {
    const closeModal = vi.fn();
    render(<RemoveJobItem {...defaultProps} closeModal={closeModal} />);

    fireEvent.click(screen.getByText(/Confirm Deletion/i));
    expect(closeModal).not.toHaveBeenCalled();
  });
});
