"use client";
import { FC, useState } from "react";
import { usePrevious } from "@mantine/hooks";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Session } from "next-auth";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import { useAuthToast } from "@/hooks/useAuthToast";
import { RateAnimeSchemaType } from "@/lib/validators/anime";
import { toast } from "@/hooks/use-toast";

interface AnimeRatingProps {
  animeId: string;
  userRating: number | undefined;
  session: Session | null;
}

const AnimeRating: FC<AnimeRatingProps> = ({
  animeId,
  userRating,
  session,
}) => {
  const { endErrorToast, loginToast } = useAuthToast();
  const router = useRouter();

  const [rating, setRating] = useState(userRating ?? 0);
  const [hoveredRating, setHoveredRating] = useState(rating ?? 0);
  const previousRating = usePrevious(rating);

  const handleRatingClick = (index: number) => {
    if (rating === index) {
      setRating(0);
      return;
    }

    setRating(index);
    setHoveredRating(index);
  };

  const { mutate: rate, isLoading } = useMutation({
    mutationFn: async (index: number) => {
      const payload: RateAnimeSchemaType = { id: animeId, rating: index };

      const { data } = await axios.post("/api/anime/rate", payload);
      return data;
    },
    onError: (error) => {
      setRating(previousRating ?? 0);

      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 404) {
          return toast({
            title: "Error!",
            description: "Anime not found.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onSuccess: () => {
      router.refresh();
      toast({
        title: "Success!",
        description: "Your rating was recorded.",
      });
    },
    onMutate: (index: number) => {
      if (!session) return;

      handleRatingClick(index);
      toast({
        title: "Please wait",
        description: "We are recording your rating.",
      });
    },
  });

  const handleRateAnime = (index: number) => {
    if (isLoading) {
      return toast({
        title: "Please wait",
        description: "We are recording your rating.",
      });
    }

    rate(index);
  };

  return (
    <div className="flex flex-col w-full gap-y-2">
      <span className="text-sm text-muted-foreground font-semibold">
        Rate this
      </span>
      <div className="flex gap-x-3 w-full text-zinc-600 dark:text-muted">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((index) => {
          const isFilled = index <= (hoveredRating || rating) ? true : false;

          return (
            <Icons.star
              key={index}
              className={cn("h-4 w-4 cursor-pointer", {
                "text-yellow-700": isFilled,
              })}
              onClick={() => handleRateAnime(index)}
              onMouseEnter={() => setHoveredRating(index)}
              onMouseLeave={() => setHoveredRating(rating ?? 0)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AnimeRating;
