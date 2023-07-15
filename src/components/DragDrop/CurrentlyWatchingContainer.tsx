import { FC } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { cn } from "@/lib/utils";
import { DummyType } from "@/types/item-type";
import { DragItem } from "./DragItem";
import useCurrentlyWatching from "@/hooks/watchlist/useCurrentlyWatching";
import useNotStarted from "@/hooks/watchlist/useNotStartedModal";
import useFinishedWatching from "@/hooks/watchlist/useFinishedWatching";

interface CurrentlyWatchingContainerProps {}

const CurrentlyWatchingContainer: FC<
  CurrentlyWatchingContainerProps
> = ({}) => {
  const { board, addImageToBoard, removeItemFromBoard } =
    useCurrentlyWatching();
  const { removeItemFromBoard: removeNotStarted } = useNotStarted();
  const { removeItemFromBoard: removeFinishedWatching } = useFinishedWatching();

  const onDrop = (item: DummyType, monitor: DropTargetMonitor) => {
    const dropAreaType = monitor.getItemType();

    if (dropAreaType !== "currentDropArea") {
      removeItemFromBoard(item.id);
    }

    const sourceBoard = item.category;

    if (sourceBoard === "notStarted") {
      removeNotStarted(item.id);
    } else if (sourceBoard === "finishedWatching") {
      removeFinishedWatching(item.id);
    }

    addImageToBoard(item.id, "currentlyWatching");
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
        <CardTitle className="text-center">Ongoing Animes</CardTitle>
      </CardHeader>
      {board.map((item) => (
        <CardContent className="w-full" key={item.id}>
          <DragItem item={item} />
        </CardContent>
      ))}
    </Card>
  );
};

export default CurrentlyWatchingContainer;
