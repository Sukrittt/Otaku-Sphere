"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import { Button } from "@/ui/Button";
import { signIn } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type LoadingState = "google" | "github";

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<LoadingState | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoading("google");

    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Could not sign you in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleGithubLogin = async () => {
    setIsLoading("github");

    try {
      await signIn("github");
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Could not sign you in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className={cn("grid gap-y-4", className)} {...props}>
      <Button
        onClick={handleGoogleLogin}
        variant="outline"
        type="button"
        disabled={isLoading === "google"}
      >
        {isLoading === "google" ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
      <Button
        onClick={handleGithubLogin}
        variant="outline"
        type="button"
        disabled={isLoading === "github"}
      >
        {isLoading === "github" ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  );
}
