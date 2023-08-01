"use client";
import dynamic from "next/dynamic";

import { OverviewType } from "@/types/item-type";
import OverviewSkeleton from "@/components/SkeletonLoaders/OverviewSkeleton";

const OverviewDisplay = dynamic(() => import("@/components/OverviewDisplay"), {
  ssr: false,
  loading: () => <OverviewSkeleton />,
});

const OverviewClient = ({ data }: { data: OverviewType[] }) => {
  return <OverviewDisplay data={data} />;
};

export default OverviewClient;
