"use client";
import { DragContainerSkeleton } from "@/app/(site)/watchlist/loading";
import { DragItemType } from "@/types/item-type";
import dynamic from "next/dynamic";

const DragContainer = dynamic(
  () => import("@/components/DragDrop/DragContainer"),
  {
    ssr: false,
    loading: () => <WatchlistSkeleton />,
  }
);

interface DragContainerProps {
  notStartedAnimes: DragItemType[];
  currentlyWatchingAnimes: DragItemType[];
  finishedWatchingAnimes: DragItemType[];
}

const DragContainerClient = ({
  currentlyWatchingAnimes,
  finishedWatchingAnimes,
  notStartedAnimes,
}: DragContainerProps) => {
  return (
    <DragContainer
      notStartedAnimes={notStartedAnimes}
      currentlyWatchingAnimes={currentlyWatchingAnimes}
      finishedWatchingAnimes={finishedWatchingAnimes}
    />
  );
};

export default DragContainerClient;

const WatchlistContainers = [
  {
    id: 1,
    title: "Planning",
  },
  {
    id: 2,
    title: "Watching",
  },
  {
    id: 3,
    title: "Completed",
  },
];

const WatchlistSkeleton = () => {
  return (
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {WatchlistContainers.map((item) => (
        <DragContainerSkeleton key={item.id} title={item.title} />
      ))}
    </div>
  );
};
