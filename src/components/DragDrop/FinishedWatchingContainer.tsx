import { FC } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { cn } from "@/lib/utils";
import { DummyType } from "@/types/item-type";
import { DragItem } from "./DragItem";
import useFinishedWatching from "@/hooks/watchlist/useFinishedWatching";
import useCurrentlyWatching from "@/hooks/watchlist/useCurrentlyWatching";
import useNotStarted from "@/hooks/watchlist/useNotStartedModal";

interface FinishedWatchingContainerProps {}

const FinishedWatchingContainer: FC<FinishedWatchingContainerProps> = ({}) => {
  const { board, addImageToBoard, removeItemFromBoard } = useFinishedWatching();
  const { removeItemFromBoard: removeNotStarted } = useNotStarted();
  const { removeItemFromBoard: removedCurrentlyWatching } =
    useCurrentlyWatching();

  const onDrop = (item: DummyType, monitor: DropTargetMonitor) => {
    const dropAreaType = monitor.getItemType();

    if (dropAreaType !== "currentDropArea") {
      removeItemFromBoard(item.id);
    }

    const sourceBoard = item.category;

    if (sourceBoard === "notStarted") {
      removeNotStarted(item.id);
    } else if (sourceBoard === "currentlyWatching") {
      removedCurrentlyWatching(item.id);
    }

    addImageToBoard(item.id, "finishedWatching");
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item: DummyType, monitor: DropTargetMonitor) =>
      onDrop(item, monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Card
      className={cn("flex flex-col gap-y-2 items-center", {
        "border-red-500": isOver,
      })}
      ref={drop}
    >
      <CardHeader>
        <CardTitle className="text-center">Finished Watching</CardTitle>
      </CardHeader>
      {board.map((item) => (
        <CardContent className="w-full" key={item.id}>
          <DragItem item={item} />
        </CardContent>
      ))}
    </Card>
  );
};

export default FinishedWatchingContainer;
