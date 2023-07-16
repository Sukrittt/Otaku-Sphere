import { DropTargetMonitor, useDrop } from "react-dnd";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { cn } from "@/lib/utils";
import { DragItemType } from "@/types/item-type";
import { DragItem } from "./DragItem";
import useCurrentlyWatching from "@/hooks/watchlist/useCurrentlyWatching";
import useNotStarted from "@/hooks/watchlist/useNotStartedModal";
import useFinishedWatching from "@/hooks/watchlist/useFinishedWatching";
import { AnimeWatchlistUpdateType } from "@/lib/validators/anime";
import { useAuthToast } from "@/hooks/useAuthToast";
import { toast } from "@/hooks/use-toast";
import CustomContextMenu from "@/components/Custom-UI/CustomContextMenu";

const CurrentlyWatchingContainer = () => {
  const { endErrorToast, loginToast } = useAuthToast();
  const router = useRouter();

  const { board, addImageToBoard, removeItemFromBoard } =
    useCurrentlyWatching();
  const { removeItemFromBoard: removeNotStarted } = useNotStarted();
  const { removeItemFromBoard: removeFinishedWatching } = useFinishedWatching();

  const { mutate: changeAnimeStatusForUser } = useMutation({
    mutationFn: async ({ item }) => {
      const payload: AnimeWatchlistUpdateType = {
        animeId: item.animeId,
        category: item.category,
        dropTo: "watching",
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

    if (sourceBoard === "pending") {
      removeNotStarted(item.id);
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
        <CardTitle className="text-center">In Progress</CardTitle>
      </CardHeader>
      <div className="flex flex-col w-full">
        {board.map((item) => {
          const structuredItem: DragItemType = {
            id: item.id,
            name: item.name,
            animeId: item.animeId,
            category: "watching",
          };
          return (
            <CustomContextMenu key={item.id} data={item}>
              <CardContent className="w-full py-2">
                <DragItem item={structuredItem} />
              </CardContent>
            </CustomContextMenu>
          );
        })}
      </div>
    </Card>
  );
};

export default CurrentlyWatchingContainer;
