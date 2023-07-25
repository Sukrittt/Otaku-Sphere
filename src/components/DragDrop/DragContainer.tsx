"use client";
import { FC, useEffect } from "react";
import dynamic from "next/dynamic";

import useNotStarted from "@/hooks/watchlist/useNotStartedModal";
import useCurrentlyWatching from "@/hooks/watchlist/useCurrentlyWatching";
import useFinishedWatching from "@/hooks/watchlist/useFinishedWatching";
import { DragItemType } from "@/types/item-type";
import { DragContainerSkeleton } from "@/app/(site)/watchlist/loading";

interface DragContainerProps {
  notStartedAnimes: DragItemType[];
  currentlyWatchingAnimes: DragItemType[];
  finishedWatchingAnimes: DragItemType[];
}

const NotStartedContainer = dynamic(() => import("./NotStartedContainer"), {
  ssr: false,
  loading: () => <DragContainerSkeleton title="Planning" />,
});

const CurrentlyWatchingContainer = dynamic(
  () => import("./CurrentlyWatchingContainer"),
  {
    ssr: false,
    loading: () => <DragContainerSkeleton title="Watching" />,
  }
);

const FinishedWatchingContainer = dynamic(
  () => import("./FinishedWatchingContainer"),
  {
    ssr: false,
    loading: () => <DragContainerSkeleton title="Completed" />,
  }
);

const DragContainer: FC<DragContainerProps> = ({
  currentlyWatchingAnimes,
  finishedWatchingAnimes,
  notStartedAnimes,
}) => {
  const { setBoard: setNotStarted } = useNotStarted();
  const { setBoard: setCurrentlyWatching } = useCurrentlyWatching();
  const { setBoard: setFinishedWatching } = useFinishedWatching();

  useEffect(() => {
    setNotStarted(notStartedAnimes);
    setCurrentlyWatching(currentlyWatchingAnimes);
    setFinishedWatching(finishedWatchingAnimes);
  }, [
    notStartedAnimes,
    currentlyWatchingAnimes,
    finishedWatchingAnimes,
    setNotStarted,
    setCurrentlyWatching,
    setFinishedWatching,
  ]);

  return (
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <NotStartedContainer />
      <CurrentlyWatchingContainer />
      <FinishedWatchingContainer />
    </div>
  );
};

export default DragContainer;
