"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Adsense } from "@ctrl/react-adsense";
import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "@/components/ThemeProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <>
      <Adsense client="ca-pub-8448763122793144" slot="7259870550" />
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
};

export default Providers;
