import { Shell } from "@/components/Shell";
import DragContainer from "@/components/DragDrop/DragContainer";
import CustomSheet from "@/components/CustomSheet";

const WatchlistPage = async () => {
  return (
    <Shell>
      <h1 className="text-4xl text-center font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]">
        Your Watchlist
      </h1>
      <CustomSheet>Add anime</CustomSheet>
      <DragContainer />
    </Shell>
  );
};

export default WatchlistPage;
