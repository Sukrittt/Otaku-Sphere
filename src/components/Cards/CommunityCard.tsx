import { FC } from "react";
import Link from "next/link";

import { ExtendedCommunity } from "@/types/db";
import { Card, CardDescription, CardHeader, CardTitle } from "@/ui/Card";
import UserAvatar from "@/components/User/UserAvatar";
import { formatTimeToNow } from "@/lib/utils";

interface CommunityCardProps {
  community: ExtendedCommunity;
}

const CommunityCard: FC<CommunityCardProps> = ({ community }) => {
  console.log("community", community);

  return (
    <Link
      href={`/community/${community.category.toLowerCase()}/${community.id}`}
    >
      <Card className="flex h-full flex-col">
        <CardHeader className="flex-1">
          <CardTitle className="line-clamp-1 pb-1">
            <div className="flex gap-x-2.5 items-center">
              <UserAvatar className="h-8 w-8" user={community.creator} />
              {community.name}
              <div className="space-x-1">
                <span className="text-sm text-muted-foreground">
                  {formatTimeToNow(new Date(community.createdAt))}
                </span>
                <span className="text-sm text-muted-foreground">{`#${community.category.toLowerCase()}`}</span>
              </div>
            </div>
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {community.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default CommunityCard;
