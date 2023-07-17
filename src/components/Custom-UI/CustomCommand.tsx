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

interface CustomCommandProps {
  setAnimeData: (anime: { id: string; name: string }) => void;
}

const CustomCommand: FC<CustomCommandProps> = ({ setAnimeData }) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<{ id: string; name: string }[]>([]);

  const debouncedQuery = useDebounce(query, 300);

  const {
    data: queryResults,
    refetch,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (!query) return [];

      const { data } = await axios(`/api/anime/search?q=${query}`);

      return data as { id: string; name: string }[];
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
                    onSelect={() => {
                      setAnimeData(queryItem);
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
