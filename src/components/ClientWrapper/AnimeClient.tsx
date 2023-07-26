"use client";
import dynamic from "next/dynamic";
import { Anime } from "@prisma/client";

const Animes = dynamic(() => import("@/components/InfiniteQuery/Animes"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const AnimeClient = ({ initialAnimes }: { initialAnimes: Anime[] }) => {
  return <Animes initialAnimes={initialAnimes} />;
};

export default AnimeClient;
