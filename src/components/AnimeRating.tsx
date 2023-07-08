"use client";
import { FC, useState } from "react";
import { Icons } from "./Icons";
import { cn } from "@/lib/utils";

interface AnimeRatingProps {
  animeId: string;
}

const AnimeRating: FC<AnimeRatingProps> = ({ animeId }) => {
  const [rating, setRating] = useState(0);

  const handleRatingClick = (index: number) => {
    if (rating - 1 === index) {
      setRating(0);
      return;
    }

    setRating(index + 1);
  };

  return (
    <div className="flex flex-col w-full gap-y-2">
      <span className="text-sm text-muted-foreground font-semibold">
        Rate this
      </span>
      <div className="flex gap-x-3 w-full text-muted">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((index) => {
          const isFilled = index <= rating - 1 ? true : false;
          return (
            <Icons.star
              key={index}
              className={cn("h-4 w-4 cursor-pointer", {
                "text-yellow-700": isFilled,
              })}
              onClick={() => handleRatingClick(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AnimeRating;
