import Link from "next/link";
import { buttonVariants } from "@/ui/Button";

export default function FourOhFour() {
  return (
    <>
      <h1 className="line-clamp-1 text-3xl font-bold tracking-tight py-1">
        404 - Page Not Found
      </h1>
      <Link href="/" className={buttonVariants({ variant: "link" })}>
        Go back home
      </Link>
    </>
  );
}
