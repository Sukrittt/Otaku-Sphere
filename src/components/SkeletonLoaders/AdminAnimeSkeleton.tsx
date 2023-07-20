import { Skeleton } from "@/ui/Skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/ui/Card";
import { AspectRatio } from "@/ui/AspectRatio";
import { Icons } from "@/components/Icons";

const AdminAnimeSkeleton = () => {
  return (
    <>
      <div className="flex gap-x-2 items-center px-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-16" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index}>
            <AnimeAdminSkeletonCard />
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminAnimeSkeleton;

const AnimeAdminSkeletonCard = () => {
  return (
    <Card className="h-full overflow-hidden rounded-sm">
      <CardHeader className="border-b p-0">
        <AspectRatio ratio={4 / 5}>
          <div className="flex h-full items-center justify-center bg-secondary">
            <Icons.placeholder
              className="h-9 w-9 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        </AspectRatio>
      </CardHeader>
      <CardContent className="grid gap-2.5 p-4">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
      <CardFooter className="p-4">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
};
