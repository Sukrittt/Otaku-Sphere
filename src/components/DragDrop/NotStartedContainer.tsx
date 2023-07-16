import { DropTargetMonitor, useDrop } from "react-dnd";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { cn } from "@/lib/utils";
import { DragItemType } from "@/types/item-type";
import { DragItem } from "./DragItem";
import useNotStarted from "@/hooks/watchlist/useNotStartedModal";
import useCurrentlyWatching from "@/hooks/watchlist/useCurrentlyWatching";
import useFinishedWatching from "@/hooks/watchlist/useFinishedWatching";
import { useAuthToast } from "@/hooks/useAuthToast";
import { AnimeWatchlistUpdateType } from "@/lib/validators/anime";
import { toast } from "@/hooks/use-toast";

const NotStartedContainer = () => {
  const { loginToast, endErrorToast } = useAuthToast();
  const router = useRouter();

  const { board, addImageToBoard, removeItemFromBoard } = useNotStarted();
  const { removeItemFromBoard: removeCurrentlyWatching } =
    useCurrentlyWatching();
  const { removeItemFromBoard: removeFinishedWatching } = useFinishedWatching();

  const { mutate: changeAnimeStatusForUser } = useMutation({
    mutationFn: async ({ item }) => {
      const payload: AnimeWatchlistUpdateType = {
        animeId: item.animeId,
        category: item.category,
        dropTo: "pending",
      };

      const { data } = await axios.patch("/api/anime/watchlist", payload);

      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 404) {
          return toast({
            title: "Please refresh the page.",
            description: "Anime not found in the watchlist.",
          });
        }
      }

      endErrorToast();
    },
    onMutate: ({
      item,
      monitor,
    }: {
      item: DragItemType;
      monitor: DropTargetMonitor;
    }) => {
      onDrop(item, monitor);
    },
    onSuccess: () => {
      router.refresh();
    },
  });

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
      changeAnimeStatusForUser({ item, monitor }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Card
      className={cn("flex flex-col gap-y-2 items-center", {
        "border-blue-600": isOver,
      })}
      ref={drop}
    >
      <CardHeader>
        <CardTitle className="text-center">To-Watch List</CardTitle>
      </CardHeader>
      <div className="flex flex-col w-full">
        {board.map((item) => {
          const structuredItem: DragItemType = {
            id: item.id,
            name: item.name,
            animeId: item.animeId,
            category: "pending",
          };
          return (
            <CardContent className="w-full" key={item.id}>
              <DragItem item={structuredItem} />
            </CardContent>
          );
        })}
      </div>
    </Card>
  );
};

export default NotStartedContainer;
