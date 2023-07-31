import Link from "next/link";
import { Metadata } from "next";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
import { UserAuthForm } from "@/components/Forms/AuthForm";
import { Icons } from "@/components/Icons";
import { env } from "@/env.mjs";
import { dialogue } from "@/data";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Sign In",
  description:
    "Join our community or log in to your account. Explore personalized features and content on our platform.",
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const AuthenticationPage = () => {
  const randomDialogue = dialogue[Math.floor(Math.random() * dialogue.length)];

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-900" />

        <div className="relative z-20 flex items-center">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-lg font-medium"
            )}
          >
            <Icons.logo className="mr-2 h-6 w-6" />
            Otaku Sphere
          </Link>
        </div>
        <div className="relative z-20 mt-auto text-zinc-800 dark:text-white">
          <blockquote className="space-y-2">
            <p className="text-lg">&ldquo;{randomDialogue.message}&rdquo;</p>
            <footer className="text-sm">{randomDialogue.character}</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome to Otaku Sphere
            </h1>
            <p className="text-sm text-muted-foreground">
              Choose your preferred sign in method
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
