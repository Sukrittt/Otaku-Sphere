"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { useAuthToast } from "@/hooks/useAuthToast";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/Form";
import { Button } from "@/ui/Button";
import { Icons } from "@/components/Icons";
import {
  CommentValidatorType,
  CreateCommentValidator,
  ServerCommentValidatorType,
} from "@/lib/validators/community";
import { Textarea } from "@/ui/Textarea";

const AddCommentForm = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const { loginToast, endErrorToast } = useAuthToast();

  //react-hook-form initialization
  const form = useForm<CommentValidatorType>({
    resolver: zodResolver(CreateCommentValidator),
    defaultValues: {
      text: "",
    },
  });

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async (content: CommentValidatorType) => {
      const payload: ServerCommentValidatorType = {
        text: content.text,
        postId,
      };

      const { data } = await axios.post("/api/post/comment", payload);
      return data;
    },
    onSuccess: () => {
      router.refresh();
      form.reset();

      toast({
        description: "Your comment was added successfully.",
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
            title: "Post not found",
            description:
              "The post you are trying to comment on does not exist.",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toast({
        description: "Please wait while we add your comment...",
      });
    },
  });

  function onSubmit(content: CommentValidatorType) {
    createCommunity(content);
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-5 mt-1.5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your comment</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your comment here." {...field} />
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
          Comment
          <span className="sr-only">Add your comment</span>
        </Button>
      </form>
    </Form>
  );
};

export default AddCommentForm;
