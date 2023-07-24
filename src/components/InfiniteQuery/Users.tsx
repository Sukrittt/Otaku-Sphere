"use client";
import { FC, useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";

import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";
import { UserDataTable } from "@/components/User/UserDataTable";
import { userColumns } from "@/components/Rankings/TableColumn";
import { UserDisplay } from "@/types/item-type";
import { ExtendedUser } from "@/types/db";
import { Icons } from "@/components/Icons";
import { ScrollArea } from "@/ui/ScrollArea";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";

interface UsersProps {
  initialUsers: UserDisplay[];
  initialFetchedUsers: ExtendedUser[];
}

const Users: FC<UsersProps> = ({ initialUsers, initialFetchedUsers }) => {
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");

  const {
    data: infiniteQueryData,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["admin-panel-user-infinite-query"],
    async ({ pageParam = 1 }) => {
      const queryUrl = `/api/user?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}`;

      const { data } = await axios(queryUrl);

      return data as ExtendedUser[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialFetchedUsers], pageParams: [1] },
    }
  );

  const {
    data: queryResults,
    refetch,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      const queryUrl = `/api/user?q=${query}`;

      const { data } = await axios(queryUrl);

      return data as ExtendedUser[];
    },
    queryKey: ["user-admin-panel-search-query"],
    enabled: false, //by default it will not fetch
  });

  useEffect(() => {
    if (queryResults) {
      const structuredUserData: UserDisplay[] = queryResults.flatMap(
        (user) => ({
          name: user.name,
          email: user.email,
          createdAt: format(new Date(user.createdAt), "do MMMM',' yyyy"),
          rating: user.rating.length,
          communitiesCreated: user.community.length,
          postsCreated: user.post.length,
        })
      );

      setUsers(structuredUserData);
    } else if (infiniteQueryData) {
      const fetchedInfiniteData =
        infiniteQueryData?.pages.flatMap((page) => page) ?? initialFetchedUsers;

      const structuredUserData: UserDisplay[] = fetchedInfiniteData.flatMap(
        (user) => ({
          name: user.name,
          email: user.email,
          createdAt: format(new Date(user.createdAt), "do MMMM',' yyyy"),
          rating: user.rating.length,
          communitiesCreated: user.community.length,
          postsCreated: user.post.length,
        })
      );
      setUsers(structuredUserData);
    }
  }, [queryResults, infiniteQueryData, initialFetchedUsers]);

  return (
    <>
      <div className="flex gap-2 p-2">
        <Input
          placeholder="Type user name here."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isFetching}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && query.length > 0) {
              refetch();
            }
          }}
        />
        <Button
          onClick={() => refetch()}
          className=""
          disabled={query.length === 0 || isFetching}
        >
          {isFetching ? (
            <Icons.spinner
              className="h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          ) : (
            "Search"
          )}
        </Button>
      </div>
      <ScrollArea className="w-full" orientation="horizontal">
        <UserDataTable columns={userColumns} data={users} />
      </ScrollArea>
      <div className="w-full flex justify-end -mt-2">
        <Button
          onClick={() => fetchNextPage()}
          size="sm"
          variant="outline"
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage && (
            <Icons.spinner className="h-4 w-4 mr-2 animate-spin" />
          )}
          Show more
        </Button>
      </div>
    </>
  );
};

export default Users;
