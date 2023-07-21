import Link from "next/link";

import { Header } from "@/components/Header";
import { Shell } from "@/components/Shell";
import { Separator } from "@/ui/Separator";
import { contact } from "@/config";
import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const ContactPage = () => {
  return (
    <Shell layout="markdown">
      <div>
        <Header
          title="Contact"
          description="Contact us for any questions or concerns about Otaku Sphere."
        />
        <Separator className="my-4" />
        <p className="font-light">
          If you have any questions or concerns about Otaku Sphere, please
          contact us using one of the methods below. We will try to respond as
          soon as possible.
        </p>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          Contact Information
        </h1>
        <Separator className="my-2" />
        <ul className="space-y-2 mx-5 mt-4">
          {contact.map((contactInfo) => (
            <li key={contactInfo.id} className="list-disc">
              <span className="font-semibold">{contactInfo.label}</span>:{" "}
              <Link
                href={contactInfo.href}
                target="_blank"
                className="underline font-medium tracking-tight underline-offset-4"
              >
                {contactInfo.linkLabel}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full flex justify-between items-center">
        <Link
          href="/about"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "w-fit"
          )}
        >
          <Icons.left className="mr-2 h-4 w-4" />
          About
        </Link>
        <Link
          href="/privacy"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "w-fit"
          )}
        >
          Privacy Policy <Icons.right className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </Shell>
  );
};

export default ContactPage;
