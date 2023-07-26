"use client";
import dynamic from "next/dynamic";

import { ExtendedPost } from "@/types/db";

const Posts = dynamic(() => import("@/components/InfiniteQuery/Posts"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface PostsProps {
  initialPosts: ExtendedPost[];
  communityId: string;
}

const PostClient = ({ communityId, initialPosts }: PostsProps) => {
  return <Posts initialPosts={initialPosts} communityId={communityId} />;
};

export default PostClient;
