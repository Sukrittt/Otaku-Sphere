import { cn } from "@/lib/utils";
import { Skeleton } from "@/ui/Skeleton";

const HeaderSkeleton = ({
  showBack,
  description,
  large,
}: {
  showBack?: boolean;
  description?: boolean;
  large?: boolean;
}) => {
  return (
    <div className="grid gap-4">
      {showBack && <Skeleton className="h-8 w-20" />}
      <div className="space-y-2">
        <Skeleton
          className={cn("h-8 w-1/2 md:w-40", {
            "h-10 md:h-16 w-3/4 md:w-1/2": large,
          })}
        />
        {description && <Skeleton className="h-6 w-full md:w-1/3" />}
      </div>
    </div>
  );
};

export default HeaderSkeleton;
