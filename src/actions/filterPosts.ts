"use server";

import { getPosts } from "./getPosts";

export const filterPosts = async (
  title: string,
  posts: any[]
): Promise<any[]> => {
  if (title) {
    try {
      const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(title.toLowerCase())
      );
      console.log({ filteredPosts });
      return filteredPosts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  }
  return await getPosts();

  //i did start with this but realised this was an expensive fetch, so isntead, i think it makes more sense to filter the returned posts
  //   if (title) {
  //     try {
  //       const response = await fetch(
  //         `https://jsonplaceholder.typicode.com/posts?title=${title}`
  //       );
  //       console.log({ response });
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch posts");
  //       }
  //       const data = await response.json();
  //       console.log({ data });
  //       return data;
  //     } catch (error) {
  //       console.error("Error fetching posts:", error);
  //       return [];
  //     }
  //   }
  //   return await getPosts();
};
