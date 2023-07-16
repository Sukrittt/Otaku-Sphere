import { create } from "zustand";

import { DragItemType } from "@/types/item-type";
import { toast } from "@/hooks/use-toast";

interface FinishedWatchingStore {
  board: DragItemType[];
  addImageToBoard: (item: DragItemType) => void;
  removeItemFromBoard: (id: string) => void;
  setBoard: (board: DragItemType[]) => void;
}

const useFinishedWatching = create<FinishedWatchingStore>((set) => ({
  board: [],
  addImageToBoard: (item) => {
    set((state) => {
      const updatedBoard = [item, ...state.board];

      return { ...state, board: updatedBoard };
    });

    toast({
      description: "Added to finished animes",
    });
  },
  removeItemFromBoard: (id) => {
    set((state) => {
      const updatedBoard = state.board.filter((item) => item.id !== id);
      return { ...state, board: updatedBoard };
    });
  },
  setBoard: (board) => set({ board }),
}));

export default useFinishedWatching;
