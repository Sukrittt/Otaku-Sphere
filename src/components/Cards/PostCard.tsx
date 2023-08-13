import { FC } from "react";
import Link from "next/link";

import { ExtendedPost } from "@/types/db";
import UserAvatar from "@/components/User/UserAvatar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/ui/Card";
import { formatDescription } from "@/lib/utils";
import { Icons } from "@/components/Icons";

interface PostCardProps {
  post: ExtendedPost;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const formattedCategory = post.community.category.toLowerCase();

  const href = `/community/${formattedCategory}/${post.communityId}/post/${post.id}`;
  const trimmedMessage = formatDescription(post.message, 250);

  return (
    <Link href={href} className="focus:outline-none group">
      <Card className="flex h-full flex-col relative dark:hover:border-neutral-900 hover:border-neutral-100 transition focused">
        <CardHeader className="flex gap-x-2 flex-row py-5">
          <UserAvatar className="h-8 w-8 mt-2" user={post.creator} />
          <div className="flex-1 space-y-2">
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>{trimmedMessage}</CardDescription>
            <div className="absolute bottom-1 md:bottom-2 right-5">
              <div className="flex items-center gap-x-1 mt-8 w-full justify-end ">
                <Icons.feedback className="h-3 w-3" />
                <span className="text-xs text-muted-foreground">
                  {post.comment.length}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default PostCard;
