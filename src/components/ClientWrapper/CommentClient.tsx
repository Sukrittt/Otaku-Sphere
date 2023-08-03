"use client";
import dynamic from "next/dynamic";

import { ExtendedComment } from "@/types/db";
import CommentSkeleton from "@/components/SkeletonLoaders/CommentSkeleton";
import { CardFooter } from "@/ui/Card";

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
  return (
    <CardFooter className="py-3 border-t">
      <InfiniteComments initialComments={initialComments} postId={postId} />;
    </CardFooter>
  );
};

export default CommentClient;
