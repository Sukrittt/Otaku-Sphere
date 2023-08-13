import { useDrag } from "react-dnd";

import { cn, formatUrl } from "@/lib/utils";
import { Card, CardHeader } from "@/ui/Card";
import { DragItemType } from "@/types/item-type";

export const DragItem = ({ item }: { item: DragItemType }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: {
      id: item.id,
      name: item.name,
      category: item.category,
      animeId: item.animeId,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <a
      href={`/anime/${formatUrl(item.name)}`}
      className="focus:outline-none group"
    >
      <Card
        ref={drag}
        className={cn("focused", {
          "opacity-50": isDragging,
        })}
      >
        <CardHeader className="py-4">{item.name}</CardHeader>
      </Card>
    </a>
  );
};
