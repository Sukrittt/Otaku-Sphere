import { db } from "@/lib/db";
import { INFINITE_SCROLLING_PAGINATION_ANIME } from "@/config";
import Animes from "@/components/Animes";

const AdminAnimes = async () => {
  const allAnime = await db.anime.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: INFINITE_SCROLLING_PAGINATION_ANIME,
  });

  return <Animes initialAnimes={allAnime} />;
};

export default AdminAnimes;
