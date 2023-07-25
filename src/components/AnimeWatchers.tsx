import { db } from "@/lib/db";

const AnimeWatchers = async ({ animeId }: { animeId: string }) => {
  const promises = [
    db.notStartedWatching.count({
      where: {
        animeId,
      },
    }),
    db.currentlyWatching.count({
      where: {
        animeId,
      },
    }),
    db.finishedWatching.count({
      where: {
        animeId,
      },
    }),
  ];

  const [notStartedCount, currentlyWatchingCount, finishedWatchingCount] =
    await Promise.all(promises);

  return (
    <div className="flex gap-x-2 items-center text-sm text-muted-foreground">
      <p>
        Planning:{" "}
        <span className="font-semibold">
          {notStartedCount.toLocaleString()}
        </span>
      </p>
      <p>
        Watching:{" "}
        <span className="font-semibold">
          {currentlyWatchingCount.toLocaleString()}
        </span>
      </p>
      <p>
        Finished:{" "}
        <span className="font-semibold">
          {finishedWatchingCount.toLocaleString()}
        </span>
      </p>
    </div>
  );
};

export default AnimeWatchers;
