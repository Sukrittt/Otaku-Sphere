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
import {
  AddAdminUserPayload,
  AddAdminUserPayloadType,
} from "@/lib/validators/user";
import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";
import { Icons } from "@/components/Icons";

const AddAdminForm = () => {
  const router = useRouter();
  const { loginToast, endErrorToast } = useAuthToast();

  //react-hook-form initialization
  const form = useForm<AddAdminUserPayloadType>({
    resolver: zodResolver(AddAdminUserPayload),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async (content: AddAdminUserPayloadType) => {
      const payload: AddAdminUserPayloadType = {
        email: content.email,
      };

      const { data } = await axios.post("/api/user/admin", payload);
      return data;
    },
    onSuccess: () => {
      router.refresh();
      form.reset();

      toast({
        description: "User has been made admin.",
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
            title: "You are not permiitted to do this action.",
            description: "Only admins can make other users admin.",
            variant: "destructive",
          });
        }
        if (statusCode === 404) {
          return toast({
            title: "Try again later.",
            description: "This user does not exist.",
            variant: "destructive",
          });
        }
        if (statusCode === 409) {
          return toast({
            title: "There was a conflict",
            description: "This user is already an admin.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toast({
        description: "Please wait while we are making the user admin.",
      });
    },
  });

  function onSubmit(content: AddAdminUserPayloadType) {
    createCommunity(content);
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-5 my-2"
        id="add-admin-form"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type user email here."
                  disabled={isLoading}
                  {...field}
                  autoFocus
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
            Make admin
            <span className="sr-only">Make admin</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddAdminForm;
