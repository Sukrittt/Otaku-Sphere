import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Shell } from "@/components/Shell";
import DragContainer from "@/components/DragDrop/DragContainer";
import CustomSheet from "@/components/CustomSheet";
import { getAuthSession } from "@/lib/auth";
import { DragItemType } from "@/types/item-type";

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
      include: {
        anime: true,
      },
    }),
    db.currentlyWatching.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        anime: true,
      },
    }),
    db.finishedWatching.findMany({
      where: {
        userId: session.user.id,
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
    category: "pending",
  }));
  const currentlyWatching: DragItemType[] = CurrentlyWatchingAnimes.map(
    (watchlist) => ({
      id: watchlist.id,
      name: watchlist.anime.name,
      category: "watching",
    })
  );
  const finishedWatching: DragItemType[] = FinishedWatchingAnimes.map(
    (watchlist) => ({
      id: watchlist.id,
      name: watchlist.anime.name,
      category: "finished",
    })
  );

  return (
    <Shell>
      <h1 className="text-4xl text-center font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]">
        Your Watchlist
      </h1>
      <CustomSheet>Add anime</CustomSheet>
      <DragContainer
        notStartedAnimes={pendingAnimes}
        currentlyWatchingAnimes={currentlyWatching}
        finishedWatchingAnimes={finishedWatching}
      />
    </Shell>
  );
};

export default WatchlistPage;
