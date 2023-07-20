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
        <CardHeader className="flex-1 py-5">
          <CardTitle className="line-clamp-1">
            <div className="flex gap-2.5">
              <UserAvatar className="h-8 w-8" user={community.creator} />
              <div className="space-y-2.5">
                <div className="flex flex-col md:flex-row md:items-center gap-x-2.5">
                  {community.name}
                  <div className="space-x-1">
                    <span className="text-sm text-muted-foreground">
                      {formatTimeToNow(new Date(community.createdAt))}
                    </span>
                    <span className="text-sm text-muted-foreground">{`#${community.category.toLowerCase()}`}</span>
                  </div>
                </div>
                <CardDescription className="font-normal">
                  {community.description}
                </CardDescription>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default CommunityCard;
