"use client";
import { FC } from "react";

import { ScrollArea } from "@/ui/ScrollArea";
import NotStartedContainer from "./NotStartedContainer";
import CurrentlyWatchingContainer from "./CurrentlyWatchingContainer";
import FinishedWatchingContainer from "./FinishedWatchingContainer";

interface DragContainerProps {}

const DragContainer: FC<DragContainerProps> = ({}) => {
  return (
    <ScrollArea>
      <div className="grid gap-x-2 grid-cols-3">
        <NotStartedContainer />
        <CurrentlyWatchingContainer />
        <FinishedWatchingContainer />
      </div>
    </ScrollArea>
  );
};

export default DragContainer;
