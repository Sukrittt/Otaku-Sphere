"use client";
import dynamic from "next/dynamic";
import { UserDisplay } from "@/types/item-type";
import { ExtendedUser } from "@/types/db";

const Users = dynamic(() => import("@/components/InfiniteQuery/Users"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface UsersProps {
  initialUsers: UserDisplay[];
  initialFetchedUsers: ExtendedUser[];
}
const UserClient = ({ initialFetchedUsers, initialUsers }: UsersProps) => {
  return (
    <Users
      initialFetchedUsers={initialFetchedUsers}
      initialUsers={initialUsers}
    />
  );
};

export default UserClient;
