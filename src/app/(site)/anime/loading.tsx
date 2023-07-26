import { Skeleton } from "@/ui/Skeleton";
import { Shell } from "@/components/Shell";

const AnimeLoading = () => {
  return (
    <Shell>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-2">
        <div className="flex flex-col sm:flex-row lg:flex-col gap-8">
          <Skeleton className="h-96 w-72" />
          <div className="flex flex-col gap-y-4 justify-end w-1/2 md:w-full">
            <Skeleton className="h-4 w-1/3" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-full md:w-3/4" />
              <Skeleton className="h-4 w-full md:w-3/4" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 col-span-2 mt-8">
          <div className="flex items-end gap-x-3">
            <Skeleton className="h-10 w-full md:w-1/2" />
          </div>

          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-60 w-full" />
          <div className="flex gap-x-2 items-center">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </div>
    </Shell>
  );
};

export default AnimeLoading;
