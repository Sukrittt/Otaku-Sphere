import { Card, CardFooter, CardHeader } from "@/ui/Card";
import { Skeleton } from "@/ui/Skeleton";

const PollCardsSkeleton = ({ length = 10 }: { length?: number }) => {
  return (
    <div className="space-y-8">
      {Array.from({ length }).map((_, index) => (
        <Card key={index}>
          <CardHeader className="space-y-4 pb-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-3/4 md:w-1/3" />
              <Skeleton className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton className="h-10 w-full" key={index} />
              ))}
            </div>
          </CardHeader>
          <CardFooter className="text-xs text-muted-foreground py-3">
            <Skeleton className="h-4 w-1/2 md:w-40" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PollCardsSkeleton;
