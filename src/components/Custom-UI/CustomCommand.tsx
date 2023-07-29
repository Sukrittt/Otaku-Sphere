"use client";
import { FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/Command";
import { useDebounce } from "@/hooks/use-debounce";
import { Skeleton } from "@/ui/Skeleton";
import { AddWatchlistAnimeType } from "@/types/item-type";
import { toast } from "@/hooks/use-toast";

interface CustomCommandProps {
  animeData: AddWatchlistAnimeType[];
  setAnimeData: (anime: AddWatchlistAnimeType[]) => void;
}

const CustomCommand: FC<CustomCommandProps> = ({ animeData, setAnimeData }) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<AddWatchlistAnimeType[]>([]);

  const debouncedQuery = useDebounce(query, 300);

  const {
    data: queryResults,
    refetch,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (!query) return [];

      const { data } = await axios(`/api/anime/search?q=${query}`);

      return data as AddWatchlistAnimeType[];
    },
    queryKey: ["anime-watchlist-search-query"],
    enabled: false, //by default it will not fetch
  });

  useEffect(() => {
    if (!query) {
      setData([]);
      return;
    }

    if (queryResults) {
      setData(queryResults);
    }
  }, [queryResults, query]);

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      refetch();
    }
  }, [debouncedQuery, refetch]);

  const handleSetAnimeData = (queryItem: AddWatchlistAnimeType) => {
    const animeExists = animeData.find((anime) => anime.id === queryItem.id);

    if (animeExists) {
      return toast({
        title: "Error!",
        description: "Anime already exists in the list.",
        variant: "destructive",
      });
    }

    setAnimeData([...animeData, queryItem]);
  };

  return (
    <Command>
      <CommandInput
        placeholder="Type a command or search..."
        value={query}
        onValueChange={setQuery}
        autoFocus
      />
      <CommandList>
        {isFetching && (
          <div className="space-y-1 overflow-hidden px-1 py-2">
            <Skeleton className="h-4 w-10 rounded" />
            <Skeleton className="h-8 rounded-sm" />
            <Skeleton className="h-8 rounded-sm" />
          </div>
        )}
        {data.length == 0 && !isFetching && query.length > 0 ? (
          <CommandEmpty>No results found.</CommandEmpty>
        ) : (
          <CommandGroup className="mt-1">
            {data.length > 0 &&
              data.map((queryItem) => {
                return (
                  <CommandItem
                    key={queryItem.id}
                    className="cursor-pointer"
                    onSelect={() => {
                      handleSetAnimeData(queryItem);
                      setData([]);
                      setQuery("");
                    }}
                  >
                    {queryItem.name}
                  </CommandItem>
                );
              })}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
};

export default CustomCommand;
