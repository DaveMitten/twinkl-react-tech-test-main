import { getPosts } from "../../actions/getPosts";
import { http } from "msw";
import { describe, it, beforeAll, afterEach, afterAll, expect } from "vitest";

import { setupServer } from "msw/node";

describe("getPosts", () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should fetch posts successfully", async () => {
    const mockPosts = [
      { id: 1, title: "Post 1", body: "Body 1" },
      { id: 2, title: "Post 2", body: "Body 2" },
    ];

    server.use(
      http.get("https://jsonplaceholder.typicode.com/posts", () => {
        return new Response(JSON.stringify(mockPosts));
      })
    );

    const posts = await getPosts();
    expect(posts).toEqual(mockPosts);
  });

  it("should return empty array on error", async () => {
    server.use(
      http.get("https://jsonplaceholder.typicode.com/posts", () => {
        return new Response(null, { status: 500 });
      })
    );

    const posts = await getPosts();
    expect(posts).toEqual([]);
  });
});
