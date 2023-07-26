"use client";
import dynamic from "next/dynamic";
import { CommentBoxSkeleton } from "@/app/(site)/community/[category]/[communityId]/post/[postId]/loading";

const AddCommentForm = dynamic(
  () => import("@/components/Forms/AddCommentForm"),
  {
    ssr: false,
    loading: () => <CommentBoxSkeleton />,
  }
);

const AddCommentClient = ({ postId }: { postId: string }) => {
  return <AddCommentForm postId={postId} />;
};

export default AddCommentClient;
