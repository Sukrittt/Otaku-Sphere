"use client";
import { FC, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface DragContainerProps {}

type DummyType = {
  id: number;
  name: string;
};

const dummyData = [
  {
    id: 1,
    name: "Item 1",
  },
  {
    id: 2,
    name: "Item 2",
  },
  {
    id: 3,
    name: "Item 3",
  },
];

const DragContainer: FC<DragContainerProps> = ({}) => {
  const [board, setBoard] = useState<DummyType[]>([]);
  const [containerItems, setContainerItems] = useState(dummyData);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item: DummyType) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id: number) => {
    const boardItem = dummyData.find((item) => item.id === id);

    if (!boardItem) return;

    setBoard((prev) => [...prev, boardItem]);
    setContainerItems((prev) => prev.filter((item) => item.id !== id));

    toast({
      description: "Added to board",
    });
  };

  return (
    <div className="flex gap-x-2 w-full">
      <div className="space-y-3 w-1/2">
        {containerItems.map((item) => (
          <DragItem key={item.id} item={item} />
        ))}
      </div>
      <Card
        className={cn("w-1/2", {
          "border-red-500": isOver,
        })}
        ref={drop}
      >
        <CardHeader>
          <CardTitle className="text-center">Drop here</CardTitle>
        </CardHeader>
        {board.map((item) => (
          <CardContent key={item.id}>
            <DragItem item={item} />
          </CardContent>
        ))}
      </Card>
    </div>
  );
};

export default DragContainer;

const DragItem = ({ item }: { item: DummyType }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: item.id, name: item.name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Card
      ref={drag}
      className={cn("", {
        "opacity-50": isDragging,
      })}
    >
      <CardHeader>{item.name}</CardHeader>
    </Card>
  );
};
