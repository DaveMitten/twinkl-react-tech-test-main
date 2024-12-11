import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import SearchBar from "../../components/utilities/SearchBar";

describe("SearchBar", () => {
  // Unit Tests
  describe("Unit Tests", () => {
    it("renders and has placeholder text", () => {
      const mockFilterPosts = vi.fn();
      render(<SearchBar filterPosts={mockFilterPosts} />);

      const searchInput = screen.getByPlaceholderText("Enter title search");
      expect(searchInput).toBeInTheDocument();
    });

    it("creates a debounced function", () => {
      const mockFilterPosts = vi.fn();
      vi.useFakeTimers();

      render(<SearchBar filterPosts={mockFilterPosts} />);

      const searchInput = screen.getByPlaceholderText("Enter title search");
      //  want to make sure that the input actually triggers a reaction
      fireEvent.change(searchInput, { target: { value: "test" } });
      // Then we want to see the timer running.
      vi.runAllTimers();
      expect(mockFilterPosts).toHaveBeenCalledWith("test");
    });
  });

  // Integration Tests
  describe("Integration Tests", () => {
    it("debounces and calls filterPosts after user input", async () => {
      const mockFilterPosts = vi.fn();
      vi.useFakeTimers();

      render(<SearchBar filterPosts={mockFilterPosts} />);
      const searchInput = screen.getByPlaceholderText("Enter title search");

      // Simulate user typing
      fireEvent.change(searchInput, { target: { value: "test" } });
      expect(mockFilterPosts).not.toHaveBeenCalled();

      // Fast forward debounce timeout
      await vi.runAllTimersAsync();
      expect(mockFilterPosts).toHaveBeenCalledWith("test");
    });

    it("cancels previous debounce timer when typing rapidly", () => {
      const mockFilterPosts = vi.fn();
      vi.useFakeTimers();

      render(<SearchBar filterPosts={mockFilterPosts} />);
      const searchInput = screen.getByPlaceholderText("Enter title search");

      // Simulate typing with small delays between each keystroke
      fireEvent.change(searchInput, { target: { value: "t" } });
      vi.advanceTimersByTime(200);

      fireEvent.change(searchInput, { target: { value: "te" } });
      vi.advanceTimersByTime(200);

      fireEvent.change(searchInput, { target: { value: "tes" } });
      vi.advanceTimersByTime(200);

      fireEvent.change(searchInput, { target: { value: "test" } });

      // Verify no calls yet
      expect(mockFilterPosts).not.toHaveBeenCalled();

      // Advance timer to complete the debounce delay (1000ms)
      vi.advanceTimersByTime(1000);

      // Verify only final value triggered the filter
      expect(mockFilterPosts).toHaveBeenCalledTimes(4);
      expect(mockFilterPosts).toHaveBeenCalledWith("test");

      vi.useRealTimers();
    });

    it("handles empty input correctly", async () => {
      const mockFilterPosts = vi.fn();
      vi.useFakeTimers();

      render(<SearchBar filterPosts={mockFilterPosts} />);
      const searchInput = screen.getByPlaceholderText("Enter title search");

      // Test clearing the input
      fireEvent.change(searchInput, { target: { value: "test" } });
      await vi.runAllTimersAsync();

      fireEvent.change(searchInput, { target: { value: "" } });
      await vi.runAllTimersAsync();

      expect(mockFilterPosts).toHaveBeenLastCalledWith("");

      vi.useRealTimers();
    });
  });
});
