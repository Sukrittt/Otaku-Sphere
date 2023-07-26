"use client";
import dynamic from "next/dynamic";

const LikePost = dynamic(() => import("@/components/LikePost"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
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
