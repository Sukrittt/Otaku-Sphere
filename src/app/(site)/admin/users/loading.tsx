import { Shell } from "@/components/Shell";
import HeaderSkeleton from "@/components/SkeletonLoaders/HeaderSkeleton";
import TableSkeleton from "@/components/SkeletonLoaders/TableSkeleton";
import { ScrollArea } from "@/ui/ScrollArea";
import { Skeleton } from "@/ui/Skeleton";

const TableColumns = [
  "Name",
  "Email",
  "Ratings",
  "Joined At",
  "Communities",
  "Posts",
];

const AdminUserLoading = () => {
  return (
    <Shell layout="dashboard">
      <HeaderSkeleton description />
      <div className="flex gap-2 p-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-16" />
      </div>
      <ScrollArea className="w-full" orientation="horizontal">
        <TableSkeleton columns={TableColumns} />
      </ScrollArea>
    </Shell>
  );
};

export default AdminUserLoading;
