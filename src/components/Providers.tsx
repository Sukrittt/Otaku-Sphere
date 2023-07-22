"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

import { ThemeProvider } from "@/components/ThemeProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </QueryClientProvider>
      <Analytics />
    </>
  );
};

export default Providers;
