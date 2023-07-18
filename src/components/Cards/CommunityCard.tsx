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
  return (
    <Link
      href={`/community/${community.category.toLowerCase()}/${community.id}`}
    >
      <Card className="flex h-full flex-col">
        <CardHeader className="flex-1">
          <CardTitle className="line-clamp-1 pb-1">
            <div className="flex gap-x-2.5 gap-y-1 md:gap-y-0 md:items-center flex-col md:flex-row">
              <UserAvatar className="h-8 w-8" user={community.creator} />
              <div className="mt-2 md:mt-0 flex flex-col md:flex-row md:items-center gap-x-2.5">
                {community.name}
                <div className="space-x-1">
                  <span className="text-sm text-muted-foreground">
                    {formatTimeToNow(new Date(community.createdAt))}
                  </span>
                  <span className="text-sm text-muted-foreground">{`#${community.category.toLowerCase()}`}</span>
                </div>
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
