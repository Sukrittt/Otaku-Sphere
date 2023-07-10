import { FC } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { ExtendedPost } from "@/types/db";
import UserAvatar from "@/components/User/UserAvatar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/ui/Card";
import { formatDescription } from "@/lib/utils";
import { getAuthSession } from "@/lib/auth";
import { Icons } from "../Icons";

interface PostCardProps {
  post: ExtendedPost;
}

const PostCard: FC<PostCardProps> = async ({ post }) => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  const formattedCategory = post.community.category.toLowerCase();

  const href = `/community/${formattedCategory}/${post.communityId}/post/${post.id}`;
  const trimmedMessage = formatDescription(post.message, 250);

  return (
    <Link href={href}>
      <Card className="flex h-full flex-col">
        <CardHeader className="flex gap-x-2 flex-row">
          <UserAvatar className="h-6 w-6 mt-2" user={post.creator} />
          <div className="flex-1 space-y-1">
            <CardTitle className="line-clamp-1 pb-1">{post.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {trimmedMessage}
            </CardDescription>
            <div className="flex items-center gap-x-1 mt-4 w-full justify-end ">
              <Icons.feedback className="h-3.5 w-3.5" />
              <span className="text-sm text-muted-foreground">
                {post.comment.length}
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default PostCard;
