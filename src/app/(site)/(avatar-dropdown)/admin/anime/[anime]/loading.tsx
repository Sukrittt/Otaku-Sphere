import { Shell } from "@/components/Shell";
import HeaderSkeleton from "@/components/SkeletonLoaders/HeaderSkeleton";
import { Skeleton } from "@/ui/Skeleton";
import { Card, CardContent, CardHeader } from "@/ui/Card";

const AdminAnimeLoading = () => {
  return (
    <Shell layout="dashboard">
      <HeaderSkeleton showBack />
      <Card>
        <CardHeader className="space-y-1">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-5">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full md:w-1/2" />
            </div>
          ))}
          <div className="flex gap-x-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </CardContent>
      </Card>
    </Shell>
  );
};

export default AdminAnimeLoading;
