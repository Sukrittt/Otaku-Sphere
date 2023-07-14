"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "./ThemeProvider";
import { DndProvider } from "react-dnd";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <DndProvider backend={HTML5Backend}>{children}</DndProvider>
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
