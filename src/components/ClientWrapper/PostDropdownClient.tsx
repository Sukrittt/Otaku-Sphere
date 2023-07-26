"use client";
import dynamic from "next/dynamic";

import { ExtendedPost } from "@/types/db";

const PostDropdown = dynamic(
  () => import("@/components/Dropdown/PostDropdown"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
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
