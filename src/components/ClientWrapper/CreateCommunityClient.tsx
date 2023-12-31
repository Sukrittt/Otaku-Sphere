"use client";
import dynamic from "next/dynamic";

import { Skeleton } from "@/ui/Skeleton";

const CreateCommunityForm = dynamic(
  () => import("@/components/Forms/CreateCommunityForm"),
  {
    ssr: false,
    loading: () => <CommunityFormSkeleton />,
  }
);

const CreateCommunityClient = () => {
  return <CreateCommunityForm />;
};

export default CreateCommunityClient;

const CommunityFormSkeleton = () => {
  return (
    <div className="grid gap-5 mt-2 max-w-xl">
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-24 w-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full md:w-[200px]" />
      </div>
      <Skeleton className="h-8 w-20" />
    </div>
  );
};
