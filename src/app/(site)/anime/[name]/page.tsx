import Image from "next/image";
import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import { formatUrl } from "@/lib/utils";
import { Shell } from "@/components/Shell";
import Description from "@/ui/Description";
import AnimeRating from "@/components/AnimeRating";

interface AnimePageProps {
  params: {
    name: string;
  };
}

const AnimePage = async ({ params }: AnimePageProps) => {
  const { name: rawName } = params;
  const name = formatUrl(rawName, true);

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
                <span className="text-4xl font-bold text-zinc-300">
                  {anime.ratingCount}
                </span>
                /10 ·{" "}
                <span className="text-sm">{anime.rating.length} votes</span>
              </div>
              <div className="text-xs font-semibold text-muted-foreground">
                <div></div>
                <AnimeRating animeId={anime.id} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-4 col-span-2 md:mt-8">
            <div className="flex items-end gap-x-3">
              <h1 className="text-4xl font-bold leading-tight tracking-tighter lg:text-5xl lg:leading[1.1]">
                {anime.name}
              </h1>
              <span className="text-xl text-zinc-400 font-medium">
                ({anime.releaseYear})
              </span>
            </div>
            <div className="flex gap-x-3 items-center text-xs font-bold">
              <span>{anime.director}</span>
              <span>{anime.genre}</span>
              <span>{anime.releaseYear}</span>
            </div>
            <Description description={anime.description} />
          </div>
        </div>
      </Shell>
    </div>
  );
};

export default AnimePage;
