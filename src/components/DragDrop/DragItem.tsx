import { useDrag } from "react-dnd";
import { Anime } from "@prisma/client";

import { Card, CardHeader } from "@/ui/Card";
import { cn } from "@/lib/utils";
import { DragItemType, DummyType } from "@/types/item-type";

export const DragItem = ({ item }: { item: DragItemType }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: item.id, name: item.name, category: item.category },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Card
      ref={drag}
      className={cn({
        "opacity-50": isDragging,
      })}
    >
      <CardHeader>{item.name}</CardHeader>
    </Card>
  );
};
