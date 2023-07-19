import { Card, CardContent, CardHeader } from "@/ui/Card";
import { AspectRatio } from "@/ui/AspectRatio";
import { Icons } from "@/components/Icons";
import { Skeleton } from "@/ui/Skeleton";

const AnimeCardSkeleton = ({ length = 5 }: { length?: number }) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
      {Array.from({ length }).map((_, index) => (
        <Card className="rounded-sm" key={index}>
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
        </Card>
      ))}
    </div>
  );
};

export default AnimeCardSkeleton;
