"use client";
import dynamic from "next/dynamic";

import { Skeleton } from "@/ui/Skeleton";

const ReviewDropdown = dynamic(
  () => import("@/components/Dropdown/ReviewDropdown"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-8 w-8" />,
  }
);

interface ReviewDropdownProps {
  children: React.ReactNode;
  reviewId: string;
  animeId: string;
}

const ReviewDropdownClient = ({
  children,
  animeId,
  reviewId,
}: ReviewDropdownProps) => {
  return (
    <ReviewDropdown animeId={animeId} reviewId={reviewId}>
      {children}
    </ReviewDropdown>
  );
};

export default ReviewDropdownClient;
