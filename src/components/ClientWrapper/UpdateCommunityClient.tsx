"use client";
import dynamic from "next/dynamic";
import { Community } from "@prisma/client";

import { Skeleton } from "@/ui/Skeleton";

const UpdateCommunityForm = dynamic(
  () => import("@/components/Forms/UpdateCommunityForm"),
  {
    ssr: false,
    loading: () => <UpdateCommunityFormSkeleton />,
  }
);

const UpdateCommunityClient = ({ community }: { community: Community }) => {
  return <UpdateCommunityForm community={community} />;
};

export default UpdateCommunityClient;

const UpdateCommunityFormSkeleton = () => {
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
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-2/3 md:w-40" />
      </div>
      <div className="flex gap-x-2 items-center">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
};
