import Link from "next/link";

import { toast } from "./use-toast";
import { buttonVariants } from "@/ui/Button";

export const useAuthToast = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: "Sign In required.",
      description: "You need to be signed in to do that.",
      variant: "destructive",
      action: (
        <Link
          href="/sign-in"
          onClick={() => dismiss()}
          className={buttonVariants()}
        >
          Sign In
        </Link>
      ),
    });
  };

  const endErrorToast = () => {
    toast({
      title: "Error",
      description: "Something went wrong.",
      variant: "destructive",
    });
  };

  return { loginToast, endErrorToast };
};
