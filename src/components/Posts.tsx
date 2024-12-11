"use client";

import { useMemo } from "react";
import PostsTable from "./custom/PostsTable";
import usePosts from "../hooks/usePosts";
import SearchBar from "./utilities/SearchBar";

const Posts = () => {
  const { posts: _posts, deletePost, filterPosts } = usePosts();
  const memoizedPosts = useMemo(() => _posts, [_posts]);

  return (
    <div className="flex flex-col items-center justify-center w-full md:w-1/2 h-full pt-6 md:py-10 space-y-6 ">
      <h1 className="text-2xl font-bold">Post list</h1>
      <SearchBar filterPosts={filterPosts} />
      <PostsTable posts={memoizedPosts} deletePost={deletePost} />
    </div>
  );
};
export default Posts;
