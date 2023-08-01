"use client";
import dynamic from "next/dynamic";
import { Anime } from "@prisma/client";

const AnimeCard = dynamic(() => import("@/components/Cards/AnimeCard"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const AnimeCardClient = ({ anime }: { anime: Anime }) => {
  return <AnimeCard anime={anime} />;
};

export default AnimeCardClient;

// const AnimeSkeleton = () => {
//   return (
//     <div className="flex flex-col gap-y-4">
//       <Skeleton className="h-10 w-full" />
//       <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
//         {Array.from({ length: 6 }).map((_, index) => (
//           <div key={index}>
//             <AnimeAdminSkeletonCard />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
