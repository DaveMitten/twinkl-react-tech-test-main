import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, afterEach } from "vitest";

import PostsTable from "../../components/custom/PostsTable";
import { Post } from "../../types/post";

describe("PostsTable", () => {
  afterEach(() => {
    cleanup();
  });

  const mockPosts: Post[] = [
    {
      userId: 1,
      id: 1,
      title: "Test Post 1",
      body: "body 1",
    },
    {
      userId: 2,
      id: 2,
      title: "Test Post 2",
      body: "body 2",
    },
  ];

  it("renders the table with posts", () => {
    render(<PostsTable posts={mockPosts} deletePost={() => {}} />);

    // Check if post data is displayed
    expect(screen.getByText("Test Post 1")).toBeInTheDocument();
    expect(screen.getByText("Test Post 2")).toBeInTheDocument();
    expect(screen.getByText("body 1")).toBeInTheDocument();
    expect(screen.getByText("body 2")).toBeInTheDocument();
  });

  it("displays 'No posts found' when posts array is empty", () => {
    render(<PostsTable posts={[]} deletePost={() => {}} />);
    expect(screen.getByText("No posts found")).toBeInTheDocument();
  });

  //TODO: add a e2e test for removal of post
});
