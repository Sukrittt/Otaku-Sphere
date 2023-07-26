import { db } from "@/lib/db";
import { Header } from "@/components/Header";
import { Shell } from "@/components/Shell";
import { INFINITE_SCROLLING_PAGINATION_BROWSE } from "@/config";
import BrowseClient from "@/components/ClientWrapper/BrowseClient";

const BrowsePage = async () => {
  const topTenAnimes = await db.anime.findMany({
    orderBy: {
      totalRatings: "desc",
    },
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
