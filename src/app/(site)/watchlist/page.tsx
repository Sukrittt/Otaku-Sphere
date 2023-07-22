import { redirect } from "next/navigation";
import { Metadata } from "next";

import { db } from "@/lib/db";
import { Shell } from "@/components/Shell";
import DragContainer from "@/components/DragDrop/DragContainer";
import CustomSheet from "@/components/Custom-UI/CustomSheet";
import { getAuthSession } from "@/lib/auth";
import { DragItemType } from "@/types/item-type";
import DragDropProvider from "@/components/DragDrop/DragDropProvider";
import { env } from "@/env.mjs";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Watchlist",
  description: "Drag and drop your anime to manage your watchlist.",
};

const WatchlistPage = async () => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  const promises = [
    db.notStartedWatching.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        anime: true,
      },
    }),
    db.currentlyWatching.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        anime: true,
      },
    }),
    db.finishedWatching.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        anime: true,
      },
    }),
  ];

  const [NotStartedAnimes, CurrentlyWatchingAnimes, FinishedWatchingAnimes] =
    await Promise.all(promises);

  const pendingAnimes: DragItemType[] = NotStartedAnimes.map((watchlist) => ({
    id: watchlist.id,
    name: watchlist.anime.name,
    animeId: watchlist.animeId,
    category: "pending",
  }));

  const currentlyWatching: DragItemType[] = CurrentlyWatchingAnimes.map(
    (watchlist) => ({
      id: watchlist.id,
      name: watchlist.anime.name,
      animeId: watchlist.animeId,
      category: "watching",
    })
  );

  const finishedWatching: DragItemType[] = FinishedWatchingAnimes.map(
    (watchlist) => ({
      id: watchlist.id,
      name: watchlist.anime.name,
      animeId: watchlist.animeId,
      category: "finished",
    })
  );

  return (
    <DragDropProvider>
      <Shell>
        <h1 className="text-4xl text-center font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]">
          Your Watchlist
        </h1>
        <div className="space-y-4">
          <CustomSheet>Add anime</CustomSheet>
          <DragContainer
            notStartedAnimes={pendingAnimes}
            currentlyWatchingAnimes={currentlyWatching}
            finishedWatchingAnimes={finishedWatching}
          />
        </div>
      </Shell>
    </DragDropProvider>
  );
};

export default WatchlistPage;
