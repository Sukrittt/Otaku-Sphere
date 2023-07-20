import { Card, CardContent, CardFooter } from "@/ui/Card";
import { Skeleton } from "@/ui/Skeleton";

const ReviewSkeleton = ({ length = 3 }: { length?: number }) => {
  return (
    <div className="flex flex-col gap-y-3">
      {Array.from({ length }).map((_, index) => (
        <Card key={index} className="lg:max-w-[66%]">
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-60 w-full" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-x-1.5 items-center text-muted-foreground text-sm">
              <Skeleton className="h-7 w-7 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ReviewSkeleton;
