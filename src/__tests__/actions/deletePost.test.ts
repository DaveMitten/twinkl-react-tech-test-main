import { deletePost } from "../../actions/deletePost";
import { http } from "msw";
import { setupServer } from "msw/node";
import { describe, it, beforeAll, afterEach, afterAll, expect } from "vitest";

describe("deletePost", () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should delete post successfully", async () => {
    server.use(
      http.delete("https://jsonplaceholder.typicode.com/posts/:id", () => {
        return new Response(null, { status: 200 });
      })
    );

    const result = await deletePost(1);
    expect(result).toEqual({});
  });

  it("should handle error when deletion fails", async () => {
    server.use(
      http.delete("https://jsonplaceholder.typicode.com/posts/:id", () => {
        return new Response(null, { status: 500 });
      })
    );

    const result = await deletePost(1);
    expect(result).toBeUndefined();
  });
});
