"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { TouchBackend } from "react-dnd-touch-backend";
import { DndProvider } from "react-dnd";

import { ThemeProvider } from "@/components/ThemeProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <DndProvider backend={TouchBackend}>{children}</DndProvider>
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
