"use client";

import { AnimeRanking } from "@/types/item-type";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<AnimeRanking>[] = [
  {
    accessorKey: "rank",
    header: () => <div className="text-center">Rank</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("rank")}</div>;
    },
  },
  {
    accessorKey: "anime",
    header: "Anime",
  },
  {
    accessorKey: "director",
    header: "Director",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "rating",
    header: () => <div className="text-center">Rating</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("rating")}</div>;
    },
  },
];
