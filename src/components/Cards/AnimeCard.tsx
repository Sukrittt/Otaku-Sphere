"use client";

import Image from "next/image";
import { Anime } from "@prisma/client";

import { cn, formatDescription, formatUrl } from "@/lib/utils";
import { AspectRatio } from "@/ui/AspectRatio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/Card";
import { Icons } from "@/components/Icons";

interface AnimeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  anime: Anime;
}

export function AnimeCard({ anime, className, ...props }: AnimeCardProps) {
  const formattedHref = `/anime/${formatUrl(anime.name)}`;

  return (
    <a href={formattedHref}>
      <Card
        className={cn("h-full overflow-hidden rounded-sm group", className)}
        {...props}
      >
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={4 / 5} className="overflow-hidden">
            {anime?.coverImage?.length ? (
              <Image
                src={anime.coverImage ?? "/images/anime-placeholder.png"}
                alt={anime.name}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-cover group-hover:scale-105 transition-all"
                loading="lazy"
              />
            ) : (
              <div
                aria-label="Placeholder"
                role="img"
                aria-roledescription="placeholder"
                className="flex h-full w-full items-center justify-center bg-secondary"
              >
                <Icons.placeholder
                  className="h-9 w-9 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            )}
          </AspectRatio>
        </CardHeader>
        <CardContent className="grid gap-2.5 p-4">
          <CardTitle className="line-clamp-1">{anime.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {formatDescription(anime.description, 100)}
          </CardDescription>
        </CardContent>
      </Card>
    </a>
  );
}
