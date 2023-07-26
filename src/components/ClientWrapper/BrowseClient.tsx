"use client";
import dynamic from "next/dynamic";
import { Anime } from "@prisma/client";

const BrowseAnime = dynamic(
  () => import("@/components/InfiniteQuery/BrowseAnime"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const BrowseClient = ({ initialAnimes }: { initialAnimes: Anime[] }) => {
  return <BrowseAnime initialAnimes={initialAnimes} />;
};

export default BrowseClient;
