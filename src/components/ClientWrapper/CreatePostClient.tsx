"use client";
import dynamic from "next/dynamic";

const CreatePostForm = dynamic(
  () => import("@/components/Forms/CreatePostForm"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const CreatePostClient = ({
  category,
  communityId,
}: {
  category: string;
  communityId: string;
}) => {
  return <CreatePostForm category={category} communityId={communityId} />;
};

export default CreatePostClient;
