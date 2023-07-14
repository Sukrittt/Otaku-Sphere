"use client";
import { ColumnDef } from "@tanstack/react-table";

import { AnimeRanking } from "@/types/item-type";
import { Button } from "@/ui/Button";
import { Icons } from "@/components/Icons";

export const columns: ColumnDef<AnimeRanking>[] = [
  {
    accessorKey: "rank",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rank <Icons.upDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
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
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Genre <Icons.upDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("genre")}</div>;
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating <Icons.upDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("rating")}</div>;
    },
  },
  {
    accessorKey: "votes",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Votes <Icons.upDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("votes")}</div>;
    },
  },
];
