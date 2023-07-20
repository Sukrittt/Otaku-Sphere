import { CardFooter } from "@/ui/Card";
import { Skeleton } from "@/ui/Skeleton";

const CommentSkeleton = ({ length = 10 }: { length?: number }) => {
  return (
    <CardFooter className="py-3 border-t">
      <div className="flex flex-col gap-y-6 w-full">
        {Array.from({ length }).map((_, index) => (
          <CommentSkeletonCard key={index} />
        ))}
      </div>
    </CardFooter>
  );
};

export default CommentSkeleton;

const CommentSkeletonCard = () => {
  return (
    <div className="flex gap-x-2">
      <Skeleton className="h-6 w-6 rounded-full" />
      <div className="flex flex-col gap-y-1 w-full">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-full md:w-1/2" />
      </div>
    </div>
  );
};
