"use client";
import dynamic from "next/dynamic";

import { ExtendedComment } from "@/types/db";
import CommentSkeleton from "@/components/SkeletonLoaders/CommentSkeleton";

const InfiniteComments = dynamic(
  () => import("@/components/InfiniteQuery/Comments"),
  {
    ssr: false,
    loading: () => <CommentSkeleton noBorder />,
  }
);

interface CommentsProps {
  initialComments: ExtendedComment[];
  postId: string;
}

const CommentClient = ({ initialComments, postId }: CommentsProps) => {
  return <InfiniteComments initialComments={initialComments} postId={postId} />;
};

export default CommentClient;
