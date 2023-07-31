import { FC, ReactNode } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/ui/ContextMenu";
import { Icons } from "@/components/Icons";
import { DragItemType } from "@/types/item-type";
import { useAuthToast } from "@/hooks/useAuthToast";
import { toast } from "@/hooks/use-toast";
import { AnimeWatchlistDeleteType } from "@/lib/validators/anime";
import useNotStarted from "@/hooks/watchlist/useNotStartedModal";
import useCurrentlyWatching from "@/hooks/watchlist/useCurrentlyWatching";
import useFinishedWatching from "@/hooks/watchlist/useFinishedWatching";

interface CustomContextMenuProps {
  children: ReactNode;
  data: DragItemType;
}

const CustomContextMenu: FC<CustomContextMenuProps> = ({
  children,
  data: watchlistData,
}) => {
  const { loginToast, endErrorToast } = useAuthToast();
  const router = useRouter();

  const {
    addImageToBoard: addNotStarted,
    removeItemFromBoard: removeNotStarted,
  } = useNotStarted();
  const {
    addImageToBoard: addCurrentlyWatching,
    removeItemFromBoard: removeCurrentlyWatching,
  } = useCurrentlyWatching();
  const {
    addImageToBoard: addFinishedWatching,
    removeItemFromBoard: removeFinishedWatching,
  } = useFinishedWatching();

  const { mutate: deleteAnimeFromWatchlist } = useMutation({
    mutationFn: async () => {
      const payload: AnimeWatchlistDeleteType = {
        watchlistId: watchlistData.id,
        category: watchlistData.category,
      };

      const { data } = await axios.post("/api/anime/watchlist/delete", payload);

      return data;
    },
    onError: (error) => {
      // revert back to the previous state
      if (watchlistData.category === "pending") {
        addNotStarted(watchlistData);
      } else if (watchlistData.category === "watching") {
        addCurrentlyWatching(watchlistData);
      } else if (watchlistData.category === "finished") {
        addFinishedWatching(watchlistData);
      }

      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 404) {
          return toast({
            title: "Error!",
            description: "Anime not found in the watchlist.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onSuccess: () => {
      router.refresh();
      toast({
        title: "Success!",
        description: "Anime deleted from your watchlist.",
      });
    },
    onMutate: () => {
      if (watchlistData.category === "pending") {
        removeNotStarted(watchlistData.id);
      } else if (watchlistData.category === "watching") {
        removeCurrentlyWatching(watchlistData.id);
      } else if (watchlistData.category === "finished") {
        removeFinishedWatching(watchlistData.id);
      }
    },
  });

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => deleteAnimeFromWatchlist()}
          className="cursor-pointer"
        >
          <Icons.delete className="h-4 w-4 mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default CustomContextMenu;
