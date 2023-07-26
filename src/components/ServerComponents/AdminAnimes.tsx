import { db } from "@/lib/db";
import { INFINITE_SCROLLING_PAGINATION_ANIME } from "@/config";
import AnimeClient from "@/components/ClientWrapper/AnimeClient";

const AdminAnimes = async () => {
  const allAnime = await db.anime.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: INFINITE_SCROLLING_PAGINATION_ANIME,
  });

  return <AnimeClient initialAnimes={allAnime} />;
};

export default AdminAnimes;
