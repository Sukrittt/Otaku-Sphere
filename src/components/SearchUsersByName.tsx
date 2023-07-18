"use client";
import { FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";

import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";
import { UserDataTable } from "@/components/User/UserDataTable";
import { userColumns } from "@/components/Rankings/TableColumn";
import { UserDisplay } from "@/types/item-type";
import { ExtendedUser } from "@/types/db";
import { Icons } from "@/components/Icons";

interface SearchUsersByNameProps {
  initialUsers: UserDisplay[];
}

const SearchUsersByName: FC<SearchUsersByNameProps> = ({ initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");

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
    if (!queryResults) return;

    const structuredUserData: UserDisplay[] = queryResults.flatMap((user) => ({
      name: user.name,
      email: user.email,
      createdAt: format(new Date(user.createdAt), "do MMMM',' yyyy"),
      rating: user.rating.length,
      communitiesCreated: user.community.length,
      postsCreated: user.post.length,
    }));

    setUsers(structuredUserData);
  }, [queryResults]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-col lg:flex-row lg:items-center p-2">
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
          className="w-fit lg:w-auto"
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

      <UserDataTable columns={userColumns} data={users} />
    </div>
  );
};

export default SearchUsersByName;
