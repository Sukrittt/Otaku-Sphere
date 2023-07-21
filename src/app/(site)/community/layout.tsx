import { redirect } from "next/navigation";
import { Metadata } from "next";

import { ScrollArea } from "@/ui/ScrollArea";
import { getAuthSession } from "@/lib/auth";
import CommunitySidebar from "@/components/Navbar/CommunitySidebar";
import { env } from "@/env.mjs";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Otaku Communities",
  description: "Connect with other anime fans and share your thoughts.",
};

interface CommunityLayoutProps {
  children: React.ReactNode;
}

export default async function CommunityLayout({
  children,
}: CommunityLayoutProps) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1 items-start lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r lg:sticky lg:block">
          <ScrollArea className="py-6 pr-6 lg:py-8">
            <CommunitySidebar />
          </ScrollArea>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
