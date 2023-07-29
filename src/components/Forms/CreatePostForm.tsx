"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { Button } from "@/ui/Button";
import { toast } from "@/hooks/use-toast";
import { Icons } from "@/components/Icons";
import { useAuthToast } from "@/hooks/useAuthToast";
import {
  CreatePostValidatorType,
  createPostValidator,
} from "@/lib/validators/community";
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

interface CreatePostFormProps {
  category: string;
  communityId: string;
}

const CreatePostForm: FC<CreatePostFormProps> = ({ category, communityId }) => {
  const router = useRouter();
  const { loginToast, endErrorToast } = useAuthToast();

  //react-hook-form initialization
  const form = useForm<CreatePostValidatorType>({
    resolver: zodResolver(createPostValidator),
    defaultValues: {
      text: "",
      title: "",
    },
  });

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: async (content: CreatePostValidatorType) => {
      const payload: CreatePostValidatorType = {
        title: content.title,
        text: content.text,
      };

      const { data } = await axios.post(
        `/api/post?communityId=${communityId}`,
        payload
      );
      return data;
    },
    onSuccess: () => {
      const formattedCategory =
        category.charAt(0).toLowerCase() + category.slice(1);

      router.push(`/community/${formattedCategory}/${communityId}`);
      router.refresh();
      form.reset();

      toast({
        title: "Success!",
        description: "Post created successfully.",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 422) {
          return toast({
            title: "Error!",
            description: "Title and message cannot be empty.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toast({
        title: "Please wait",
        description: "We are creating your post.",
      });
    },
  });

  function onSubmit(content: CreatePostValidatorType) {
    createPost(content);
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type your title to here."
                  {...field}
                  disabled={isLoading}
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your message to everyone."
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                      e.preventDefault();
                      createPost(form.getValues());
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-fit" disabled={isLoading} size="sm">
          {isLoading && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Post
          <span className="sr-only">Create a post</span>
        </Button>
      </form>
    </Form>
  );
};

export default CreatePostForm;
