"use client";

import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";

import { toast } from "@/hooks/use-toast";
import { useAuthToast } from "@/hooks/useAuthToast";
import {
  AnimeReviewSchema,
  AnimeReviewSchemaType,
  AnimeReviewServerSchemaType,
} from "@/lib/validators/anime";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/Form";
import { Textarea } from "@/ui/Textarea";
import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";
import { Icons } from "@/components/Icons";

interface AddAnimeReviewFormProps {
  animeId: string;
}

const AddAnimeReviewForm: FC<AddAnimeReviewFormProps> = ({ animeId }) => {
  const { loginToast, endErrorToast } = useAuthToast();
  const queryClient = useQueryClient();

  //react-hook-form initialization
  const form = useForm<AnimeReviewSchemaType>({
    resolver: zodResolver(AnimeReviewSchema),
    defaultValues: {
      review: "",
      title: "",
    },
  });

  const { mutate: addReview, isLoading } = useMutation({
    mutationFn: async (content: AnimeReviewSchemaType) => {
      const payload: AnimeReviewServerSchemaType = {
        animeId,
        review: content.review,
        title: content.title,
      };

      const { data } = await axios.post("/api/anime/review", payload);
      return data;
    },
    onSuccess: () => {
      form.reset();

      const reviewInfiniteQueryKey = [`anime-review-infinite-query-${animeId}`];
      queryClient.resetQueries(reviewInfiniteQueryKey);

      toast({
        title: "Success!",
        description: "Review posted successfully.",
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
            title: "Error!",
            description: "Anime does not exist.",
            variant: "destructive",
          });
        }
        if (statusCode === 422) {
          return toast({
            title: "Error!",
            description: "Either the title or review is too short/long.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toast({
        title: "Please wait",
        description: "We are adding your review.",
      });
    },
  });

  function onSubmit(content: AnimeReviewSchemaType) {
    addReview(content);
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-5 my-4"
        id="anime-review-form"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your review title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type your review title here."
                  {...field}
                  autoFocus
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your review here."
                  large
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                      e.preventDefault();
                      addReview(form.getValues());
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end">
          <Button className="w-fit" disabled={isLoading} size="sm">
            {isLoading && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Save changes
            <span className="sr-only">Save changes</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddAnimeReviewForm;
