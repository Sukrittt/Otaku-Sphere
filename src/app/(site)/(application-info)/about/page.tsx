import Link from "next/link";

import { Header } from "@/components/Header";
import { Shell } from "@/components/Shell";
import { Separator } from "@/ui/Separator";
import { features, socials, techStack } from "@/config";
import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/ui/Button";
import { cn } from "@/lib/utils";

const AboutPage = () => {
  return (
    <Shell layout="markdown">
      <div>
        <Header
          title="About"
          description="About the project and the author of the project."
        />
        <Separator className="my-4" />
        <p className="font-light">
          This is an open source all-in-one Anime Platform build with everything
          in{" "}
          <Link
            href="https://nextjs.org/"
            target="_blank"
            className="underline font-semibold underline-offset-4"
          >
            Next.js 13.
          </Link>
        </p>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          Tech stack used
        </h1>
        <Separator className="my-2" />
        <ul className="space-y-2 mx-5 mt-2">
          {techStack.map((tech, index) => (
            <li key={index} className="list-disc">
              <Link
                href={tech.url}
                target="_blank"
                className="underline font-medium tracking-tight underline-offset-4"
              >
                {tech.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">Credits</h1>
        <Separator className="my-2" />
        <ul className="space-y-2 mx-5 mt-2 list-disc">
          <li>
            <Link
              href="https://ui.shadcn.com/"
              target="_blank"
              className="underline font-medium tracking-tight underline-offset-4"
            >
              shadcn/ui
            </Link>{" "}
            - For the awesome reusable components library
          </li>
          <li>
            <Link
              href="https://aniwatch.to/home"
              target="_blank"
              className="underline font-medium tracking-tight underline-offset-4"
            >
              aniwatch.to
            </Link>{" "}
            - For anime data
          </li>
        </ul>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">Key features</h1>
        <Separator className="my-2" />
        <ul className="space-y-2 mx-5 mt-2">
          {features.map((feature, index) => (
            <li key={index} className="list-disc">
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          About the author
        </h1>
        <Separator className="my-2" />
        <ul className="space-y-2 mx-5 mt-2">
          {socials.map((social) => (
            <li key={social.id} className="list-disc">
              <Link
                href={social.href}
                target="_blank"
                className="underline font-medium tracking-tight underline-offset-4"
              >
                {social.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full flex justify-end items-center">
        <Link
          href="/contact"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "w-fit"
          )}
        >
          Contact <Icons.right className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </Shell>
  );
};

export default AboutPage;
