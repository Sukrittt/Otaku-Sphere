import Link from "next/link";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import { ThemeToggle } from "@/components/Footer/ThemeToggle";
import { buttonVariants } from "@/ui/Button";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-between space-y-1 py-5 md:h-16 md:flex-row md:py-0">
        <div className="text-center text-sm leading-loose text-muted-foreground">
          Built by{" "}
          <Link
            aria-label="Sukrit's github profile"
            href="https://github.com/Sukrittt"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Sukrit
          </Link>
          .
        </div>
        <div className="flex items-center space-x-1">
          <Link
            href="https://github.com/Sukrittt/Otaku-Sphere"
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })
              )}
            >
              <Icons.gitHub className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};

export default Footer;