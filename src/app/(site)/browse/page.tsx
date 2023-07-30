import { Metadata } from "next";

import { db } from "@/lib/db";
import { Header } from "@/components/Header";
import { Shell } from "@/components/Shell";
import { INFINITE_SCROLLING_PAGINATION_BROWSE } from "@/config";
import BrowseClient from "@/components/ClientWrapper/BrowseClient";
import { env } from "@/env.mjs";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Browse",
  description:
    "Discover your favorite anime on our browse page, designed to help you search for anime that suits your preferences. Browse through an extensive collection of anime and easily filter them by genres and release year.",
};

const BrowsePage = async () => {
  const topTenAnimes = await db.anime.findMany({
    orderBy: [
      {
        totalRatings: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
    take: INFINITE_SCROLLING_PAGINATION_BROWSE,
  });

  return (
    <Shell>
      <Header
        title="Anime"
        description="Search for anime of your liking"
        size="sm"
      />
      <BrowseClient initialAnimes={topTenAnimes} />
    </Shell>
  );
};

export default BrowsePage;
