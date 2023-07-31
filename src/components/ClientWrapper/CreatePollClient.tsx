"use client";
import dynamic from "next/dynamic";

import { Skeleton } from "@/ui/Skeleton";

const CreatePollForm = dynamic(
  () => import("@/components/Forms/CreatePollForm"),
  {
    ssr: false,
    loading: () => <PollFormSkeleton />,
  }
);

const CreatePollClient = () => {
  return <CreatePollForm />;
};

export default CreatePollClient;

const PollFormSkeleton = () => {
  return (
    <div className="grid gap-5 mt-2 max-w-lg">
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
        <div className="flex justify-end">
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 max-w-[280px]" />
      </div>
      <Skeleton className="h-8 w-20" />
    </div>
  );
};
