"use client";
import { DragItemType } from "@/types/item-type";
import dynamic from "next/dynamic";

const DragContainer = dynamic(
  () => import("@/components/DragDrop/DragContainer"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
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
