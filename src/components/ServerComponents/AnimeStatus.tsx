import { FC } from "react";
import { Session } from "next-auth";

import { db } from "@/lib/db";
import AnimeStatusQuestion from "@/components/AnimeStatusQuestion";

interface AnimeStatusProps {
  animeId: string;
  session: Session;
}

const AnimeStatus: FC<AnimeStatusProps> = async ({ animeId, session }) => {
  const promises = [
    db.notStartedWatching.findFirst({
      where: {
        animeId,
        userId: session.user.id,
      },
    }),
    db.currentlyWatching.findFirst({
      where: {
        animeId,
        userId: session.user.id,
      },
    }),
    db.finishedWatching.findFirst({
      where: {
        animeId,
        userId: session.user.id,
      },
    }),
  ];

  const [pendingAnimes, watchingAnimes, finishedAnimes] = await Promise.all(
    promises
  );

  if (pendingAnimes || watchingAnimes || finishedAnimes) return;

  return <AnimeStatusQuestion animeId={animeId} />;
};

export default AnimeStatus;
