"use client";
import dynamic from "next/dynamic";

import { Skeleton } from "@/ui/Skeleton";

const LikePost = dynamic(() => import("@/components/LikePost"), {
  ssr: false,
  loading: () => <Skeleton className="h-4 w-4 rounded-full" />,
});

interface LikePostProps {
  initialLike: boolean;
  likes: number;
  postId: string;
}

const LikePostClient = ({ initialLike, likes, postId }: LikePostProps) => {
  return <LikePost likes={likes} initialLike={initialLike} postId={postId} />;
};

export default LikePostClient;
