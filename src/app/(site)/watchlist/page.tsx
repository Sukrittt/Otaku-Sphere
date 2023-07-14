import { Shell } from "@/components/Shell";
import DragContainer from "@/components/DragDrop/DragContainer";

const WatchlistPage = async () => {
  return (
    <Shell>
      <h1 className="text-4xl text-center font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]">
        Your Watchlist
      </h1>
      <DragContainer />
    </Shell>
  );
};

export default WatchlistPage;
