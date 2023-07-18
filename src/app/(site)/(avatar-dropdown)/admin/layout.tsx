import { redirect } from "next/navigation";

import { ScrollArea } from "@/ui/ScrollArea";
import { getAuthSession } from "@/lib/auth";
import SidebarNav from "@/components/Navbar/SidebarNav";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1 items-start lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r lg:sticky lg:block">
          <ScrollArea className="py-6 pr-6 lg:py-8">
            <SidebarNav />
          </ScrollArea>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
