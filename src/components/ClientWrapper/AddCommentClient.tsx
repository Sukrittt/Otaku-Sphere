"use client";
import dynamic from "next/dynamic";

const AddCommentForm = dynamic(
  () => import("@/components/Forms/AddCommentForm"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const AddCommentClient = ({ postId }: { postId: string }) => {
  return <AddCommentForm postId={postId} />;
};

export default AddCommentClient;
