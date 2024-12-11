"use client";

import { getPosts as _getPosts } from "@/actions/getPosts";
import { filterPosts as _filterPosts } from "@/actions/filterPosts";
import { deletePost as _deletePost } from "@/actions/deletePost";
import { useEffect, useState, useMemo } from "react";

const usePosts = () => {
  const [originalPosts, setOriginalPosts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  //acting like a reducer of sorts

  const posts = useMemo(() => {
    if (!searchTerm.trim()) return originalPosts;
    //
    return originalPosts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [originalPosts, searchTerm]);

  async function getPosts() {
    try {
      const posts = await _getPosts();
      setOriginalPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  async function deletePost(id: number) {
    try {
      const deletedPost = await _deletePost(id);
      if (!deletedPost) {
        throw deletedPost;
      } else {
        setOriginalPosts((prev) => prev.filter((post) => post.id !== id));
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  async function filterPosts(title: string) {
    setSearchTerm(title);
  }

  return {
    posts,
    deletePost,
    filterPosts,
  };
};

export default usePosts;
