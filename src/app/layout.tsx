import type { Metadata } from "next";
import "./globals.css";
import {Inter} from 'next/font/google'
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ConvexClientProvider } from "../components/ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";

export const metadata: Metadata = {
  title: "PenSpace",
  description: "",
};

const inter = Inter({
  subsets:['latin']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <ConvexClientProvider>
              <Toaster/>
              {children}
            </ConvexClientProvider>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
