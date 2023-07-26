"use client";
import dynamic from "next/dynamic";

import { ExtendedCommunity } from "@/types/db";

const Communities = dynamic(
  () => import("@/components/InfiniteQuery/Communities"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

interface CommunitiesProps {
  initialCommunities: ExtendedCommunity[];
  category?: string;
}

const CommunityClient = ({
  initialCommunities,
  category,
}: CommunitiesProps) => {
  return (
    <Communities initialCommunities={initialCommunities} category={category} />
  );
};

export default CommunityClient;
