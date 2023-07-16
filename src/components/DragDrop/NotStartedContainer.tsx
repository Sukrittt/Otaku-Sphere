import { DropTargetMonitor, useDrop } from "react-dnd";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { cn } from "@/lib/utils";
import { DragItemType } from "@/types/item-type";
import { DragItem } from "./DragItem";
import useNotStarted from "@/hooks/watchlist/useNotStartedModal";
import useCurrentlyWatching from "@/hooks/watchlist/useCurrentlyWatching";
import useFinishedWatching from "@/hooks/watchlist/useFinishedWatching";

const NotStartedContainer = () => {
  const { board, addImageToBoard, removeItemFromBoard } = useNotStarted();
  const { removeItemFromBoard: removeCurrentlyWatching } =
    useCurrentlyWatching();
  const { removeItemFromBoard: removeFinishedWatching } = useFinishedWatching();

  const onDrop = (item: DragItemType, monitor: DropTargetMonitor) => {
    const dropAreaType = monitor.getItemType();

    if (dropAreaType !== "currentDropArea") {
      removeItemFromBoard(item.id);
    }

    const sourceBoard = item.category;

    if (sourceBoard === "watching") {
      removeCurrentlyWatching(item.id);
    } else if (sourceBoard === "finished") {
      removeFinishedWatching(item.id);
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
        <CardTitle className="text-center">Want to watch</CardTitle>
      </CardHeader>
      {board.map((item) => {
        const structuredItem: DragItemType = {
          id: item.id,
          name: item.name,
          category: "pending",
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

export default NotStartedContainer;
