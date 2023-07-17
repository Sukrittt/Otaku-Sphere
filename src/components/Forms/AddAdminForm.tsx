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
import { Button, buttonVariants } from "@/ui/Button";
import { Icons } from "@/components/Icons";
import CustomAlertBox from "@/components/Custom-UI/CustomAlertBox";
import { cn } from "@/lib/utils";

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
            title: "You are not permitted to do this action.",
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

  const { mutate: removeAdmin, isLoading: removeLoader } = useMutation({
    mutationFn: async () => {
      const payload: AddAdminUserPayloadType = { email: form.watch("email") };

      const { data } = await axios.patch("/api/user/admin", payload);
      return data;
    },
    onSuccess: () => {
      router.refresh();
      form.reset();

      toast({
        description: "This user is no longer an admin.",
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
            description: "User not found.",
            variant: "destructive",
          });
        }
        if (statusCode === 409) {
          return toast({
            description: "This user is not an admin.",
            variant: "destructive",
          });
        }
        if (statusCode === 403) {
          return toast({
            title: "You are not permitted to do this action.",
            description: "Only admins are allowed to remove admins.",
            variant: "destructive",
          });
        }
        if (statusCode === 405) {
          return toast({
            title: "You are not permitted to do this action.",
            description: "The main owner cannot be removed.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toast({
        description:
          "Please wait while we are removing this user from admin role.",
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
        <div className="w-full flex justify-end gap-x-3">
          <Button
            className="w-fit"
            disabled={isLoading}
            size="sm"
            type="submit"
          >
            {isLoading && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Make admin
            <span className="sr-only">Make admin</span>
          </Button>
          <CustomAlertBox
            description="This action cannot be undone. This will make the user loose all it's admin powers."
            onClick={() => removeAdmin()}
          >
            <span
              className={cn(
                buttonVariants({ variant: "destructive", size: "sm" }),
                "w-fit ",
                {
                  "pointer-events-none opacity-50": removeLoader,
                }
              )}
            >
              {removeLoader && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              {removeLoader ? "Removing" : "Remove"}
              <span className="sr-only">Remove admin</span>
            </span>
          </CustomAlertBox>
        </div>
      </form>
    </Form>
  );
};

export default AddAdminForm;
