import { Skeleton } from "@/ui/Skeleton";
import { Shell } from "@/components/Shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";

const WatchlistContainers = [
  {
    id: 1,
    title: "Planning",
  },
  {
    id: 2,
    title: "Watching",
  },
  {
    id: 3,
    title: "Completed",
  },
];

const WatchlistLoading = () => {
  return (
    <Shell>
      <h1 className="text-4xl text-center font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]">
        Your Watchlist
      </h1>
      <div className="space-y-4">
        <Skeleton className="h-8 w-20" />
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {WatchlistContainers.map((item) => (
            <DragContainerSkeleton key={item.id} title={item.title} />
          ))}
        </div>
      </div>
    </Shell>
  );
};

export default WatchlistLoading;

export const DragContainerSkeleton = ({ title }: { title: string }) => {
  return (
    <Card className="flex flex-col gap-y-2 items-center min-h-[200px]">
      <CardHeader className="pb-3">
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <div className="flex flex-col w-full pb-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <CardContent className="w-full py-2" key={index}>
            <Skeleton className="h-14 w-full" />
          </CardContent>
        ))}
      </div>
    </Card>
  );
};
