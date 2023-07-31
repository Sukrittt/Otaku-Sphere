import { redirect } from "next/navigation";
import { Metadata } from "next";

import { ScrollArea } from "@/ui/ScrollArea";
import { getAuthSession } from "@/lib/auth";
import { env } from "@/env.mjs";
import PollSidebar from "@/components/Navbar/PollSidebar";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Polls",
  description:
    "Empower the community by creating interactive polls with customized options and expiry dates. Vote on polls from fellow users and view the results once the poll expires.",
};

interface PollLayoutProps {
  children: React.ReactNode;
}

export default async function PollLayout({ children }: PollLayoutProps) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1 items-start lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r lg:sticky lg:block">
          <ScrollArea className="py-6 pr-6 lg:py-8">
            <PollSidebar />
          </ScrollArea>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
