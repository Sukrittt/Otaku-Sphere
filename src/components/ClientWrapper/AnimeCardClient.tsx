"use client";
import dynamic from "next/dynamic";
import { Anime } from "@prisma/client";

import { SingleAnimeCardSkeleton } from "@/components/SkeletonLoaders/AnimeCardSkeleton";

const AnimeCard = dynamic(() => import("@/components/Cards/AnimeCard"), {
  ssr: false,
  loading: () => <SingleAnimeCardSkeleton />,
});

const AnimeCardClient = ({ anime }: { anime: Anime }) => {
  return <AnimeCard anime={anime} />;
};

export default AnimeCardClient;
