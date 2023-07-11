import { cn } from "@/lib/utils";
import { buttonVariants } from "@/ui/Button";
import Link from "next/link";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string | null;
  size?: "default" | "sm";
  goBackLink?: string;
  trimDesc?: boolean;
}

export function Header({
  title,
  description,
  size = "default",
  goBackLink,
  className,
  ...props
}: HeaderProps) {
  return (
    <div className={cn("grid gap-1", className)} {...props}>
      {goBackLink && <ShowBack href={goBackLink} />}
      <h1
        className={cn(
          "line-clamp-1 text-3xl font-bold tracking-tight py-1",
          size === "default" && "md:text-4xl"
        )}
      >
        {title}
      </h1>
      {description ? (
        <p className="text-muted-foreground text-md">{description}</p>
      ) : null}
    </div>
  );
}

export const ShowBack = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant: "link" }), "w-fit px-0")}
    >
      Go back
    </Link>
  );
};
