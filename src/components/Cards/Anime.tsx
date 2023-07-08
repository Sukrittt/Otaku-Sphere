"use client";

import Image from "next/image";
import { Anime } from "@prisma/client";
import Link from "next/link";

import { cn, formatDescription } from "@/lib/utils";
import { AspectRatio } from "@/ui/AspectRatio";
import { Button } from "@/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/Card";
import { Icons } from "@/components/Icons";

interface AnimeAdminCardProps extends React.HTMLAttributes<HTMLDivElement> {
  anime: Anime;
}

export function AnimeAdminCard({
  anime,
  className,
  ...props
}: AnimeAdminCardProps) {
  return (
    <Card
      className={cn("h-full overflow-hidden rounded-sm", className)}
      {...props}
    >
      <CardHeader className="border-b p-0">
        <AspectRatio ratio={3 / 2}>
          {anime?.coverImage?.length ? (
            <Image
              src={anime.coverImage ?? "/images/anime-placeholder.png"}
              alt={anime.name}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              className="object-cover"
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
      <CardFooter className="p-4">
        <Link href={`/admin/anime/${anime.id}`} className="w-full">
          <Button
            aria-label="Edit content"
            size="sm"
            className="w-full tracking-tight"
            onClick={() => {}}
          >
            Edit content
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
