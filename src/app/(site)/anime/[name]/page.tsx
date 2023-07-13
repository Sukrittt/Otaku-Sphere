import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

import { db } from "@/lib/db";
import { cn, convertToSingleDecimalPlace, formatUrl } from "@/lib/utils";
import { Shell } from "@/components/Shell";
import Description from "@/ui/Description";
import AnimeRating from "@/components/AnimeRating";
import { getAuthSession } from "@/lib/auth";
import { buttonVariants } from "@/ui/Button";
import { Icons } from "@/components/Icons";

interface AnimePageProps {
  params: {
    name: string;
  };
}

const AnimePage = async ({ params }: AnimePageProps) => {
  const { name: rawName } = params;
  const name = formatUrl(rawName, true);

  const session = await getAuthSession();

  const anime = await db.anime.findUnique({
    where: {
      name,
    },
    include: {
      rating: true,
    },
  });

  if (!anime) {
    notFound();
  }

  const calculatedRating = () => {
    const totalRatings = anime.totalRatings;
    const ratingLength = anime.rating.length * 10;

    if (ratingLength === 0) return 0;

    const rawRating = (totalRatings / ratingLength) * 10;

    return convertToSingleDecimalPlace(rawRating, 2);
  };

  const userRating = anime.rating.find(
    (r) => r.userId === session?.user.id
  )?.rating;

  return (
    <div className="flex flex-col relative min-h-screen">
      <Shell>
        <div className="grid grid-cols-3">
          <div className="flex flex-col gap-y-8">
            <div className="h-96 w-72 relative">
              <Image
                src={anime.coverImage ?? "/images/anime-placeholder.png"}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                alt={`${anime.name}'s cover image`}
                className="object-cover rounded-sm"
              />
            </div>
            <div className="space-y-4">
              <div className="font-medium text-muted-foreground">
                <span className="text-4xl font-bold text-zinc-800 dark:text-zinc-300">
                  {calculatedRating()}
                </span>
                /10 ·{" "}
                <span className="text-sm">
                  {anime.rating.length}{" "}
                  {anime.rating.length == 1 ? "vote" : "votes"}
                </span>
              </div>
              <div className="text-xs font-semibold text-muted-foreground">
                <AnimeRating animeId={anime.id} userRating={userRating} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-4 col-span-2 md:mt-8">
            <div className="flex items-end gap-x-3">
              <h1 className="text-4xl font-bold leading-tight tracking-tighter lg:text-5xl lg:leading[1.1]">
                {anime.name}
              </h1>
              <span className="text-xl text-zinc-400 font-medium">
                {anime.releaseYear}
              </span>
            </div>
            <div className="flex gap-x-3 items-center text-xs font-bold">
              <span>{anime.director}</span>
              <span>{anime.genre}</span>
              <span>{anime.releaseYear}</span>
            </div>
            <Description description={anime.description} />
            <Link
              href={anime.trailerLink}
              target="_blank"
              className={cn(buttonVariants(), "w-fit")}
            >
              <Icons.play className="w-4 h-4 mr-2" />
              Watch trailer
            </Link>
          </div>
        </div>
      </Shell>
    </div>
  );
};

export default AnimePage;
