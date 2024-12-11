"use client";

import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Post } from "../../types/post";

const PostsTable = ({
  posts,
  deletePost,
}: {
  posts: Post[];
  deletePost: Function;
}) => {
  //i went to implement a skeleton here but i was struggling with the table and the skeleton working together.
  if (posts?.length === 0) {
    return <div>No posts found</div>;
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-white">
      <Table>
        <TableBody>
          {posts?.map((post: any) => (
            <TableRow className="flex flex-col mx-2 md:mx-24" key={post?.id}>
              <TableCell>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col w-1/2">
                    <span className="text-lg font-bold">{post?.title}</span>
                    {/* TODO: need a character limit or an abbreviated format here */}
                    <span className="text-sm font-normal">{post?.body}</span>
                  </div>
                  <div className="flex justify-end items-center">
                    <Button
                      onClick={() => deletePost(post?.id)}
                      variant="destructive"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostsTable;
