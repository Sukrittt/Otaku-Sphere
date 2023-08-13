import Link from "next/link";

import { Icons } from "@/components/Icons";
import { ThemeToggle } from "@/components/Footer/ThemeToggle";
import { buttonVariants } from "@/ui/Button";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex items-center justify-between space-y-1 py-5 md:h-16 md:py-0">
        <div className="text-center text-sm leading-loose text-muted-foreground">
          Built by{" "}
          <Link
            aria-label="Sukrit's github profile"
            href="https://github.com/Sukrittt"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 focus:outline-none focus:font-bold"
          >
            Sukrit
          </Link>
          .
        </div>
        <div className="flex items-center sm:space-x-1">
          <Link
            href="https://github.com/Sukrittt/Otaku-Sphere"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              size: "icon",
              variant: "ghost",
            })}
          >
            <div>
              <Icons.gitHub className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <Link
            href="https://twitter.com/SphereOtaku"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              size: "icon",
              variant: "ghost",
            })}
          >
            <div>
              <Icons.twitter className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Twitter</span>
            </div>
          </Link>
          <Link
            href="https://www.instagram.com/otaku.sphere/"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              size: "icon",
              variant: "ghost",
            })}
          >
            <div>
              <Icons.instagram className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Instagram</span>
            </div>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
