"use client";
import dynamic from "next/dynamic";

import { ExtendedPost } from "@/types/db";
import { Skeleton } from "@/ui/Skeleton";

const PostDropdown = dynamic(
  () => import("@/components/Dropdown/PostDropdown"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-8 w-8" />,
  }
);

interface PostDropdownProps {
  children: React.ReactNode;
  post: Pick<ExtendedPost, "id" | "creator" | "community">;
  sessionId: string;
}

const PostDropdownClient = ({
  children,
  post,
  sessionId,
}: PostDropdownProps) => {
  return (
    <PostDropdown post={post} sessionId={sessionId}>
      {children}
    </PostDropdown>
  );
};

export default PostDropdownClient;
