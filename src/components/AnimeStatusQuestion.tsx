"use client";
import { FC, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Link from "next/link";

import { Button, buttonVariants } from "@/ui/Button";
import { ZodCategoryType } from "@/types/item-type";
import { AnimeWatchlistServerType } from "@/lib/validators/anime";
import { toast } from "@/hooks/use-toast";
import { useAuthToast } from "@/hooks/useAuthToast";

interface AnimeStatusQuestionProps {
  animeId: string;
}

type StatusType = {
  id: number;
  label: string;
  category: ZodCategoryType;
};

const status: StatusType[] = [
  {
    id: 1,
    label: "Want to watch",
    category: "pending",
  },
  {
    id: 2,
    label: "Watching",
    category: "watching",
  },
  {
    id: 3,
    label: "Completed",
    category: "finished",
  },
];

const AnimeStatusQuestion: FC<AnimeStatusQuestionProps> = ({ animeId }) => {
  const [showQuestion, setShowQuestion] = useState(true);
  const { loginToast, endErrorToast } = useAuthToast();

  const { mutate: addAnimeToWatchlist } = useMutation({
    mutationFn: async (category: ZodCategoryType) => {
      const payload: AnimeWatchlistServerType = {
        animeId: animeId,
        category,
      };

      const { data } = await axios.post("/api/anime/watchlist", payload);
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 404) {
          return toast({
            title: "Anime not found",
            description: "Try another one.",
            variant: "destructive",
          });
        }
        if (statusCode === 409) {
          return toast({
            description: "Anime already exists in your watchlist.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      setShowQuestion(false);
    },
    onSuccess() {
      const { dismiss } = toast({
        description: "Good, we'll keep a track of it in your watchlist.",
        action: (
          <Link
            href="/watchlist"
            onClick={() => dismiss()}
            className={buttonVariants({ variant: "outline" })}
          >
            Watchlist
          </Link>
        ),
      });
    },
  });

  if (!showQuestion) return;

  return (
    <div className="mt-2 space-y-3">
      <p className="text-muted-foreground text-sm">
        Tell us your current anime watching status.
      </p>
      <div className="flex gap-x-2 items-center">
        {status.map((item) => (
          <Button
            variant="outline"
            key={item.id}
            onClick={() => addAnimeToWatchlist(item.category)}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AnimeStatusQuestion;