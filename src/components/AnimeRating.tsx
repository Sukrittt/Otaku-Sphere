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
  session: Session | null;
  animeId: string;
  userRating: number | undefined;
}

const AnimeRating: FC<AnimeRatingProps> = ({
  animeId,
  session,
  userRating,
}) => {
  const { endErrorToast, loginToast } = useAuthToast();
  const router = useRouter();

  const [rating, setRating] = useState(userRating ?? 0);
  const previousRating = usePrevious(rating);

  const handleRatingClick = (index: number) => {
    if (rating === index) {
      setRating(0);
      return;
    }

    setRating(index);
  };

  const { mutate: rate } = useMutation({
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
            description: "Anime not found.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onSuccess: () => {
      toast({
        description: "Your rating was recorded successfully.",
      });
      router.refresh();
    },
    onMutate: (index: number) => {
      handleRatingClick(index);
    },
  });

  const handleRateAnime = (index: number) => {
    rate(index);
  };

  return (
    <div className="flex flex-col w-full gap-y-2">
      <span className="text-sm text-muted-foreground font-semibold">
        Rate this
      </span>
      <div className="flex gap-x-3 w-full text-zinc-600 dark:text-muted">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((index) => {
          const isFilled = index <= rating ? true : false;
          return (
            <Icons.star
              key={index}
              className={cn("h-4 w-4 cursor-pointer", {
                "text-yellow-700": isFilled,
              })}
              onClick={() => handleRateAnime(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AnimeRating;
