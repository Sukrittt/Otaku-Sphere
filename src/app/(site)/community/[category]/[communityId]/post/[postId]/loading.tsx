import { Skeleton } from "@/ui/Skeleton";
import { Shell } from "@/components/Shell";
import { Card, CardContent, CardHeader } from "@/ui/Card";

const IndividualPostLoading = () => {
  return (
    <Shell layout="dashboard">
      <Card>
        <CardHeader className="border-b flex flex-col gap-y-2">
          <div className="grid gap-2">
            <Skeleton className="h-4 w-20" />
            <div className="mt-2 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-10 w-full md:w-1/2" />
            </div>
            <Skeleton className="h-10 w-full mt-2" />
          </div>
          <div className="flex items-center gap-x-5">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="w-full flex flex-col gap-y-4 py-5">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-20 w-full" />
          </div>
          <Skeleton className="h-8 w-20" />
        </CardContent>
      </Card>
    </Shell>
  );
};

export default IndividualPostLoading;
