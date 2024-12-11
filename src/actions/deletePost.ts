"use server";

export const deletePost = async (id: number) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete post");
    }

    return response.json();
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};
