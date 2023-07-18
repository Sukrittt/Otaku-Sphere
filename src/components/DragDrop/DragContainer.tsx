"use client";
import { FC, useEffect } from "react";

import { ScrollArea } from "@/ui/ScrollArea";
import NotStartedContainer from "./NotStartedContainer";
import CurrentlyWatchingContainer from "./CurrentlyWatchingContainer";
import FinishedWatchingContainer from "./FinishedWatchingContainer";
import useNotStarted from "@/hooks/watchlist/useNotStartedModal";
import useCurrentlyWatching from "@/hooks/watchlist/useCurrentlyWatching";
import useFinishedWatching from "@/hooks/watchlist/useFinishedWatching";
import { DragItemType } from "@/types/item-type";

interface DragContainerProps {
  notStartedAnimes: DragItemType[];
  currentlyWatchingAnimes: DragItemType[];
  finishedWatchingAnimes: DragItemType[];
}

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
    <ScrollArea>
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <NotStartedContainer />
        <CurrentlyWatchingContainer />
        <FinishedWatchingContainer />
      </div>
    </ScrollArea>
  );
};

export default DragContainer;
