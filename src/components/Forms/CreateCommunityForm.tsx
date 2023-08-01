"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";
import { Icons } from "@/components/Icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/Form";
import { useAuthToast } from "@/hooks/useAuthToast";
import { toast } from "@/hooks/use-toast";
import {
  CreateCommunityValidatorType,
  createCommunityValidator,
} from "@/lib/validators/community";
import { Combobox } from "@/ui/ComboBox";
import { categories } from "@/data/community";
import { Textarea } from "@/ui/Textarea";

const CreateCommunityForm = () => {
  const router = useRouter();
  const { loginToast, endErrorToast } = useAuthToast();

  const [category, setCategory] = useState("General");

  //react-hook-form initialization
  const form = useForm<CreateCommunityValidatorType>({
    resolver: zodResolver(createCommunityValidator),
    defaultValues: {
      name: "",
      description: "",
      category: "",
    },
  });

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async (content: CreateCommunityValidatorType) => {
      const payload: CreateCommunityValidatorType = {
        name: content.name,
        description: content.description,
        category,
      };

      const { data } = await axios.post("/api/community", payload);
      return data;
    },
    onSuccess: () => {
      router.push(`/community/${category.toLowerCase()}`);
      router.refresh();
      form.reset();

      toast({
        title: "Success!",
        description: "Your communnity was created successfully.",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 403) {
          return toast({
            title: "Please select a category",
            description: "Category cannot be empty.",
            variant: "destructive",
          });
        }
        if (statusCode === 422) {
          return toast({
            title: "Error!",
            description: "Community name and description cannot be empty.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toast({
        title: "Please wait",
        description: "We are creating your community.",
      });
    },
  });

  function onSubmit(content: CreateCommunityValidatorType) {
    createCommunity(content);
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type community name here."
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Little bit about this community."
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                      e.preventDefault();
                      createCommunity(form.getValues());
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={() => (
            <FormItem className="flex flex-col gap-y-1">
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Combobox
                  data={categories}
                  placeholder="Select category..."
                  setState={setCategory}
                  selectedOption={category}
                  disabled={isLoading}
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
          Create
          <span className="sr-only">Create community</span>
        </Button>
      </form>
    </Form>
  );
};

export default CreateCommunityForm;
