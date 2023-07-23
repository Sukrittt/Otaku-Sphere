"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { watchlists } from "@/data/anime";
import { toast } from "@/hooks/use-toast";
import {
  AnimeWatchlistSchemaType,
  AnimeWatchlistSchema,
  AnimeWatchlistServerType,
} from "@/lib/validators/anime";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/Form";
import { Combobox } from "@/ui/ComboBox";
import { useAuthToast } from "@/hooks/useAuthToast";
import CustomCommand from "@/components/Custom-UI/CustomCommand";
import { AddWatchlistAnimeType, ZodCategoryType } from "@/types/item-type";
import { Card, CardHeader } from "@/ui/Card";
import { Icons } from "@/components/Icons";

const AddAnimeWatchlistForm = () => {
  const router = useRouter();
  const { loginToast, endErrorToast } = useAuthToast();

  const [category, setCategory] = useState<ZodCategoryType>("pending");
  const [animeData, setAnimeData] = useState<AddWatchlistAnimeType[]>([]);

  //react-hook-form initialization
  const form = useForm<AnimeWatchlistSchemaType>({
    resolver: zodResolver(AnimeWatchlistSchema),
    defaultValues: {
      category: "",
    },
  });

  const { mutate: addAnime } = useMutation({
    mutationFn: async () => {
      const payload: AnimeWatchlistServerType[] = animeData.map((data) => ({
        animeId: data.id,
        category,
      }));

      const { data } = await axios.post("/api/anime/watchlist", payload);
      return data;
    },
    onSuccess: () => {
      router.refresh();
      form.reset();
      setAnimeData([]);

      toast({
        description: "Anime added in your watchlist.",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 404) {
          return toast({
            title: "Try again.",
            description: "One of the anime you selected was not found",
            variant: "destructive",
          });
        }
        if (statusCode === 422) {
          return toast({
            description: "Please make sure you have selected an anime.",
            variant: "destructive",
          });
        }
        if (statusCode === 409) {
          return toast({
            description:
              "One of the anime selected already exists in your watchlist.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toast({
        description:
          "Please wait while we are adding this anime in your watchlist.",
      });
    },
  });

  function onSubmit() {
    addAnime();
  }

  const handleRemoveSelectedAnime = (animeId: string) => {
    const filteredAnime = animeData.filter((anime) => anime.id !== animeId);

    setAnimeData(filteredAnime);
  };

  return (
    <Form {...form}>
      <form
        id="anime-watchlist-form"
        className="grid w-full max-w-xl gap-5 py-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormItem>
          <FormLabel>Search</FormLabel>
          <CustomCommand setAnimeData={setAnimeData} animeData={animeData} />
        </FormItem>
        {animeData.length > 0 && (
          <FormField
            control={form.control}
            name="animeId"
            render={() => (
              <FormItem>
                <FormLabel>Selected Anime</FormLabel>
                <FormControl>
                  <>
                    {animeData.map((selectedAnime) => (
                      <Card
                        key={selectedAnime.id}
                        className="flex items-center"
                      >
                        <CardHeader className="py-2 px-3 w-full">
                          <span className="text-sm">{selectedAnime.name}</span>
                        </CardHeader>
                        <Icons.delete
                          className="h-3.5 w-3.5 mr-3 cursor-pointer hover:text-muted-foreground transition"
                          onClick={() =>
                            handleRemoveSelectedAnime(selectedAnime.id)
                          }
                        />
                      </Card>
                    ))}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="category"
          render={() => (
            <FormItem className="flex flex-col gap-y-1">
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Combobox
                  data={watchlists}
                  selectedOption={category[0].toUpperCase() + category.slice(1)}
                  placeholder="Select category..."
                  setState={setCategory}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default AddAnimeWatchlistForm;
