"use client";
import dynamic from "next/dynamic";

import { UserDisplay } from "@/types/item-type";
import { ExtendedUser } from "@/types/db";
import { Skeleton } from "@/ui/Skeleton";
import { ScrollArea } from "@/ui/ScrollArea";
import TableSkeleton from "@/components/SkeletonLoaders/TableSkeleton";

const Users = dynamic(() => import("@/components/InfiniteQuery/Users"), {
  ssr: false,
  loading: () => <UserClientSkeleton />,
});

interface UsersProps {
  initialUsers: UserDisplay[];
  initialFetchedUsers: ExtendedUser[];
}
const UserClient = ({ initialFetchedUsers, initialUsers }: UsersProps) => {
  return (
    <Users
      initialFetchedUsers={initialFetchedUsers}
      initialUsers={initialUsers}
    />
  );
};

export default UserClient;

const TableColumns = [
  "Name",
  "Email",
  "Ratings",
  "Joined At",
  "Communities",
  "Posts",
];

const UserClientSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-2 items-center px-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-16" />
      </div>

      <ScrollArea className="w-full" orientation="horizontal">
        <TableSkeleton columns={TableColumns} />
      </ScrollArea>
      <div className="w-full flex justify-end">
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
};
