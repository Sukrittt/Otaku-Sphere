import { format } from "date-fns";

import { db } from "@/lib/db";
import { Header } from "@/components/Header";
import { Shell } from "@/components/Shell";
import SearchUsersByName from "@/components/SearchUsersByName";
import { UserDisplay } from "@/types/item-type";
import { ScrollArea } from "@/ui/ScrollArea";

const UsersPage = async () => {
  const recentFiveUsers = await db.user.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      anime: true,
      community: true,
      post: true,
      rating: true,
    },
  });

  const structuredUserData: UserDisplay[] = recentFiveUsers.flatMap((user) => ({
    name: user.name,
    email: user.email,
    createdAt: format(new Date(user.createdAt), "do MMMM',' yyyy"),
    rating: user.rating.length,
    communitiesCreated: user.community.length,
    postsCreated: user.post.length,
  }));

  return (
    <Shell layout="dashboard">
      <Header
        title="Users"
        description="Details of the users on the site."
        size="sm"
      />
      <ScrollArea className="w-full" orientation="horizontal">
        <SearchUsersByName initialUsers={structuredUserData} />
      </ScrollArea>
    </Shell>
  );
};

export default UsersPage;
