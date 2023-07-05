import "./globals.css";
import { Inter } from "next/font/google";

import { Toaster } from "@/ui/Toaster";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Otaku Sphere",
  description: "A platform filled with anime lovers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
