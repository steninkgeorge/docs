"use client";

import { ConvexReactClient } from "convex/react";
import { ReactNode, useEffect, useState } from "react";
import { ClerkProvider, useAuth, SignIn } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { FullScreenLoader } from "./full-screen-loader";
import { useTheme } from "next-themes";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const { theme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
  
  useEffect(() => {
    const isDark = 
      theme === "dark" || 
      (theme === "system" && systemTheme === "dark");
    
    setCurrentTheme(isDark ? "dark" : "light");
  }, [theme, systemTheme]);

  return (
    <ClerkProvider
      publishableKey={`${process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}`}
      appearance={{
        variables: {
          colorPrimary: currentTheme === "dark" ? "#60a5fa" : "#3b82f6",
          colorTextOnPrimaryBackground: "#ffffff",
          colorBackground: currentTheme === "dark" ? "#1e2746" : "#ffffff",
          colorInputBackground: currentTheme === "dark" ? "#273353" : "#f9fafb",
          colorInputText: currentTheme === "dark" ? "#e5e7eb" : "#000000",
          colorText: currentTheme === "dark" ? "#e5e7eb" : "#000000",
        },
        elements: {
          userButtonBox: {
            boxShadow: "none",
          },
          userButtonTrigger: {
            filter: "none",
            backgroundColor:
              currentTheme === "dark" ? "transparent" : "transparent",
            border: currentTheme === "dark" ? "none" : "1px solid #e5e7eb",
            "&:hover": {
              backgroundColor: currentTheme === "dark" ? "#34405e" : "#f9fafb",
              color: currentTheme === "dark" ? "#ffffff" : "inherit",
            },
          },
          userButtonPopoverCard: {
            boxShadow:
              currentTheme === "dark"
                ? "0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5)"
                : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
            backgroundColor: currentTheme === "dark" ? "#273353" : "#ffffff",
            border:
              currentTheme === "dark"
                ? "1px solid #3f485d"
                : "1px solid #e5e7eb",
          },
          userButtonPopoverActionButton: {
            backgroundColor:
              currentTheme === "dark" ? "transparent" : "transparent",
            color: currentTheme === "dark" ? "#e5e7eb" : "#000000",
            "&:hover": {
              backgroundColor:
                currentTheme === "dark" ? "#273353 !important" : "#f9fafb",
              color: currentTheme === "dark" ? "#ffffff !important" : "inherit",
            },
          },
          userButtonPopoverActionButtonIcon: {
            color: currentTheme === "dark" ? "#e5e7eb" : "inherit",
            "&:hover": {
              color: currentTheme === "dark" ? "#ffffff !important" : "inherit",
            },
          },
          userButtonPopoverActionButtonText: {
            color: currentTheme === "dark" ? "#e5e7eb" : "inherit",
            "&:hover": {
              color: currentTheme === "dark" ? "#ffffff !important" : "inherit",
            },
          },
          organizationSwitcherTrigger: {
            backgroundColor:
              currentTheme === "dark" ? "transparent" : "transparent",
            border: "none",
            "&:hover": {
              backgroundColor: currentTheme === "dark" ? "#34405e" : "#f9fafb",
              color: currentTheme === "dark" ? "#ffffff" : "inherit",
            },
          },
          organizationSwitcherPopoverCard: {
            boxShadow:
              currentTheme === "dark"
                ? "0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5)"
                : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
            backgroundColor: currentTheme === "dark" ? "#273353" : "#ffffff",
            border:
              currentTheme === "dark"
                ? "1px solid #3f485d"
                : "1px solid #e5e7eb",
          },
          organizationSwitcherPopoverActionButton: {
            backgroundColor:
              currentTheme === "dark" ? "transparent" : "transparent",
            color: currentTheme === "dark" ? "#e5e7eb" : "#000000",
            "&:hover": {
              backgroundColor:
                currentTheme === "dark" ? "#273353 !important" : "#f9fafb",
              color: currentTheme === "dark" ? "#ffffff !important" : "inherit",
            },
          },
          organizationSwitcherPopoverActionButtonIcon: {
            color: currentTheme === "dark" ? "#e5e7eb" : "inherit",
            "&:hover": {
              color: currentTheme === "dark" ? "#ffffff !important" : "inherit",
            },
          },
          organizationSwitcherPopoverActionButtonText: {
            color: currentTheme === "dark" ? "#e5e7eb" : "inherit",
            "&:hover": {
              color: currentTheme === "dark" ? "#ffffff !important" : "inherit",
            },
          },
          organizationPreviewTextContainer: {
            color: currentTheme === "dark" ? "#e5e7eb" : "inherit",
            "&:hover": {
              color: currentTheme === "dark" ? "#ffffff !important" : "inherit",
            },
          },
          
         
          
        },
      }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className="flex flex-col items-center justify-center min-h-screen">
            <SignIn />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <FullScreenLoader label="Authenticating" />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
