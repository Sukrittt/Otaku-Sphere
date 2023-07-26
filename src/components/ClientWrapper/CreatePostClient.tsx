"use client";
import dynamic from "next/dynamic";

import { Skeleton } from "@/ui/Skeleton";

const CreatePostForm = dynamic(
  () => import("@/components/Forms/CreatePostForm"),
  {
    ssr: false,
    loading: () => <PostFormSkeleton />,
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

const PostFormSkeleton = () => {
  return (
    <div className="grid gap-5 mt-2">
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full md:w-1/2" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-24 w-full md:w-1/2" />
      </div>
      <Skeleton className="h-8 w-14" />
    </div>
  );
};
