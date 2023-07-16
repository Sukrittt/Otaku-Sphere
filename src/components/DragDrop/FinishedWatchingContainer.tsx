import { DropTargetMonitor, useDrop } from "react-dnd";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { cn } from "@/lib/utils";
import { DragItemType } from "@/types/item-type";
import { DragItem } from "./DragItem";
import useFinishedWatching from "@/hooks/watchlist/useFinishedWatching";
import useCurrentlyWatching from "@/hooks/watchlist/useCurrentlyWatching";
import useNotStarted from "@/hooks/watchlist/useNotStartedModal";

const FinishedWatchingContainer = () => {
  const { board, addImageToBoard, removeItemFromBoard } = useFinishedWatching();
  const { removeItemFromBoard: removeNotStarted } = useNotStarted();
  const { removeItemFromBoard: removedCurrentlyWatching } =
    useCurrentlyWatching();

  const onDrop = (item: DragItemType, monitor: DropTargetMonitor) => {
    const dropAreaType = monitor.getItemType();

    if (dropAreaType !== "currentDropArea") {
      removeItemFromBoard(item.id);
    }

    const sourceBoard = item.category;

    if (sourceBoard === "pending") {
      removeNotStarted(item.id);
    } else if (sourceBoard === "watching") {
      removedCurrentlyWatching(item.id);
    }

    addImageToBoard(item);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item: DragItemType, monitor: DropTargetMonitor) =>
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
      {board.map((item) => {
        const structuredItem: DragItemType = {
          id: item.id,
          name: item.name,
          category: "finished",
        };
        return (
          <CardContent className="w-full" key={item.id}>
            <DragItem item={structuredItem} />
          </CardContent>
        );
      })}
    </Card>
  );
};

export default FinishedWatchingContainer;
