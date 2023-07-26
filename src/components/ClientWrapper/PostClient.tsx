"use client";
import dynamic from "next/dynamic";

import { ExtendedPost } from "@/types/db";
import ComPostSkeleton from "@/components/SkeletonLoaders/ComPostSkeleton";

const Posts = dynamic(() => import("@/components/InfiniteQuery/Posts"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col gap-y-4">
      <ComPostSkeleton />
    </div>
  ),
});

interface PostsProps {
  initialPosts: ExtendedPost[];
  communityId: string;
}

const PostClient = ({ communityId, initialPosts }: PostsProps) => {
  return <Posts initialPosts={initialPosts} communityId={communityId} />;
};

export default PostClient;
