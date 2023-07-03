import { getAuthSession } from "@/lib/auth";
import { Button } from "@/ui/Button";
import Link from "next/link";

export default async function Home() {
  const session = await getAuthSession();

  return (
    <div>
      <Button asChild>
        {!session ? (
          <Link href="/sign-in">Signin</Link>
        ) : (
          <pre>{JSON.stringify(session)}</pre>
        )}
      </Button>
    </div>
  );
}
